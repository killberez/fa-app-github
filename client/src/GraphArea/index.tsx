import React, { useState, useContext } from "react";
import styled from "styled-components";
import GraphView from "./GraphView";
import DataView from "./DataView";
import GlobalContext from "../context/GlobalContext";
interface Selected {
  selected: boolean;
}

interface IfError {
  error: boolean;
}

const Div = styled.div`
  background-color: var(--very-light-gray);
`;

interface TooltipInterface {
  fontColor?: string;
  bgColor?: string;
  top: number;
  left: number;
}

const TopBar = styled.div`
  background-color: var(--white);
  display: flex;
  height: 29px;
  padding: 10px 20px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--light-gray);
`;

const Switch = styled.div<Selected>`
  border: 1px solid var(--gray);
  background-color: ${(props) =>
    props.selected ? "var(--primary-color)" : "var(--white)"};
  color: ${(props) => (props.selected ? "var(--white)" : "var(--black)")};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
  &:first-of-type {
    border-radius: 2px 0 0 2px;
  }
  &:last-of-type {
    border-radius: 0 2px 2px 0;
  }
`;

const NoteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 300px);
  height: 100%;
`;

const Note = styled.div<IfError>`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: ${(props) =>
    props.error ? "var(--error-bg)" : "var(--white)"};
  border-radius: 2px;
  font-size: 16px;
  text-align: center;
  box-shadow: 2px 0 6px 0 rgba(0, 0, 0, 0.12);
`;

const Tooltip = styled.div<TooltipInterface>`
  font-size: 14px;
  color: ${(props) => (props.fontColor ? props.fontColor : "var(--black)")};
  margin: 0;
  padding: 5px 10px 5px 10px;
  border-radius: 2px;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : "var(--white)"};
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  position: absolute;
  z-index: 1000;
`;
export default () => {
  const [selectedView, setSelectedView] = useState("GraphView");
  const context = useContext(GlobalContext);
  return (
    <Div>
      {context.data.length === 0 ? (
        <NoteContainer>
          <Note error={context.errorFetchingData}>
            {context.errorFetchingData
              ? `${context.error}`
              : "Please send the API request to fetch the data."}
          </Note>
        </NoteContainer>
      ) : (
        <div>
          <TopBar>
            <Switch
              onClick={() => {
                setSelectedView("GraphView");
              }}
              selected={selectedView === "GraphView" ? true : false}
            >
              Graph View
            </Switch>
            <Switch
              onClick={() => {
                setSelectedView("DataView");
              }}
              selected={selectedView === "DataView" ? true : false}
            >
              Data View
            </Switch>
          </TopBar>
          {selectedView === "DataView" ? <DataView /> : <GraphView />}
        </div>
      )}
      {context.tooltipData ? (
        <Tooltip
          left={context.tooltipPosition.x}
          top={context.tooltipPosition.y}
        ></Tooltip>
      ) : null}
    </Div>
  );
};
