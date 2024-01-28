import React from 'react'
import { Link } from "react-router-dom"
import error from '../images/error-image.avif'

const PageNotFound = () => {
  return (
    <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 ">
                    <div className='d-flex justify-content-center'>
                        <img src={error} alt="error-404" />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <Link to="/" className='p-3 rounded-2 text-white bg-secondary opacity-75 fw-semibold text-decoration-none'>Go to Home Page</Link>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default PageNotFound