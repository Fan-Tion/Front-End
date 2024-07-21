import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser.ts')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest(request, print) {

      if (request.url.includes('/src/')) {
        return
      }

      if (request.url.includes('/node_modules/')) {
        return
      }

      // Otherwise, print an unhandled request warning.
      print.warning()
    },
  })
}

enableMocking().then(
  () => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  }
)