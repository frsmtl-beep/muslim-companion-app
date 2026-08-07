import { useState, useEffect, useCallback } from 'react';
import { PrayerTimes } from '../types/prayer';
import { LocationInfo } from '../types';
import { prayerService } from '../services/prayer.service';
import { DEFAULT_CALCULATION_METHOD_ID } from '../constants/prayers';

interface UsePrayersResult {
  prayerTimes: PrayerTimes | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function usePrayers(location: LocationInfo | null, methodId?: number): UsePrayersResult {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrayers = useCallback(async () => {
    if (!location) return;
    setLoading(true);
    setError(null);
    try {
      const times = await prayerService.getPrayerTimes(
        location.coordinates.latitude,
        location.coordinates.longitude,
        (methodId ?? DEFAULT_CALCULATION_METHOD_ID) as Parameters<typeof prayerService.getPrayerTimes>[2],
      );
      setPrayerTimes(times);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load prayer times');
    } finally {
      setLoading(false);
    }
  }, [location, methodId]);

  useEffect(() => {
    fetchPrayers();
  }, [fetchPrayers]);

  return { prayerTimes, loading, error, refresh: fetchPrayers };
}
