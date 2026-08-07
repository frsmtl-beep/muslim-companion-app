import { useState, useEffect } from 'react';
import { geolocationService } from '../services/geolocation';

interface UseQiblaResult {
  qiblaDirection: number | null;
  loading: boolean;
}

export function useQibla(latitude: number | null, longitude: number | null): UseQiblaResult {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (latitude === null || longitude === null) return;
    setLoading(true);
    const direction = geolocationService.calculateQiblaDirection(latitude, longitude);
    setQiblaDirection(direction);
    setLoading(false);
  }, [latitude, longitude]);

  return { qiblaDirection, loading };
}
