import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/blogAPI";


const BlogDetail = () => {
  const { id } = useParams();
  // console.log(id)


  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    getBlog(id);
  }, [id]);

  const getBlog = async (blogId) => {
    try {
      // Fetch token from localStorage
      const token = JSON.parse(localStorage.getItem("user")).token
      const response = await api.get(`blog/${blogId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      const data = response.data;
      console.log(data)

      if (response.status === 200) {
        setBlog(data);
      } else {
        setError("Error fetching blog data");
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setError("Error fetching blog data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h5 className='text-center text-bg-secondary py-3'>Loading Blog Page...</h5>;
  }

  if (error) {
    return <h5 className='text-center text-bg-secondary py-3'>Error: {error}</h5>;
  }


  return (
    <div>
      <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img className="card-img-top mb-5 mb-md-0 p-2" src={blog.image} alt="oops" />
            </div>
            <div className="col-md-6">
              <div className="small mb-1">
                <h1 className="fs-2 "> {blog.blogTitle}</h1>
                <h6 > <span className="badge bg-primary p-1">By Author</span> : {blog.authorName}</h6>

              </div>

              <p className="lead">{blog.content}</p>
             
              <Link className="btn btn-outline-dark flex-shrink-0 mt-4 px-5" to="/all-blog" >
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </section>
     

    </div>
  )
}

export default BlogDetail