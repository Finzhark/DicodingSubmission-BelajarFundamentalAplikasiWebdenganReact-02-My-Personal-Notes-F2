import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import LocaleContext from '../contexts/LocaleContexts'

function HomePageAction() {
	const { locale } = useContext(LocaleContext)

	return (
		<div className='homepage__action'>
			<Link 
				className='action' 
				title={locale === 'id'
					? 'Tambah Catatan Baru'
					: 'Add New Note'
				} 
				to='/notes/new'
			>
				<FiPlus />
			</Link>
		</div>
	)
}

export default HomePageAction
