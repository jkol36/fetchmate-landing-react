import React, { PropTypes, Component } from 'react'

class SuggestionItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hovering: false,
			selected: false
		}
		this.onMouseOver = this.onMouseOver.bind(this)
		this.onMouseLeave = this.onMouseLeave.bind(this)
		this.onClick = this.onClick.bind(this)
	}
	onMouseOver() {
		this.setState({
			hovering:true
		})
	}
	onMouseLeave() {
		this.setState({
			hovering:false
		})
	}
	onClick() {
		this.props.onClick(this.props.username ? this.props.username: this.props.hashtag)
	}

	render() {
		let className = this.state.hovering || this.props.selected ? 'highlighted':''
		if(this.props.hashtag) {
			return (
				<li ref='suggestions' onClick={this.onClick} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} className={className}>
					<p className='muted'>hashtag: {this.props.hashtag}</p>
					<p className='muted'>posts: {this.props.mediaCount}</p>
				</li>
			)
		}
		else {
			return (
			<li ref='suggestion' onClick={this.onClick} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}  className={className}> 
				<img width={50} className='profile-photo' src={this.props.img}/>
				<p className='muted'>name: {this.props.fullName} </p>
				<p className='muted'>username: {this.props.username} </p>
				<p className='muted'>followers: {this.props.followers}</p>
			</li>
		)
		}
	}

}
class SuggestionComponent extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		console.log(this.props.suggestions, this.props.queryType)
		return (
			<ul className='search-bar-suggestions'> 
				{this.props.suggestions.map((suggestion, index) => {
					if(this.props.queryType === 'influencer') {
						return <SuggestionItem 
						key={index}
						onClick={this.props.onSelectedSuggestion}
						selected={suggestion.user.username === this.props.selectedSuggestion} 
						fullName={suggestion.user.full_name} 
						username={suggestion.user.username}
						followers={suggestion.user.follower_count}
						img={suggestion.user.profile_pic_url}
						className={suggestion.className}/>
					}
					else if(this.props.queryType === 'hashtag') {
						console.log(suggestion)
						return <SuggestionItem
						key={index}
						onClick={this.props.onSelectedSuggestion}
						selected={suggestion.hashtag.name === this.props.selectedSuggestion}
						hashtag={suggestion.hashtag.name}
						mediaCount={suggestion.hashtag.media_count}
						className={suggestion.className}/>
					}
				})}
			</ul>
		)
	}
}

SuggestionComponent.PropTypes = {
	suggestions: PropTypes.array
}
export default SuggestionComponent