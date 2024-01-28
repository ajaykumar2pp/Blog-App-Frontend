import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/blogAPI";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pages/AddBlog.css';

const AddBlog = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(false)
  const navigate = useNavigate();

  const categories = ["Technology", "Sport", "Education", "News", "Medical","Other"];

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];

    // Display image preview
    if (selectedImage) {
      setImagePreview(URL.createObjectURL(selectedImage));
    } else {
      setImagePreview(null);
    }

    // Update state with selected image
    setImage(selectedImage);
  };

  const handleCategoriesChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCategories(selectedOptions);
  };


  const handleSave = async (e) => {
    console.log(blogTitle, authorName, content, image, selectedCategories);
    e.preventDefault();
    if (!blogTitle || !authorName || !content || !image|| !selectedCategories) {
      setError(true)
      return false;
    }
    try {
      // Fetch token from localStorage
      const token = JSON.parse(localStorage.getItem("user")).token
      // console.log(token)

      const author_id = JSON.parse(localStorage.getItem("user"))._id;
      // console.log(author_id);

      setImagePreview(URL.createObjectURL(image));


      // Use FormData to send multipart/form-data
      const formData = new FormData();
      formData.append("blogTitle", blogTitle);
      formData.append("authorName", authorName);
      formData.append("content", content);
      formData.append("author_id", author_id);
      formData.append("image", image);
      formData.append("categories", JSON.stringify(selectedCategories));

      const response = await api.post("/blog/add-blog",
        formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      });

      // console.log(response.data);
      // alert("Blog Add");
      toast.success("Blog Add");
      navigate("/all-blog");
    } catch (error) {
      console.error("Error during API call:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      toast.error("Failed to add blog");
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
    <>
      <div className="container-fluid" >
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 ">
            <h5 className="text-center mt-4 text-body-tertiary">Add Blog  </h5>
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
                  aria-describedby="blogTitle"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                />
                {error && !blogTitle && <div className="valid text-danger">Plz valid blog title</div>}
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
                {error && !authorName && <div className="valid text-danger">Plz valid author name</div>}
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
                {error && !content && <div className="valid text-danger">Plz valid content</div>}
              </div>
              {/* catgeories  */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold">Select Categories:</label>
                <select multiple className="form-select"
                 id="categories"
                 value={selectedCategories}
                 onChange={handleCategoriesChange}
                  >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {error && !selectedCategories.length===0 && <div className="valid text-danger">Please select at least one category</div>}
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
                  aria-describedby="image"
                  onChange={handleFileChange}
                />

                {error && !image && <div className="valid text-danger">Plz upload image</div>}
              </div>
              <div>
                {imagePreview && (
                  <div className="mb-3">
                    <label className="form-label">Image Preview</label>
                    <img src={imagePreview} alt="Preview" className="img-preview img-fluid" />
                  </div>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary mb-5 fw-bold text-sm "
                  onClick={handleSave}
                >
                  Add Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddBlog


