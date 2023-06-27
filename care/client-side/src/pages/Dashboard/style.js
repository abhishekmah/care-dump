import styled from "styled-components";

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 65px;
  background: #ffffff;
  position: relative;
  min-width: 65px;

  .tabs_container {
    position: absolute;
    top: 12%;
  }
`;

export const TabsContainer = styled.div`
  cursor: pointer;

  #active {
    background: #f2f2f2;
    border-left: 6px solid #6162be;
  }

  img {
    padding: 12px 16px;
    height: 25px;
    width: 25px;
  }
`;
