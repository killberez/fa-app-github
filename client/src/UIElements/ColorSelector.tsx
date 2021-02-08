import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  color: string;
  onChange: any;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
`;

export default (props: Props) => {
  return (
    <Container>
      <h2>{props.title}</h2>
      <input
        type="color"
        value={props.color}
        onChange={(event) => {
          props.onChange(event.target.value);
        }}
      />
    </Container>
  );
};
