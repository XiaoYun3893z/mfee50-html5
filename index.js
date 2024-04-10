import express from "express";
import serveIndex from "serve-index";
import "./routes/ws-echo.js";

const web_port = 3031;
const app = express();

// routes

app.get("/try-sse", (req, res) => {
  let id = 30;

  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  setInterval(() => {
    const now = new Date();
    res.write(`id: ${id++}\n`);
    res.write(`data: ${now.toLocaleString()}\n\n`);
  }, 2000);
});

app.use(express.static("public"));
app.use("/", serveIndex("public", { icons: true }));

app.listen(web_port, () => {
  console.log(`伺服器啟動於通訊埠: ${web_port}`);
});
