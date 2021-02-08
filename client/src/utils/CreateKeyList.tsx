import moment from "moment";
import _ from "lodash";

const timeFormats = [
  "MM-DD-YYYY",
  "DD-MM",
  "DD-MM-YYYY",
  "MM/DD/YYYY",
  "DD/MM",
  "DD/MM/YYYY",
  "MMM-DD-YYYY",
  "DD-MMM",
  "DD-MMM-YYYY",
  "MMM/DD/YYYY",
  "DD/MMM",
  "DD/MMM/YYYY",
  "MMM DD YYYY",
  "MM-DD-YYYY HH:mm:ss",
  "DD-MM HH:mm:ss",
  "DD-MM-YYYY HH:mm:ss",
  "MM/DD/YYYY HH:mm:ss",
  "DD/MM HH:mm:ss",
  "DD/MM/YYYY HH:mm:ss",
  "MM DD YYYY HH:mm:ss",
  "MMM-DD-YYYY HH:mm:ss",
  "DD-MMM HH:mm:ss",
  "DD-MMM-YYYY HH:mm:ss",
  "MMM/DD/YYYY HH:mm:ss",
  "DD/MMM HH:mm:ss",
  "DD/MMM/YYYY HH:mm:ss",
  "MM-DD-YYYY HH:mm",
  "DD-MM HH:mm",
  "DD-MM-YYYY HH:mm",
  "MM/DD/YYYY HH:mm",
  "DD/MM HH:mm",
  "DD/MM/YYYY HH:mm",
  "MMM-DD-YYYY HH:mm",
  "DD-MMM HH:mm",
  "DD-MMM-YYYY HH:mm",
  "MMM/DD/YYYY HH:mm",
  "DD/MMM HH:mm",
  "DD/MMM/YYYY HH:mm",
];

interface keyDetail {
  keyName: string;
  type: string;
  isArray: boolean;
  parentKey: string;
}

const getParentKey = (keyName: string) => {
  let indexOf = keyName.lastIndexOf("[]");
  let parentKey = "_root_";
  if (indexOf !== -1) {
    parentKey = keyName.substring(0, indexOf + 2);
  }
  return parentKey;
};

const CheckObject = (
  data: any,
  level: number,
  parentKey: string,
  keyList: keyDetail[]
) => {
  if (typeof data === "object" && data !== null && data !== undefined) {
    if (Array.isArray(data)) {
      if (typeof data[0] === "object") {
        CheckObject(data[0], level, `${parentKey}[]`, keyList);
      }
    } else {
      const keys = Object.keys(data);
      keys.forEach((key: string) => {
        if (Array.isArray(data[key])) {
          let arrayType = typeof data[key][0];
          if (Array.isArray(data[key][0])) {
            const flattenArray = _.flatten(data[key][0]);
            arrayType = typeof flattenArray[0];
          }

          keyList.push({
            keyName: `${parentKey}.${key}[]`,
            type: `[${arrayType}]`,
            isArray: true,
            parentKey: getParentKey(parentKey),
          });
          CheckObject(data[key], level + 1, `${parentKey}.${key}`, keyList);
        } else {
          let type: string = data[key] === null ? "number" : typeof data[key];
          if (type === "string") {
            if (
              moment(data[key], timeFormats).isValid() &&
              !/^\d+$/.test(data[key])
            ) {
              type = "dateTime";
            }
          }
          keyList.push({
            keyName: `${parentKey}.${key}`,
            type: type,
            isArray: false,
            parentKey: getParentKey(parentKey),
          });
          CheckObject(data[key], level + 1, `${parentKey}.${key}`, keyList);
        }
      });
    }
  }
};
export default (data: any) => {
  const type = Array.isArray(data) ? "[object]" : "object";
  const keyName = Array.isArray(data) ? "_root_[]" : "_root_";
  let keyList: keyDetail[] =
    Array.isArray(data) && data.length === 0
      ? []
      : [
          {
            keyName: keyName,
            type: type,
            isArray: Array.isArray(data),
            parentKey: "",
          },
        ];
  CheckObject(data, 0, "_root_", keyList);
  return keyList;
};
