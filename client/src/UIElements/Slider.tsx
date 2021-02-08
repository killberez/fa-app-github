import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  value: number;
  onChange: any;
  min: number;
  max: number;
  step?: number;
}

const Range = styled.input`
  width: calc(100% - 15px);
  margin: 0;
`;

const H2 = styled.h2`
  margin: 10px 0 0 0;
`;

export default (props: Props) => {
  return (
    <>
      <H2>{props.title}</H2>
      <Range
        type="range"
        min={`${props.min}`}
        max={`${props.max}`}
        value={`${props.value}`}
        step={`${props.step}`}
        onChange={(event: any) => {
          props.onChange(event?.target.value);
        }}
      />
    </>
  );
};
