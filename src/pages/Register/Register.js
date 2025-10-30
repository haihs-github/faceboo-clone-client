import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.scss';

function Register() {
	const [formData, setFormData] = useState({
		username: '',
		name: '',
		dayOfBirth: '',
		sex: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const [error, setError] = useState('');

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData(prevData => (
			{
				...prevData,
				[e.target.name]: e.target.value
			}
		))
	}

	useEffect(() => {
		if (formData.password !== formData.confirmPassword) {
			setError("Mật khẩu không khớp");
		} else {
			setError('');
		}
	}, [formData.password, formData.confirmPassword])

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (error) return;
		try {
			const res = await axios.post('http://localhost:8800/api/auth/register',
				{
					username: formData.username,
					name: formData.name,
					dayOfBirth: formData.dayOfBirth,
					sex: formData.sex,
					email: formData.email,
					password: formData.password,
				}
			)

			console.log('dang ky thanh cong', res.data);
			navigate('/login')
		} catch (err) {
			console.log('dang ky that bai', err);
			setError(err.response.data.message)
		}
	}

	return (
		<div className={styles.registerPage}>
			<h1 className={styles.logo}>mybook</h1>
			<div className={styles.registerBox}>
				<h2>Tạo tài khoản mới</h2>
				<p>Nhanh chóng và dễ dàng.</p>

				<form className={styles.registerForm} onSubmit={handleSubmit}>

					<div className={styles.formGroup}>
						<label>Username:</label>
						<input
							type="text"
							placeholder="Username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label>Tên:</label>
						<input
							type="text"
							placeholder="Họ và tên"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label>Ngày sinh:</label>
						<input
							type="date"
							name="dayOfBirth"
							value={formData.dayOfBirth}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label>Giới tính:</label>
						<div className={styles.genderGroup}>
							<label className={styles.genderOption}>
								Nam
								<input
									type="radio"
									name="sex"
									value="male"
									onChange={handleChange}
									required
								/>
							</label>
							<label className={styles.genderOption}>
								Nữ
								<input
									type="radio"
									name="sex"
									value="female"
									onChange={handleChange}
								/>
							</label>
							<label className={styles.genderOption}>
								Khác
								<input
									type="radio"
									name="sex"
									value="other"
									onChange={handleChange}
								/>
							</label>
						</div>
					</div>

					<div className={styles.formGroup}>
						<label>Email:</label>
						<input
							type="email"
							placeholder="Số di động hoặc email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label>Mật khẩu mới:</label>
						<input
							type="password"
							placeholder="Mật khẩu mới"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label>Nhập lại mật khẩu:</label>
						<input
							type="password"
							placeholder="Nhập lại mật khẩu"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
						/>
					</div>

					{error && <p className={styles.errorMessage}>{error}</p>}

					<button type="submit" className={styles.submitBtn}>Đăng ký</button>
				</form>

				<a href="/login" className={styles.loginLink}>Bạn đã có tài khoản ư?</a>
			</div>
		</div>
	)
}

export default Register;