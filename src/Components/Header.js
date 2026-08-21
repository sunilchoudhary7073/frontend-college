import React from "react";
import ProfileDropdown from "./ProfileDropdown";
import logo from "../assets/collage logo.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-[1700px] mx-auto px-8">

        <div className="h-24 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-4">

            <a
              href="/"
              className="flex items-center gap-3"
            >
              <div className="text-violet-600">
                <i data-lucide="bus" className="w-10 h-10"></i>
              </div>
               <img style={{width:"130px"}}
                src={logo}
                alt="Jaat University"
                className="w-14 h-14 object-contain"
              />

              <h1 className="text-[42px] font-extrabold tracking-tight text-violet-600">
                {/* Jaat University */}
              </h1>
            </a>

        

          </div>

          {/* Right Side */}

          <div className="flex items-center gap-8">

          

            <div className="h-12 w-px bg-slate-300"></div>

            <ProfileDropdown />

          </div>

        </div>

      </div>
    </header>
  );
}