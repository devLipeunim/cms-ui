import logo from "./assets/uiLogo.jpg"

function Navbar() {

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
