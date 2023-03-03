import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const Header = () => {
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

        <nav className={styles.header_menu}>
          <Link className={styles.link} to={"/"}>
            Home
          </Link>
          <Link className={styles.link} to={"/movies"}>
            Movies
          </Link>
        </nav>
      </div>
      <Search />
    </header>
  );
};

export default Header;
