import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

//intialise firebase config
let firebaseConfig = {
    apiKey: "AIzaSyAkHvw4WBS32U3zgqZgoctdiNk_w7K1V3U",
    authDomain: "cusedines.firebaseapp.com",
    databaseURL: "https://cusedines-default-rtdb.firebaseio.com",
    projectId: "cusedines",
    storageBucket: "cusedines.appspot.com",
    messagingSenderId: "967542496258",
    appId: "1:967542496258:web:4786d8172c85102799db1b",
    measurementId: "G-DNYRLHF4ZV"
  
  }

firebase.initializeApp(firebaseConfig)

//utils
const db = firebase.firestore()
const auth = firebase.auth()
const realtimeDb = firebase.database()
const storage = firebase.storage()

//collection refrences
const stationCollection = db.collection('station')
const productCollection = db.collection('products')
const userCollection = db.collection('users')
const orderCollection = db.collection('orders')

export {
  db,
  auth,
  realtimeDb,
  storage,
  stationCollection,
  productCollection,
  userCollection,
  orderCollection,
}