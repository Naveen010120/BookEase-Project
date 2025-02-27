import { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import registerImg from "../../src/assets/register_avatar.png";
import axios from "axios";

function RegisterPage() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role,setRole]=useState('')

  let registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", { name, email, password,role });
      alert("Registration successful");
    } catch {
      alert("Registration failed. Please try again");
    }
    setName('');
    setEmail('');
    setPassword('');
    setRole('')
   return <p>Go to login page</p>
  };

  return (
    <div className="mt-2 grow flex flex-col md:flex-row items-center justify-center px-4">
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
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <div className="flex justify-center w-full">
            <select
              className="w-48 p-2 border border-gray-300 rounded-md"
              defaultValue="" value={role} onChange={e=>setRole(e.target.value)}
            >
              <option value="" disabled>
                Select Mode
              </option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

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
