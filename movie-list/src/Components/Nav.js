import React, { useEffect, useState } from "react";
import "./Nav.css";

export default function Nav() {
  const [backgroudDark, setBackgroundDark] = useState();

  // add listener, this works when scroll down
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackgroundDark(true);
      } else {
        setBackgroundDark(false);
      }
    });
    // this will above listener , trigger when page get refresh
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);
  return (
    <div className={`nav ${backgroudDark && "nav__background_dark"}`}>
      <h3 className="nav__title">Netflix</h3>
      <span className="nav__avatar">Sam</span>
    </div>
  );
}
