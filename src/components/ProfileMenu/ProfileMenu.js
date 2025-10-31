import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileMenu.module.scss'; // <-- Dùng file style riêng
import { CgProfile } from "react-icons/cg";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function ProfileMenu({ user, logout }) {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const popupRef = useRef(null);
	const avatarRef = useRef(null);
	const navigate = useNavigate();

	// Logic xử lý bấm ra ngoài để tắt popup
	useEffect(() => {
		const handleClickOutside = (event) => {
			// Nếu bấm ra ngoài cả popup VÀ avatar
			if (
				popupRef.current && !popupRef.current.contains(event.target) &&
				avatarRef.current && !avatarRef.current.contains(event.target)
			) {
				setIsPopupOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []); // Chạy 1 lần duy nhất

	const handleLogout = () => {
		logout();
		navigate('/login');
	}

	return (
		<>
			{/* --- PHẦN AVATAR (NÚT BẤM) --- */}
			<div
				className={styles.profileButton}
				ref={avatarRef}
				onClick={() => setIsPopupOpen(!isPopupOpen)} // Bật/tắt popup
			>
				{user?.profilePicture ? (
					<img src={user.profilePicture} alt="Profile" className={styles.profileImg} />
				) : (
					<div className={styles.profileImg}>
						{user?.username ? user.username[0].toUpperCase() : '?'}
					</div>
				)}
			</div>

			{/* --- PHẦN POPUP MENU (chỉ hiện khi state là true) --- */}
			{isPopupOpen && (
				<div className={styles.popupMenu} ref={popupRef}>
					{/* Header của Popup (Link tới profile) */}
					<Link to={`/profile/${user._id}`} className={styles.popupHeaderLink}>
						<div className={styles.popupHeader}>
							{user?.profilePicture ? (
								<img src={user.profilePicture} alt="Profile" className={styles.popupProfileImg} />
							) : (
								<div className={styles.popupProfileImg}>
									{user?.username ? user.username[0].toUpperCase() : '?'}
								</div>
							)}
							<span className={styles.popupUsername}>{user?.name || user?.username}</span>
						</div>
					</Link>

					{/* Item 1: Xem trang cá nhân */}
					<Link to={`/profile/${user._id}`} className={styles.popupItem}>
						<CgProfile className={styles.popupIcon} />
						<span>Xem trang cá nhân</span>
					</Link>

					{/* Item 2: Đăng xuất */}
					<div className={styles.popupItem} onClick={handleLogout}>
						<IoMdExit className={styles.popupIcon} />
						<span>Đăng xuất</span>
					</div>
				</div>
			)}
		</>
	);
}

export default ProfileMenu;