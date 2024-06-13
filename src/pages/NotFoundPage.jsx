import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { HiHome } from 'react-icons/hi2'
import LocaleContext from '../contexts/LocaleContexts'

function NotFoundPage() {
  const { locale } = useContext(LocaleContext)

  return (
    <section>
      <h2 className='not-found_404'>
        404
      </h2>
      <p className='not-found_text'>
        {locale === 'id'
          ? 'Halaman Tidak Ditemukan'
          : 'Page not found'
        }
      </p>
      <Link 
        to='/'
        className='not-found_back-to-home'
      > 
        <HiHome /> 
        {locale === 'id'
          ? 'Kembali Ke Halaman Utama '
          : 'Back to Home'
        }
        <HiHome />
      </Link>
    </section>
  )
}

export default NotFoundPage