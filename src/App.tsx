import './App.css';
import { AuthProvider } from 'contexts/Auth';
import { Route, Routes } from 'react-router-dom';
import Dashboard from 'pages/Dashboard';
import NoMatch from 'pages/NoMatch';
import ProtectedRoute from 'components/ProtectedRoute';
import Login from 'pages/Login';
import User from 'pages/User';
import GuestRoute from 'components/GuestRoute';
import Register from 'pages/Register';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          index
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="register"
          element={<Register />}
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
