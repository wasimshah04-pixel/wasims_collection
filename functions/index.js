// প্রয়োজনীয় প্যাকেজগুলো ইম্পোর্ট করা হচ্ছে
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Firebase Admin SDK চালু করা হচ্ছে
admin.initializeApp();

/**
 * এই ফাংশনটি তখনই স্বয়ংক্রিয়ভাবে চালু হবে যখন Realtime Database-এর
 * 'notices' পাথের ভেতরে নতুন কোনো নোটিশ (noticeId) তৈরি হবে।
 */
exports.sendNotificationOnNewNotice = functions.database.ref('/notices/{noticeId}')
    .onCreate(async (snapshot, context) => {

        const noticeData = snapshot.val();
        if (!noticeData) {
            return console.log('New notice has no data.');
        }

        console.log(`New notice created: "${noticeData.title}". Preparing notifications.`);

        const payload = {
            notification: {
                title: `নতুন নোটিশ: ${noticeData.title}`,
                body: noticeData.content ? noticeData.content.substring(0, 100) + "..." : "বিস্তারিত জানতে অ্যাপটি খুলুন।"
            }
        };

        const tokensSnapshot = await admin.database().ref('/fcm_tokens').once('value');
        if (!tokensSnapshot.exists()) {
            console.log("There are no user tokens for notifications.");
            return null;
        }
        
        const tokens = Object.values(tokensSnapshot.val());

        if (tokens.length === 0) {
            console.log("Token list is empty.");
            return null;
        }
        
        console.log(`Sending notification to ${tokens.length} devices.`);
        
        try {
            const response = await admin.messaging().sendToDevice(tokens, payload);
            console.log("Successfully sent message:", response);
        } catch (error) {
            console.error("Error sending message:", error);
        }
        
        return null;
    });
