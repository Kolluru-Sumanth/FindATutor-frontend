import React, { useState } from "react";

const SignUp = ({ setShowSignIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name, "Email:", email, "Password:", password);
    setShowSignIn(false); // Close modal on submit
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-[#394867]">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium text-[#394867]">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-[#394867]">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-[#394867]">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full border rounded px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block font-medium text-[#394867]"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#9BA4B5] text-[#394867] py-2 rounded hover:bg-[#607090]"
        >
          Sign Up
        </button>
      </form>
      <p className="text-sm mt-4 text-[#394867]">
        Already have an account?{" "}
        <button
          onClick={() => setShowSignIn(false)} // Close current modal and show SignIn
          className="text-[#607090] underline"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUp;
