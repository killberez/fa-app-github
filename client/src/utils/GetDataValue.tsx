export default (data: any, key?: string) => {
  const keyList = key?.split(".");
  let dataString = "";
  keyList?.forEach((s: string) => {
    if (s !== "") dataString = `${dataString}["${s}"]`;
  });
  dataString = `data${dataString}`;
  // eslint-disable-next-line no-eval
  return eval(dataString);
};
