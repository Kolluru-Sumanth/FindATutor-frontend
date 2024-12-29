import React, { useState } from 'react';

const SignIn = ({ setShowSignIn }) => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [current, setCurrent] = useState("Sign-In");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSignIn = (event) => {
    event.preventDefault();
    // For now, we're just logging the input data
    console.log("Email:", data.email);
    console.log("Password:", data.password);

    // Close the modal
    setShowSignIn(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#F1F6F9] rounded-lg shadow-lg p-6 w-96 max-h-[90vh] overflow-auto">
        <form onSubmit={onSignIn} className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-[#394867] text-2xl font-bold">{current}</h2>
            <button
              onClick={() => setShowSignIn(false)}
              className="cursor-pointer w-6 h-6 text-[#14274E] font-bold"
            >
              X
            </button>
          </div>

          <div className="space-y-4">
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your Email"
              required
              className="w-full p-3 border border-[#394867] rounded-lg"
            />
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="Password"
              required
              className="w-full p-3 border border-[#394867] rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#394867] text-[#F1F6F9] rounded-lg hover:bg-[#14274E] transition duration-300"
          >
            Sign In
          </button>

          <div className="flex items-center justify-between text-[#9BA4B4] text-sm">
            <label className="flex items-center">
              <input type="checkbox" required className="mr-2" />
              <span>Remember Me</span>
            </label>
            <a href="#" className="text-[#14274E] hover:underline">
              Forgot Password?
            </a>
          </div>

          <p className="text-center text-[#394867]">
            Don't have an account?{" "}
            <span
              onClick={() => setCurrent("Sign-Up")}
              className="text-[#00bfff] cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
