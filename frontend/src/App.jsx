import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import LandingPage from './features/consumer/LandingPage';
import ProductDetailsPage from './features/consumer/ProductDetailsPage';
import CategoryPage from './features/consumer/CategoryPage';
import HomePage from './features/consumer/HomePage';
import AIChatWidget from './components/AIChatWidget';
import useAuthStore from './store/authStore';

import useUIStore from './store/uiStore';

import { useLocation } from 'react-router-dom';
import SellerDashboard from './features/seller/SellerDashboard';
import Footer from './components/Footer';
import MinimalFooter from './components/MinimalFooter';

// Main Layout Wrapper for Responsive shrinking
const MainLayout = ({ children }) => {
  const { isAIChatOpen } = useUIStore();
  const location = useLocation();

  // User requested Footer ONLY on Landing Page
  const isLandingPage = location.pathname === '/';
  // User requested NO Footer on Product Details Page
  const isProductPage = location.pathname.startsWith('/product/');

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-300 ease-in-out ${isAIChatOpen ? 'mr-0 md:mr-[400px]' : 'mr-0'
        }`}
    >
      <div className="flex-grow">
        {children}
      </div>
      {isLandingPage ? <Footer /> : !isProductPage && <MinimalFooter />}
    </div>
  );
};

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const { isAuthenticated, user } = useAuthStore();

  // Helper to get dashboard route based on user role
  const getDashboardRoute = () => {
    if (!user?.roles || user.roles.length === 0) return '/';

    if (user.roles.includes('ADMIN')) return '/admin';
    if (user.roles.includes('SELLER')) return '/seller';
    if (user.roles.includes('DELIVERY_BOY')) return '/delivery';
    return '/dashboard';
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/category/:category" element={<CategoryPage />} /> {/* New Category Route */}

            {/* Auth Routes - redirect if already logged in */}
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <LoginPage />
                ) : (
                  <Navigate to={getDashboardRoute()} replace />
                )
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ? (
                  <RegisterPage />
                ) : (
                  <Navigate to={getDashboardRoute()} replace />
                )
              }
            />

            {/* Consumer Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['CONSUMER']}>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            {/* Seller Routes */}
            <Route
              path="/seller"
              element={
                <ProtectedRoute allowedRoles={['SELLER', 'ADMIN']}>
                  <SellerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Admin Dashboard
                      </h1>
                      <p className="text-gray-600">Coming Soon...</p>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Delivery Routes */}
            <Route
              path="/delivery"
              element={
                <ProtectedRoute allowedRoles={['DELIVERY_BOY', 'ADMIN']}>
                  <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Delivery Dashboard
                      </h1>
                      <p className="text-gray-600">Coming Soon...</p>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Unauthorized */}
            <Route
              path="/unauthorized"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized</h1>
                    <p className="text-gray-600 mb-4">
                      You don't have permission to access this page.
                    </p>
                    <Link to="/" className="text-blue-600 hover:underline">
                      Go to Home
                    </Link>
                  </div>
                </div>
              }
            />

            {/* Catch all - redirect to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* AI Chat Widget - Global */}
      <AIChatWidget />
    </QueryClientProvider>
  );
}

export default App;
