import React, { useContext } from "react";
import GlobalContext from "../../../context/GlobalContext";
import ToggleButton from "../../../UIElements/ToggleSwitch";
import ColorSelector from "../../../UIElements/ColorSelector";
import Dropdown from "../../../UIElements/Dropdown";
import Slider from "../../../UIElements/Slider";

const TickFormatOptions = [
  {
    value: "none",
    text: "123456.789 (No Format)",
  },
  {
    value: "usFormat",
    text: "123 456.789 (US format)",
  },
  {
    value: "euFormat",
    text: "123 456,789 (EU format)",
  },
  {
    value: "siUs",
    text: "123.45K (US Format)",
  },
  {
    value: "siEu",
    text: "123,45K (EU Format)",
  },
  {
    value: "CurrencyUs",
    text: "$ 123 456.789 (US format)",
  },
  {
    value: "CurrencyEu",
    text: "123 456,789 € (EU format)",
  },
  {
    value: "siCurrencyUs",
    text: "$ 123.4K (US Format)",
  },
  {
    value: "siCurrencyEu",
    text: "123,4K € (EU Format)",
  },
  {
    value: "percentUs",
    text: "12.34% (US Format)",
  },
  {
    value: "percentEu",
    text: "12,34% (EU Format)",
  },
];

export default () => {
  const context = useContext(GlobalContext);
  return (
    <>
      <h1>General Settings</h1>
      <ToggleButton
        title={"Sort Bars"}
        selected={context.sort}
        onClick={() => {
          context.updateSort(!context.sort);
        }}
      />
      <ToggleButton
        title={"Reverse Order"}
        selected={context.reverse}
        onClick={() => {
          context.updateReverse(!context.reverse);
        }}
      />
      <ToggleButton
        title={"Show Keys"}
        selected={context.showKeys}
        onClick={() => {
          context.updateShowKeys(!context.showKeys);
        }}
      />
      <Slider
        title={"Spacing Between Bars"}
        value={context.barPadding}
        min={0}
        max={100}
        step={1}
        onChange={(d: any) => {
          context.updateBarPadding(d);
        }}
      />
      <Slider
        title={"Rounded Corner"}
        value={context.roundedCorner}
        min={0}
        max={50}
        step={1}
        onChange={(d: any) => {
          context.updateRoundedCorner(d);
        }}
      />
      <hr />
      <h1>Tick Settings</h1>
      <Dropdown
        title={"Tick Format"}
        placeHolder={"No formatting"}
        value={context.tickFormat}
        options={TickFormatOptions}
        onChange={(d: any) => {
          context.updateTickFormat(d);
        }}
      />
      <ToggleButton
        title={"Show Grid Line"}
        selected={context.showTicks}
        onClick={() => {
          context.updateShowTicks(!context.showTicks);
        }}
      />
      <ToggleButton
        title={"Show Labels"}
        selected={context.showLabels}
        onClick={() => {
          context.updateShowLabels(!context.showLabels);
        }}
      />
      <ToggleButton
        title={"Rotate X Labels"}
        selected={context.rotateLabel}
        onClick={() => {
          context.updateRotateLabel(!context.rotateLabel);
        }}
      />
      <ToggleButton
        title={"Show Axes Labels Inside"}
        selected={context.labelPositionInside}
        onClick={() => {
          context.updateLabelPositionInside(!context.labelPositionInside);
        }}
      />
      <ColorSelector
        title={"Grid Color"}
        color={context.gridColor}
        onChange={(d: string) => context.updateGridColor(d)}
      />
      <ColorSelector
        title={"Label Color"}
        color={context.labelColor}
        onChange={(d: string) => context.updateLabelColor(d)}
      />
    </>
  );
};
