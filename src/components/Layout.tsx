import React, { ReactNode } from "react";
import Header from "@/components/Home/Header";
import FooterPage from "./Footer/FooterPage";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <FooterPage />
    </div>
  );  
};

export default Layout;
