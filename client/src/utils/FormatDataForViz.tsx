import GetDataValue from "./GetDataValue";

export default (
  data: any,
  primaryKey: string,
  primaryKeyType: string,
  secondaryKey: string,
  parentKey: string,
  useKeys: boolean,
  keysToUse: string[]
) => {
  if (!useKeys) {
    const parentKeyFormatted =
      parentKey !== undefined
        ? parentKey.split("[]")[0].replace("_root_", "data")
        : "data";
    const parentKeyList = parentKeyFormatted.split(".");
    let arrString = "data";
    parentKeyList.forEach((s: string, i: number) => {
      if (i !== 0) arrString = `${arrString}["${s}"]`;
    });

    // eslint-disable-next-line no-eval
    const arr = eval(arrString);
    const primaryChildKey = primaryKey
      ?.replace(parentKey, "")
      .replace("[]", "");

    const secondaryChildKey = secondaryKey
      ?.replace(parentKey, "")
      .replace("[]", "");
    if (Array.isArray(arr)) {
      let obj = arr.map((d: any, i: number) => {
        if (primaryKeyType === "string")
          return GetDataValue(d, primaryChildKey);

        const value =
          primaryKeyType === "["
            ? GetDataValue(d, primaryChildKey).length
            : GetDataValue(d, primaryChildKey);

        const label =
          primaryKeyType !== "string"
            ? secondaryKey
              ? `${GetDataValue(d, secondaryChildKey)}`
              : `index#${i}`
            : undefined;

        return {
          value: value,
          label: label,
          labelIndex: `${i}`,
        };
      });
      const counts = Object.create(null);
      let dataObj = obj;
      if (primaryKeyType === "string") {
        obj.forEach((d) => {
          counts[d] = counts[d] ? counts[d] + 1 : 1;
        });
        dataObj = Object.keys(counts).map((d: string, i: number) => {
          return {
            value: counts[d],
            label: d,
            labelIndex: `${i}`,
          };
        });
      }
      return dataObj;
    } else {
      const pKey = primaryChildKey?.substr(1);
      let dataObj = [
        {
          value: GetDataValue(arr, pKey),
          label: pKey,
          labelIndex: `${0}`,
        },
      ];
      return dataObj;
    }
  }
  let dataObj = keysToUse?.map((d: string, i: number) => {
    const pKey = d.replace("_root_.", "");
    return {
      value: GetDataValue(data, pKey),
      label: pKey,
      labelIndex: `${i}`,
    };
  });
  return dataObj;
};
