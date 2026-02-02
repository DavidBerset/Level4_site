import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/pages/HomePage';
import SonorizationPage from '@/components/pages/SonorizationPage';
import StudioPage from '@/components/pages/StudioPage';
import AboutPage from '@/components/pages/AboutPage';

// Layout component that includes ScrollToTop, Header, and Footer
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "sonorisation",
        element: <SonorizationPage />,
      },
      {
        path: "studio",
        element: <StudioPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
