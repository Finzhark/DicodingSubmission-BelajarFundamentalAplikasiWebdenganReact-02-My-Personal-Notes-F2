import PropTypes from 'prop-types'
import parse from 'html-react-parser'
import { showFormattedDate } from '../utils/index'

function DetailPageBody({ 
  note 
}) {
  return (
    <section>
      <h3 className='detail-page__title'>
        {note.title}
      </h3>
      <p className='detail-page__createdAt'>
        {showFormattedDate(note.createdAt)}
      </p>
      <div className='detail-page__body'>
        {parse(note.body)}
      </div>
    </section>
  )
}

DetailPageBody.propTypes = {
  note: PropTypes.object.isRequired,
}

export default DetailPageBody
