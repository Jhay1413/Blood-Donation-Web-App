
import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import LoginPage from './components/Auth/LoginPage'
import RequireAuth from './components/Routes/RequireAuth'
import InsideDoctorRoutes from './components/Routes/InsideDoctorRoutes'
import UnauthorizedPage from './components/Routes/UnauthorizedPage'
import InsideAdminRoutes from './components/Routes/InsideAdminRoutes'
import RegistrationPage from './components/Auth/RegisterPage'

function App() {
 
  const allowedRoles = {
    user:"Doctor",
    admin:"Admin"
  }
  return (
    <>
      <Routes>
        <Route path = '/' element={<Layout/>}>
          {/* Public Route*/}
          <Route index element={<LoginPage/>}/>
          <Route path='/register' element={<RegistrationPage/>}/>
          <Route path ='/unauthorized' element={<UnauthorizedPage/>}/>

          <Route element={<RequireAuth roles = {allowedRoles.user}/>}>
            <Route path="/doc/*" element={<InsideDoctorRoutes/>}/>
          </Route>
          <Route element={<RequireAuth roles = {allowedRoles.admin}/>}>
            <Route path="/admin/*" element={<InsideAdminRoutes/>}/>
          </Route>
          
        </Route>
      </Routes>
      
    </>
  )
}

export default App
