import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const PrivateComp = () => {
    const auth = localStorage.getItem("user")
  return  auth?<Outlet />:<Navigate to="/register" />
}

export default PrivateComp