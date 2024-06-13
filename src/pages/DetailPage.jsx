import { Component } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FaCircleArrowLeft } from "react-icons/fa6";
import {
   getNote,
   deleteNote,
   unarchiveNote,
   archiveNote,
} from '../api'
import DetailPageAction from '../components/DetailPageAction'
import DetailPageBody from '../components/DetailPageBody'
import NotFoundPage from './NotFoundPage'

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

   render() {
      if (this.state.initializing) {
         return null
      }

      if (this.state.note) {
         return (
            <section className='detail-page'>
               <Link to='/'>
                  <FaCircleArrowLeft /> Kembali
               </Link>
               <DetailPageBody note={this.state.note} />
               <DetailPageAction
                  id={this.props.id}
                  archived={this.state.note.archived}
                  isArchived={this.isNoteArchivedHandler}
                  onDelete={this.onDeleteHandler}
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
