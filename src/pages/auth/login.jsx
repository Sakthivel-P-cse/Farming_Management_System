import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthstore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('district');
  const navigate = useNavigate();
  
  // Get authentication state and methods from our store
  const { login, isAuthenticated, isLoading, error, user, clearErrors } = useAuthStore();
  
  // Handle redirection if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      redirectBasedOnRole(user.role);
    }
  }, [isAuthenticated, user]);

  // Redirect user based on their role
  const redirectBasedOnRole = (role) => {
    if (role === 'district') {
      navigate('/');  // District dashboard
    } else if (role === 'village') {
      navigate('/village-dashboard');  // Village dashboard
    }
  };
  
  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Prefill email based on role selection for demo purposes
    const loginEmail = selectedRole === 'district' 
      ? 'district@example.com' 
      : 'village@example.com';
    
    // Use the email from input if provided, otherwise use the demo email
    const finalEmail = email || loginEmail;
    
    // Use provided password or default for demo
    const finalPassword = password || (selectedRole === 'district' ? 'district123' : 'village123');
    
    // Call login method from auth store
    login(finalEmail, finalPassword);
  };
  
  // Demo login with selected role
  const handleDemoLogin = (role) => {
    setSelectedRole(role);
    const demoEmail = role === 'district' ? 'district@example.com' : 'village@example.com';
    const demoPassword = role === 'district' ? 'district123' : 'village123';
    
    setEmail(demoEmail);
    setPassword(demoPassword);
    
    // Auto-login with demo credentials
    login(demoEmail, demoPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-gray-200 shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-700 mb-2 text-center">Login</h2>
        <p className="text-center text-gray-600 mb-6">Welcome back to Vital Dashboard</p>
        
        {/* Role Selection */}
        <div className="mb-6">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              className={`flex-1 py-3 text-center font-medium ${
                selectedRole === 'district' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedRole('district')}
              type="button"
            >
              District Officer
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium ${
                selectedRole === 'village' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedRole('village')}
              type="button"
            >
              Village Officer
            </button>
          </div>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={selectedRole === 'district' ? "district@example.com" : "village@example.com"}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          
          {/* Display error if any */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        {/* Quick Demo Login Buttons */}
        <div className="mt-6 space-y-3">
          <p className="text-center text-gray-600 text-sm font-medium">Quick Demo Login</p>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => handleDemoLogin('district')}
              className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-700 transition-colors"
              type="button"
            >
              Login as District Officer
            </button>
            <button 
              onClick={() => handleDemoLogin('village')}
              className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-700 transition-colors"
              type="button"
            >
              Login as Village Officer
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          Forgot your password? <a href="#" className="text-green-600 hover:underline">Reset here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
