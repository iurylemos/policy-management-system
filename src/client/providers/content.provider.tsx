import React from "react";
import Sidebar from "@/src/client/components/molecules/Sidebar";
import MobileMenu from "@/src/client/components/molecules/MobileMenu";

type ContentProviderProps = {
  children: React.ReactNode;
};

const ContentProvider: React.FC<ContentProviderProps> = ({
  children,
}): JSX.Element => {
  return (
    <div className="relative min-h-screen md:flex bg-gray-200">
      <MobileMenu />
      <Sidebar />
      <div className="flex-1 p-4 md:p-10">{children}</div>
    </div>
  );
};

export default ContentProvider;
