import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast } from 'react-hot-toast'
import { FaRegFaceSadTear } from 'react-icons/fa6'
import { FiCheck } from 'react-icons/fi'
import { HiX, HiCheck } from 'react-icons/hi'
import LocaleContext from '../contexts/LocaleContexts'
import useInput from '../hooks/useInput'

function NoteInput({ 
  addNote 
}) {
  const [title, onTitleChange] = useInput('')
  const [body, setBody] = useState('')

  const { locale } = useContext(LocaleContext)

  function onInputHandler(event) {
    setBody(event.target.innerHTML)
  }

  function onSubmitHandler() {
    if (body.trim() === '') {
      toast.error(locale == 'id'
      ? 'Catatan belum diisi!' 
      : 'Hey, note not filled in!', {
        duration: 1200,
      })
    } else {
      toast.success(locale == 'id' 
        ? 'Catatan berhasil dibuat!'
        : 'Note created successfully!'
      )

      addNote({ title, body })
      this.props.addNote({ title, body })
    }
  }

  function onCancelHandler() {
    toast(locale == 'id'
      ? 'Yah... nggak jadi buat catatan.'
      : 'Well, you didn\'t end up taking notes.'
      , {
        icon: <FaRegFaceSadTear />,
        duration: 1000,
    })
  }

  return (
    <section className='add-new-page'>
      <div className='add-new-page__input'>
        <input
          type='text'
          className='add-new-page__input__title'
          placeholder={
            locale === 'id'
            ? 'Ketik Judul Di Sini...'
            : 'Type Title Here...'
          } 
          value={title}
          onChange={onTitleChange}
        />
        <div
          className='add-new-page__input__body'
          data-placeholder={locale === 'id'
            ? 'Dear Catatan, aku ingin mencatat...'
            : 'Dear Notes, I would like to note something...'
          }
          contentEditable
          onInput={(e) => onInputHandler(e)}
        ></div>
      </div>
      <div className='add-new-page__action'>
        <Link
          to='/'
          className='action' 
          type='button' 
          title={locale === 'id'
            ? 'Batal'
            : 'Cancel'
          }
          onClick={onCancelHandler}
        >
          <HiX />
        </Link>
        <button
          className='action'
          type='button'
          title={locale === 'id'
            ? 'Simpan'
            : 'Save'
          }
          onClick={onSubmitHandler}
        >
          <FiCheck />
        </button>
      </div>
    </section>
  )
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
}

export default NoteInput
