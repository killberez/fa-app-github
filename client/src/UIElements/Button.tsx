import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
  primary: boolean;
  onClick: any;
  marginLeft?: number;
  marginRight?: number;
}

interface Primary {
  primary: boolean;
  marginLeft?: number;
  marginRight?: number;
}

const Button = styled.div<Primary>`
  font-size: 12px;
  color: ${(props) => (props.primary ? "var(--white)" : "var(--black)")};
  font-weight: bold;
  margin: 0;
  margin-left: ${(props) =>
    props.marginLeft ? `${props.marginLeft}px` : "5px"};
  margin-right: ${(props) =>
    props.marginRight ? `${props.marginRight}px` : "5px"};
  padding: 5px 10px 5px 10px;
  border-radius: 2px;
  cursor: pointer;
  background-color: ${(props) =>
    props.primary ? "var(--primary-color)" : "var(--light-gray)"};
  :hover {
    background-color: ${(props) =>
      props.primary ? "var(--primary-color-hover)" : "var(--light-gray-hover)"};
  }
`;

export default (props: Props) => {
  return (
    <Button
      primary={props.primary}
      marginLeft={props.marginLeft}
      marginRight={props.marginRight}
      onClick={() => {
        props.onClick();
      }}
    >
      {props.text}
    </Button>
  );
};
