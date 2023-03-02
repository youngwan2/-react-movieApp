import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <img
        className={styles.header_logo}
        onClick={() => {
          navigate("/");
        }}
        width={90}
        height={45}
        src="/title2.png"
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
      <label className={styles.search_icon_outer}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </label>

      <Search />
    </header>
  );
};

export default Header;
