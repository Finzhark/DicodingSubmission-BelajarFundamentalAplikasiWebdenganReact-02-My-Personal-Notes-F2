import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'
import InputField from './InputField'
import { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'

function RegisterInput({ register }) {
	const [name, onNameChange] = useInput('')
	const [email, onEmailChange] = useInput('')
	const [password, onPasswordChange] = useInput('')
	const [confirmPassword, onConfirmPasswordChange] = useInput('')
	const [showPassword, setShowPassword] = useState(false)

	function onSubmitHandler() {
		if (password !== confirmPassword) {
			toast(locale === 'id'
				? 'Password dan Konfirmasi Password Harus Sama'
				: 'Password and Confirm Password Must Be Same'
			)
		}

		register({
			name,
			email,
			password,
		})
	}

	return (
		<div className='input-register'>
			<InputField
				type='name'
				name='name'
				label='Name'
				value={name}
				onChange={onNameChange}
			/>
			<InputField
				type='email'
				name='email'
				label='Email'
				value={email}
				onChange={onEmailChange}
			/>
			<InputField
				type='password'
				name='password'
				label='Password'
				value={password}
				onChange={onPasswordChange}
			/>		
			<InputField
				type='password'
				name='confirmPassword'
				label='Confirm Password'
				value={confirmPassword}
				onChange={onConfirmPasswordChange}
			/>
			
			<button 
				className='button-register'
				type='button'
				onClick={onSubmitHandler}
			>
				Register
			</button>
		</div>
	)
}

RegisterInput.propTypes = {
	register: PropTypes.func.isRequired,
}

export default RegisterInput
