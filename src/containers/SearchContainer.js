import { connect } from 'react-redux'
import React, { Component } from 'react'
import { getSummary, getEmails} from '../helpers'
import { ResultTable } from 'components/ResultTable'
import { stopListeningForQueryResults, setActiveQuery, listenForQueryResults } from 'actions/queries'
import SearchBarContainer  from './SearchBarContainer'
import ExportComponent from 'components/ExportComponent'
import StatComponent from 'components/StatComponent'
import Widget from 'components/Widget'
import Switch from 'react-toggle-switch'
import 'css/switch.less'

class SearchContainer extends Component {
  //results is an object
  //the result we want to see is accessible by this.props.results[this.props.activeQuery]
  constructor(props) {
    super(props)
    this.state = {
      queryType: 'hashtag',
      hashtagSelected: false,
      influencerSelected: false,
      placeholder:'hashtag',
      result: {},
    }
    this.renderCalled = 0
    this.canRefresh = true
    this.shouldUpdate = false
    this.intervalTrigger = null
    this.clearResults = this.clearResults.bind(this)
    this.handleResult = this.handleResult.bind(this)

  }

  componentWillMount() {
    this.shouldUpdate = true
    const {location} = this.props
    if(location.action === 'PUSH') {
      if(this.canRefresh) {
        this.canRefresh = false
        window.location.reload()
      }
    }
  }
  componentWillUnmount() {
    this.shouldUpdate = false
  }
  
  clearResults() {
    this.setState({
      result: {}
    })
  }
  handleResult(key, val, id) {
    this.setState({
      result: Object.assign({}, this.state.result, {[key]:val})
    })
  }



  render() {
    let emails = []
    let emailsForExport
    let parsedCount = 0
    let emails_found = 0
    let activeQuery = 'Nothing yet' 
    let activeQueries = this.props.query ? Object.keys(this.props.query).map(k => Object.assign({}, {id:k}, this.props.query[k])):[]
    const buildCSVData = (emails) => {
      const columns = [{
        'id': 'InstagramUsername',
        'displayText': 'Instagram Username',
      }, {
        'id': 'Followers',
        'displayText': 'Followers'
      },
      {
        'id': 'fullName',
        'displayText': 'Full Name'
      }, {
        'id': 'Email',
        'displayText': 'Email'
      }]
      const data = emails.map((email, index) => {
        return {
          'InstagramUsername': email.username,
          'Followers': email.metaData.user.followed_by.count,
          'fullName': email.metaData.user.full_name,
          'Email': email.email,
        }
      })
      return {
        columns,
        data
      }
    }
    const getOppositeQueryType = () => {
      switch(this.state.queryType) {
        case 'influencer':
          return 'hashtag'
        case 'hashtag':
          return 'influencer'
        default:
      }
    } 
    if(Object.keys(this.state.result).length > 0) {
      parsedCount = getSummary(this.state.result).parsedCount
      emails_found = getSummary(this.state.result).emails_found
      emails = getEmails(this.state.result)
      emailsForExport = buildCSVData(emails)
      activeQuery = this.state.result.hashtag.query
    }

    return (
      <div id='searchContainer'>
        <div className='row stats'>
          <div className='col-md-6'>
            <StatComponent color='pink' title='Profile Parsed' value={parsedCount ? parsedCount: 0}/>
          </div>
          <div className='col-md-6'>
            <StatComponent color='blue' title='emails found' value={emails_found ? emails_found: 0}/>
          </div>
        </div> 
        <div className='row'>
          <div className='col-md-6 col-lg-6'>
            <Widget
              title='Search for emails'
              widgetHeaderButtons={[]}
              icon='search'
              color='green'
              caption='Search for emails by Hashtag or Influencer'
              >
                <div className='form-group'>
                  <label htmlFor='hashtagSwitch'>Hashtag</label> 
                  <Switch label='testing' on={this.state.queryType === 'hashtag'} id='hashtagSwitch' onClick={() => this.setState({
                    queryType: 'hashtag',
                    placeholder: 'startups'
                  })}/>
                </div>
              <div className='form-group'>
                <label htmlFor='influencerSwitch'>Influencer</label>
                  <Switch label='testing' on={this.state.queryType === 'influencer'} id='hashtagSwitch' onClick={() => this.setState({
                    queryType: 'influencer',
                    placeholder: 'Gary Vee'
                  })}/>
              </div>
                <SearchBarContainer 
                  className='search'
                  queryType={this.state.queryType}
                  placeholder={this.state.placeholder}
                  handleResult = {this.handleResult}
                /> 
              </Widget>
            </div>
            <div className='col-md-6 col-lg-6'> 
              <Widget
                caption='Your Active Queries'
                icon='list'
                widgetHeaderButtons={[]}
                color='blue'
              >
              <h4> Showing results for {activeQuery} </h4> 
                {activeQueries.length === 0 ? '':
              <ul className='list-group'>
              {activeQueries.map((query, index) => {
              return (
                <li className='list-group-item' key={index}>
                  <div>
                    <label htmlFor='queryType'>query type</label>
                    <em> {query.queryType}</em>
                  </div>
                  <div>
                    <label htmlFor='query'>query</label>
                    <em> {query.query}</em>
                    <div>
                      <button className='btn btn-blue' onClick={() => {this.props.dispatch(setActiveQuery(query.id), this.props.dispatch(listenForQueryResults(query.id, query.queryType)))}}> View Results </button>
                    </div>
                  </div>
                </li>
              )
            })}
            </ul>
          }
              </Widget>

            </div>
          </div>
      </div>
    )
  }
}

export default connect(state => {
  return {
    auth: state.auth,
    query: state.queries,
    activeQuery: state.activeQuery,
    queryResults:state.queryResults
  }
})(SearchContainer)


