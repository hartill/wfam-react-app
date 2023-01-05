import {
  IconContainer,
  LabelsContainer,
  SvgContainer,
  SvgMask,
  DialWidetContainer,
  WidgetValue,
  WidgetLabel,
} from './styles'
import DonutArc from './DonutArc'
import { scale } from '../../../helpers'
import { ReactNode } from 'react'
import { useTheme } from '@emotion/react'

interface IDialWidget {
  label: string
  value: number
  min: number
  max: number
  unit: string
  icon: ReactNode
}

function DialWidget({ label, value, min, max, unit, icon }: IDialWidget) {
  value = Math.round(value * 10) / 10
  const theme = useTheme()
  let percent = ((value - min) * 100) / (max - min)
  percent = Math.round(50 - scale(percent, 0, 100, 0, 50))
  const arcThickness = 16

  return (
    <DialWidetContainer title={label}>
      <SvgContainer>
        <SvgMask>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="myGradient">
                <stop offset="0%" stopColor="rgba(1, 89, 255, 0.6)" />
                <stop offset="100%" stopColor="rgba(147, 0, 213, 0.6)" />
              </linearGradient>
            </defs>

            <circle cx="50" cy="50" r="50" fill="url('#myGradient')" />
            <circle
              cx="50"
              cy="50"
              r={50 - arcThickness}
              fill={theme.colors.panelBackground}
            />
            <DonutArc
              viewBox={100}
              radius={50}
              thickness={arcThickness}
              percent={percent}
              fill={theme.colors.panelBackgroundDarker}
            />
          </svg>
        </SvgMask>
        <IconContainer>{icon}</IconContainer>
        <LabelsContainer>
          <span>{min}</span>
          <span>{max / 2}</span>
          <span>{max}</span>
        </LabelsContainer>
      </SvgContainer>
      <WidgetLabel>{label}</WidgetLabel>
      <WidgetValue>
        {value.toString()}
        <span className={unit === '°' ? 'degrees' : ''}>
          {unit !== '°' ? ' ' : ''}
          {unit}
        </span>
      </WidgetValue>
    </DialWidetContainer>
  )
}

export default DialWidget
