import DetailList from '../DetailList'
import MessageLog, { IMessageType } from '../MessageLog'
import ViewportWrapper from '../Viewport/ViewportWrapper'
import Widgets from '../Widgets'
//import { useQuery, gql } from '@apollo/client'

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
  messages: [
    {
      id: '83898',
      type: IMessageType.INFORMATION,
      content: 'Yaw adjusted +0.05',
      dateTime: new Date(),
    },
    {
      id: '23664',
      type: IMessageType.ERROR,
      content: 'Error in generator controller',
      dateTime: new Date(),
    },
    {
      id: '5g54',
      type: IMessageType.INFORMATION,
      content: 'Wind speed 10m/s',
      dateTime: new Date(),
    },
    {
      id: 'gtgt',
      type: IMessageType.WARNING,
      content: 'Temperature in Gearbox 32°C',
      dateTime: new Date(),
    },
  ]
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

/*const GET_TURBINE_LIVE_DATA = gql`
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
`*/

function SystemDashboard({ turbine }: any) {
  /*const { loading, error, data } = useQuery(GET_TURBINE_LIVE_DATA, {
    variables: { id: turbine.id },
    pollInterval: 10000,
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>*/

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
