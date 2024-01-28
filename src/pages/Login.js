import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { validationLoginSchema } from '../validations/loginSchema';
import api from "../api/blogAPI";
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pages/Login.css';



const Login = () => {

  const navigate = useNavigate();
  const isAuthenticated  = !!localStorage.getItem("user");
  useEffect(() => {
    if (isAuthenticated ) {
      navigate("/all-blog");
    }
  }, [navigate ,isAuthenticated]);


  const { handleChange, handleSubmit, handleBlur, touched, values, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationLoginSchema, 
    onSubmit: async (values, action) => {
      console.log(values);

      try {
        const response = await api.post("/login", {
          email: values.email,
          password: values.password,
        });

        // console.log(response.data);
        // console.log(response.data.data.user);
        toast.success('User Login Successfully!');
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        navigate("/all-blog");
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            // User not found
            toast.error('User Not Found. Please check your email.');
          } else if (error.response.status === 401) {
            // Invalid password
            toast.error('Invalid Password. Please try again.');
          } else {
            // Other server errors
            toast.error(`Error logging in: ${error.message}`);
          }
        } else {
          // Network errors or other issues
          toast.error(`Error logging in: ${error.message}`);
        }
        console.error('Error logging in:', error.message);
      } finally {
        action.resetForm();
      }
    },
  });

  return (
    <>
      <div className="container-fluid " id="loginBG">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 ">
            <h2 className="text-center App mt-3  text-secondary">Login User</h2>
            {/* form   */}
            <Form className="mb-5 border border-primary p-4 m-3 rounded" onSubmit={handleSubmit}>
              {/* email */}
              <div className="mb-3">
                <Form.Label> Email</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control "
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback className="text-white" type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </div>
              {/* password */}
              <div className="mb-3">
                <Form.Label>  Password</Form.Label>
                <Form.Control
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && errors.password}
                />
                <Form.Control.Feedback className="text-white" type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </div>
              <div className="d-grid gap-2 col-6 text-center mx-auto">
                <button
                  type="submit"
                  className="btn btn-primary mb-4  text-opacity-75"

                >
                  Login
                </button>
              </div>

            </Form>
          </div>
        </div>
      </div>


    </>
  );
};

export default Login;
