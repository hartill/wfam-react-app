import {
  CompassWidet,
  CompassInner,
  CompassTick,
  CompassLabel,
  CompassValue,
  CompassNeedleHolder,
  CompassNeedle,
  CompassTicks,
} from './styles'

interface ICompassWidget {
  label: string
  degrees: number
}

function CompassWidget({ label, degrees }: ICompassWidget) {
  degrees = Math.round(degrees * 100) / 100
  return (
    <CompassWidet title={label}>
      <CompassTick />
      <CompassTick />
      <CompassInner>
        <CompassLabel>{label}</CompassLabel>
        <CompassValue>{degrees}°</CompassValue>
      </CompassInner>
      <CompassNeedleHolder style={{ transform: `rotate(${degrees}deg)` }}>
        <CompassNeedle />
      </CompassNeedleHolder>
      <CompassTicks>
        <span>N</span>
        <span>E</span>
        <span>S</span>
        <span>W</span>
      </CompassTicks>
    </CompassWidet>
  )
}

export default CompassWidget
