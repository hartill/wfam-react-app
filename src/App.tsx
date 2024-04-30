import { ThemeProvider } from '@emotion/react'
import theme from './config/theme'
import AppHeader from './components/AppHeader'
import SystemDashboard from './components/SystemDashboard'
import { AppElement } from './styles'

const mockData = {
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
  return (
    <ThemeProvider theme={theme}>
      <AppElement>
        <AppHeader
          turbineName={mockData.turbine.name}
          windFarmName={mockData.windFarm.name}
          lat={mockData.turbine.lat}
          long={mockData.turbine.long}
          localTime={mockData.windFarm.timeZone}
        />
        <SystemDashboard turbine={mockData.turbine} />
      </AppElement>
    </ThemeProvider>
  )
}

export default App
