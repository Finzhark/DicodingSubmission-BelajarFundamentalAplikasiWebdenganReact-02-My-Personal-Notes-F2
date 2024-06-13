import React from 'react';
import NoteEdit from '../components/NoteEdit';
import { useNavigate, useParams } from 'react-router-dom';
import { getNote, editNote } from '../utils/local-data';

function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const noteToEdit = getNote(id);

  function onEditNoteHandler(note) {
    editNote(note);
    navigate('/');
  }

  return (
    <section className='homepage'>
      <h2>Anda sedang menyunting catatan.</h2>
      <NoteEdit 
        id={id}
        note={noteToEdit}
        editNote={onEditNoteHandler} 
      />
    </section>
  )
}

export default EditPage