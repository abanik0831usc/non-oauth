import React from 'react'
import './header.css'

export default function Header() {
	return (
		<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
			<div className="image" />
			<h1>Login to Intuit Bank</h1>
		</div>
	)
}