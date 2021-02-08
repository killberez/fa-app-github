import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
}

const Tag = styled.span`
  margin-left: 5px;
  background-color: var(--tag-bg);
  padding: 1px 5px;
  font-size: 12px;
  border-radius: 2px;
  color: var(--tag-color);
  font-weight: 400;
`;

export default (props: Props) => {
  return <Tag>{props.text}</Tag>;
};
