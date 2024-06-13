import { useContext } from 'react'
import { Link } from 'react-router-dom'
import LoginInput from '../components/LoginInput'
import LocaleContext from '../contexts/LocaleContexts'
import { login } from '../api'
import PropTypes from 'prop-types'

function LoginPage({ loginSuccess }) {
	const { locale } = useContext(LocaleContext)

	async function onLoginHandler({ email, password }) {
		const { error, data } = await login({ email, password })

		if (!error) {
			loginSuccess(data)
		}
	}

	return (
		<section className='login-page'>
			<h2>Login</h2>
			<LoginInput login={onLoginHandler} />
			<p>
				{locale === 'id'? (
					<span>
						Belum punya akun? 
						<Link to='/register'>
							<b> Daftar di sini!</b>
						</Link>
					</span>		
				) : (
					<span>
						Don't have an account?
						<Link to='/register'>
							<b>Register here!</b>
						</Link>
					</span>
				)}
			</p>
		</section>
	)
}

LoginPage.propTypes = {
	loginSuccess: PropTypes.func.isRequired,
}

export default LoginPage
