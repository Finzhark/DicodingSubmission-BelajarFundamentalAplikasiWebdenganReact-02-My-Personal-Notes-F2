import { Component } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'
import DetailPageAction from '../components/DetailPageAction'
import DetailPageBody from '../components/DetailPageBody'
import {
   getNote,
   deleteNote,
   unarchiveNote,
   archiveNote,
} from '../api'
import NotFoundPage from './NotFoundPage'
import { Link } from 'react-router-dom'

function DetailPageWrapper() {
   const { id } = useParams()
   const navigate = useNavigate()

   return (
      <DetailPage 
         id={id} 
         navigate={navigate} 
      />
   )
}

class DetailPage extends Component {
   constructor(props) {
      super(props)

      this.state = {
         note: null,
         initializing: true,
      }

      this.isNoteArchivedHandler = this.isNoteArchivedHandler.bind(this)
      this.onDeleteHandler = this.onDeleteHandler.bind(this)
      this.onEditHandler = this.onEditHandler.bind(this);
   }

   async componentDidMount() {
      const { data } = await getNote(this.props.id)
      this.setState(() => {
         return {
            note: data,
            initializing: false,
         }
      })
   }

   async isNoteArchivedHandler(id) {
      if (this.state.note.archived) {
         await unarchiveNote(id)
         this.props.navigate('/')
      } else if (!this.state.note.archived) {
         await archiveNote(id)
         this.props.navigate('/')
      }
   }

   async onDeleteHandler(id) {
      await deleteNote(id)
      this.props.navigate('/')
   }

   async onEditHandler(id) {
		this.props.navigate(`/notes/${id}/edit`)
	}

   render() {
      if (this.state.initializing) {
         return null
      }

      if (this.state.note) {
         return (
            <section className='detail-page'>
               {/* <Link to='/'><FaCircleArrowLeft />Kembali</Link> */}
               <DetailPageBody note={this.state.note} />
               <DetailPageAction
                  id={this.props.id}
                  archived={this.state.note.archived}
                  isArchived={this.isNoteArchivedHandler}
                  onDelete={this.onDeleteHandler}
                  onEdit={this.onEditHandler} 
               />
            </section>
         )
      }
      return <NotFoundPage />
   }
}

DetailPage.propTypes = {
   id: PropTypes.string,
   navigate: PropTypes.func.isRequired,
}

export default DetailPageWrapper
