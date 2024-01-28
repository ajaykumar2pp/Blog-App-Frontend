import React from "react";
import './App.css';
import NavbarComp from './components/NavbarComp';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import PrivateComp from './components/PrivateComp';
import Home from "./pages/Home";
import AuthorBlog from "./pages/AuthorBlog";
import BlogDetail from "./pages/BlogDetail";
import AddBlog from "./pages/AddBlog";
import BlogListing from "./pages/BlogListing";
import UpdateBlog from "./pages/UpdateBlog";


function App() {
  return (
    <BrowserRouter>
      <NavbarComp />
      <ToastContainer />
      <Routes>
        <Route element={<PrivateComp />}>
          <Route path="/author/blog" element={<AuthorBlog />} />
          <Route path="/all-blog" element={<BlogListing />} />
          <Route path="/blog/add-blog" element={<AddBlog />} />
          <Route path="/blog/update-blog/:_id" element={<UpdateBlog />} />

          <Route path="/blog/:id" element={<BlogDetail />} />

        </Route>


        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>



    </BrowserRouter>
  );
}

export default App;
