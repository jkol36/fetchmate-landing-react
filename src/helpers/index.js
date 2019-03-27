export const getEmails = (result) => {
  let emailList = []
  let justEmails = []
  result.emails ? Object.keys(result.emails).map(k => {
      let {email} = result.emails[k]
      if(justEmails.indexOf(email) === -1) {
        emailList.push(result.emails[k])
        justEmails.push(email)
      }
      }):null
  return emailList.sort((a, b) => a.followedBy.count - b.followedBy.count).reverse()
}

export const getSummary = (result) => {
  let { profilesParsed, followersParsed, emails_found } = result
  let parsedCount = profilesParsed ? profilesParsed: followersParsed
  return {parsedCount, emails_found}
}