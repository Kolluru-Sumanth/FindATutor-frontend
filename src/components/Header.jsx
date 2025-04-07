import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// SignIn Modal Component (reused for both tutor and student)
const SignInModal = ({ setShowModal, userType, onSuccessfulLogin }) => {
  const API = import.meta.env.VITE_API;
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission with API calls
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Determine the API endpoint based on userType and isSignUp
    const endpoint = `${API}/api/auth/${userType}/${isSignUp ? "signup" : "login"}`;
    // Prepare data to send: include name only for signup
    const submitData = isSignUp
      ? formData
      : { email: formData.email, password: formData.password };
  
    try {
      // Make the POST request with Axios
      const response = await axios.post(endpoint, submitData);
      const data = response.data;
      
      // Add userType to the data before saving
      const userData = { ...data, userType };
  
      // Save user data to localStorage
      localStorage.setItem("currentUser", JSON.stringify(userData));
  
      // Notify parent component of successful login
      onSuccessfulLogin(userData);
  
      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#14274E]">
            {isSignUp ? "Create Account" : "Welcome Back"}
            <span className="block text-sm font-normal text-[#394867] mt-1">
              {userType === "tutor" ? "For Tutors" : "For Students"}
            </span>
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="w-8 h-8 rounded-full bg-[#F1F6F9] flex items-center justify-center text-[#14274E] hover:bg-[#9BA4B4] hover:text-white transition-all duration-200"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <>
              <div>
                <label className="block text-sm font-medium text-[#394867] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#9BA4B4]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#394867] focus:border-transparent transition-all duration-200"
                  placeholder="Your name"
                  required={isSignUp}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#394867] mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#9BA4B4]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#394867] focus:border-transparent transition-all duration-200"
                  placeholder="Choose a username"
                  required={isSignUp}
                />
              </div>
              {userType === "tutor" && (
                <div>
                  <label className="block text-sm font-medium text-[#394867] mb-1">
                    Profession/Specialization
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#9BA4B4]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#394867] focus:border-transparent transition-all duration-200"
                    placeholder="e.g. Math Teacher, Physics Tutor"
                    required={isSignUp}
                  />
                </div>
              )}
              {userType === "student" && (
                <div>
                  <label className="block text-sm font-medium text-[#394867] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#9BA4B4]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#394867] focus:border-transparent transition-all duration-200"
                    placeholder="Your phone number"
                    required={isSignUp}
                  />
                </div>
              )}
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-[#394867] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-[#9BA4B4]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#394867] focus:border-transparent transition-all duration-200"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#394867] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-[#9BA4B4]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#394867] focus:border-transparent transition-all duration-200"
              placeholder="••••••••"
              required
            />
          </div>

          {!isSignUp && (
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded text-[#394867] focus:ring-[#394867] h-4 w-4"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-[#394867]"
                >
                  Remember Me
                </label>
              </div>
              <a
                href="#"
                className="text-[#394867] hover:text-[#14274E] hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#14274E] to-[#394867] text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </button>

          <div className="text-center text-sm text-[#394867] mt-4">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#14274E] font-medium hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// UserMenu Component - shown when user is logged in
const UserMenu = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Set default avatar if not provided
  const avatarUrl = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=14274E&color=fff`;
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img 
          src={avatarUrl} 
          alt={user.name} 
          className="w-10 h-10 rounded-full border-2 border-[#14274E] object-cover"
        />
        <span className="hidden md:block text-[#14274E] font-medium">{user.name}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 text-[#14274E] transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-10 animate-fadeIn">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-[#14274E]">{user.name}</p>
            <p className="text-xs text-[#394867]">{user.email}</p>
          </div>
          
          <Link to={`/${user.userType === "tutor" ? "TutorDashboard" : "StudentDashboard"}`} 
                className="block px-4 py-2 text-sm text-[#394867] hover:bg-[#F1F6F9] hover:text-[#14274E]">
            Dashboard
          </Link>
          
          
          <button
            onClick={() => {
              onLogout();
              navigate("/");
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 border-t border-gray-100 mt-1"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

// Main Header Component
const Header = () => {
  const [showTutorModal, setShowTutorModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check for existing user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);
  
  const handleLogin = (user) => {
    setCurrentUser(user);
    
    // Redirect based on user type
    if (user.userType === "tutor") {
      navigate("/TutorDashboard");
    } else if (user.userType === "student") {
      navigate("/StudentDashboard");
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
  };

  // Check if current route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F1F6F9] backdrop-blur-lg border-b border-[#9BA4B4]/20 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#14274E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h1 className="ml-2 text-2xl font-extrabold bg-gradient-to-r from-[#14274E] to-[#9BA4B4] bg-clip-text text-transparent">
                FindATutor
              </h1>
            </Link>
          </div>
          
          {/* Middle: Navigation (responsive with mobile menu) */}
          <nav className={`hidden md:flex space-x-6 ${!currentUser ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>            
            {currentUser && currentUser.userType === "student" && (
              <>
                <Link 
                  to="/filter" 
                  className={`text-[#394867] hover:text-[#14274E] font-medium ${isActiveRoute('/tutors') ? 'text-[#14274E] font-semibold' : ''}`}
                >
                  Find Tutors
                </Link>
                <Link 
                  to="/studentDashboard" 
                  className={`text-[#394867] hover:text-[#14274E] font-medium ${isActiveRoute('/my-sessions') ? 'text-[#14274E] font-semibold' : ''}`}
                >
                  My Sessions
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button - only visible on small screens */}
          {currentUser && (
            <button className="md:hidden text-[#14274E] focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          {/* Right: Authentication Buttons or User Menu */}
          <div className="flex items-center space-x-4">
            {!currentUser ? (
              <>
                {/* Buttons for non-logged-in users */}
                <button 
                  onClick={() => setShowTutorModal(true)}
                  className="relative py-2 px-6 text-[#14274E] text-base font-medium rounded-full overflow-hidden border-2 border-[#14274E] transition-all duration-300 ease-in-out hover:bg-[#14274E] hover:text-white"
                >
                  Become a Tutor
                </button>

                <button 
                  onClick={() => setShowStudentModal(true)}
                  className="relative py-2 px-6 text-[#F1F6F9] text-base font-bold rounded-full overflow-hidden bg-[#14274E] shadow-md transition-all duration-400 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#394867] before:to-[#9BA4B4] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
                >
                  Sign In
                </button>
              </>
            ) : (
              /* User menu for logged-in users */
              <UserMenu user={currentUser} onLogout={handleLogout} />
            )}
          </div>
        </div>
      </header>

      {/* Mobile navigation menu - shown when mobile menu button is clicked */}
      {/* To be implemented */}

      {/* Modals */}
      {showTutorModal && 
        <SignInModal 
          setShowModal={setShowTutorModal} 
          userType="tutor" 
          onSuccessfulLogin={handleLogin} 
        />
      }
      
      {showStudentModal && 
        <SignInModal 
          setShowModal={setShowStudentModal} 
          userType="student" 
          onSuccessfulLogin={handleLogin} 
        />
      }
    </>
  );
};

export default Header;