import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api'
import FormRegister from '../components/FormRegister'
import LocaleContext from '../contexts/LocaleContexts'

function RegisterPage() {
	const navigate = useNavigate()
	const { locale } = useContext(LocaleContext)

	async function onRegisterHandler(user) {
		const { error } = await register(user)

		if (!error) {
			navigate('/')
		}
	}
	return (
		<section className='register-page'>
			<h2>
				{locale === 'id'
					? 'Isi form untuk mendaftar akun.'
					: 'Fill the form to register account.'
				}
			</h2>
			<FormRegister register={onRegisterHandler} />
			{locale === 'id' ? (
				<p>
					Sudah punya akun? 
					<Link to='/'>
						<b> Silakan login di sini. </b>
					</Link>
				</p>
			) : (
				<p>
					Already have an account? 
					<Link to='/'>
						<b> Please login here. </b>
					</Link>
				</p>
			)}
		</section>
	)
}

export default RegisterPage
