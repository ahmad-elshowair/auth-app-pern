import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <section className='container'>
        <h1>404</h1>
        <h2>Page not found</h2>
        <Link to='/' className='btn btn-success'>Home</Link>
    </section>
  )
}

export default Error