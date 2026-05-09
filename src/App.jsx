
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuditResults from './pages/AuditResults'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/results",
    element: <AuditResults />
  }
])
function App() {
  return <RouterProvider router={router} />
}

export default App