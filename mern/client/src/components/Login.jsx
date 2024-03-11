import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Login() {
  // State to manage the email and password fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    // Here you can implement the logic to handle login
    console.log("Login clicked");
    console.log("Email:", email);
    console.log("Password:", password);
    // Example: You can send the email and password to an API for authentication
  };

  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img
            alt="Rocket Logo"
            className="h-20 inline"
            src="src/images/RocketElevatorsLogo.png"
          ></img>
        </NavLink>
      </nav>

      <form onSubmit={handleLogin} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full h-9 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
