import { ParseAction } from './actionManager.js';
import {
  MouseClass,
  Point,
  mouse,
  left,
  up,
  right,
  down,
} from '@nut-tree/nut-js';

const mouseActivities: {
  [key: string]: (px: number) => Promise<MouseClass | Point>;
} = {
  left: (px: number) => mouse.move(left(px)),
  up: (px: number) => mouse.move(up(px)),
  right: (px: number) => mouse.move(right(px)),
  down: (px: number) => mouse.move(down(px)),
  position: () => mouse.getPosition(),
};

export async function mouseAction({
  command,
  subcommand,
  params,
}: ParseAction) {
  try {
    let cmd = `${command}_${subcommand}`;

    if (cmd === 'mouse_position') {
      const { x, y } = await mouse.getPosition();
      console.log('getPosition: ', cmd);
      cmd = `${cmd} ${x},${y}`;
    } else {
      const [x] = params;
      const cb = mouseActivities[subcommand];
      await cb(Number(x));
    }

    return cmd;
  } catch (error) {
    throw new Error('error');
  }
}
