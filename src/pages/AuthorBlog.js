import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/blogAPI";
import './AuthorBlog.css';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashCan } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { FaArrowDownWideShort } from "react-icons/fa6";

const AuthorBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [openBlogId, setOpenBlogId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState(null);
  const [error, setError] = useState(null);

  const userData = JSON.parse(localStorage.getItem("user"));
  const author_id = userData?._id;

  useEffect(() => {
    if (search === "") {
      getAllBlog();
    } else {
      getSearchBlog();
    }
  }, [search]);

  const getAllBlog = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      if (!author_id) {
        console.log('Author ID not found in localStorage');
        return;
      }
      const response = await api.get(`/blog/author/${author_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      if (data.data && data.data.blogs && data.data.blogs.length > 0) {
        setBlogs(data.data.blogs);
        setError(null);
      } else {
        setBlogs([]);
        setError('No blogs. Please add a blog.');
      }
    } catch (error) {
      console.error('Error fetching blog by author_id:', error);
      setBlogs([]);
      setError('Error fetching blog by author_id');
    } finally {
      setLoading(false);
    }
  };

  const handleSettingClick = (blogId) => {
    setOpenBlogId((prevId) => (prevId === blogId ? null : blogId));
  };

  const handleDeleteClick = (blogId) => {
    setDeleteBlogId(blogId);
    setShowDeleteModal(true);
  };

  const confirmDeleteBlog = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const response = await api.delete(`/blog/${deleteBlogId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        toast.success('Blog deleted successfully!');
        getAllBlog();
      } else {
        toast.error('Failed to delete the blog. Please try again.');
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error(`Error deleting blog: ${error.message}`);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const getSearchBlog = async (e) => {
    const key = e.target.value;
    if (key) {
      try {
        const token = JSON.parse(localStorage.getItem("user")).token;
        const result = await api.get(`/search/${key}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = result.data;
        if (data && data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs([]);
          setError('No blogs found for the search key.');
        }
      } catch (error) {
        // console.error('Error fetching search results:', error.message);
        setError('No blogs found for the search key.');
        setBlogs([]);
      }
    } else {
      setBlogs([]);
      setSearch(""); ;
      getAllBlog();
    }
  };

  return (
    <>
      <div className="container mb-sm-5">
        {loading ? (
          <h5 className='text-center text-bg-secondary py-3'>Loading Author Blogs Page...</h5>
        ) : (
          <div>
            <div className="row justify-content-center mt-3 mb-3">
              <div className="col-sm-8">
                <div>
                  <h5 className="text-center mt-3">Blog By Author </h5>
                </div>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => getSearchBlog(e)}
                  id="inputSearch"
                  placeholder="🔍 Search Your Blog"
                  autoFocus
                />
              </div>
            </div>
            <div className="row mt-3 mb-3 justify-content-center">
              <div className="col-md-8">
                <div>
                  {error && <h5 className='text-center text-bg-danger py-3 mt-5'>{error}</h5>}
                </div>
              </div>
            </div>
            <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 mb-5 justify-content-center">
              {blogs && blogs.map((blog) => (
                <div className="col mb-5" key={blog._id}>
                  <div className="card h-100 card-btn">
                    <div className="zoom-effect">
                      <img className="card-img-top p-2" src={blog.image} draggable="false" alt="oops" />
                    </div>
                    <div className="card-body p-4">
                      <div className="text-center">
                        <h5 className="fw-bolder">{blog.blogTitle}</h5>
                      </div>
                    </div>
                    <div className=" p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center d-flex justify-content-evenly">
                        <Link to={`/blog/${blog._id}`} className="btn btn-outline-dark mt-auto mr-2">
                          View Blog
                        </Link>
                        <button onClick={() => handleSettingClick(blog._id)}
                          className="btn btn-outline-dark mt-auto ml-2 btn-setting ">
                          <FaArrowDownWideShort />
                        </button>
                        {openBlogId === blog._id && (
                          <div className="options-list mt-4 position-absolute">
                            <ul className="list-group ">
                              <Link to={"/blog/update-blog/" + blog._id}
                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center bg-body-secondary">
                                Update
                                <span className="ms-2"><BiSolidEdit /></span>
                              </Link>
                              <button onClick={() => handleDeleteClick(blog._id)}
                                className="list-group-item list-group-item-action  d-flex justify-content-between align-items-center bg-body-secondary">
                                Delete
                                <span className="ms-2"><FaTrashCan /></span>
                              </button>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Blog Permanently?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete this blog?
                </Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={confirmDeleteBlog}>
                    Delete Permanently
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AuthorBlog;
