import styled from "styled-components";

export const SpaceBetweenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: ${(props) => {
    switch (props.direction) {
      case 1:
        return "column";

      default:
        return "row";
    }
  }};
`;
export const SpaceAroundContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: ${(props) => {
    switch (props.direction) {
      case 1:
        return "column";

      default:
        return "row";
    }
  }};
`;

export const SpaceEvenlyContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: ${(props) => {
    switch (props.direction) {
      case 1:
        return "column";

      default:
        return "row";
    }
  }};
`;

export const FlexColContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: normal;
  color: #263f97;
  font-size: 14px;
`;
export const FlexColCenterTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: normal;
  color: #263f97;
  font-size: 14px;
  text-align: center;
`;
export const FlexBox = styled.div`
  display: flex;
`;
export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexEndContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
