import styled from '@emotion/styled'

export const DialWidetContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`

export const SvgContainer = styled.div`
  margin-top: 1.2rem;
  position: relative;
  width: 140px;
  height: 70px;
`

export const SvgMask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export const WidgetValue = styled.div`
  margin-top: 6px;
  font-weight: 600;
  font-size: 1.3rem;
  text-align: center;

  span {
    font-size: 0.9rem;
    font-weight: 500;
  }

  .degrees {
    font-size: inherit;
  }
`

export const WidgetLabel = styled.div`
  margin-top: 5px;
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  color: ${(props) => props.theme.colors.midBlueGrey};
`

export const IconContainer = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2px;
  text-align: center;
`

export const LabelsContainer = styled.div`
  color: ${(props) => props.theme.colors.midBlueGrey};
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 11px;
  font-weight: 500;

  span {
    position: absolute;
  }

  span: nth-of-type(1) {
    left: -11px;
    bottom: -2px;
    text-align: right;
    padding-right: 5px;
  }

  span: nth-of-type(2) {
    top: 0;
    width: 100%;
    text-align: center;
    margin-top: -14px;
  }

  span: nth-of-type(3) {
    left: 100%;
    bottom: -2px;
    padding-left: 5px;
  }
`
