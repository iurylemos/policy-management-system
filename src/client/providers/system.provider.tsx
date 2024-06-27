"use client";

import React from "react";
import ContentProvider from "./content.provider";
import { ToastContainer } from "react-toastify";

type SystemProviderProps = {
  children: React.ReactNode;
};

const SystemProvider: React.FC<SystemProviderProps> = ({
  children,
}): JSX.Element => {
  return (
    <ContentProvider>
      <ToastContainer />
      {children}
    </ContentProvider>
  );
};

export default SystemProvider;
