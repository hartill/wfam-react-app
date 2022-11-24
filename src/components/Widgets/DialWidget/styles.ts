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
  margin-top: 2rem;
  position: relative;
  //width: 100%;
  //height: 0px;
  //padding-bottom: 50%;
  width: 120px;
  height: 60px;
`

export const SvgMask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export const WidgetLabel = styled.div`
  margin-top: 0.6rem;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  color: ${(props) => props.theme.colors.midBlueGrey};
`

export const WidgetValue = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  font-weight: 600;
  font-size: 1.3rem;
  text-align: center;

  span {
    font-size: 1rem;
    font-weight: 500;
  }
`

export const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

export const LabelsContainer = styled.div`
  color: ${(props) => props.theme.colors.midBlueGrey};
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 10px;

  span {
    position: absolute;
  }

  span: nth-of-type(1) {
    left: -11px;
    bottom: -2px;
    text-align: right;
    padding-right: 4px;
  }

  span: nth-of-type(2) {
    top: 0;
    width: 100%;
    text-align: center;
    margin-top: -13px;
  }

  span: nth-of-type(3) {
    left: 100%;
    bottom: -2px;
    padding-left: 4px;
  }
`
