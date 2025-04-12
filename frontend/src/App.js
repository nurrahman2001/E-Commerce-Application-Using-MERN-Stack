import { useSelector } from 'react-redux';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { selectIsAuthChecked, selectLoggedInUser } from './features/auth/AuthSlice';
import { Logout } from './features/auth/components/Logout';
import { Protected } from './features/auth/components/Protected';
import { useAuthCheck } from './hooks/useAuth/useAuthCheck';
import { useFetchLoggedInUserDetails } from './hooks/useAuth/useFetchLoggedInUserDetails';
import {
  AddProductPage,
  AdminOrdersPage,
  CartPage,
  CheckoutPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  OrderSuccessPage,
  OtpVerificationPage,
  ProductDetailsPage,
  ProductUpdatePage,
  ResetPasswordPage,
  SignupPage,
  UserOrdersPage,
  UserProfilePage,
  WishlistPage,
} from './pages';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminSignupPage } from './pages/AdminSignupPage';
import { ProductListPage } from './pages/ProductListPage';
import { SearchPage } from './pages/SearchPage';
import { AdminVerificationPage } from './pages/AdminVerificationPage';

function App() {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const loggedInUser = useSelector(selectLoggedInUser);

  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);

  const publicRoutes = [
    { path: '/signup', element: <SignupPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/verify-otp', element: <OtpVerificationPage /> },
    { path: '/admin-verify-otp', element: <AdminVerificationPage /> },
    { path: '/forgot-password', element: <ForgotPasswordPage /> },
    { path: '/reset-password/:userId/:passwordResetToken', element: <ResetPasswordPage /> },
    { path: '/admin/login', element: <AdminLoginPage /> },
    { path: '/admin/signup', element: <AdminSignupPage /> },
  ];

  const userRoutes = [
    { path: '/', element: <HomePage /> }, // Default homepage
    { path: '/cart', element: <CartPage /> },
    { path: '/profile', element: <UserProfilePage /> },
    { path: '/checkout', element: <CheckoutPage /> },
    { path: '/order-success/:id', element: <OrderSuccessPage /> },
    { path: '/orders', element: <UserOrdersPage /> },
    { path: '/wishlist', element: <WishlistPage /> },
    { path: '/products', element: <ProductListPage /> },
    { path: '/search', element: <SearchPage /> },
    { path: '/product-details/:id', element: <ProductDetailsPage /> },
    { path: '/logout', element: <Logout /> },
  ];

  const adminRoutes = [
    { path: '/admin/dashboard', element: <AdminDashboardPage /> },
    { path: '/admin/product-update/:id', element: <ProductUpdatePage /> },
    { path: '/admin/add-product', element: <AddProductPage /> },
    { path: '/admin/orders', element: <AdminOrdersPage /> },
  ];

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Default Home Route */}
        <Route path="/" element={<HomePage />} />

        {/* Public Routes */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* Admin Routes - Separate authentication */}
        {adminRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={<Protected adminOnly>{element}</Protected>} />
        ))}

        {/* User Routes */}
        {userRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              ["/cart", "/wishlist", "/checkout", "/orders", "/profile"].includes(path)
                ? <Protected>{element}</Protected>
                : element
            }
          />
        ))}

        {/* Catch-all Route - Redirect to Home */}
        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );

  return isAuthChecked ? <RouterProvider router={routes} /> : '';
}

export default App;
