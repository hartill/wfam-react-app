import styled from '@emotion/styled'

export const ViewportContainer = styled.div`
  flex: 1 1 70%;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
`

export const ViewportElement = styled.div`
  flex: 1;
  overflow: hidden;
  cursor: crosshair;
`

export const ControlBar = styled.div`
  flex-basis: 33px;
  display: flex;
  align-items: stretch;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  background: ${(props) => props.theme.colors.panelBackground};
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: center;
`

export const ControlButton = styled.div`
  position: relative;
  flex-basis: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 3px;

  &:hover {
    background: rgba(0,0,0,0.06);
  }
`

export const ControlButtonText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-weight: bold;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 4px;
`
