import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/input/input";
import AuthLayout from "../components/layouts/authLayout";
import { UserContext } from "../components/context/userContext";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axios";
import { API_PATHS } from "../utils/apiPath";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!firstName) return setError("Enter first name");
    if (!lastName) return setError("Enter last name");
    if (!validateEmail(email)) return setError("Enter valid email");
    if (!password) return setError("Enter password");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        first_name: firstName,
        last_name: lastName,
        email,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      updateUser(user);
      navigate("/home");

    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] md:mt-0 mt-10 flex flex-col justify-center ml-10 bg-white/60 backdrop-blur-md z-10 p-10 rounded-2xl">
        <h3 className="text-2xl font-semibold text-black">Create an Account</h3>
        <p className="text-lg text-slate-700 mt-1 mb-6">Enter your details below.</p>

        <form onSubmit={handleSignUp}>
          <Input label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
          <Input label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
          <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" className="btn-primary mt-4">Sign Up</button>

          <p className="text-sm mt-3">
            Already have an account?
            <Link to="/login" className="text-blue-500 underline ml-1">Login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
