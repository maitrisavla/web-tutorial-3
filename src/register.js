import React from "react";
import { useState, useEffect } from "react"; 
import './App.css';
import { useNavigate } from "react-router-dom";

function Registration() {
    const initialValues = { fname: "", lname: "", email: "", password: "", cnfpassword: "" };

    //Reference: https://www.telerik.com/blogs/how-to-create-validate-react-form-hooks
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const nav = useNavigate();
  
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
    // Reference: code from my previous serverless assignment
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    };
  
    
    useEffect(() => {
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit === true) {
        console.log("Successful registration");
        nav("/profile")
      }
    }, [formErrors,isSubmit,nav]);
  
   
    const validate = (values) => {
      const errors = {};
      const txt = /^[a-zA-Z]*$/;
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //Reference: https://www.w3schools.blog/email-validation-javascript-js
      if (!values.fname) {
        errors.fname = "First name is required!";
      } else if(!txt.test(values.fname)){
          errors.fname = "Please enter text only";
      }
      if (!values.lname) {
          errors.lname = "Last name is required!";
        } else if(!txt.test(values.lname)){
          errors.lname = "Please enter text only";
        }
      if (!values.email) {
        errors.email = "Email is required!";
      } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be more than 8 characters";
      } 
      if (!values.cnfpassword) {
          errors.cnfpassword = "Password is required";
        } else if (values.cnfpassword !== values.password) {
          errors.cnfpassword = "Password doesn't match";
        }
  
      return errors;
    };
  
    return (
  
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2>Sign-up</h2>
          
          <div className="ui form">
            <div className="field">
              <label>First Name  </label>
              <input
                type="text"
                name="fname"
                className="fname_input"
                placeholder="First Name"
                value={formValues.fname}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.fname}</p>
  
            <div className="field">
              <label>Last Name  </label>
              <input
                type="text"
                name="lname"
                className="lname_input"
                placeholder="Last Name"
                value={formValues.lname}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.lname}</p>
  
            <div className="field">
              <label>Email  </label>
              <input
                type="text"
                name="email"
                className="email_input"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className="field">
              <label>Password  </label>
              <input
                type="password"
                name="password"
                className="password_input"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.password}</p>
  
            <div className="field">
              <label>Confirm Password  </label>
              <input
                type="password"
                name="cnfpassword"
                className="password_input"
                placeholder="Confirm Password"
                value={formValues.cnfpassword}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.cnfpassword}</p>
  
            <div className="btn">
              <button>Submit</button>
            </div>
            
          </div>
        </form>
      </div> 
    );
}
export default Registration;