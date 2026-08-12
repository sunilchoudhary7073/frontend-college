import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Header />

      <main className="bg-slate-100 min-h-screen py-8">
        <div className="max-w-[1700px] mx-auto px-8">

          <div className="flex gap-8">

            {/* Sidebar */}
            <div className="w-[340px] shrink-0">
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 overflow-x-auto">
              <Outlet />
              {/* Bus Registry */}
              

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}