import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import AppRoutes from './routes/AppRoutes'; // Assuming you have AppRoutes set up
import { AuthProvider } from './context/AuthContext'; // Your Auth context provider

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes /> {/* This will now have access to routing */}
      </AuthProvider>
    </Router>
  );
}

export default App;
