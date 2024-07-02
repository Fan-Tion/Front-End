import React from 'react'
import { RecoilRoot } from 'recoil'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import Routes from './routes/Routes'

// 글로벌 스타일을 활용해 스타일 리셋
const GlobalStyles = createGlobalStyle`
${reset};
* {
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`

export default function App() {

  return (
    <RecoilRoot>
      <GlobalStyles />
      <Routes />
    </RecoilRoot>
  )
}
