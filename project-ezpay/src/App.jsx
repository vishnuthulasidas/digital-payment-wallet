import './App.css'
import Router from './router/Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <div className='min-h-screen w-full font-poppins bg-offWhite'>
      <Router/>
    </div>
    </QueryClientProvider>
    </>
  )
}

export default App
