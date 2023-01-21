/* eslint-disable no-useless-catch */
import { actionManager } from './actionManager.js';

function parseEvent(data: string) {
  const [cmd, ...params] = data.split(' ');
  return { cmd, params };
}

export async function eventMessage(data: string) {
  try {
    const action = parseEvent(data);

    const callback = await actionManager(action);
    return callback;
  } catch (error) {
    throw error;
  }
}
