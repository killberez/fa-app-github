import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  selected: boolean;
  onClick: any;
}

interface Selected {
  selected: boolean;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToggleSwitchDiv = styled.div<Selected>`
  width: 30px;
  height: 15px;
  border-radius: 10px;
  padding: 2px;
  display: flex;
  justify-content: ${(props) => (!props.selected ? "flex-start" : "flex-end")};
  background-color: ${(props) =>
    !props.selected ? "var(--gray)" : "var(--primary-color)"};
`;

const ToggleSwitch = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 10px;
  background-color: var(--white);
`;

export default (props: Props) => {
  return (
    <Container>
      <h2>{props.title}</h2>
      <ToggleSwitchDiv
        selected={props.selected}
        onClick={() => {
          props.onClick();
        }}
      >
        <ToggleSwitch />
      </ToggleSwitchDiv>
    </Container>
  );
};
