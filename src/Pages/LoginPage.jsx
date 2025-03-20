import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});

  // ✅ Form Validation
  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!email) {
      formErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      formErrors.email = "Invalid email format";
    }

    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // ✅ Handle form submission
  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting.");
      return;
    }

    try {
      const { data } = await axios.post('/login', {
        email,
        password,
      }, {
        withCredentials: true,  // Send cookies
      });

      // ✅ Display success message
      toast.success('Login successful');

      // ✅ Set user data
      setUser(data.user);

      // ✅ Trigger alert only after setting the user state
      setTimeout(() => {
        // alert('Login successful');
        setRedirect(true);  // Redirect after alert
      }, 500);  // Slight delay to ensure the state updates properly

    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        toast.error(error.response.data.error || 'Login failed');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    
    <div className="mt-4 grow flex items-center justify-around">
      <ToastContainer />
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className={`border ${errors.email ? "border-red-500" : "border-gray-300"} p-2 w-full mb-2`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className={`border ${errors.password ? "border-red-500" : "border-gray-300"} p-2 w-full mb-2`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button className="primary w-full">Login</button>

          <div className="text-center py-2 text-gray-500">
            Don't have an account?{" "}
            <Link className="underline text-black" to="/register">Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
