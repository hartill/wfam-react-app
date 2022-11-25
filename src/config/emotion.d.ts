import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      blue: string
      darkGrey: string
      midDarkGrey: string
      red: string
      green: string
      orange: string
      panelBackground: string
      panelBackgroundDarker: string
      midBlueGrey: string
    }
    spacing: {
      rowPadding: string
    }
    screenSize: {
      small: string
    }
  }
}
