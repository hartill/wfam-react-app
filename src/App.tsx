import './App.css'
import { ThemeProvider } from '@emotion/react'
import theme from './config/theme'
import AppHeader from './components/AppHeader'
//import { useQuery, gql } from '@apollo/client'
import SystemDashboard from './components/SystemDashboard'

/*const GET_TURBINE_AND_WIND_FARM = gql`
  query GetData($id: ID!) {
    turbine(id: $id) {
      id
      name
      model
      ratedPower
      lat
      long
    }
    windFarm {
      name
      timeZone
    }
  }
`*/

const data = {
  turbine: {
    id: '193093',
    name: 'Turbine A',
    windFarmName: 'Wind Farm A',
    model: 'T256',
    ratedPower: 2000,
    lat: 48.775845,
    long: 9.182932,
  },
  windFarm: {
    id: '897897983',
    name: 'Wind Farm A',
    timeZone: 'Europe/Berlin'
  },
}

function App() {
  /*const turbineId = 'NzI1NDc1MTM1'
  const { loading, error, data } = useQuery(GET_TURBINE_AND_WIND_FARM, {
    variables: { id: turbineId },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>*/

  return (
    <ThemeProvider theme={theme}>
      <div id="app">
        <AppHeader
          turbineName={data.turbine.name}
          windFarmName={data.windFarm.name}
          lat={data.turbine.lat}
          long={data.turbine.long}
          localTime={data.windFarm.timeZone}
        />
        <SystemDashboard turbine={data.turbine} />
      </div>
    </ThemeProvider>
  )
}

export default App
