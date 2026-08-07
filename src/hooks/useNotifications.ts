import { useState, useEffect } from 'react';
import { notificationService } from '../services/notifications';

interface UseNotificationsResult {
  permissionGranted: boolean;
  requestPermissions: () => Promise<void>;
}

export function useNotifications(): UseNotificationsResult {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    notificationService.requestPermissions().then(setPermissionGranted);
  }, []);

  const requestPermissions = async () => {
    const granted = await notificationService.requestPermissions();
    setPermissionGranted(granted);
  };

  return { permissionGranted, requestPermissions };
}
