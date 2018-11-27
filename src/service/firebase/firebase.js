import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCi6IghnnCxeiUwOGDI4ARMeLVb0HICeyU',
  authDomain: 'gravitysquare-12d58.firebaseapp.com',
  databaseURL: 'https://gravitysquare-12d58.firebaseio.com',
  projectId: 'gravitysquare-12d58',
  storageBucket: '',
  messagingSenderId: '217164872272',
};

firebase.initializeApp(config);
export const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true,
});

export default firebase;

