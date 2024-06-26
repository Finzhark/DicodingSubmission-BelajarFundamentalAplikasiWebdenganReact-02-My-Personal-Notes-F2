import PropTypes from 'prop-types'

function InputFieldForm({ 
	type, 
	name, 
	label, 
	value, 
	onChange 
}) {
	return (
		<section>
			<label htmlFor={name}>
				{label}
			</label>
			<input 
				type={type} 
				id={name} 
				value={value} 
				onChange={onChange} 
			/>
		</section>
	)
}

InputFieldForm.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

export default InputFieldForm
