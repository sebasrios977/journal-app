import { Outlet } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'

const JournalRoutes = () => {
  return (
    <PrivateRoutes>
      <Outlet />
    </PrivateRoutes>
  )
}

export default JournalRoutes
