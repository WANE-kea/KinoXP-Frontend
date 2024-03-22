import { useState } from "react";
import { Customer } from "../models/interfaces";
import { authProvider, SignUpRequest } from "../services/authFacade";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import './SignUp.css';

const SignUp = () => {
  const [customer, setCustomer] = useState<Customer>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    streetAddress: "",
    streetNo: "",
    zip: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, streetAddress, streetNo, zip, country, phone } = customer;
    return firstName && lastName && email && password && streetAddress && streetNo && zip && country && phone;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      console.error("All fields except middle name are required.");
      return;
    }
    try {
      await authProvider.signUp({
        ...customer,
        username: customer.email,
      } as SignUpRequest);
      response &&
        auth
          .signIn({
            username: customer.email,
            password: customer.password,
          })
          .then(() => {
            navigate("/");
          });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signUpWrapper">
      <h2 className="title">Sign Up</h2>
      <form className="signUpForm" onSubmit={handleSubmit}>
        {/* Iterate over fields to create form inputs */}
        {Object.keys(customer).map((key) => {
          const isMiddleName = key === "middleName";
          return (
            <div key={key} className="formGroup">
              <label className="label">{`${key[0].toUpperCase()}${key.slice(1).replace(/([A-Z])/g, ' $1')}:`}</label>
              <input
                className="input"
                type={key === "password" ? "password" : key === "email" ? "email" : key === "phone" ? "number" : "text"}
                name={key}
                value={customer[key]}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
                required={!isMiddleName}
              />
            </div>
          );
        })}
        <button className="submitButton" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
};


export default SignUp;