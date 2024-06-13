import { toast } from 'react-hot-toast'
import { BiHappyBeaming } from 'react-icons/bi'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import LocaleContext from '../contexts/LocaleContexts'
import { MdOutlineDeleteForever } from 'react-icons/md'

function DeleteButton({ 
	id, 
	onDelete 
}) {
	const { locale } = useContext(LocaleContext)

  const onDeleteHandler = () => {
    toast((t) => (
      <span>
				{locale === 'id'
					? 'Ingin menghapus catatan ini?'
					: 'Do you want to delete this note? Are you sure?'
				}
        <br/>
        <button
          className='toast_button btn-delete' 
          onClick={() => {
            onDelete(id)
            toast.remove()
            toast('Catatan berhasil dihapus!', {
              icon: <MdOutlineDeleteForever />,
              duration: 1000,
            })
          }}
        >
          Ya
        </button>
        <button 
          className='toast_button btn-cancel'
          onClick={() => {
            toast.remove()
            toast('Tenang, catatannya masih ada!', {
              duration: 1000,
              icon: <BiHappyBeaming />,
            })
          }}
        >
					Tidak
				</button>
      </span>
    ), {
      duration: 3000,
    })
  }

	return (
		<button 
			className='action' 
			type='button' 
			title='Hapus' 
			onClick={() => onDeleteHandler(id)}
		>
			<MdOutlineDeleteForever />
		</button>
	)
}

DeleteButton.propTypes = {
	id: PropTypes.string.isRequired,
	onDelete: PropTypes.func.isRequired,
}

export default DeleteButton
