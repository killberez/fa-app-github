import React, { useReducer } from "react";
import styled, { createGlobalStyle } from "styled-components";
import GlobalContext from "./context/GlobalContext";
import APIRequestView from "./APIRequestView";
import Reducer from "./context/reducer";
import Sidebar from "./SideBar";
import GraphArea from "./GraphArea";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login";

const GlobalStyle = createGlobalStyle`
  :root {
    --white: #ffffff;
    --black: #2c2c2c;
    --dark-gray: #999999;
    --primary-color: #5c38ff;
    --primary-color-hover: #3919C9;
    --very-light-gray: #f5f5f5;
    --light-gray: #e5e5e5;
    --light-gray-hover: #cccccc;
    --gray: #aaaaaa;
    --note: #a9dac7;
    --note-bg: #d4ebe3;
    --error: #fb6e5d;
    --error-bg: #fcd1cb;
    --warning: #fc9a20;
    --warning-bg: #fde9d0;
    --tag-bg: #e6ecf0;
    --tag-color: #1c600b;
  }

  body {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: var(--black);
    margin: 0;
    padding: 0;
    overflow-y: hidden;
  }

  h2 {
    font-size: 12px;
    font-weight: 600;
  }

  h1 {
    font-size: 20px;
    margin: 10px 0;
    font-weight: normal;
  }

  input {
    background-color: var(--white);
    border: 1px solid var(--light-gray);
    border-radius: 5px;
    padding: 5px;
  }
  
  hr {
    margin-top: 15px;
  }
`;

const Header = styled.div`
  background-color: var(--black);
  color: #ffffff;
  width: 100%;
`;

const Logo = styled.div`
  background-color: var(--primary-color);
  color: #ffffff;
  padding: 10px;
  aling-items: center;
  width: fit-content;
`;

const Body = styled.div`
  display: flex;
`;

function App() {
  const initialState = {
    requestURL: "",
    data: [],
    keyList: [],
    errorFetchingData: false,
    error: undefined,
    graphDrawn: false,
    graphReadyToBeDrawn: false,
    selectedSidetab: "graphType",
    selectedChartType: "Bar",
    primaryAxisKey: "",
    primaryAxisMin: -Infinity,
    primaryAxisMax: Infinity,
    primaryAxisKeyType: "",
    secondaryAxisKey: "",
    secondaryAxisMin: -Infinity,
    secondaryAxisMax: Infinity,
    secondaryAxisKeyType: "",
    colorKey: undefined,
    colorRange: [],
    parentKey: "_root_",
    graphHeight: 450,
    graphWidth: 800,
    title: "",
    description: "",
    note: "",
    footer: "",
    showTicks: true,
    showLabels: true,
    showValues: false,
    showKeys: true,
    showTooltips: true,
    labelPositionInside: true,
    gridColor: "#eeeeee",
    labelColor: "#212121",
    baseColor: "#5682a3",
    backgroundColor: "#ffffff",
    reverse: false,
    sort: false,
    useKeys: false,
    keysToUse: [],
    labelsArray: [],
    rotateLabel: true,
    tooltipPosition: { x: 0, y: 0 },
    tooltipData: undefined,
    tickFormat: "none",
    barPadding: 10,
    roundedCorner: 0,
    auth: false,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateData = (data: any) => {
    dispatch({
      type: "UPDATE_DATA",
      payload: data,
    });
  };

  const updateSelectedSidetab = (data: any) => {
    dispatch({
      type: "UPDATE_SELECTED_SIDETAB",
      payload: data,
    });
  };

  const updateSelectedChartType = (data: string[]) => {
    dispatch({
      type: "UPDATE_SELECTED_CHART_TYPE",
      payload: data,
    });
  };

  const updateSecondaryAxisKey = (data: any) => {
    dispatch({
      type: "UPDATE_SECONDARY_AXIS_KEY",
      payload: data,
    });
  };

  const updatePrimaryAxisKey = (data: any) => {
    dispatch({
      type: "UPDATE_PRIMARY_AXIS_KEY",
      payload: data,
    });
  };

  const updateSecondaryAxisKeyType = (data: string) => {
    dispatch({
      type: "UPDATE_SECONDARY_AXIS_KEY_TYPE",
      payload: data,
    });
  };

  const updatePrimaryAxisKeyType = (data: string) => {
    dispatch({
      type: "UPDATE_PRIMARY_AXIS_KEY_TYPE",
      payload: data,
    });
  };

  const updateColorKey = (data: any) => {
    dispatch({
      type: "UPDATE_COLOR_KEY",
      payload: data,
    });
  };

  const updateSecondaryAxisMin = (data: number) => {
    dispatch({
      type: "UPDATE_SECONDARY_AXIS_MIN",
      payload: data,
    });
  };

  const updatePrimaryAxisMin = (data: number) => {
    dispatch({
      type: "UPDATE_PRIMARY_AXIS_MIN",
      payload: data,
    });
  };

  const updateSecondaryAxisMax = (data: number) => {
    dispatch({
      type: "UPDATE_SECONDARY_AXIS_MAX",
      payload: data,
    });
  };

  const updatePrimaryAxisMax = (data: number) => {
    dispatch({
      type: "UPDATE_PRIMARY_AXIS_MAX",
      payload: data,
    });
  };

  const updateColorRange = (data: any) => {
    dispatch({
      type: "UPDATE_COLOR_RANGE",
      payload: data,
    });
  };

  const updateParentKey = (data: any) => {
    dispatch({
      type: "UPDATE_PARENT_KEY",
      payload: data,
    });
  };

  const updateGraphHeight = (data: boolean) => {
    dispatch({
      type: "UPDATE_GRAPH_HEIGHT",
      payload: data,
    });
  };

  const updateGraphWidth = (data: boolean) => {
    dispatch({
      type: "UPDATE_GRAPH_WIDTH",
      payload: data,
    });
  };

  const updateTitle = (data: string) => {
    dispatch({
      type: "UPDATE_TITLE",
      payload: data,
    });
  };

  const updateDescription = (data: string) => {
    dispatch({
      type: "UPDATE_DESCRIPTION",
      payload: data,
    });
  };

  const updateNote = (data: string) => {
    dispatch({
      type: "UPDATE_NOTE",
      payload: data,
    });
  };

  const updateFooter = (data: string) => {
    dispatch({
      type: "UPDATE_FOOTER",
      payload: data,
    });
  };

  const updateShowTicks = (data: boolean) => {
    dispatch({
      type: "UPDATE_SHOW_TICKS",
      payload: data,
    });
  };

  const updateShowLabels = (data: boolean) => {
    dispatch({
      type: "UPDATE_SHOW_LABELS",
      payload: data,
    });
  };

  const updateShowValues = (data: boolean) => {
    dispatch({
      type: "UPDATE_SHOW_VALUES",
      payload: data,
    });
  };

  const updateShowKeys = (data: boolean) => {
    dispatch({
      type: "UPDATE_SHOW_KEYS",
      payload: data,
    });
  };

  const updateShowTooltips = (data: boolean) => {
    dispatch({
      type: "UPDATE_SHOW_TOOLTIPS",
      payload: data,
    });
  };

  const updateGridColor = (data: string) => {
    dispatch({
      type: "UPDATE_GRID_COLOR",
      payload: data,
    });
  };

  const updateLabelColor = (data: string) => {
    dispatch({
      type: "UPDATE_LABEL_COLOR",
      payload: data,
    });
  };

  const updateBaseColor = (data: string) => {
    dispatch({
      type: "UPDATE_BASE_COLOR",
      payload: data,
    });
  };

  const updateBackgroundColor = (data: string) => {
    dispatch({
      type: "UPDATE_BACKGROUND_COLOR",
      payload: data,
    });
  };

  const updateErrorFetchingData = (data: boolean) => {
    dispatch({
      type: "UPDATE_ERROR_FETCHING_DATA",
      payload: data,
    });
  };

  const updateError = (data: string) => {
    dispatch({
      type: "UPDATE_ERROR",
      payload: data,
    });
  };
  const updateRequestURL = (data: string) => {
    dispatch({
      type: "UPDATE_REQUESTURL",
      payload: data,
    });
  };

  const updateGraphDrawn = (data: boolean) => {
    dispatch({
      type: "UPDATE_GRAPH_DRAWN",
      payload: data,
    });
  };

  const updateGraphReadyToBeDrawn = (data: string) => {
    dispatch({
      type: "UPDATE_GRAPH_READY_TO_BE_DRAWN",
      payload: data,
    });
  };

  const updateRotateLabel = (data: boolean) => {
    dispatch({
      type: "UPDATE_ROTATE_LABEL",
      payload: data,
    });
  };

  const updateLabelPositionInside = (data: boolean) => {
    dispatch({
      type: "UPDATE_LABEL_POSITION_INSIDE",
      payload: data,
    });
  };

  const updateReverse = (data: boolean) => {
    dispatch({
      type: "UPDATE_REVERSE",
      payload: data,
    });
  };

  const updateSort = (data: boolean) => {
    dispatch({
      type: "UPDATE_SORT",
      payload: data,
    });
  };

  const updateKeysToUse = (data: string[]) => {
    dispatch({
      type: "UPDATE_KEYS_TO_USE",
      payload: data,
    });
  };

  const updateLabelsArray = (data: string[]) => {
    dispatch({
      type: "UPDATE_LABELS_ARRAY",
      payload: data,
    });
  };
  const updateTooltipPosition = (data: any) => {
    dispatch({
      type: "UPDATE_TOOLTIP_POSITION",
      payload: data,
    });
  };
  const updateTooltipData = (data: any) => {
    dispatch({
      type: "UPDATE_TOOLTIP_DATA",
      payload: data,
    });
  };
  const updateTickFormat = (data: string) => {
    dispatch({
      type: "UPDATE_TICK_FORMAT",
      payload: data,
    });
  };
  const updateBarPadding = (data: number) => {
    dispatch({
      type: "UPDATE_BAR_PADDING",
      payload: data,
    });
  };
  const updateRoundedCorner = (data: number) => {
    dispatch({
      type: "UPDATE_ROUNDED_CORNER",
      payload: data,
    });
  };
  const authUser = () => {
    dispatch({
      type: "USER_AUTH",
    });
  };
  const unauthUser = () => {
    dispatch({
      type: "USER_AUTH",
    });
  };
  const handleSucces = async (res: GoogleLoginResponse) => {
    const rawResponse = await fetch("http://localhost:8000/api/v1/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ googleId: res.googleId, token: res.tokenId }),
    });
    const realResponse = await rawResponse.json();
    console.log(realResponse.token);
    //Token must be presented in every server req
    realResponse.token ? authUser() : unauthUser();
  };
  return (
    <>
      <GlobalStyle />
      <Header>
        <Logo>
          <img src="./images/logo.png" alt="Logo" height="30px" />
          <GoogleLogin
            clientId="550890630184-gbs9q4c0viqr2nmt2n04c08momogpht2.apps.googleusercontent.com"
            buttonText="Login"
            // GoogleAuth package has incorrect types
            //@ts-ignore
            onSuccess={handleSucces}
            cookiePolicy={"single_host_origin"}
          />
        </Logo>
      </Header>
      <GlobalContext.Provider
        value={{
          data: state.data,
          requestURL: state.requestURL,
          selectedSidetab: state.selectedSidetab,
          keyList: state.keyList,
          selectedChartType: state.selectedChartType,
          primaryAxisKey: state.primaryAxisKey,
          primaryAxisMin: state.primaryAxisMin,
          primaryAxisMax: state.primaryAxisMax,
          secondaryAxisKeyType: state.secondaryAxisKeyType,
          primaryAxisKeyType: state.primaryAxisKeyType,
          secondaryAxisKey: state.secondaryAxisKey,
          secondaryAxisMin: state.secondaryAxisMin,
          graphDrawn: state.graphDrawn,
          graphReadyToBeDrawn: state.graphReadyToBeDrawn,
          secondaryAxisMax: state.secondaryAxisMax,
          colorKey: state.colorKey,
          colorRange: state.colorRange,
          parentKey: state.parentKey,
          graphWidth: state.graphWidth,
          graphHeight: state.graphHeight,
          title: state.title,
          description: state.description,
          note: state.note,
          labelPositionInside: state.labelPositionInside,
          footer: state.footer,
          showTicks: state.showTicks,
          showLabels: state.showLabels,
          showValues: state.showValues,
          showKeys: state.showKeys,
          showTooltips: state.showTooltips,
          gridColor: state.gridColor,
          labelColor: state.labelColor,
          rotateLabel: state.rotateLabel,
          baseColor: state.baseColor,
          backgroundColor: state.backgroundColor,
          errorFetchingData: state.errorFetchingData,
          error: state.error,
          reverse: state.reverse,
          sort: state.sort,
          useKeys: state.useKeys,
          keysToUse: state.keysToUse,
          labelsArray: state.labelsArray,
          tooltipPosition: state.tooltipPosition,
          tooltipData: state.tooltipData,
          tickFormat: state.tickFormat,
          barPadding: state.barPadding,
          roundedCorner: state.roundedCorner,
          auth: state.auth,
          updateData,
          updateSelectedSidetab,
          updateSelectedChartType,
          updatePrimaryAxisKey,
          updateColorKey,
          updateColorRange,
          updatePrimaryAxisMin,
          updatePrimaryAxisMax,
          updateSecondaryAxisKey,
          updateSecondaryAxisMin,
          updateSecondaryAxisMax,
          updateParentKey,
          updatePrimaryAxisKeyType,
          updateSecondaryAxisKeyType,
          updateGraphWidth,
          updateGraphHeight,
          updateTitle,
          updateDescription,
          updateNote,
          updateFooter,
          updateShowTicks,
          updateShowLabels,
          updateShowValues,
          updateShowKeys,
          updateShowTooltips,
          updateGridColor,
          updateLabelColor,
          updateBaseColor,
          updateBackgroundColor,
          updateErrorFetchingData,
          updateError,
          updateRequestURL,
          updateGraphDrawn,
          updateGraphReadyToBeDrawn,
          updateRotateLabel,
          updateLabelPositionInside,
          updateReverse,
          updateSort,
          updateKeysToUse,
          updateLabelsArray,
          updateTooltipPosition,
          updateTooltipData,
          updateTickFormat,
          updateBarPadding,
          updateRoundedCorner,
        }}
      >
        <APIRequestView />
        <Body>
          <Sidebar />
          <GraphArea />
        </Body>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
