// Firebase SDK স্ক্রিপ্টগুলো ইম্পোর্ট করুন
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// আপনার Firebase প্রজেক্টের সঠিক কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyAetzlA5XCo3rGQL9zZoZ-GSSUSmxuqsLM",
  authDomain: "lawvengers-x-233aa.firebaseapp.com",
  databaseURL: "https://lawvengers-x-233aa-default-rtdb.firebaseio.com",
  projectId: "lawvengers-x-233aa",
  storageBucket: "lawvengers-x-233aa.firebasestorage.app",
  messagingSenderId: "970574600791",
  appId: "1:970574600791:web:745bb87480a3a377f3e112"
};

// Firebase অ্যাপটি চালু করুন
firebase.initializeApp(firebaseConfig);

// মেসেজিং সার্ভিসটি চালু করুন
const messaging = firebase.messaging();

// (Optional) ব্যাকগ্রাউন্ড নোটিফিকেশন হ্যান্ডেল করার জন্য
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png", // আপনার আইকনের পাথ
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
