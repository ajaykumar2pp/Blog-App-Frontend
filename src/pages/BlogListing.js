import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './BlogListing.css';
import api from "../api/blogAPI";

const BlogListing = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    try {
      // Fetch token from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user ? user.token : null;

      const response = await api.get("/blog", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: { category: selectedCategory },
      });

      const data = response.data;
      if (response.status === 200) {
        setBlogs(data.data.blog);
        setError(null);
      } else {
        setError("Error fetching blog data");
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setError("Error fetching blog data");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // If categories fetching fails, set an empty array
      setCategories([]);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAllCategoryClick = () => {
    setSelectedCategory("All");
  };
  

  const formatCategory = (category) => {
    return category.replace(/["\[\]]/g, '');
  };

  return (
    <>
      {loading && <h5 className='text-center text-bg-secondary py-3'>Loading Blog Listing...</h5>}
      {error && <h5 className='text-center text-bg-secondary py-3'>{error}</h5>}
      <section >
        <div className="container-fluid px-4 px-lg-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <div className=" mb-5">
                <h3 className="text-center fw-bold text-danger"> Blogs Listing</h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className=" mb-5">
              {categories.length > 0 && ( // Only render the "All" button if categories are fetched successfully
                <button
                  className="p-2 m-3 text-bg-danger fw-bold rounded rounded-2"
                  onClick={handleAllCategoryClick} 
                >
                  All
                </button>
              )}
                {categories.map((category, index) => (
                  <button
                    className="p-2 m-3 text-bg-danger fw-bold rounded rounded-2"
                    key={index}
                    value={category}
                    onClick={() => handleCategoryClick(category)}
                    >
                    {formatCategory(category)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {categories.length > 0 && (
            <div className="row d-flex justify-content-center">
              <div className="col-md-6 mb-4">
                <label htmlFor="categoryFilter m-3">Filter by Category</label>
                <select className="form-control mt-xxl-2"
                  id="categoryFilter"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="All">All</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {formatCategory(category)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="row  gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {Array.isArray(blogs) && blogs.map((blog) => (
              <div className="col mb-5" key={blog._id}>
                <div className="card h-100">
                  {/* Blog image */}
                  <div className="zoom-effect">
                    <img className="card-img-top p-2" src={blog.image} draggable="false" alt="oops" />
                  </div>

                  {/* Blog details */}
                  <div className="card-body p-4">
                    <div className="text-center">
                      {/* Blog name */}
                      <h5 className="fw-bolder">{blog.blogTitle}</h5>
                      {/* Blog name */}
                      <h6 className="">{blog.authorName}</h6>
                    </div>
                  </div>
                  {/* Blog actions */}
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <Link to={`/blog/${blog._id}`} className="btn btn-outline-dark mt-auto">
                        View Blog
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogListing;
