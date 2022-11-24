import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import {
  Header,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  LocationDetails,
  LocationIcon,
  LocationText,
  Divider,
} from './styles'
import { ChevronRight, MapPin, Clock } from 'react-feather'

dayjs.extend(timezone)
dayjs.extend(utc)

interface IAppHeader {
  windFarmName: string
  turbineName: string
  lat: number
  long: number
  localTime: string
}

function AppHeader({
  windFarmName,
  turbineName,
  lat,
  long,
  localTime,
}: IAppHeader) {
  return (
    <Header>
      <Breadcrumb>
        <BreadcrumbItem className="faded">{windFarmName}</BreadcrumbItem>
        <BreadcrumbDivider>
          <ChevronRight height={15} />
        </BreadcrumbDivider>
        <BreadcrumbItem>
          <h1>{turbineName}</h1>
        </BreadcrumbItem>
      </Breadcrumb>
      <LocationDetails>
        <LocationIcon>
          <MapPin height={13} />
        </LocationIcon>
        <LocationText>{lat.toString()} N</LocationText>
        <Divider />
        <LocationText>{long.toString()} W</LocationText>
        <LocationIcon>
          <Clock height={13} />
        </LocationIcon>
        <LocationText>
          {dayjs().tz(localTime).format('HH:MM ddd DD MMM')}
        </LocationText>
      </LocationDetails>
    </Header>
  )
}

export default AppHeader
