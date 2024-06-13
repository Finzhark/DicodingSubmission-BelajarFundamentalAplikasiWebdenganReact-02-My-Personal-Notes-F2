import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Toaster, toast } from 'react-hot-toast';
import { HiX, HiCheck } from 'react-icons/hi';
import { BiWinkSmile } from "react-icons/bi";

class NoteEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.note.title,
      body: props.note.body,
    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onCancelHandler = this.onCancelHandler.bind(this);
  }

  onTitleChange(event) {
    this.setState({ 
      title: event.target.value 
    });
  }

  onInputHandler(event) {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const startOffset = range.startOffset;

  this.setState({ 
    body: event.target.innerHTML 
  }, () => {
    const newRange = document.createRange();
    newRange.setStart(this.inputBody.childNodes[0], startOffset);
    selection.removeAllRanges();
    selection.addRange(newRange);
  })
}

  onSubmitHandler() {
    const { title, body } = this.state;

    if (body.trim() === '') {
      toast.error(locale === 'id'
        ? 'Tidak bisa menyimpan catatan kosong!'
        : 'Can\'t save empty note!'
      )
    } else {
      this.props.editNote({ 
        id: this.props.id,
        title,
        body
      })
      toast.success(locale === 'id'
        ? 'Catatan sukses diubah!'
        : 'The edited note has been saved successfully!'
      )
    }
  }

  onCancelHandler() {
    toast(locale === 'id'
        ? 'Anda tidak jadi menyunting catatan.'
        : 'The edited note is not saved.' 
      , {
      icon: <BiWinkSmile />,
      duration: 1500,
    })
  }

  render() {
    return (
      <section className='add-new-page'>
        <Toaster />
        <div className="add-new-page__input">
          <input 
            type="text" 
            className="add-new-page__input__title" 
            placeholder={locale === 'id'
              ? 'Ketik Judul Di Sini...' 
              : 'Type Title Here...'
            }
            value={this.state.title} 
            onChange={(event) => this.onTitleChange(event)} />
          <div 
            className="add-new-page__input__body" 
            data-placeholder={locale === 'id'
              ? 'Dear Catatan, aku ingin mencatat...'
              : 'Dear Notes, I would like to note something...'
            }
            contentEditable
            onInput={(event) => this.onInputHandler(event)}
            dangerouslySetInnerHTML={{ __html: this.state.body }}
            ref={(el) => { this.inputBody = el; }}
          /> 
        </div>
        <div className="add-new-page__action">
          <Link
            to='/'
            className="action" 
            type='button' 
            title='Batal'
            onClick={this.onCancelHandler}
          >
            <HiX />
          </Link>
          <button 
            className="action" 
            type='button' 
            title='Simpan' 
            onClick={this.onSubmitHandler}
          >
            <HiCheck />
          </button>
        </div>
      </section>
    )
  }
}

NoteEdit.propTypes = {
  id: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
  editNote: PropTypes.func.isRequired,
}

export default NoteEdit