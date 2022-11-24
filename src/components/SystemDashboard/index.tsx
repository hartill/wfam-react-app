import DetailList from '../DetailList'
import MessageLog from '../MessageLog'
import ViewportWrapper from '../Viewport/ViewportWrapper'
import Widgets from '../Widgets'
import { useQuery, gql } from '@apollo/client'

const turbineStatus = {
  status: 'Active',
  sessionDuration: '1d 22h 13m 06s',
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

const GET_TURBINE_LIVE_DATA = gql`
  query GetTurbineLiveData($id: ID!) {
    turbineTelemetry(id: $id) {
      nacelleDirectionDeg
      rotorSpeed
      bladePitchAngle
      powerOutput
      windSpeed
      windDirectionDeg
    }
    messages(id: $id) {
      id
      type
      content
      dateTime
    }
  }
`

function SystemDashboard({ turbine }: any) {
  const { loading, error, data } = useQuery(GET_TURBINE_LIVE_DATA, {
    variables: { id: turbine.id },
    pollInterval: 10000,
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <>
      <div className="main">
        <ViewportWrapper objectPaths={objectPaths} />
        <div className="side-panel">
          <DetailList
            turbineModel={turbine.model}
            ratedPower={turbine.ratedPower}
            status={turbineStatus.status}
            sessionDuration={turbineStatus.sessionDuration}
          />
          <MessageLog messages={data.messages} />
        </div>
      </div>
      <Widgets telemetry={data.turbineTelemetry} />
    </>
  )
}

export default SystemDashboard
