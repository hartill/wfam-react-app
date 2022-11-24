import { ErrorView } from './styles'

interface IErrorScreen {
  error?: string | null
}

function ErrorScreen({ error }: IErrorScreen) {
  return (
    <ErrorView>
      <h1>There was a problem</h1>
      <div>{error}</div>
    </ErrorView>
  )
}

export default ErrorScreen
