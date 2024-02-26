import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/blogAPI";


const BlogDetail = () => {
  const { id } = useParams();
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBlog();
    getRecommendedBlog();
  }, [id]);

  const getBlog = async () => {
    try {
      // Fetch token from localStorage
      const token = JSON.parse(localStorage.getItem("user")).token
      const response = await api.get(`blog/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      const data = response.data;
      // console.log(data)

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

  const getRecommendedBlog = async () => {
    try {
      // Fetch token from localStorage
      const token = JSON.parse(localStorage.getItem("user")).token
      const response = await api.get(`recommended/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      const data = response.data;
      console.log(data)

      if (response.status === 200) {
        setRecommendedBlogs(data);
      } else {
        setError("Error fetching recommended blogs");
      }
    } catch (error) {
      console.error("Error fetching recommended blogs:", error);
      setError("Error fetching recommended blogs");
    }
  }

  if (loading) {
    return <h5 className='text-center text-bg-secondary py-3'>Loading Blog Page...</h5>;
  }

  if (error) {
    return <h5 className='text-center text-bg-secondary py-3'>Error: {error}</h5>;
  }


  return (
    <div className="container">
      <section className="py-3">
        <div className="container px-2 px-md-4 px-lg-5 my-5">
          <div className="row gx-2 gx-md-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img className="card-img-top mb-4 mb-md-0 p-2 img-fluid" src={blog.image} alt="Blog" />
            </div>
            <div className="col-md-6">
              <div className="small mb-3">
                <h1 className="fs-2 "> {blog.blogTitle}</h1>
                <h5 className="fs-2 "> {blog.categories}</h5>
                <h6 > <span className="badge bg-primary p-1">By Author</span> : {blog.authorName}</h6>
              </div>

              <p className="lead">{blog.content}</p>

              <Link className="btn btn-outline-dark mt-3 mt-md-4 px-4 px-md-5" to="/all-blog" >
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Blog  */}
      <section className="mt-4 mt-md-5">
        <h4 className="mb-3 mb-md-4 text-center text-secondary">Recommended Articles</h4>
        <div className="row gx-2 gx-md-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center">
          {Array.isArray(recommendedBlogs) &&
            recommendedBlogs.map((recommendedBlog) => (
              <div className="col mb-4" key={recommendedBlog._id}>
                <div className="card h-100">
                  {/* Blog image */}
                  <div className="zoom-effect">
                    <img className="card-img-top p-2 img-fluid" src={recommendedBlog.image} draggable="false" alt="Recommended Blog" />
                  </div>

                  {/* Blog details */}
                  <div className="card-body p-3">
                    <div className="text-center">
                      {/* Blog name */}
                      <h5 className="fw-bolder">{recommendedBlog.blogTitle}</h5>
                      {/* Blog name */}
                      <h6 className="">{recommendedBlog.authorName}</h6>
                    </div>
                  </div>
                  {/* Blog actions */}
                  <div className="card-footer p-3 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <Link to={`/blog/${recommendedBlog._id}`} className="btn btn-outline-dark mt-auto">
                        View Blog
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

    </div>
  )
}

export default BlogDetail