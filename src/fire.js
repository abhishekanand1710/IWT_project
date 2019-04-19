var config = {
    apiKey: "AIzaSyA56a3ycEn_ao0qNHkQCNySh-0fxYSDbDI",
    authDomain: "result-portal-8c8a1.firebaseapp.com",
    databaseURL: "https://result-portal-8c8a1.firebaseio.com",
    projectId: "result-portal-8c8a1",
    storageBucket: "result-portal-8c8a1.appspot.com",
    messagingSenderId: "1063053454519"
};
firebase.initializeApp(config);

// Enable offline capabilities
firebase.firestore().enablePersistence()
    .then(function() {
        // Initialize Cloud Firestore through firebase
        var db = firebase.firestore();
    })
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled in one tab at a a time.

        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
    });

