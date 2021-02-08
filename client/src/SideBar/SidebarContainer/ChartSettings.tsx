import React, { useContext } from "react";
import styled from "styled-components";
import BarGraph from "../ChartSpecificSettings/BarGraph/ChartSettings";
import GlobalContext from "../../context/GlobalContext";
import TextArea from "../../UIElements/TextArea";

const SideBarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Div = styled.div`
  background-color: var(--white);
  width: 100%;
  padding: 10px;
  overflow: auto;
  height: calc(100vh - 126px);
`;

const Input = styled.input`
  width: calc(100% - 10px);
`;

export default () => {
  const context = useContext(GlobalContext);
  return (
    <SideBarContainer>
      <Div>
        <h1>Title Settings</h1>
        <h2>Title</h2>
        <Input
          type="text"
          placeholder="Insert title here"
          value={context.title ? context.title : ""}
          onChange={(event) => {
            context.updateTitle(event?.target.value);
          }}
        />
        <TextArea
          title={"Description"}
          placeHolder={"Insert description here"}
          value={context.description}
          onChange={(d: any) => {
            context.updateDescription(d);
          }}
        />
        <TextArea
          title={"Note"}
          placeHolder={"Insert note here"}
          value={context.note}
          onChange={(d: any) => {
            context.updateNote(d);
          }}
        />
        <TextArea
          title={"Footer"}
          placeHolder={"Insert footer here"}
          value={context.footer}
          onChange={(d: any) => {
            context.updateFooter(d);
          }}
        />
        <hr />
        <BarGraph />
      </Div>
    </SideBarContainer>
  );
};
