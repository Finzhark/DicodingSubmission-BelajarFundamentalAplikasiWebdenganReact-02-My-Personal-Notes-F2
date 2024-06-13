import { useContext } from 'react'
import PropTypes from 'prop-types'
import LocaleContext from '../contexts/LocaleContexts'
import NoteItem from './NoteItem'

function NoteItemList({ notes }) {
  const { locale } = useContext(LocaleContext)
  
  if (!notes.length) {
    return (
      <section className='notes-list-empty'>
        <p className='notes-list__empty'>
          {locale === 'id' 
            ? 'Maaf, catatan tidak ditemukan!' 
            : 'Sorry, couldn\'t find any notes!'
          }
        </p>
      </section>
    )
  }

  return (
    <section className='notes-list'>
      {notes.map((note) => 
        <NoteItem key={note.id} 
          {...note} 
        />
      )}
    </section>
  )
}

NoteItemList.propTypes = {
   notes: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default NoteItemList
