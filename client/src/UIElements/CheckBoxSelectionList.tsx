import React, { useState } from "react";
import styled from "styled-components";
import { Tick } from "../icons";

interface ListDiv {
  margin?: number;
  disabled: boolean;
}

interface keyDetail {
  keyName: string;
  type: string;
  isArray: boolean;
  parentKey?: string;
}

interface keyList extends keyDetail {
  disabled: boolean;
}

interface Props {
  list: keyList[];
  selectedValue?: string[];
  onSelect: any;
}

const List = styled.div<ListDiv>`
  display: flex;
  align-items: center;
  margin: 10px 0;
  margin-left: ${(props) =>
    props.margin ? `${(props.margin - 1) * 20}px` : "0px"};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  cursor: ${(props) => (!props.disabled ? "pointer" : "no-drop")};
`;

const Key = styled.div`
  font-size: 12px;
`;

const ArrayLabel = styled.div`
  margin-left: 5px;
  background-color: var(--tag-bg);
  padding: 1px 5px;
  font-size: 10px;
  border-radius: 2px;
  color: var(--tag-color);
  font-family: "IBM Plex Mono", monospace;
`;

const Button = styled.div`
  background-color: var(--white);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  padding: 5px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
`;

const SelectionDiv = styled.div`
  width: 12px;
  height: 12px;
  background-color: var(--white);
  border-radius: 2px;
  border: 1px solid var(--black);
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  let list = props.list.map((d: keyList, indx: number) => {
    if (!isOpen && indx > 9) return null;
    const spaces = d.keyName.split(".").length - 1;
    const keyName = d.keyName.split(".")[spaces];
    return (
      <List
        key={indx}
        margin={spaces}
        disabled={d.disabled}
        onClick={() => {
          if (!d.disabled) {
            props.onSelect(d.keyName, props.selectedValue?.indexOf(d.keyName));
          }
        }}
      >
        <SelectionDiv>
          {props.selectedValue?.indexOf(d.keyName) !== -1 ? (
            <Tick width={10} height={10} />
          ) : null}
        </SelectionDiv>
        <Key>
          {keyName.substr(-2) === "[]"
            ? keyName.substring(0, keyName.length - 2)
            : keyName}
        </Key>
        <ArrayLabel>{d.type}</ArrayLabel>
      </List>
    );
  });
  return (
    <>
      {list}
      <Button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? "Show Less" : "Show More"}
      </Button>
    </>
  );
};
