import React from 'react'
import { Route, Routes } from 'react-router'
import DoctorLayout from './layout/doctors'
import Dashboard from './pages/Dashboard'
import DoctorProfile from './pages/Profile'
import Availability from './pages/Availability'
import Calendar from './pages/Calendar'
import Reports from './pages/Reports'
import AHPRA from './pages/AHPRA'

const PageRoutes = () => {
  return (
    <Routes>
  <Route path="" element={<DoctorLayout />} >
    <Route index  element={<Dashboard />} />
    <Route  path="profile" element={<DoctorProfile />} />
    <Route  path="availability" element={<Availability />} />
    <Route  path="calendar" element={<Calendar />} />
    <Route  path="reports" element={<Reports />} />
    <Route  path="AHPRA" element={<AHPRA />} />

  </Route>
</Routes>

  )
}

export default PageRoutes