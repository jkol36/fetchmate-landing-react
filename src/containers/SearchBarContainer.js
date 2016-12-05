import { connect } from 'react-redux'
import React, { Component } from 'react';
import SearchBar from 'components/SearchBar'
import {
  suggestionRef, 
  suggestionResultRef,
  queryRef,
  hashtagRef,
  influencerRef
} from 'config'


class SearchBarContainer extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleQuerySuggestionResult = this.handleQuerySuggestionResult.bind(this)
    this.clearSuggestions = this.clearSuggestions.bind(this)
    this.onSelectedSuggestion = this.onSelectedSuggestion.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.initialState = {
      query: '',
      selectedSuggesstion: null,
      querySuggestionResultRef:null,
      querySuggestionResults:[],
      currentResultRef: null
    }
    this.state = this.initialState
  }
  componentWillMount() {
    console.log('searchbar container mounting', this.props)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps != this.props || this.state != nextState
  }
  handleQuerySuggestionResult(result) {
    console.log('handleQuerySuggestionResult called with', result)
    if(this.state.querySuggestionResults.indexOf(result) === -1) {
      let querySuggestionResults = [...this.state.querySuggestionResults, result]
      this.setState({
        querySuggestionResults
      })
    }
  }
  onChange(e) {
    if(e.target.value.length === 0 && this.state.querySuggestionResultRef != null) {
      this.state.querySuggestionResultRef.off()
      this.setState(
        this.initialState
      )
    }
    else {
      let queryForLookup 
      let withoutHashtag = this.props.queryType === 'hashtag' ? e.target.value.split('#')[1]: null
      if(withoutHashtag) {
        queryForLookup = withoutHashtag.trim()
        
      }
      else {
        queryForLookup = e.target.value.trim()
      }
      this.setState({query:e.target.value})
      let ref = suggestionRef.push()
      let querySuggestionResultRef
      ref.set({
        query:queryForLookup,
        queryType: this.props.queryType,
        postRef:`${ref.key}/results`,
        status:0
      })
      if(this.state.querySuggestionResultRef) {
        this.state.querySuggestionResultRef.off()
      }
      querySuggestionResultRef = suggestionResultRef.child(ref.key).child('results')
      this.setState({
        querySuggestionResultRef
      })
      querySuggestionResultRef.on('child_added', s => {
        this.handleQuerySuggestionResult(s.val())
      })
    }
  }

  onSelectedSuggestion(name) {
    console.log('selectedSuggesstion called with', name)
    this.setState({
      query: name,
      selectedSuggestion: name
    })
  }

  clearSuggestions() {
    let newState = this.initialState
    this.setState(newState)
  }

  onSearch(query) {
    let { handleResult, sessionId, queryType } = this.props
    this.clearSuggestions()
    let newQueryRef = queryRef.child(sessionId).push()
    newQueryRef.set({
      type: queryType,
      query,
      id: newQueryRef.key,
      status:0
    })
    switch(queryType) {
      case 'hashtag':
        hashtagRef.child(newQueryRef.key).on('child_added', s=> {
          handleResult(s.key, s.val())
        })
        hashtagRef.child(newQueryRef.key).on('child_changed', s => {
          handleResult(s.key, s.val())
        })
        return
      case 'influencer':
        influencerRef.child(newQueryRef.key).on('child_added', s => {
          handleResult(s.key, s.val())
        })
        influencerRef.child(newQueryRef.key).on('child_changed', s => {
          handleResult(s.key, s.val())
        })
        return
    }
    
  }


  render() {
    return (
      <div className={this.props.className + ' ' + 'searchbar-container'}>
        <form className='form-inline'>
          <div className="form-group">
            <div className='input-group'>
              <SearchBar 
              value={this.state.query} 
              suggestions={this.state.querySuggestionResults.slice(0,2)}
              queryType={this.props.queryType}
              selectedSuggestion={this.state.selectedSuggestion} 
              onChange={this.onChange} 
              clearSuggestions={this.clearSuggestions}
              onSelectedSuggestion={this.onSelectedSuggestion} 
              placeholder={this.props.queryType === 'hashtag' ? '#startups': 'garyvee'}
              onSearch={() => this.onSearch(this.state.query)}
              />
            </div>
          </div>
        </form>
      </div>
           
    )
  }
}

export default SearchBarContainer
