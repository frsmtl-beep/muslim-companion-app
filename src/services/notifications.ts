import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { PrayerTime } from '../types/prayer';
import { PRAYER_NAMES_FR } from '../constants/prayers';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('prayer-times', {
      name: 'Horaires de prière',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#1a3a5c',
    });
  }

  return finalStatus === 'granted';
}

export async function scheduleAllPrayerNotifications(
  prayers: PrayerTime[],
  minutesBefore: Partial<Record<string, number>> = {},
  enabledPrayers: Partial<Record<string, boolean>> = {},
): Promise<void> {
  // Cancel existing prayer notifications before re-scheduling
  await cancelAllPrayerNotifications();

  const now = Date.now();

  for (const prayer of prayers) {
    if (prayer.name === 'Sunrise') continue;
    if (enabledPrayers[prayer.name] === false) continue;

    const minBefore = minutesBefore[prayer.name] ?? 10;
    const notifyAt = prayer.timestamp - minBefore * 60 * 1000;

    if (notifyAt <= now) continue; // already passed

    const prayerLabel = PRAYER_NAMES_FR[prayer.name] ?? prayer.name;
    const title = minBefore > 0 ? `🕌 ${prayerLabel} dans ${minBefore} min` : `🕌 ${prayerLabel}`;
    const body = minBefore > 0
      ? `La prière de ${prayerLabel} commence dans ${minBefore} minutes.`
      : `L'heure de la prière de ${prayerLabel} est arrivée.`;

    await Notifications.scheduleNotificationAsync({
      identifier: `prayer_${prayer.name}_${prayer.timestamp}`,
      content: {
        title,
        body,
        data: { prayer: prayer.name, timestamp: prayer.timestamp },
        categoryIdentifier: 'prayer-times',
      },
      trigger: {
        date: new Date(notifyAt),
        channelId: 'prayer-times',
      },
    });
  }
}

export async function cancelAllPrayerNotifications(): Promise<void> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const n of scheduled) {
    if (n.identifier.startsWith('prayer_')) {
      await Notifications.cancelScheduledNotificationAsync(n.identifier);
    }
  }
}

export const notificationService = {
  requestPermissions: requestNotificationPermissions,
  scheduleAll: scheduleAllPrayerNotifications,
  cancelAll: cancelAllPrayerNotifications,
};
