import { mouseAction } from './mouse.js';
import { drawAction } from './draw.js';

export type Action = {
  cmd: string;
  params: Array<string>;
};

export type ParseAction = {
  command: string;
  subcommand: string;
  params: Array<string>;
};

const activities: {
  [key: string]: (action: ParseAction) => Promise<string> | string;
} = {
  mouse: (action: ParseAction) => mouseAction(action),
  draw: (action: ParseAction) => drawAction(action),
  // prnt: () => printScreen(),
};

export async function actionManager(action: Action) {
  // eslint-disable-next-line no-useless-catch
  try {
    const [command, subcommand] = action.cmd.split('_');
    return await activities[command]({
      command,
      subcommand,
      params: action.params,
    });
  } catch (error) {
    throw error;
  }
}
