import { useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { MdGTranslate, MdOutlineWbSunny } from 'react-icons/md'
import { RiMoonLine } from 'react-icons/ri'
import { FiLogOut } from 'react-icons/fi';
import { getAccessToken } from '../api'
import LocaleContext from '../contexts/LocaleContexts'
import ThemeContext from '../contexts/ThemeContext'

function Header({ 
  logout, 
  name 
}) {
  const { locale, toggleLocale } = useContext(LocaleContext)
  const { theme, toggleTheme } = useContext(ThemeContext)

  const accessToken = getAccessToken()

  return (
		<header>
			<h1>
				<Link to='/'>
					{locale === 'id' 
						? 'Catatan Pribadiku F2'
						: 'My Personal Notes F2'
					}
				</Link>
			</h1>
			{accessToken && (
				<nav className='navigation'>
					<ul>
						<li>
              <Link to='/'>
                {locale === 'id'
                  ? 'Catatan Aktif'
                  : 'Active Notes'
                }
              </Link>
            </li>		
						<li>
							<Link to='/archive'>
								{locale === 'id' 
									? 'Arsip' 
									: 'Archive'
								}
							</Link>
						</li>
					</ul>
				</nav>
			)}
			<button 
				className='toggle-locale' 
				type='button' 
				title={locale === 'id'
					? 'Ganti Bahasa'
					: 'Change Language'
				}
				onClick={toggleLocale}
			>
				<MdGTranslate />
			</button>
			<button 
				className='toggle-theme' 
				type='button' 
				title={locale === 'id'
					? 'Tema'
					: 'Theme'
				}
				onClick={toggleTheme}
			>
				{theme === 'dark' 
					? <MdOutlineWbSunny /> 
					: <RiMoonLine />
				}
			</button>
			{accessToken 
				? (
					<button 
						className='button-logout' 
						type='button' 
						onClick={logout}
					>
						{locale === 'id'
							? 'Halo, '
							: 'Hello, '
						}
							{name}
						<FiLogOut 
							title='Logout?'
						/>
				 </button>
					) 
				: null
			}
		</header>
  )
}

Header.propTypes = {
   logout: PropTypes.func.isRequired,
   name: PropTypes.string,
}

export default Header
