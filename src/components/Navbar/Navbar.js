// src/components/Navbar/Navbar.js
import React from 'react';
import styles from './Navbar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

// Import Icons
import { FaFacebook, FaSearch, FaUserFriends, FaBell, FaHeart } from 'react-icons/fa';
import { IoTrendingUp } from 'react-icons/io5';
import { BsGridFill } from 'react-icons/bs';
import { FaFacebookMessenger } from 'react-icons/fa';


function Navbar() {
	const { user, logout } = useAuth(); // Lấy user từ context
	const location = useLocation(); // Lấy đường dẫn hiện tại

	// Hàm kiểm tra active
	const isActive = (path) => location.pathname === path;

	return (
		<nav className={styles.navbarContainer}>
			{/* --- PHẦN BÊN TRÁI --- */}
			<div className={styles.navbarLeft}>
				<Link to="/">
					<h1 className={styles.logo}>mybook</h1>
				</Link>
				<div className={styles.searchBar}>
					<FaSearch className={styles.searchIcon} />
					<input type="text" placeholder="Tìm kiếm trên Mybook" />
				</div>
			</div>

			{/* --- PHẦN Ở GIỮA --- */}
			<div className={styles.navbarCenter}>
				<Link
					to="/trending"
					className={`${styles.navLink} ${isActive('/trending') ? styles.active : ''}`}
				>
					<IoTrendingUp />
				</Link>

				<Link
					to="/friends"
					className={`${styles.navLink} ${isActive('/friends') ? styles.active : ''}`}
				>
					<FaUserFriends />
				</Link>

				<Link
					to="/follower"
					className={`${styles.navLink} ${isActive('/flower') ? styles.active : ''}`}
				>
					<FaHeart />
				</Link>
			</div>

			{/* --- PHẦN BÊN PHẢI --- */}
			<div className={styles.navbarRight}>

				<div className={styles.iconButton}>
					<FaFacebookMessenger />
				</div>
				<div className={styles.iconButton}>
					<FaBell />
				</div>
				{/* TODO: Thay thế bằng Link to profile */}
				{<ProfileMenu user={user} logout={logout} />}
			</div>
		</nav>
	);
}

export default Navbar;