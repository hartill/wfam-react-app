import {
  DescriptionColumn,
  DescriptionRow,
  DescriptionGroup,
  Descriptions,
  StatusIndicator,
} from './styles'
import { TabHeader } from '../Layout/styles'
import { useTheme } from '@emotion/react'

interface IDetailList {
  turbineModel: string
  ratedPower: number
  status: string
  sessionDuration: string
}

function DetailList({
  turbineModel,
  ratedPower,
  status,
  sessionDuration,
}: IDetailList) {
  const theme = useTheme()
  const statusColor =
    status === 'Active'
      ? theme.colors.green
      : status === 'Warning'
      ? theme.colors.orange
      : theme.colors.red
  return (
    <DescriptionGroup>
      <TabHeader>
        <h2>System Details</h2>
      </TabHeader>
      <Descriptions>
        <DescriptionRow key={'turbineModel'}>
          <DescriptionColumn>{'Model'}</DescriptionColumn>
          <DescriptionColumn>{turbineModel}</DescriptionColumn>
        </DescriptionRow>
        <DescriptionRow key={'ratedPower'}>
          <DescriptionColumn>{'Rated Power'}</DescriptionColumn>
          <DescriptionColumn>{ratedPower}</DescriptionColumn>
        </DescriptionRow>
        <DescriptionRow key={'status'}>
          <DescriptionColumn>{'Status'}</DescriptionColumn>
          <DescriptionColumn style={{ color: statusColor }}>
            <StatusIndicator style={{ backgroundColor: statusColor }}/>
            {status}
          </DescriptionColumn>
        </DescriptionRow>
        <DescriptionRow key={'sessionDuration'}>
          <DescriptionColumn>{'Session Duration'}</DescriptionColumn>
          <DescriptionColumn>{sessionDuration}</DescriptionColumn>
        </DescriptionRow>
      </Descriptions>
    </DescriptionGroup>
  )
}

export default DetailList
