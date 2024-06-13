import { useNavigate } from 'react-router-dom'
import { addNote } from '../api'
import NoteInput from '../components/NoteInput'

function AddPage() {
  const navigate = useNavigate()

  async function onAddNoteHandler(note) {
    await addNote(note)
    navigate('/')
  }

  return <NoteInput addNote={onAddNoteHandler} />
}

export default AddPage
