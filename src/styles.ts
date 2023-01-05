import styled from '@emotion/styled'

export const AppElement = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  overflow: hidden;
  background: ${(props) => props.theme.colors.panelBackground};;
`
