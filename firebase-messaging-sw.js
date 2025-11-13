importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyAetzlA5XCo3rGQL9zZoZ-GSSUSmxuqsLM",
    authDomain: "lawvengers-x-233aa.firebaseapp.com",
    projectId: "lawvengers-x-233aa",
    messagingSenderId: "970574600791",
    appId: "1:970574600791:web:745bb87480a3a377f3e112"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
    self.registration.showNotification(
        payload.notification.title,
        {
            body: payload.notification.body,
            icon: "/icon.png"
        }
    );
});