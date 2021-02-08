import React, { useContext } from "react";
import styled from "styled-components";
import GlobalContext from "../../../context/GlobalContext";
import RadioSelectionList from "../../../UIElements/RadioSelectionList";
import CheckBoxSelectionList from "../../../UIElements/CheckBoxSelectionList";
import Tags from "../../../UIElements/Tags";
import Notes from "../../../UIElements/Notes";

interface keyDetail {
  keyName: string;
  type: string;
  isArray: boolean;
  parentKey?: string;
}

interface Width {
  width?: string;
}

const Input = styled.input<Width>`
  width: ${(props) => (props.width ? props.width : "100%")};
`;

const RangeInput = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  align-items: center;
`;

export default () => {
  const context = useContext(GlobalContext);
  let columnOptions = context.keyList.map((d: keyDetail, i: number) => {
    let disabled =
      d.type === "object" ||
      d.type === "dateTime" ||
      d.type === "[boolean]" ||
      d.type === "[dateTime]"
        ? true
        : false;
    if (d.parentKey !== undefined && disabled === false) {
      disabled = d.parentKey.split("[]").length - 1 > 1 ? true : false;
    }
    if (context.useKeys) {
      disabled = d.type === "number" ? false : true;
    }
    return {
      keyName: d.keyName,
      type: d.type,
      isArray: d.isArray,
      parentKey: d.parentKey,
      disabled: disabled,
    };
  });
  let labelOptions = context.keyList.map((d: keyDetail, i: number) => {
    const disabled =
      d.type === "object" ||
      context.parentKey !== d.parentKey ||
      d.type[0] === "["
        ? true
        : false;
    return {
      keyName: d.keyName,
      type: d.type,
      isArray: d.isArray,
      parentKey: d.parentKey,
      disabled: disabled,
    };
  });
  return (
    <div>
      <>
        <h1>Bar height</h1>
        <h2>Column</h2>
        {context.primaryAxisKeyType === "string" ? (
          <Notes
            type={"note"}
            text={"Count of different value will be used as height of the bar"}
          />
        ) : null}
        {context.primaryAxisKeyType !== "" ? (
          context.primaryAxisKeyType[0] === "[" ? (
            <Notes
              type={"note"}
              text={"Length of the array will be used as height of the bar"}
            />
          ) : null
        ) : null}
        {context.useKeys ? (
          <Notes
            type={"note"}
            text={
              "The response has no object arrays; therefore select the keys you would like to use in the graph"
            }
          />
        ) : null}
        {!context.useKeys ? (
          <RadioSelectionList
            list={columnOptions}
            selectedValue={context.primaryAxisKey}
            onSelect={(key: string, keyType?: string, parentKey?: string) => {
              context.updatePrimaryAxisKey(key);
              if (parentKey !== context.parentKey) {
                context.updateParentKey(parentKey);
                context.updateSecondaryAxisKey(undefined);
                context.updateSecondaryAxisKeyType(undefined);
              }
              context.updatePrimaryAxisKeyType(keyType);
            }}
          />
        ) : (
          <>
            <CheckBoxSelectionList
              list={columnOptions}
              selectedValue={context.keysToUse}
              onSelect={(key: string, index: number) => {
                let keysToUse = context.keysToUse as string[];
                if (index === -1) {
                  keysToUse.push(key);
                } else {
                  keysToUse.splice(index, 1);
                }
                context.updateKeysToUse(keysToUse);
              }}
            />
            <h2>Labels</h2>
            <Input
              type="text"
              value={
                context.primaryAxisMin !== -Infinity
                  ? context.primaryAxisMin
                  : ""
              }
              onChange={(event) => {
                context.updatePrimaryAxisMin(event?.target.value);
              }}
            />
          </>
        )}
        <h2>
          Range
          <Tags text={"not required"} />
        </h2>
        <RangeInput>
          <Input
            width={"40%"}
            type="number"
            placeholder="min"
            value={
              context.primaryAxisMin !== -Infinity ? context.primaryAxisMin : ""
            }
            onChange={(event) => {
              if (event?.target.value === "")
                context.updatePrimaryAxisMin(-Infinity);
              else context.updatePrimaryAxisMin(event?.target.value);
            }}
          />
          <>-</>
          <Input
            width={"40%"}
            type="number"
            placeholder="max"
            value={
              context.primaryAxisMax !== Infinity ? context.primaryAxisMax : ""
            }
            onChange={(event) => {
              if (event?.target.value === "")
                context.updatePrimaryAxisMax(Infinity);
              else context.updatePrimaryAxisMax(event?.target.value);
            }}
          />
        </RangeInput>
      </>
      {context.useKeys ? (
        <Notes type={"note"} text={"Key name will be used as labels"} />
      ) : (
        <>
          <hr />
          <h1>Labels</h1>
          <h2>Column</h2>
          {context.primaryAxisKey === "" ||
          context.primaryAxisKeyType === "string" ? (
            context.primaryAxisKeyType === "string" ? (
              <Notes
                type={"note"}
                text={"Different value will be used as labels"}
              />
            ) : (
              <Notes
                type={"warning"}
                text={"Choose the Bar Height column first"}
              />
            )
          ) : context.primaryAxisKey.includes("[]") === false ? (
            <Notes type={"warning"} text={"Key name will be used as labels"} />
          ) : (
            <RadioSelectionList
              list={labelOptions}
              selectedValue={context.secondaryAxisKey}
              onSelect={(key: string) => {
                context.updateSecondaryAxisKey(key);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};
