import DetailList from '../DetailList'
import MessageLog from '../MessageLog'
import ViewportWrapper from '../Viewport/ViewportWrapper'
import Widgets from '../Widgets'
import messages from './messages.json'
import { ViewportAndSidePanel, SidePanel } from './styles'

const turbineStatus = {
  status: 'Active',
  sessionDuration: '1d 22h 13m 06s',
}

const data = {
  turbineTelemetry: {
    nacelleDirectionDeg: 38 + Math.floor(Math.random() * 5),
    rotorSpeed: 16 + Math.random() * 3,
    bladePitchAngle: 0 + Math.random() * 2,
    powerOutput: Math.round(1100 + Math.random() * 100),
    windSpeed: Math.round(12 + Math.random() * 5),
    windDirectionDeg: 38 + Math.random() * 5,
  },
}

const objectPaths = [
  {
    geometry: './models/wt/wind_turbine_objects.obj',
    material: './models/wt/wind_turbine_objects.mtl',
  },
  {
    geometry: './models/wt/rotor.obj',
    material: './models/wt/rotor.mtl',
  },
]

function SystemDashboard({ turbine }: any) {
  return (
    <>
      <ViewportAndSidePanel>
        <ViewportWrapper objectPaths={objectPaths} />
        <SidePanel>
          <DetailList
            turbineModel={turbine.model}
            ratedPower={turbine.ratedPower}
            status={turbineStatus.status}
            sessionDuration={turbineStatus.sessionDuration}
          />
          <MessageLog messages={messages} />
        </SidePanel>
      </ViewportAndSidePanel>
      <Widgets telemetry={data.turbineTelemetry} />
    </>
  )
}

export default SystemDashboard
