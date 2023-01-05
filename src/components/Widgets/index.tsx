import {
  GraphWidget,
  TelemetryWidgetSpacing,
  TelemetryWidgetRow,
  TelemetryWidgets,
  WidgetsContainer,
} from './styles'
import DialWidget from './DialWidget'
import { Wind, Zap, RotateCw } from 'react-feather'
import { ReactComponent as RotorIcon } from '../../icons/rotor.svg'
import { useTheme } from '@emotion/react'
import CompassWidget from './CompassWidget'
import TurbineBearingWidget from './TurbineBearingWidget'
import DegreesWidget from './DegreesWidget'

type ITelemetry = {
  nacelleDirectionDeg: number
  rotorSpeed: number
  bladePitchAngle: number
  powerOutput: number
  windSpeed: number
  windDirectionDeg: number
}

interface IWidgets {
  telemetry: ITelemetry
}

function Widgets({ telemetry }: IWidgets) {
  const theme = useTheme()

  return (
    <WidgetsContainer>
      <TelemetryWidgets>
        <TelemetryWidgetRow>
          <TelemetryWidgetSpacing>
            <DialWidget
              label="Wind Speed"
              value={telemetry.windSpeed}
              min={0}
              max={40}
              unit="m/s"
              icon={<Wind color={theme.colors.midBlueGrey} width={25} />}
            />
          </TelemetryWidgetSpacing>
          <TelemetryWidgetSpacing>
            <DialWidget
              label="Rotor Speed"
              value={telemetry.rotorSpeed}
              min={0}
              max={30}
              unit="rpm"
              icon={<RotorIcon fill={theme.colors.midBlueGrey} width={28} />}
            />
          </TelemetryWidgetSpacing>
          <TelemetryWidgetSpacing>
            <DialWidget
              label="Blade Angle"
              value={telemetry.bladePitchAngle}
              min={0}
              max={90}
              unit="°"
              icon={
                <RotateCw
                  color={theme.colors.midBlueGrey}
                  strokeWidth={3}
                  width={21}
                />
              }
            />
          </TelemetryWidgetSpacing>
          <TelemetryWidgetSpacing>
            <DialWidget
              label="Power Output"
              value={telemetry.powerOutput}
              min={0}
              max={2000}
              unit="W"
              icon={<Zap color={theme.colors.midBlueGrey} width={25} />}
            />
          </TelemetryWidgetSpacing>
        </TelemetryWidgetRow>
        <TelemetryWidgetRow>
          <TelemetryWidgetSpacing>
            <CompassWidget
              label="Wind Direction"
              degrees={telemetry.windDirectionDeg}
            />
          </TelemetryWidgetSpacing>
          <TelemetryWidgetSpacing>
            <CompassWidget
              label="Nacelle Direction"
              degrees={telemetry.nacelleDirectionDeg}
            />
          </TelemetryWidgetSpacing>
          <TelemetryWidgetSpacing>
            <TurbineBearingWidget
              nacelleDirectionDeg={telemetry.nacelleDirectionDeg}
              windDirectionDeg={telemetry.windDirectionDeg}
            />
          </TelemetryWidgetSpacing>
          <TelemetryWidgetSpacing>
            <DegreesWidget
              label="Yaw Error"
              degrees={
                telemetry.nacelleDirectionDeg - telemetry.windDirectionDeg
              }
            />
          </TelemetryWidgetSpacing>
        </TelemetryWidgetRow>
      </TelemetryWidgets>
      <GraphWidget />
    </WidgetsContainer>
  )
}

export default Widgets
