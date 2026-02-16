import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const Landing = lazy(() => import('./Pages/Landing'));
const Login = lazy(() => import('./Pages/Login'));
const SignUp = lazy(() => import('./Pages/SignUp'));
const ForgotPassword = lazy(() => import('./Pages/ForgotPassword'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Income = lazy(() => import('./Pages/Income'));
const Expenses = lazy(() => import('./Pages/Expenses'));
const Tax = lazy(() => import('./Pages/Tax'));
const Settings = lazy(() => import('./Pages/Settings'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F111A]">
      <div className="loader animate-spin rounded-full h-10 w-10 border-2 border-blue-500 border-t-transparent" />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <Income />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tax"
            element={
              <ProtectedRoute>
                <Tax />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
