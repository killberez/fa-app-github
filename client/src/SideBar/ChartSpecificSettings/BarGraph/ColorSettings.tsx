import React, { useContext } from "react";
import GlobalContext from "../../../context/GlobalContext";
import ColorSelector from "../../../UIElements/ColorSelector";

export default () => {
  const context = useContext(GlobalContext);
  return (
    <>
      <h1>Color Settings</h1>
      <ColorSelector
        title={"Base Color"}
        color={context.baseColor}
        onChange={(d: string) => context.updateBaseColor(d)}
      />
      <ColorSelector
        title={"Background Color"}
        color={context.backgroundColor}
        onChange={(d: string) => context.updateBackgroundColor(d)}
      />
    </>
  );
};
