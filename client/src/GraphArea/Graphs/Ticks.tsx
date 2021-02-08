import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import FormatNumbers from "../../utils/FormatNumbers";

interface Props {
  tickValues: number[];
  tickPosition: number[];
}

export const XTicks = (props: any) => {
  const context = useContext(GlobalContext);
  if (context.showTicks === false) return null;
  return <g></g>;
};

export const YTicks = (props: Props) => {
  const context = useContext(GlobalContext);

  if (context.showTicks === false) return null;
  const tickLabel = props.tickValues.map((d: number, i: number) => {
    return (
      <text
        key={i}
        x={context.labelPositionInside ? 5 : 45}
        y={props.tickPosition[i]}
        fontSize={12}
        textAnchor={context.labelPositionInside ? "start" : "end"}
        fill={context.labelColor}
        dy={context.labelPositionInside ? -5 : 3}
      >
        {FormatNumbers(d, context.tickFormat)}
      </text>
    );
  });
  const tickAxis = context.showTicks
    ? props.tickValues.map((d: number, i: number) => (
        <line
          key={i}
          x1={context.labelPositionInside ? 5 : 50}
          y1={props.tickPosition[i]}
          x2={context.graphWidth}
          y2={props.tickPosition[i]}
          stroke={context.gridColor}
          strokeWidth={1}
        />
      ))
    : null;
  return (
    <g>
      {tickAxis}
      {tickLabel}
    </g>
  );
};
