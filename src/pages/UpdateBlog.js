import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/blogAPI";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "./UpdateBlog.css";


const UpdateBlog = () => {

  const [blogTitle, setBlogTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const userName = JSON.parse(localStorage.getItem("user")).username;
 
  const categories = ["Technology", "Sport", "Education", "News", "Medical","Other"];

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    //update image state
    setImage(selectedImage)

    // Create preview URL
    const previewURL = URL.createObjectURL(selectedImage);

    // Update state with selected image
    setImagePreview(previewURL);
  };

  useEffect(() => {
    getBlogDetails();
  }, [])

  const getBlogDetails = async () => {
    try {
      // Fetch token from localStorage
      const token = JSON.parse(localStorage.getItem("user")).token

      const response = await api.get(`/blog/${params._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      const data = response.data;
      console.log("Single Blog data:", data);
      setBlogTitle(data.blogTitle);
      setContent(data.content);
      setAuthorName(data.authorName);
      setImageUrl(data.image);
      setSelectedCategories(data.categories);
    } catch (error) {
      toast.error(`Error logging in: ${error.message}`);
      console.error("Error fetching product data:", error);

    }
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCategories(selectedOptions);
  };

  const updateBlog  = async (e) => {
    e.preventDefault();
    console.log(blogTitle, authorName, content, image,selectedCategories);
    // if (!blogTitle || !authorName || !content || !image || !selectedCategories) {
    //   toast.error('All fields are required!');
    //   return;
    // }
  
    setLoading(true);
    try {
      // Use FormData to send multipart/form-data
      const formData = new FormData();
      formData.append("blogTitle", blogTitle);
      formData.append("authorName", authorName);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("categories", JSON.stringify(selectedCategories));

      // Fetch token from localStorage
      const token = JSON.parse(localStorage.getItem("user")).token

      const updateBlog = await api.put(`/blog/${params._id}`,
        formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      });

      console.log(updateBlog.data);
      // alert("Update Blog");
      toast.success('Blog updated successfully!');
      navigate("/all-blog");
    } catch (error) {
      toast.error(`Error logging in: ${error.message}`);
      console.error("Error during API call:", error);
    } finally {
      setLoading(false);
    }
    // Reset the form inputs
    setBlogTitle("");
    setAuthorName("");
    setContent("");
    setSelectedCategories([]);
    setImage(null);
    setImagePreview(null);
  };


  return (

    <div className="container-fluid" >
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 ">
          <h5 className="text-center mt-4 text-body-tertiary">Update Blog  by Author : {userName}</h5>
          {/* form   */}
          <form className="mb-5 border border-primary p-4 m-3 rounded">
            {/* Blog Title  */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Blog Title
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="blogTitle"
                placeholder="Enter Blog Title"
                aria-describedby="blogName"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
              />

            </div>
            {/* Author Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Author Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter Author Name"
                aria-describedby="authorName"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />

            </div>
         
            {/* content*/}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Content
              </label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                placeholder="Enter Blog Content"
                aria-describedby="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ height: "100px" }}
              />

            </div>
            {/* selected category */}
            <div className="mb-3">
            <label htmlFor="categories" className="form-label fw-bold">
                Selected Category
              </label>
              <select multiple
                className="form-select"
                id="categories"
                value={selectedCategories}
                onChange={handleCategoryChange}
              >
               {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {/* Image uplaod */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Image Upload
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                accept="image/*"
                aria-describedby="image"
                onChange={handleImageChange}
              />


            </div>
            <div className="d-flex justify-content-between">
              <div>
                {/* Previous Image */}
                {imageUrl && (
                  <div className="mb-3 img-preview-container">
                    <label className="form-label img-preview-label fw-bolder">Previous Image</label>
                    <img src={imageUrl} alt="Previous-Product" draggable="false" className="preview-image mb-2 img-fluid" />
                  </div>
                )}
              </div>
              <div>
                {/* Newly Selected Image Preview */}
                {imagePreview && (
                  <div className="mb-3 img-preview-container">
                    <label className="form-label img-preview-label fw-bolder">Upload Image Preview</label>
                    <img src={imagePreview} alt="Upload-Preview" draggable="false" className="preview-image img-fluid" />
                  </div>
                )}
              </div>

            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary mb-5 fw-bold"
                onClick={updateBlog}
                disabled={loading}
              >
               {loading ? "Updating..." : "Update Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default UpdateBlog