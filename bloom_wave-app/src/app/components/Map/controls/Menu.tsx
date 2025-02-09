'use client';

import React from "react";
import { useRouter } from "next/navigation";

interface MenuProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onToggle }) => {
  const router = useRouter();

  const handleOptionClick = (option: string) => {
    if (option === "Home") {
      router.push("/");
    } else if (option === "Log out") {
      router.push("/profile");
    } else if (option === "Profile") { // a changer
      router.push("/contact");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        zIndex: 2,
      }}
    >
      <button
        onClick={() => onToggle(!isOpen)}
        style={{
          padding: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.55)",
          color: "black",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          width: "150px",
        }}
      >
        ☰ Menu
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            left: "0",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            zIndex: 2,
            minWidth: "150px",
          }}
        >
          <p
            style={{
              margin: "0",
              fontWeight: "bold",
              color: "black",
              cursor: "default",

            }}
          >
            Options
          </p>
          {["Home", "Profile", "Log out"].map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              style={{
                width: "100%",
                padding: "8px",
                margin: "5px 0",
                backgroundColor: ["#007bff", "#28a745", "#dc3545"][index],
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
