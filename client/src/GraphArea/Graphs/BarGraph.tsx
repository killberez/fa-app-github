/* eslint-disable no-eval */
import React, { useContext } from "react";
import * as d3 from "d3";
import GlobalContext from "../../context/GlobalContext";
import GetDataFromArray from "../../utils/FormatDataForViz";
import { YTicks } from "./Ticks";

export default () => {
  const context = useContext(GlobalContext);

  if (context.primaryAxisKey === "" && !context.useKeys) return null;

  const data = context.data;

  const dataArr = context.reverse
    ? context.sort
      ? GetDataFromArray(
          data,
          context.primaryAxisKey,
          context.primaryAxisKeyType,
          context.secondaryAxisKey,
          context.parentKey,
          context.useKeys,
          context.keysToUse
        )
          .sort((a: any, b: any) => a.value - b.value)
          .reverse()
      : GetDataFromArray(
          data,
          context.primaryAxisKey,
          context.primaryAxisKeyType,
          context.secondaryAxisKey,
          context.parentKey,
          context.useKeys,
          context.keysToUse
        ).reverse()
    : context.sort
    ? GetDataFromArray(
        data,
        context.primaryAxisKey,
        context.primaryAxisKeyType,
        context.secondaryAxisKey,
        context.parentKey,
        context.useKeys,
        context.keysToUse
      ).sort((a: any, b: any) => a.value - b.value)
    : GetDataFromArray(
        data,
        context.primaryAxisKey,
        context.primaryAxisKeyType,
        context.secondaryAxisKey,
        context.parentKey,
        context.useKeys,
        context.keysToUse
      );

  const labelMaxLength = Math.max(
    ...dataArr.map((el: any) => (el.label ? el.label.length : 0))
  );

  const bottomMargin = context.showLabels ? 20 : 0;
  const left = context.showTicks ? 50 : 5;
  const margin =
      context.rotateLabel && context.showLabels
        ? { top: 20, right: 5, bottom: labelMaxLength * 10, left }
        : { top: 20, right: 5, bottom: bottomMargin, left },
    width = context.graphWidth - margin.left - margin.right,
    height = context.graphHeight - margin.top - margin.bottom;
  let xScale = d3
    .scaleBand()
    .range([0, width])
    .padding(context.barPadding / 100);
  let yScale = d3.scaleLinear().range([height, 0]);

  const maxVal =
    context.primaryAxisMax !== Infinity
      ? context.primaryAxisMax
      : Math.max(...dataArr.map((d: any) => d.value));
  const minVal =
    context.primaryAxisMin !== -Infinity ? context.primaryAxisMin : 0;
  yScale.domain([minVal, maxVal]);
  xScale.domain(dataArr.map((d: any) => d.labelIndex));
  const Bars = dataArr.map((d: any, i: number) => {
    return (
      <rect
        key={i}
        x={xScale(d.labelIndex)}
        y={yScale(d.value)}
        height={height - yScale(d.value)}
        width={xScale.bandwidth()}
        fill={context.baseColor}
        onMouseEnter={(event) => {
          context.updateTooltipPosition({
            x: event?.clientX + 10,
            y: event?.clientY - 10,
          });
          context.updateTooltipData(d);
        }}
        onMouseLeave={() => {
          context.updateTooltipData(undefined);
        }}
        onMouseMove={(event) => {
          context.updateTooltipPosition({
            x: event?.clientX + 10,
            y: event?.clientY - 10,
          });
        }}
        rx={context.roundedCorner}
        ry={context.roundedCorner}
      />
    );
  });
  const Labels = context.showLabels
    ? dataArr.map((d: any, i: number) => {
        const xPos = xScale(d.labelIndex) as number;
        return (
          <text
            key={i}
            x={0}
            y={0}
            transform={`translate(${xScale.bandwidth() / 2 + xPos},${
              height + 15
            }) rotate(${context.rotateLabel ? 90 : 0})`}
            fontSize={12}
            textAnchor={context.rotateLabel ? "start" : "middle"}
            width={xScale.bandwidth()}
            fill={context.labelColor}
            dy={context.rotateLabel ? 4 : 0}
            dx={context.rotateLabel ? -10 : 0}
          >
            {d.label}
          </text>
        );
      })
    : null;

  let tickValue = yScale.ticks(5);
  const tickPos = tickValue.map((d: any) => yScale(d));
  return (
    <g transform={`translate(0,${margin.top})`}>
      {context.showTicks ? (
        <YTicks tickValues={tickValue} tickPosition={tickPos} />
      ) : null}
      <g transform={`translate(${margin.left},0)`}>
        {Bars}
        {Labels}
      </g>
    </g>
  );
};
