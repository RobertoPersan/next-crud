//import firebase from 'firebase';
import firebase from 'firebase/compat/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBNLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBNLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBNLIC_FIREBASE_PROJECT_ID,
    })
}

export default firebase