import {
  DegreesWidet,
  DegreesInner,
  Label,
  Value,
  ValueIndicatorHolder,
  ValueIndicator,
  DegreeTicks,
  DegreeMark,
} from './styles'

interface IDegreesWidget {
  label: string
  degrees: number
}

export function renderDegreeMarkings() {
  const degreeMarkingsMarkup = []
  for (let degrees = 0; degrees < 180; degrees += 15) {
    const className = degrees % 45 === 0 ? 'major-interval' : 'minor-interval'
    degreeMarkingsMarkup.push(
      <DegreeMark
        key={degrees}
        style={{ transform: `rotate(${degrees}deg)` }}
        className={className}
      />
    )
  }
  return degreeMarkingsMarkup
}

function DegreesWidget({ label, degrees }: IDegreesWidget) {
  degrees = Math.round(degrees * 100) / 100

  return (
    <DegreesWidet title={label}>
      {renderDegreeMarkings()}
      <DegreesInner>
        <Label>{label}</Label>
        <Value>{degrees}°</Value>
      </DegreesInner>
      <ValueIndicatorHolder style={{ transform: `rotate(${degrees}deg)` }}>
        <ValueIndicator />
      </ValueIndicatorHolder>
      <DegreeTicks>
        <span>0</span>
        <span>90</span>
        <span>180</span>
        <span>270</span>
      </DegreeTicks>
    </DegreesWidet>
  )
}

export default DegreesWidget
