import React, { useContext, useState } from "react";
import styled from "styled-components";
import GlobalContext from "./context/GlobalContext";
import axios from "axios";

interface ButtonStyle {
  opacity: number;
}

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);
  z-index: 100;
  position: relative;
`;

const InputBox = styled.input`
  padding: 10px 20px;
  background-color: #ffffff;
  margin: 0;
  border: 0;
  flex: 1 0;
  height: 30px;
`;

const SubmitButton = styled.div<ButtonStyle>`
  padding: 0 20px;
  background-color: #5c38ff;
  align-items: center;
  height: 50px;
  display: flex;
  color: #ffffff;
  margin: 0;
  width: 100vw;
  font-weight: bold;
  flex: 0 1 105px;
  opacity: ${(props) => props.opacity};
  cursor: pointer;
`;

export default (props: any) => {
  const [textField, setTextField] = useState("");
  const context = useContext(GlobalContext);
  return (
    <Div>
      <InputBox
        type="text"
        placeholder={"Enter API request here"}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTextField(event.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && textField !== "") {
            context.updateRequestURL(textField);
            axios
              .get(textField)
              .then((res) => {
                context.updateErrorFetchingData(false);
                context.updateError("");
                context.updateData(res.data);
              })
              .catch((err) => {
                context.updateErrorFetchingData(true);
                context.updateError(err);
                context.updateData([]);
              });
          }
        }}
      />
      <SubmitButton
        opacity={textField === "" ? 0.5 : 1}
        onClick={() => {
          context.updateRequestURL(textField);
          axios
            .get(textField)
            .then((res) => {
              context.updateErrorFetchingData(false);
              context.updateError("");
              context.updateData(res.data);
            })
            .catch((err) => {
              context.updateErrorFetchingData(true);
              context.updateError(err);
              context.updateData([]);
            });
        }}
      >
        Send Request
      </SubmitButton>
    </Div>
  );
};
