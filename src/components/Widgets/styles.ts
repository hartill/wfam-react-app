import styled from '@emotion/styled'

export const WidgetsContainer = styled.div`
  flex: 2;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: stretch;
  
  @media screen and (max-width: 600px) {
    flex: 1;
  }
`

export const TelemetryWidgets = styled.div`
  flex: 2;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
`

export const TelemetryWidgetRow = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
`

export const GraphWidget = styled.div`
  flex: 0;
  border-left: 1px solid rgba(0, 0, 0, 0.12);
`

export const TelemetryWidgetSpacing = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 1.5rem;
`