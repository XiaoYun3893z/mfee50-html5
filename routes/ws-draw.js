import WebSocket, { WebSocketServer } from "ws";

const wsServer = new WebSocketServer({ port: 3082 });

// 廣播訊息
const broadcastMsg = (msg) => {
  wsServer.clients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(msg);
    }
  });
};

wsServer.on("connection", (ws, req) => {
  ws.on("message", (message) => {
    broadcastMsg(message.toString());
  });
});

export default wsServer;
