import styled from '@emotion/styled'

export const CompassWidet = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 18px solid #C8C3D6;
`

export const CompassInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  box-sizing: border-box;
  border: 2px solid rgba(0,0,0,0.2);
  background: ${(props) => props.theme.colors.panelBackground};
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`

export const CompassLabel = styled.div`
  margin-bottom: 0.2rem;
  font-size: 11px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.midBlueGrey};
`

export const CompassValue = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
`

export const CompassNeedleHolder = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  bottom: 0;
  width: 2px;
  margin-left: -1px;
`

export const CompassNeedle = styled.div`
  position: absolute;
  top: 3%;
  left: 50%;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 10px solid ${(props) => props.theme.colors.blue};
  margin-left: -4px;
`

export const CompassTicks = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: -28px;
  margin-left: -28px;
  margin-right: -28px;
  margin-bottom: -28px;
  font-size: 11px;
  color: ${(props) => props.theme.colors.midBlueGrey};

  span:nth-of-type(1) {
    position: absolute;
    top: -4px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  span:nth-of-type(2) {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: -1px;
    height: 100%;
    display: flex;
    align-items: center;
  }
  span:nth-of-type(3) {
    position: absolute;
    bottom: -4px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  span:nth-of-type(4) {
    position: absolute;
    top: 0;
    left: -5px;
    height: 100%;
    display: flex;
    align-items: center;
  }
`
