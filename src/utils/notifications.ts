import { Expo, ExpoPushMessage } from 'expo-server-sdk';

let expo = new Expo();

export const sendPushNotification = async (targetToken: string, title: string, body: string, data = {}) => {
  if (!Expo.isExpoPushToken(targetToken)) {
    console.error(`Push token ${targetToken} is not a valid Expo push token`);
    return;
  }

  const messages: ExpoPushMessage[] = [{
    to: targetToken,
    sound: 'default',
    title: title,
    body: body,
    data: data,
    priority: 'high'
  }];

  let chunks = expo.chunkPushNotifications(messages);
  for (let chunk of chunks) {
    try {
      await expo.sendPushNotificationsAsync(chunk);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }
};