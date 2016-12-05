import firebase from 'firebase'
firebase.initializeApp({
		apiKey: 'AIzaSyBD9sZVZJtA4IPPdrtAyH1mS46LkMsDKqE',
    authDomain: 'igbot-dc02d.firebaseapp.com',
    databaseURL: 'https://igbot-dc02d.firebaseio.com',
    storageBucket: 'igbot-dc02d.appspot.com',
    messagingSenderId: '954403116289'
})
global.Promise = require('bluebird')
const currentVersion = 'test'
export const landingPageViewRef = firebase.database().ref(`igbot/${currentVersion}/landingPageViews`)
export const contactListRef = firebase.database().ref(`igbot/${currentVersion}/contactLists`)
export const userRef = firebase.database().ref(`igbot/${currentVersion}/users`)
export const queryRef = firebase.database().ref(`igbot/${currentVersion}/queries`)
export const suggestionRef = firebase.database().ref(`igbot/${currentVersion}/querySuggestions`)
export const suggestionResultRef = firebase.database().ref(`igbot/${currentVersion}/querySuggestionResults`)
export const influencerRef = firebase.database().ref(`igbot/${currentVersion}/influencers`)
export const hashtagRef = firebase.database().ref(`igbot/${currentVersion}/hashtags`)
export const anonymousUserSessionRef = firebase.database().ref(`igbot/${currentVersion}/anonymousUserSessions`)