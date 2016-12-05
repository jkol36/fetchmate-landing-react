import React, { Component } from 'react'
import SearchBarContainer from './SearchBarContainer'
import {ResultTable} from '../components/ResultTable'
import {  
  anonymousUserSessionRef,
  landingPageViewRef
} from '../config'
import {getSummary, getEmails} from '../helpers'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queryType: 'hashtag',
      querySuggestionResults:[],
      sessionId: null,
      currentResultRef:null,
      result: {}
    }
    this.handleResult = this.handleResult.bind(this)
  }

  componentDidMount() {
    landingPageViewRef.transaction(currentValue => currentValue + 1)
    const userRef = anonymousUserSessionRef.push()
    userRef.set({
      startedAt: Date.now()
    })
    this.setState({
      sessionId:userRef.key
    })
  }

  handleResult(key, val) {
    this.setState({
      result: Object.assign({}, this.state.result, {[key]:val})
    })
  }

  render() {
    console.log(this.state.queryType)
    let emails = []
    let modalText = ''
    if(Object.keys(this.state.result).length > 0) {
      let {parsedCount, emails_found} = getSummary(this.state.result)
      modalText = <p> it looks like we've parsed through <strong> {parsedCount}</strong> profiles and found <strong> {emails_found} </strong> emails </p>
      emails = getEmails(this.state.result)
    }
     return (
      <div> 
        <h1 className="cover-statement">
            Find emails
            <br />
            Easily on
            <br />
            Instagram
        </h1>

        <div className="cover-link">
            <span>
                Try it now with any <button className='btn btn-success' onClick={() => this.setState({queryType:'hashtag'})}>Hashtag</button> <span> or </span> <button className='btn btn-primary' onClick={() => this.setState({queryType:'influencer'})}> Influencer</button>
            </span>
        </div>
        <div className='row'>
          <div className='col-md-4 col-md-offset-4'>
            <SearchBarContainer 
              className='search'
              handleResult={this.handleResult}
              queryType={this.state.queryType}
              sessionId={this.state.sessionId}
              handleResult={this.handleResult}

            />
          </div>
        </div>
        <div className="modal fade" tabindex="-1" id='resultModal' role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">{modalText}</h4>
              </div>
              <div className="modal-body">
                <ResultTable headerRows={
                    [
                      {text:'Profile Pic'}, 
                      {text:'Username'}, 
                      {text:'Email'}, 
                      {text:'Followers'}, 
                      {text:'Full Name'}
                    ]}>
                    {emails.map((email, index) => {
                      return (
                          <tr key={index}> 
                            <td> 
                              <img width='20' src={email.metaData.user.profile_pic_url}></img>
                            </td>
                            <td> 
                              {email.username}
                            </td>
                            <td> {email.email.slice(0,10)}... </td>
                            <td> {email.metaData.user.followed_by.count} </td>
                            <td> {email.metaData.user.full_name} </td>
                          </tr>
                      )
                    }).splice(0,10)}
                  </ResultTable>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <a href='http://localhost:3000/signup' className="btn btn-primary">See all results</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
