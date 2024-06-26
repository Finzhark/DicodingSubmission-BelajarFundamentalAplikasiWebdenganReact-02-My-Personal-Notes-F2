import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useInput from '../hooks/useInput'
import LocaleContext from '../contexts/LocaleContexts'
import InputFieldForm from './InputFieldForm'

function FormLogin({ 
	login 
}) {
	const [showPassword, setShowPassword] = useState(false)
	const [email, onEmailChange] = useInput('')
	const [password, onPasswordChange] = useInput('')

	function onSubmitHandler(e) {
		e.preventDefault()
		login({ 
			email, 
			password 
		})
	}

	return (
		<form 
			className='input-login' 
			onSubmit={onSubmitHandler}
		>
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
			<button 
				className='button-login'
				type='submit'
			>
				Login
			</button>
		</form>
	)
}

FormLogin.propTypes = {
	login: PropTypes.func.isRequired,
}

export default FormLogin
