import styled from '@emotion/styled'

export const DegreesWidet = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 15px solid #c8c3d6;
  margin-bottom: 1rem;
`

export const DegreeMark = styled.div`
  position: absolute;
  left: 50%;
  width: 2px;
  margin-left: -1px;

  &.major-interval {
    top: -10%;
    height: 120%;
    background: rgba(0, 0, 0, 0.12);
  }

  &.minor-interval {
    top: -5%;
    height: 110%;
    background: rgba(0, 0, 0, 0.08);
  }
`

export const DegreesInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.2);
  background: ${(props) => props.theme.colors.panelBackground};
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`

export const Label = styled.div`
  margin-bottom: 0.2rem;
  font-size: 9px;
  font-weight: 500;
`

export const Value = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
`

export const ValueIndicatorHolder = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  bottom: 0;
  width: 2px;
  margin-left: -1px;
`

export const ValueIndicator = styled.div`
  position: absolute;
  top: 3%;
  left: 50%;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 10px solid ${(props) => props.theme.colors.blue};
  margin-left: -4px;
`

export const DegreeTicks = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: -28px;
  margin-left: -28px;
  margin-right: -28px;
  margin-bottom: -28px;
  font-size: 10px;
  color: ${(props) => props.theme.colors.midBlueGrey};

  span:nth-of-type(1) {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  span:nth-of-type(2) {
    position: absolute;
    top: 0;
    right: -3px;
    height: 100%;
    display: flex;
    align-items: center;
  }
  span:nth-of-type(3) {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  span:nth-of-type(4) {
    position: absolute;
    top: 0;
    left: -8px;
    height: 100%;
    display: flex;
    align-items: center;
  }
`
