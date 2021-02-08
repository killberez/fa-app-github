import React, { useContext } from "react";
import styled from "styled-components";
import domtoimage from "dom-to-image";
import GlobalContext from "../context/GlobalContext";
import BarGraph from "./Graphs/BarGraph";
import Button from "../UIElements/Button";

interface Dimensions {
  width: number;
}

const Div = styled.div`
  width: calc(100vw - 300px);
  height: calc(100vh - 151px);
`;

const TopBar = styled.div`
  background-color: #fff;
  border-bottom: 1px solid var(--light-gray);
  display: flex;
  height: 30px;
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
`;

const ContainerDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 40px;
  margin-left: 10px;
`;

const SizeRange = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-items: center;
`;

const Label = styled.div`
  font-size: 12px;
  color: var(--gray);
  margin: 0 10px 0 5px;
`;

const GraphContainer = styled.div`
  display: flex;
  width: calc(100vw - 340px);
  height: calc(100vh - 251px);
  overflow: auto;
  padding: 20px;
`;

const GraphDiv = styled.div<Dimensions>`
  width: ${(props) => props.width}px;
  height: fit-content;
  padding: 20px;
  background-color: var(--white);
  box-shadow: 2px 0 6px 0 rgba(0, 0, 0, 0.12);
`;

const GraphTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const Description = styled.div`
  font-size: 14px;
`;
const Note = styled.div`
  font-size: 14px;
`;
const Footer = styled.div`
  font-size: 14px;
  color: var(--gray);
`;

export default () => {
  const context = useContext(GlobalContext);
  return (
    <Div>
      <TopBar>
        <ContainerDiv>
          <h2>Chart Size</h2>
          <SizeRange>
            <Input
              type="number"
              value={context.graphWidth}
              onChange={(event) => {
                context.updateGraphWidth(event.target.value);
              }}
            />
            <Label>px</Label>
            <>X</>
            <Input
              type="number"
              value={context.graphHeight}
              onChange={(event) => {
                context.updateGraphHeight(event.target.value);
              }}
            />
            <Label>px</Label>
          </SizeRange>
        </ContainerDiv>
        <ContainerDiv>
          <h2>Save As</h2>
          <Button
            text={"SVG"}
            primary={true}
            onClick={() => {
              domtoimage
                .toSvg(document.getElementById("graph-node") as HTMLElement)
                .then((dataUrl: any) => {
                  var link = document.createElement("a");
                  link.download = "graph.svg";
                  link.href = dataUrl;
                  link.click();
                });
            }}
            marginLeft={10}
          />
          <Button
            text={"PNG"}
            primary={true}
            onClick={() => {
              domtoimage
                .toPng(document.getElementById("graph-node") as HTMLElement)
                .then((dataUrl: any) => {
                  var link = document.createElement("a");
                  link.download = "graph.png";
                  link.href = dataUrl;
                  link.click();
                });
            }}
          />
          <Button
            text={"Get Embed Code"}
            primary={false}
            onClick={() => {}}
            marginLeft={30}
          />
        </ContainerDiv>
      </TopBar>
      <GraphContainer>
        <GraphDiv width={context.graphWidth} id="graph-node">
          <GraphTitle>{context.title}</GraphTitle>
          <Description>{context.description}</Description>
          <svg width={context.graphWidth} height={context.graphHeight}>
            {context.backgroundColor === "#ffffff" ? null : (
              <rect
                x={0}
                y={0}
                width={context.graphWidth}
                height={context.graphHeight}
                fill={context.backgroundColor}
              />
            )}
            <BarGraph />
          </svg>
          <Note>{context.note}</Note>
          <Footer>{context.footer}</Footer>
        </GraphDiv>
      </GraphContainer>
    </Div>
  );
};
