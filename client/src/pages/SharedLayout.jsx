import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
const SharedLayout = () => {
  return (
    <>
        <Navbar/>
        <main
            style={{
                minHeight: 'calc(100vh - 56px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'

            }}
        >
        <Outlet/>
        </main>
    </>
  )
}

export default SharedLayout 