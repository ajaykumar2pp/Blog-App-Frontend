import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { validationRegisterSchema } from '../validations/registerSchema';
import Form from 'react-bootstrap/Form';
import api from "../api/blogAPI";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pages/Register.css';

const Register = () => {
  const navigate = useNavigate();

  const { handleChange, handleSubmit, handleBlur, touched, values, errors } = useFormik({
    initialValues: {
      username:'',
      email: '',
      password: '',
    },
    validationSchema: validationRegisterSchema, 
    onSubmit: async (values, action) => {
      console.log(values);

      try {
        const response = await api.post("/register", {
          username: values.username,
          email: values.email,
          password: values.password,
        });

        console.log(response.data);
        toast.success('User Register Successfully!');
        navigate("/login");
      } catch (error) {
        
        if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
    
          if (errorMessage.toLowerCase().includes("email") && errorMessage.toLowerCase().includes("already")) {
            toast.error('This email is already registered.');
          } else {
            toast.error(`Error registering user: ${errorMessage}`);
          }
        } else {
          toast.error(`Error registering user: ${error.message}`);
        }
        console.error('Error registering in:', error.message);
      } finally {
        action.resetForm();
      }
    },
  });



  return (
    <>
      <div className="container-fluid" id="registerBG">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 ">
            <h2 className="text-center App mt-3">Register User</h2>
            {/* form   */}
            <Form className="mb-5 border border-primary p-4 m-3 rounded"onSubmit={handleSubmit}>
              {/* name  */}
              <div className="mb-3">
              <Form.Label> Name</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Enter Your Name"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.username && errors.username}
                />
                 <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </div>
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
                <Form.Control.Feedback type="invalid">
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
                <Form.Control.Feedback  type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </div>
              <div className="d-grid gap-2 col-6 text-center mx-auto">
                <button
                  type="submit"
                  className="btn btn-primary  mb-4   text-opacity-75"
                  
                >
                  Register
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>


    </>
  );
};

export default Register;
