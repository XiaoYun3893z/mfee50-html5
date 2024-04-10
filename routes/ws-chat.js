import WebSocket, { WebSocketServer } from "ws";

const wsServer = new WebSocketServer({ port: 3081 });

// 廣播訊息
const broadcastMsg = (msg) => {
  wsServer.clients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(msg);
    }
  });
};

wsServer.on("connection", (ws, req) => {
  // 存放用戶資料的物件
  const dataObj = { name: "", ip: req.socket.remoteAddress };

  ws.on("message", (message) => {
    let m = message.toString();
    let msg = ""; // 要送出去的訊息
    if (dataObj.name) {
      // 某人說了什麼
      msg = `${dataObj.name}: ${m}`;
    } else {
      dataObj.name = m;
      // 某人進到聊天室
      msg = `"${dataObj.name}" 進入聊天室, 目前人數: ${wsServer.clients.size}`;
    }
    broadcastMsg(msg); // 廣播訊息
  });
  ws.on("close", () => {
    const msg = `"${dataObj.name}" 離開, 目前人數: ${wsServer.clients.size}`;
    broadcastMsg(msg);
  });
});

export default wsServer;
