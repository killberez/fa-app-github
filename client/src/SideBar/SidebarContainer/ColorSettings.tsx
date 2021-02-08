import React, { useContext } from "react";
import styled from "styled-components";
import GlobalContext from "../../context/GlobalContext";
import BarGraph from "../ChartSpecificSettings/BarGraph/ColorSettings";
import ColorSelector from "../../UIElements/ColorSelector";

const SideBarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Div = styled.div`
  background-color: var(--white);
  width: 100%;
  overflow: auto;
  padding: 10px;
  height: calc(100vh - 126px);
`;

export default () => {
  const context = useContext(GlobalContext);
  return (
    <SideBarContainer>
      <Div>
        <div>
          <>
            <h1>Color Settings</h1>
            <ColorSelector
              title={"Background Color"}
              color={context.backgroundColor}
              onChange={(d: string) => context.updateBackgroundColor(d)}
            />
            <ColorSelector
              title={"Base Color"}
              color={context.baseColor}
              onChange={(d: string) => context.updateBaseColor(d)}
            />
          </>
          <BarGraph />
        </div>
      </Div>
    </SideBarContainer>
  );
};
