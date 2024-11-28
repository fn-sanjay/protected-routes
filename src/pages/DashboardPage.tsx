import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'; // Assuming AuthContext is correctly set up

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  // Simulate loading state (e.g., fetching user data or checking authentication)
  useEffect(() => {
    const fetchUserData = async () => {
      // Simulate a delay for loading state
      setTimeout(() => {
        setLoading(false);
      }, 500); // 500ms delay for demonstration
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-lg text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome Back, {user?.email}!
          </h2>
          <p className="text-gray-600 mb-4">
            You're successfully logged in. Enjoy your personalized dashboard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Stats */}
            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-700">Total Projects</h3>
              <p className="text-2xl font-bold text-blue-600">5</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-700">Recent Activity</h3>
              <p className="text-2xl font-bold text-blue-600">Updated 2 tasks</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-700">Messages</h3>
              <p className="text-2xl font-bold text-blue-600">3 new</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-blue-600 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; Hi Nallabhagan.</p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
