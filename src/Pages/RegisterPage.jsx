import { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import registerImg from "../../src/assets/register_avatar.png";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPage() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");

  let registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", { name, email, password, role });

      // Success notification
      toast.success('Registration successful! 🎉');

      // Clear the form
      setName('');
      setEmail('');
      setPassword('');
      setRole('');
    } catch (error) {
      console.error("Registration failed:", error);

      // Error notification
      toast.error('Registration failed. Please try again. ❌');
    }
  };

  return (
    <div className="mt-2 grow flex flex-col md:flex-row items-center justify-center px-4">
      
      {/* ToastContainer to display notifications */}
      <ToastContainer />

      {/* Image Section */}
      <div className="mb-4 md:mb-0 md:mr-10">
        <img
          src={registerImg}
          alt="Register Avatar"
          className="w-100 md:w-full"
        />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-sm md:max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl text-center mb-4 font-semibold">Register</h1>
        <form onSubmit={registerUser} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          

          <button className="bg-primary text-white py-2 rounded-md w-full">
            Register
          </button>
        </form>

        {/* Login Redirect */}
        <div className="text-center text-gray-500 mt-3">
          Already a member?{" "}
          <Link to={"/login"} className="underline text-black">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
