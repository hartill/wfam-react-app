import './App.css'
import { ThemeProvider } from '@emotion/react'
import theme from './config/theme'
import AppHeader from './components/AppHeader'
import { useQuery, gql } from '@apollo/client'
import SystemDashboard from './components/SystemDashboard'

const GET_TURBINE_AND_WIND_FARM = gql`
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
`

function App() {
  const turbineId = 'NzI1NDc1MTM1'
  const { loading, error, data } = useQuery(GET_TURBINE_AND_WIND_FARM, {
    variables: { id: turbineId },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

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
