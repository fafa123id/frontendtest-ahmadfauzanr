'use client'
import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';

const Banner = () => {
  const [offset, setOffset] = useState(0);
  const location = usePathname();
  const getBannerContent = () => {
    switch (location) {
      case "/ideas":
        return {
          title: "Ideas",
          description: "Where all our great things begin",
        };
      case "/work":
        return {
          title: "Our Work",
          description: "Explore the projects we’ve completed",
        };
      case "/about":
        return {
          title: "About Us",
          description: "Learn more about our mission and values",
        };
      case "/services":
        return {
          title: "Our Services",
          description: "Discover the services we offer to help you",
        };
      case "/careers":
        return {
          title: "Careers",
          description: "Join our talented team and make an impact",
        };
      case "/contact":
        return {
          title: "Contact Us",
          description: "Get in touch with us for any inquiries",
        };
      default:
        return {
          title: "Ideas",
          description: "Where all our great things begin",
        };
    }
  };

  const { title, description } = getBannerContent();

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/ideas-idea-vision-design-plan-objective-mission-concept_53876-167112.jpg?semt=ais_hybrid')`,
          transform: `translateY(${offset * 0.5}px)`
        }}
      />
      <div
        className="relative h-full flex items-center justify-center text-white"
        style={{ transform: `translateY(${offset * 0.2}px)` }}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl">{description}</p>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-20 bg-white transform -skew-y-3 translate-y-10" />
    </div>
  );
};

export default Banner;
