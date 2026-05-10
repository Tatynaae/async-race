import type { SortOrder, Winner, WinnerSortField } from '../types/models';
import { buildUrl, readTotalCount } from './http';

export const fetchWinnersPage = async (
  page: number,
  limit: number,
  sort: WinnerSortField,
  order: SortOrder,
): Promise<{ winners: Winner[]; total: number }> => {
  const url = buildUrl('/winners', {
    _page: page,
    _limit: limit,
    _sort: sort,
    _order: order,
  });
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to load winners');
  }
  const winners = (await response.json()) as Winner[];
  const total = readTotalCount(response.headers);
  return { winners, total };
};

export const fetchWinner = async (id: number): Promise<Winner | null> => {
  const response = await fetch(buildUrl(`/winners/${id}`));
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error('Failed to load winner');
  }
  return (await response.json()) as Winner;
};

export const createWinner = async (payload: Winner): Promise<Winner> => {
  const response = await fetch(buildUrl('/winners'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Create winner failed');
  }
  return (await response.json()) as Winner;
};

export const updateWinner = async (
  id: number,
  payload: Pick<Winner, 'wins' | 'time'>,
): Promise<Winner> => {
  const response = await fetch(buildUrl(`/winners/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Update winner failed');
  }
  return (await response.json()) as Winner;
};

export const deleteWinner = async (id: number): Promise<void> => {
  const response = await fetch(buildUrl(`/winners/${id}`), { method: 'DELETE' });
  if (response.status === 404) {
    return;
  }
  if (!response.ok) {
    throw new Error('Delete winner failed');
  }
};
