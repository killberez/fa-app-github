import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  placeHolder: string;
  value?: string;
  onChange: any;
  options: any;
}

const Select = styled.select`
  background-color: var(--white);
  border: 1px solid var(--light-gray);
  border-radius: 5px;
  padding: 5px;
  width: calc(100%);
  line-height: 1.75;
  margin-bottom: 20px;
  font-size: 14px;
`;

export default (props: Props) => {
  const options = props.options.map((d: any, i: number) => (
    <option value={d.value} key={i}>
      {d.text}
    </option>
  ));
  return (
    <>
      <h2>{props.title}</h2>
      <Select
        placeholder={props.placeHolder}
        value={props.value ? props.value : ""}
        onChange={(event: any) => {
          props.onChange(event?.target.value);
        }}
      >
        {options}
      </Select>
    </>
  );
};
