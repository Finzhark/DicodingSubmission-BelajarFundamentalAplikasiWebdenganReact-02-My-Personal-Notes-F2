import PropTypes from 'prop-types'
import DeleteButton from './DeleteButton'
import ArchiveButton from './ArchiveButton'

function DetailPageAction({ 
  id, 
  archived, 
  isArchived, 
  onDelete,
}) {
  return (
    <div className='detail-page__action'>
      <ArchiveButton 
        id={id} 
        archived={archived} 
        isArchived={isArchived} 
      />
      <DeleteButton 
        id={id} 
        onDelete={onDelete} 
      />      
    </div>
  )
}

DetailPageAction.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  isArchived: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default DetailPageAction
