import styled from '@emotion/styled'

export const ViewportAndSidePanel = styled.div`
  flex: 2;
  display: flex;
  overflow: hidden;

  @media screen and (max-width: ${(props) => props.theme.screenSize.small}) {
    flex: 1;
    flex-flow: column nowrap;
  }
`

export const SidePanel = styled.div`
  flex: 1 1 320px;
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  overflow: hidden;

  @media screen and (max-width: ${(props) => props.theme.screenSize.small}) {
    display: none;
  }
`