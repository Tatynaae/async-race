import type { Winner } from '../types/models';
import { createWinner, fetchWinner, updateWinner } from '../api/winnersApi';

export const upsertWinnerScore = async (id: number, timeSec: number): Promise<Winner> => {
  const existing = await fetchWinner(id);
  if (!existing) {
    try {
      return await createWinner({ id, wins: 1, time: timeSec });
    } catch {
      const fallback = await fetchWinner(id);
      if (!fallback) {
        throw new Error('Unable to store winner');
      }
      const wins = fallback.wins + 1;
      const time = Math.min(fallback.time, timeSec);
      return updateWinner(id, { wins, time });
    }
  }
  const wins = existing.wins + 1;
  const time = Math.min(existing.time, timeSec);
  return updateWinner(id, { wins, time });
};
