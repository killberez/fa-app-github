import React from "react";
import styled from "styled-components";

interface Props {
  fontColor?: string;
  bgColor?: string;
  top: number;
  left: number;
}

interface TooltipInterface {
  fontColor?: string;
  bgColor?: string;
  top: number;
  left: number;
}

const Tooltip = styled.div<TooltipInterface>`
  font-size: 14px;
  color: ${(props) => (props.fontColor ? props.fontColor : "var(--black)")};
  font-weight: bold;
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

export default (props: Props) => {
  return (
    <Tooltip
      fontColor={props.fontColor}
      bgColor={props.bgColor}
      top={props.top}
      left={props.left}
    >
      hello
    </Tooltip>
  );
};
