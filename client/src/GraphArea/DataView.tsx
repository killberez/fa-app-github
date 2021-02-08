import React, { useContext } from "react";
import styled from "styled-components";
import GlobalContext from "../context/GlobalContext";
import ReactJson from "react-json-view";

const Div = styled.div`
  display: flex;
  width: calc(100vw - 300px);
  height: calc(100vh - 151px);
  overflow: auto;
`;

const Container = styled.div`
  padding: 20px;
`;

export default () => {
  const context = useContext(GlobalContext);
  return (
    <Div>
      <Container>
        <ReactJson src={context.data} />
      </Container>
    </Div>
  );
};
