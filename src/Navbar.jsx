// import { Link } from "react-router-dom";
// import './Navbar.css'
// import logo from "./assets/uiLogo.jpg"
import logo from "./assets/uiLogo.jpg"
// import { useRef, useEffect } from "react";

function Navbar() {
  // const ref4 = useRef(null);
  // useEffect(() => {

  //   const header = ref4.current;

  //   let lastScrollPosition = 0;

  //   window.addEventListener("scroll", function () {
  //     let scrollPosition = window.pageYOffset;

  //     if (scrollPosition > lastScrollPosition) {
  //       header.classList.remove("active");
  //     } else {
  //       header.classList.add("active");
  //     }

  //     lastScrollPosition = scrollPosition <= 0 ? 0 : scrollPosition;
  //   });
  // }, []);
  return (
    <>
      <header className="active" >
        <div className="container">
        <img src={logo} className='icon-svg' alt="UI Logo" />
        </div>
      </header>
    </>
  );
}

export default Navbar;
