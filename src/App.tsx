import { AuthProvider } from 'contexts/Auth';
import { Route, Routes } from 'react-router-dom';
import Dashboard from 'pages/Dashboard';
import NoMatch from 'pages/NoMatch';
import ProtectedRoute from 'routes/ProtectedRoute';
import Login from 'pages/Login';
import User from 'pages/User';
import GuestRoute from 'routes/GuestRoute';
import Register from 'pages/Register';
import Layout from 'layouts/Layout';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route
            path='login'
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route path='register' element={<Register />} />
          <Route
            path='dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path='user'
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<NoMatch />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
