import { useState } from "react";
import { Customer } from "../models/interfaces";
import { authProvider, SignUpRequest } from "../services/authFacade";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

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
      const response = await authProvider.signUp({
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
    <div className="sign-up-wrapper">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={customer.firstName} onChange={handleChange} />
        </label>
        <label>
          Middle Name:
          <input type="text" name="middleName" value={customer.middleName} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={customer.lastName} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={customer.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={customer.password} onChange={handleChange} />
        </label>
        <label>
          Street Address:
          <input type="text" name="streetAddress" value={customer.streetAddress} onChange={handleChange} />
        </label>
        <label>
          Street No:
          <input type="text" name="streetNo" value={customer.streetNo} onChange={handleChange} />
        </label>
        <label>
          ZIP:
          <input type="text" name="zip" value={customer.zip} onChange={handleChange} />
        </label>
        <label>
          Country:
          <input type="text" name="country" value={customer.country} onChange={handleChange} />
        </label>
        <label>
          Phone:
          <input type="number" name="phone" value={customer.phone} onChange={handleChange} />
        </label>
        <input type="submit" value="Sign Up" className="sign-up-btn" />
      </form>
    </div>
  );
};

export default SignUp;
