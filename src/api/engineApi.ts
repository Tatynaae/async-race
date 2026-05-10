import type { EngineDriveResponse, EngineStartedResponse } from '../types/models';
import { buildUrl } from './http';

type EngineStatus = 'started' | 'stopped' | 'drive';

const patchEngine = async (id: number, status: EngineStatus): Promise<Response> => {
  const url = buildUrl('/engine', { id, status });
  return fetch(url, { method: 'PATCH' });
};

export const startEngine = async (id: number): Promise<EngineStartedResponse> => {
  const response = await patchEngine(id, 'started');
  if (!response.ok) {
    throw new Error('Engine start failed');
  }
  return (await response.json()) as EngineStartedResponse;
};

export const stopEngine = async (id: number): Promise<EngineStartedResponse> => {
  const response = await patchEngine(id, 'stopped');
  if (!response.ok) {
    throw new Error('Engine stop failed');
  }
  return (await response.json()) as EngineStartedResponse;
};

export const driveEngine = async (id: number): Promise<EngineDriveResponse> => {
  const response = await patchEngine(id, 'drive');
  if (response.status === 500) {
    throw new Error('Engine broken');
  }
  if (response.status === 429) {
    throw new Error('Drive busy');
  }
  if (!response.ok) {
    throw new Error('Drive failed');
  }
  return (await response.json()) as EngineDriveResponse;
};
