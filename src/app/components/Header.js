import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState("up");
  const [prevScroll, setPrevScroll] = useState(0);

  useEffect(() => {
    const threshold = 10;
    let lastScroll = window.pageYOffset;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;
      if (Math.abs(scrollY - lastScroll) < threshold) return;

      setScrollDir(scrollY > lastScroll ? "down" : "up");
      lastScroll = scrollY > 0 ? scrollY : 0;
    };

    const onScroll = () => {
      window.requestAnimationFrame(updateScrollDir);
      setPrevScroll(window.pageYOffset);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrollDir, prevScroll };
};

const Header = () => {
  const { scrollDir, prevScroll } = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = ["Work", "About", "Services", "Ideas", "Careers", "Contact"];

  return (
    <header
      className={`fixed w-full transition-all duration-300 z-50 ${scrollDir === "down" ? "-translate-y-full" : "translate-y-0"
        } ${prevScroll > 0 ? "bg-orange-500/90 opacity-80" : "bg-orange-500"}`}
    >
      <div className="mx-auto md:mx-10 px-4 py-4 flex justify-between items-center">
        <button onClick={() =>window.location.href="/"}>
          <img
            src="https://suitmedia.com/_ipx/w_100&f_webp&q_100/assets/img/site-logo.png"
            alt="Suitmedia"
            className="h-8 brightness-0 invert"
          />
        </button>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname.includes(item.toLowerCase());
              return (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase()}`}
                    className={`text-white hover:border-b-2 hover:border-white pb-1 transition-all ${isActive ? "border-b-2 border-white" : ""
                      }`}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col space-y-4 px-4 py-6">
            {navItems.map((item) => {
              const isActive = location.pathname.includes(item.toLowerCase());
              return (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase()}`}
                    className={`text-white hover:border-b-2 hover:border-white pb-1 transition-all block ${isActive ? "border-b-2 border-white" : ""
                      }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
