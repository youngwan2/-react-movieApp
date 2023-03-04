import React,{useState} from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Search from "./Search";
import { useNavigate } from "react-router-dom";


const Header = () => {

  const [menuDisplay, setMenuDisplay] = useState('')
  console.log(menuDisplay)


  const displayFunc = () =>{
    if(menuDisplay === '') return  setMenuDisplay(styles.display_on)
    else setMenuDisplay('')
  }

  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className={styles.header_logo_menu_con}>
        <img
          className={styles.header_logo}
          onClick={() => {
            navigate("/");
          }}
          width={90}
          height={45}
          src={process.env.PUBLIC_URL + "/title2.png"}
          alt="site_name"
        ></img>

        <nav className={`${styles.header_menu} ${menuDisplay}`}>
          <Link className={styles.link} to={"/"}>
            Home
          </Link>
          <Link className={styles.link} to={"/movies"}>
            Movies
          </Link>
        </nav>
      </div>
      <div className={styles.header_icon_box}>
        <Search />
        {/* 메뉴 버튼 */}
        <FontAwesomeIcon
          onClick={displayFunc}
          className={styles.menu}
          icon={faBars}
        ></FontAwesomeIcon>
      </div>
    </header>
  );
};

export default Header;
