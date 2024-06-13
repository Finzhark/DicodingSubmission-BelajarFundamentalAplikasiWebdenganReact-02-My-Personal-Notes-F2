import PropTypes from 'prop-types'
import { toast } from 'react-hot-toast'
import { useContext } from 'react'
import LocaleContext from '../contexts/LocaleContexts'
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi'

function ArchiveButton({ 
	id, 
	archived, 
	isArchived 
}) {
	const { locale } = useContext(LocaleContext)

  if (archived) {
    const onUnarchiveHandler = () => {
      isArchived(id)
      toast.success(
				locale === 'id'
				? 'Berhasil mengaktifkan catatan'
				: 'The note activated successfully.'
			, {
        icon: <BiArchiveOut />
      })
    }
    return (
      <button 
        className="action" 
        type='button' 
        title={locale === 'id'
					? 'Batalkan pengarsipan'
					: 'Unarchive'
				} 
        onClick={onUnarchiveHandler}
      >
        <BiArchiveOut />
      </button>
    )
  } else {
    const onArchiveHandler = () => {
      isArchived(id)
      toast(
				locale === 'id'
				? 'Berhasil mengarsipkan catatan'
				: 'The note archived successfully.'
			, {
        icon: <BiArchiveIn />
    })
    }
    return (
      <button 
        className="action" 
        type='button' 
        title={locale === 'id'
				? 'Arsipkan Catatan?'
				: 'Archive The Note?'
			} 
        onClick={onArchiveHandler}
      >
        <BiArchiveIn />
      </button>
    )
  }
}

ArchiveButton.propTypes = {
	id: PropTypes.string.isRequired,
	archived: PropTypes.bool.isRequired,
	isArchived: PropTypes.func.isRequired,
}

export default ArchiveButton
