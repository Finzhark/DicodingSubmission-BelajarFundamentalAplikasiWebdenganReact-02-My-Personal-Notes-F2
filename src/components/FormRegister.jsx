import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useInput from '../hooks/useInput'
import InputFieldForm from './InputFieldForm'

function FormRegister({ register }) {
	const [name, onNameChange] = useInput('')
	const [email, onEmailChange] = useInput('')
	const [password, onPasswordChange] = useInput('')
	const [confirmPassword, onConfirmPasswordChange] = useInput('')
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	function onSubmitHandler() {
		if (password !== confirmPassword) {
			alert(locale === 'id'
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
			<InputFieldForm
				type='name'
				name='name'
				label='Name'
				value={name}
				onChange={onNameChange}
			/>
			<InputFieldForm
				type='email'
				name='email'
				label='Email'
				value={email}
				onChange={onEmailChange}
			/>
			<div className="inside-input-field">
				<InputFieldForm
					type={showPassword ? 'text' : 'password'}
					name='password'
					label='Password'
					value={password}
					onChange={onPasswordChange}
				/>	
				<p
					className='toggle-password'
					onClick={() => setShowPassword(!showPassword)}
				>
					{showPassword 
						? <FaEyeSlash /> 
						: <FaEye/>
					}
				</p>
			</div>

			<div className="inside-input-field">
				<InputFieldForm
					type={showConfirmPassword ? 'text' : 'password'}
					name='confirmPassword'
					label='Confirm Password'
					value={confirmPassword}
					onChange={onConfirmPasswordChange}
				/>
				<p
					className='toggle-password'
					onClick={() => setShowConfirmPassword(!showConfirmPassword)}
				>
					{showConfirmPassword 
						? <FaEyeSlash /> 
						: <FaEye/>
					}
				</p>				
			</div>
			
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

FormRegister.propTypes = {
	register: PropTypes.func.isRequired,
}

export default FormRegister
