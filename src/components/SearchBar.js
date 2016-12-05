import React, { PropTypes } from 'react'
import SuggestionComponent from './SuggestionComponent'
import '../css/searchbar.less'


const SearchBar = (props) => {
	return (
		<div className='search-bar-wrapper'> 
			<div className='search-bar-field'> 
				<input 
					className='search-bar-input'
					type='text'
					value={props.value}
					placeholder={props.placeholder}
					onChange={props.onChange}
				/>
				{props.suggestions.length > 0 ? <span className='icon search-bar-clear' onClick={props.clearSuggestions} />:''}
				<input onClick={props.onSearch} data-toggle='modal' data-target='#resultModal' className='icon search-bar-submit'/>
			</div>
			<SuggestionComponent 
			queryType={props.queryType}
			selectedSuggestion={props.selectedSuggestion}
			onSelectedSuggestion={props.onSelectedSuggestion}
			suggestions={props.suggestions}/>
		</div>
	)
}

SearchBar.PropTypes = {
	onChange: PropTypes.func,
	suggestions: PropTypes.array
}


export default SearchBar