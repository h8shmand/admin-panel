import { useState } from "react";

export default function AnimatedMenuBtn({ isOpen, setIsOpen }) {
  return (
    <div
      className={`animated-btn-container min-[801px]:hidden ${
        isOpen ? "change" : ""
      }`}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="line1"></div>
      <div className="line2"></div>
      <div className="line3"></div>
    </div>
  );
}
