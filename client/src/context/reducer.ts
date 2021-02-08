import CreateKeyList from "../utils/CreateKeyList";
import FormatData from "../utils/FormatData";

export default (state: any, action: any) => {
  switch (action.type) {
    case "UPDATE_DATA":
      const formattedData = FormatData(action.payload);
      const keyList = CreateKeyList(formattedData);
      const parentKeyIndex = keyList.findIndex(
        (item, i) => item.type === "[object]"
      );
      const useKeys = parentKeyIndex === -1 ? true : false;
      let keysToUse: string[] | undefined = [];
      if (useKeys) {
        keyList.forEach((d: { keyName: string; type: string }) => {
          if (d.type === "number") keysToUse?.push(d.keyName);
        });
      }
      keysToUse = useKeys ? keysToUse : undefined;
      const parentKey =
        parentKeyIndex !== -1 ? keyList[parentKeyIndex].keyName : undefined;
      const filteredData = CreateKeyList(formattedData).filter(
        (el) => el.parentKey === parentKey
      );
      const primaryAxisIndex = filteredData.findIndex(
        (item, i) => item.type === "number"
      );
      const primaryAxisKey =
        primaryAxisIndex !== -1 ? filteredData[primaryAxisIndex].keyName : "";
      const primaryAxisKeyType =
        primaryAxisIndex !== -1 ? filteredData[primaryAxisIndex].type : "";
      const secondaryAxisIndex = filteredData.findIndex(
        (item, i) => item.type === "string" || item.type === "dateTime"
      );
      const secondaryAxisKey =
        secondaryAxisIndex !== -1
          ? filteredData[secondaryAxisIndex].keyName
          : "";
      const secondaryAxisKeyType =
        secondaryAxisIndex !== -1 ? filteredData[secondaryAxisIndex].type : "";
      return {
        ...state,
        data: formattedData,
        keyList,
        keysToUse,
        primaryAxisKey,
        parentKey,
        primaryAxisKeyType,
        secondaryAxisKey,
        secondaryAxisKeyType,
        useKeys,
      };
    case "UPDATE_SELECTED_SIDETAB":
      return { ...state, selectedSidetab: action.payload };
    case "UPDATE_SELECTED_CHART_TYPE":
      return { ...state, selectedChartType: action.payload };
    case "UPDATE_PRIMARY_AXIS_KEY":
      return { ...state, primaryAxisKey: action.payload };
    case "UPDATE_SECONDARY_AXIS_KEY":
      return { ...state, secondaryAxisKey: action.payload };
    case "UPDATE_PRIMARY_AXIS_KEY_TYPE":
      return { ...state, primaryAxisKeyType: action.payload };
    case "UPDATE_SECONDARY_AXIS_KEY_TYPE":
      return { ...state, secondaryAxisKeyType: action.payload };
    case "UPDATE_COLOR_KEY":
      return { ...state, colorKey: action.payload };
    case "UPDATE_PRIMARY_AXIS_MAX":
      return { ...state, primaryAxisMax: action.payload };
    case "UPDATE_SECONDARY_AXIS_MAX":
      return { ...state, secondaryAxisMax: action.payload };
    case "UPDATE_PRIMARY_AXIS_MIN":
      return { ...state, primaryAxisMin: action.payload };
    case "UPDATE_SECONDARY_AXIS_MIN":
      return { ...state, secondaryAxisMin: action.payload };
    case "UPDATE_COLOR_RANGE":
      return { ...state, colorRange: action.payload };
    case "UPDATE_PARENT_KEY":
      return { ...state, parentKey: action.payload };
    case "UPDATE_DRAW_GRAPH_DISABLED":
      return { ...state, drawGraphDisabled: action.payload };
    case "UPDATE_GRAPH_HEIGHT":
      return { ...state, graphHeight: action.payload };
    case "UPDATE_GRAPH_WIDTH":
      return { ...state, graphWidth: action.payload };
    case "UPDATE_TITLE":
      return { ...state, title: action.payload };
    case "UPDATE_DESCRIPTION":
      return { ...state, description: action.payload };
    case "UPDATE_NOTE":
      return { ...state, note: action.payload };
    case "UPDATE_FOOTER":
      return { ...state, footer: action.payload };
    case "UPDATE_SHOW_TICKS":
      return { ...state, showTicks: action.payload };
    case "UPDATE_SHOW_LABELS":
      return { ...state, showLabels: action.payload };
    case "UPDATE_SHOW_VALUES":
      return { ...state, showValues: action.payload };
    case "UPDATE_SHOW_KEYS":
      return { ...state, showKeys: action.payload };
    case "UPDATE_SHOW_TOOLTIPS":
      return { ...state, showTooltips: action.payload };
    case "UPDATE_GRID_COLOR":
      return { ...state, gridColor: action.payload };
    case "UPDATE_LABEL_COLOR":
      return { ...state, labelColor: action.payload };
    case "UPDATE_ROTATE_LABEL":
      return { ...state, rotateLabel: action.payload };
    case "UPDATE_BASE_COLOR":
      return { ...state, baseColor: action.payload };
    case "UPDATE_BACKGROUND_COLOR":
      return { ...state, backgroundColor: action.payload };
    case "UPDATE_ERROR_FETCHING_DATA":
      return { ...state, errorFetchingData: action.payload };
    case "UPDATE_ERROR":
      return { ...state, error: action.payload };
    case "UPDATE_REQUESTURL":
      return { ...state, requestURL: action.payload };
    case "UPDATE_GRAPH_READY_TO_BE_DRAWN":
      return { ...state, graphReadyToBeDrawn: action.payload };
    case "UPDATE_GRAPH_DRAWN":
      return { ...state, graphDrawn: action.payload };
    case "UPDATE_LABEL_POSITION_INSIDE":
      return { ...state, labelPositionInside: action.payload };
    case "UPDATE_REVERSE":
      return { ...state, reverse: action.payload };
    case "UPDATE_SORT":
      return { ...state, sort: action.payload };
    case "UPDATE_KEYS_TO_USE":
      return { ...state, keysToUse: action.payload };
    case "UPDATE_LABELS_ARRAY":
      return { ...state, labelsArray: action.payload };
    case "UPDATE_TOOLTIP_POSITION":
      return { ...state, tooltipPosition: action.payload };
    case "UPDATE_TOOLTIP_DATA":
      return { ...state, tooltipData: action.payload };
    case "UPDATE_TICK_FORMAT":
      return { ...state, tickFormat: action.payload };
    case "UPDATE_BAR_PADDING":
      return { ...state, barPadding: action.payload };
    case "UPDATE_ROUNDED_CORNER":
      return { ...state, roundedCorner: action.payload };
    case "USER_AUTH":
      return { ...state, auth: true };
    case "USER_UNAUTH":
      return { ...state, auth: false }
    default:
      return state;
  }
}

