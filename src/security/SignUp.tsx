import { useState } from "react";
import { Customer } from "../services/interfaces";
import { authProvider, SignUpRequest } from "../services/authFacade";

const SignUp: React.FC = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authProvider.signUp({
        ...customer,
        username: customer.email, // set username to be the same as email
      } as SignUpRequest);
      // handle the response
      console.log(response); // or any other logic to handle the response
    } catch (error) {
      // handle the error
      console.error(error); // or any other logic to handle the error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <input type="text" name="phone" value={customer.phone} onChange={handleChange} />
      </label>
      <input type="submit" value="Sign Up" />
    </form>
  );
};

export default SignUp;
