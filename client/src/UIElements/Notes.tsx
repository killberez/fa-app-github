import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
  type: "note" | "warning" | "error";
}

interface NoteType {
  type: "note" | "warning" | "error";
}

const Note = styled.div<NoteType>`
  font-size: 14px;
  margin: 10px 0 5px 0;
  padding: 10px;
  background-color: ${(props) =>
    props.type === "note"
      ? "var(--note-bg)"
      : props.type === "warning"
      ? "var(--warning-bg)"
      : "var(--error-bg)"};
  color: var(--black);
  border-left: 4px solid
    ${(props) =>
      props.type === "note"
        ? "var(--note)"
        : props.type === "warning"
        ? "var(--warning)"
        : "var(--error)"};
`;

export default (props: Props) => {
  return <Note type={props.type}>{props.text}</Note>;
};
