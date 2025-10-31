import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext()

//tao provider

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [token, setToken] = useState(null)

	useEffect(() => {
		const storageUser = localStorage.getItem('user')
		const storageToken = localStorage.getItem('token')

		if (storageUser && storageToken) {
			setUser(JSON.parse(storageUser))
			setToken(storageToken)
		}
	}, [])

	const login = (userData, tokenData) => {
		setUser(userData)
		setToken(tokenData)
		localStorage.setItem('user', JSON.stringify(userData))
		localStorage.setItem('token', tokenData)

	}

	const logout = () => {
		setUser(null)
		setToken(null)
		localStorage.removeItem('user')
		localStorage.removeItem('token')
	}

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}