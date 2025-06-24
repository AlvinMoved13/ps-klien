import { Outlet } from 'react-router-dom';
import Footer from "../components/organism/Footer";
import Header from "../components/organism/Header";

const AuthLayout = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
    <Header />
    <main className="flex-grow flex items-center justify-center">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default AuthLayout;
