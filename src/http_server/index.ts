import * as fs from 'fs';
import * as path from 'path';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { WebSocketServer } from 'ws';
import { eventMessage } from '../eventManager.js';

export const httpServer = createServer(function (
  req: IncomingMessage,
  res: ServerResponse,
) {
  const __dirname = path.resolve(path.dirname(''));
  const file_path =
    __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

const WS_PORT = 8080;

const webSocketServer = new WebSocketServer({ port: WS_PORT });

webSocketServer.on('connection', function connection(ws) {
  console.log('Client is connected');

  ws.on('open', () => console.log('ws open'));

  ws.on('message', async function message(data: Buffer) {
    try {
      console.log(`received: ${data}`);
      const resolve = await eventMessage(data.toString());
      console.log(resolve);

      ws.send(resolve);
    } catch (error) {
      console.log(`error ws.on.message: ${error}`);
      ws.send('error ws.on.message');
    }

    // const [cmd, ...params] = data.toString().split(' ');
    // console.log('after Split:', { cmd, params });
    //ws.send({ cmd, params });
  });

  ws.on('error', (ws) => console.log(`error socket: ${ws}`));
  ws.on('close', (client) =>
    console.log(`Client closed the connection: ${client}`),
  );
});
