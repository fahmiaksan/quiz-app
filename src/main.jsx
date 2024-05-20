import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { QuizProvider } from './utils/config.jsx';
import { BrowserRouter } from 'react-router-dom'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <QuizProvider>
        <NextUIProvider >
          <App />
        </NextUIProvider>
      </QuizProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
