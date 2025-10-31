import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.scss';
import { useAuth } from '../../context/AuthContext';

function Login() {

	const [formData, setFormData] = useState({
		username: "",
		password: ""
	})

	const [error, setError] = useState("");
	const navigate = useNavigate()
	const { login } = useAuth()

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios
				.post("http://localhost:8800/api/auth/login",
					{
						username: formData.username,
						password: formData.password
					}
				)

			login(res.data.user, res.data.token)
			navigate('/')

		} catch (err) {
			console.error('Lỗi đăng nhập:', err.response);
			setError(err.response?.data?.message || "lỗi đăng nhập")
		}
	}
	return (
		<div className={styles.loginPage}>
			<h1 className={styles.logo}>mybook</h1>
			<div className={styles.loginBox}>
				<h2>Đăng nhập Facebook</h2>

				<form className={styles.loginForm} onSubmit={handleSubmit}>

					<div className={styles.formGroup}>
						<input
							type="text"
							placeholder="Email hoặc tên người dùng" // Hiển thị cho user
							name="username" // Tên state
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<input
							type="password"
							placeholder="Mật khẩu"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>

					{error && <p className={styles.errorMessage}>{error}</p>}

					<button type="submit" className={styles.submitBtn}>Đăng nhập</button>
				</form>

				<Link to="/register" className={styles.registerLink}>
					Tạo tài khoản mới
				</Link>
			</div>
		</div>
	);
}

export default Login;