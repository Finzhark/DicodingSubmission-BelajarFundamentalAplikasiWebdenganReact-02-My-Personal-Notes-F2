import { MdModeEdit } from 'react-icons/md';
import PropTypes from 'prop-types';

function EditButton({
  id,
  onEdit
}) {
  const onEditHandler = () => {
    onEdit(id)
  }

  return (
    <button 
      className="action" 
      type='button' 
      title={locale === 'id'
        ? 'Sunting'
        : 'Edit'
      } 
      onClick={onEditHandler}
    >
      <MdModeEdit />
    </button>
  )
}

EditButton.propTypes = {
	id: PropTypes.string.isRequired,
	onEdit: PropTypes.func.isRequired,
}

export default EditButton