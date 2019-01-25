import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SERNDER_ID,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);

    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  signInWithPopup = () => this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

  addWeight = async obj => {
    try {
      await this.db.collection('weights').doc().set({
        ...obj,
        uid: this.auth.currentUser.uid,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  getCollection = async collection => {
    const snapshot = await this.db
      .collection(collection)
      .where('uid', '==', this.auth.currentUser.uid)
      .get()
    const data = snapshot.docs.map(doc => doc.data());
    return data;
  }
}

export default Firebase;
