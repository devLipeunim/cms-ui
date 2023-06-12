import { useState } from "react";
import Swal from "sweetalert2";
import logo from "./assets/LogoUi.png"
import styles from "./Header.module.css"
import {AiOutlineBars} from 'react-icons/ai'
import { useNavigate } from "react-router";
function Navbar() {
     const navigate = useNavigate()
     const [open, setOpen] = useState(false)
     let claims = JSON.parse(localStorage.getItem('claims'))

     const handleSignout = () => {
          Swal.fire({
               title: 'Are you sure?',
               text: 'You want to logout now? 😏',
               icon: 'info',
               showDenyButton: true,
               confirmButtonText: 'Logout ',
               denyButtonText: `close`,
             }).then((result) => {
               /* Read more about isConfirmed, isDenied below */
               if (result.isConfirmed) {
                    localStorage.removeItem('claims')
                    localStorage.removeItem('token')
                    navigate('/');
               } else if (result.isDenied) {
                    // Do nothing
               }
          })
          
     } 
  return (
    <>
      <header className="active">
        <div className={`${styles.header} container`}>
          <img src={logo} className="icon-svg" alt="UI Logo" />
          <>
          <p className={styles.username}><strong>Hi {claims.userName? claims.userName: claims.name}</strong></p>
          <nav>
               <ul className={styles.menu}>
                   {claims.userName && <li onClick={() => navigate('/admin')}>Manage Timetable</li>}
                    {claims.userName && <li onClick={() => navigate('/admin/manage-venue')}>Manage Venue</li>}
                    {claims.matricNumber && <li onClick={() => navigate('/timetables')}>Timetables</li>}
                    {claims.matricNumber&&<li onClick={() => navigate('/cgpa')}>Calculate CGPA</li>}
                    {!open && <button onClick={handleSignout}>Logout</button>}
               </ul>
          </nav>
          
          </>

         {open&& <>
          <p><strong>Hi {claims.userName? claims.userName: claims.name}</strong></p>
          <nav>
               <ul className={styles.menu__mobile}>
                    {claims.userName && <li onClick={() => navigate('/admin')}>Manage Timetable</li>}
                    {claims.userName && <li onClick={() => navigate('/admin/manage-venue')}>Manage Venue</li>}
                    {claims.matricNumber && <li onClick={() => navigate('/timetables')}>Timetables</li>}
                    {claims.matricNumber&&<li onClick={() => navigate('/cgpa')}>Calculate CGPA</li>}
                    {open && <button onClick={handleSignout}>Logout</button>}
               </ul>
          </nav>
        
          </>}
        </div>
        <AiOutlineBars
          fontSize={40}
          className={styles.bars}
          onClick={() => setOpen(!open)}
        />
      </header>
    </>
  );
}

export default Navbar;
