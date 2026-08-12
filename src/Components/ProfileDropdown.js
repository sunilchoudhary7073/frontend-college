
import { useState, useRef, useEffect } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ============================
  // CLOSE DROPDOWN OUTSIDE CLICK
  // ============================

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ============================
  // LOGOUT
  // ============================

  const handleLogout = () => {
    // Remove admin token
    localStorage.removeItem("adminToken");

    // Close dropdown
    setOpen(false);

    // Go to Admin Login
    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >

      {/* PROFILE BUTTON */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2"
      >
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
          alt="Admin"
          className="w-9 h-9 rounded-full border object-cover"
        />

        <span className="hidden md:block text-sm font-semibold">
          Profile
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN MENU */}

      {open && (
        <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border overflow-hidden z-50">

          {/* PROFILE */}

          <button
            type="button"
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            <User size={18} />
            <span>Profile</span>
          </button>

          {/* LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>

        </div>
      )}

    </div>
  );
}

