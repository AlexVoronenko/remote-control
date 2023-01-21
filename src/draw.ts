import { ParseAction } from './actionManager.js';
import { mouse, Button, straightTo, Point, screen } from '@nut-tree/nut-js';

const drawActivities: {
  [key: string]: (action: ParseAction) => Promise<void>;
} = {
  circle: drawCircle,
  square: drawSquare,
  rectangle: drawRectangle,
};

export async function drawAction(action: ParseAction) {
  try {
    const callAction = drawActivities[action.subcommand];
    await callAction(action);
    return `${action.command}_${action.subcommand}`;
  } catch (error) {
    throw new Error('error');
  }
}

async function drawCircle(action: ParseAction) {
  try {
    const radius = Number(action.params);
    const position = await mouse.getPosition();
    await mouse.pressButton(Button.LEFT);

    const xWidth = await screen.width();
    const yHeight = await screen.height();

    for (let i = -90; i < 271; i++) {
      let x = position.x + Math.cos((Math.PI * i) / 180) * radius;
      let y = position.y + radius + Math.sin((Math.PI * i) / 180) * radius;

      x = x < 0 ? 0 : x;
      x = x > xWidth ? xWidth : x;
      y = y < 80 ? 80 : y;
      y = y > yHeight ? yHeight - 20 : y;

      await mouse.move(straightTo(new Point(x, y)));
    }
    await mouse.releaseButton(Button.LEFT);
  } catch (error) {
    throw new Error('error');
  }
}

export async function drawRectangle(action: ParseAction) {
  try {
    const x = Number(action.params[0]);
    const y = Number(action.params[1]);
    const pos = await mouse.getPosition();

    mouse.config.mouseSpeed = 500;

    await mouse.pressButton(Button.LEFT);

    await mouse.move(straightTo(new Point(pos.x + x, pos.y + 0)));
    await mouse.move(straightTo(new Point(pos.x + x, pos.y + y)));
    await mouse.move(straightTo(new Point(pos.x, pos.y + y)));
    await mouse.move(straightTo(new Point(pos.x, pos.y)));

    await mouse.releaseButton(Button.LEFT);
  } catch (error) {
    throw new Error('error');
  }
}

export async function drawSquare(action: ParseAction) {
  try {
    const x = Number(action.params[0]);
    const pos = await mouse.getPosition();

    mouse.config.mouseSpeed = 500;

    await mouse.pressButton(Button.LEFT);

    await mouse.move(straightTo(new Point(pos.x + x, pos.y + 0)));
    await mouse.move(straightTo(new Point(pos.x + x, pos.y + x)));
    await mouse.move(straightTo(new Point(pos.x, pos.y + x)));
    await mouse.move(straightTo(new Point(pos.x, pos.y)));

    await mouse.releaseButton(Button.LEFT);
  } catch (error) {
    throw new Error('error');
  }
}
