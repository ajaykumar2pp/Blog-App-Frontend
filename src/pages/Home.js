import React from 'react'
import blog from '../images/blog-image.avif'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <section className="py-lg-16 py-8 mt-5  bg-transparenttext-dark">
                <div className="container ">
                    <div className="row align-items-center ">
                        <div className="col-lg-6 mb-6 mb-lg-0">
                            <div>

                                <h1 className="display-3 fw-bold mb-3">Online <span className='text-danger'>Blog App</span>  Amazing Website</h1>
                                <p className="pe-lg-10 mb-5">
                                    Welcome to our online blog haven, where pages come to life and stories unfold. Immerse yourself in a world of literary wonders, where every genre is a journey waiting to be explored. From gripping tales of adventure to soul-stirring narratives of love and wisdom, our curated collection awaits your discovery.
                                </p>
                                <div className="text-center">
                                    <Link to="/blog/add-blog" className="btn btn-primary">
                                        Create Your Blog
                                    </Link>
                                    <Link to="/" className="btn btn-outline-danger fs-5 text-inherit ms-5 ">
                                        Demo Blog
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-center align-items-center">
                            <img src={blog} alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
                <div className='d-none d-sm-none d-md-block'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#d63031" fillOpacity="1" d="M0,32L24,37.3C48,43,96,53,144,64C192,75,240,85,288,117.3C336,149,384,203,432,202.7C480,203,528,149,576,128C624,107,672,117,720,138.7C768,160,816,192,864,213.3C912,235,960,245,1008,256C1056,267,1104,277,1152,256C1200,235,1248,181,1296,165.3C1344,149,1392,171,1416,181.3L1440,192L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path>
                </svg>
                </div>
               
            </section>
        </div>
    )
}

export default Home