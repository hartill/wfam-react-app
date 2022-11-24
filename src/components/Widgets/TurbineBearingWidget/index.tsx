import { TurbineIconRotator, WindIconRotator, WindIconHolder } from './styles'
import { useTheme } from '@emotion/react'
import {
  CompassInner,
  CompassTick,
  CompassTicks,
  CompassWidet,
} from '../CompassWidget/styles'
import { ReactComponent as TurbineIcon } from '../../../icons/wt-birdseye.svg'
import { ReactComponent as WindIcon } from '../../../icons/wind-arrows.svg'

interface ITurbineBearingWidget {
  nacelleDirectionDeg: number
  windDirectionDeg: number
}

function TurbineBearingWidget({
  nacelleDirectionDeg,
  windDirectionDeg,
}: ITurbineBearingWidget) {
  const theme = useTheme()
  const title = 'Turbine Bearing Relative Wind'
  windDirectionDeg = 360 - (180 - windDirectionDeg)

  return (
    <CompassWidet title={title}>
      <CompassTick />
      <CompassTick />
      <CompassInner>
        <TurbineIconRotator
          style={{ transform: `rotate(${nacelleDirectionDeg}deg)` }}
        >
          <TurbineIcon width={60} fill={theme.colors.midBlueGrey} />
        </TurbineIconRotator>
        <WindIconRotator
          style={{ transform: `rotate(${windDirectionDeg}deg)` }}
        >
          <WindIconHolder>
            <WindIcon width={24} color={theme.colors.blue} />
          </WindIconHolder>
        </WindIconRotator>
      </CompassInner>
      <CompassTicks>
        <span>N</span>
        <span>E</span>
        <span>S</span>
        <span>W</span>
      </CompassTicks>
    </CompassWidet>
  )
}

export default TurbineBearingWidget
