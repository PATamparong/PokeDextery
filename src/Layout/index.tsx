import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header className="mx-auto w-full px-6" />
      <main className="flex-grow mx-auto w-full px-6 bg-gray-100">
        <Outlet />
      </main>
      <Footer className="mx-auto w-full px-6" />
    </div>
  );
};

export default Layout;
