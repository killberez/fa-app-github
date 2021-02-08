import React, { useContext } from "react";
import styled from "styled-components";
import GlobalContext from "../context/GlobalContext";
import {
  DataTableIcon,
  GraphStyleIcon,
  GraphTypeIcon,
  SettingsIcon,
} from "../icons";

interface IconProps {
  selected: boolean;
}

const Div = styled.div`
  background-color: var(--very-light-gray);
  width: 60px;
`;

const Icon = styled.div<IconProps>`
  height: 60px;
  width: 60px;
  border-bottom: 1px solid var(--light-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.selected ? "var(--white)" : "none")};
`;

export default () => {
  const context = useContext(GlobalContext);
  return (
    <Div>
      <Icon
        selected={context.selectedSidetab === "graphType" ? true : false}
        onClick={() => {
          context.updateSelectedSidetab("graphType");
        }}
      >
        <GraphTypeIcon width={32} height={32} />
      </Icon>
      <Icon
        selected={context.selectedSidetab === "graphSettings" ? true : false}
        onClick={() => {
          context.updateSelectedSidetab("graphSettings");
        }}
      >
        <SettingsIcon width={32} height={32} />
      </Icon>
      <Icon
        selected={context.selectedSidetab === "graphStyle" ? true : false}
        onClick={() => {
          context.updateSelectedSidetab("graphStyle");
        }}
      >
        <GraphStyleIcon width={32} height={32} />
      </Icon>
      <Icon
        selected={context.selectedSidetab === "dataTable" ? true : false}
        onClick={() => {
          context.updateSelectedSidetab("dataTable");
        }}
      >
        <DataTableIcon width={32} height={32} />
      </Icon>
    </Div>
  );
};
