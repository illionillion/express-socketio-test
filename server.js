const Express = require('express');
const path = require('path');
const app  = Express();
const http = require("http").createServer(app);
const io   = require("socket.io")(http);
const port = 8081

/**
 * "/"にアクセスがあったらindex.htmlを返却
 */
app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/index.html");
});
// /jsからjsファイルを出力
app.use("/js", Express.static(path.join(__dirname, "/public/js")));

/**
 * [イベント] ユーザーが接続
 */
io.on("connection", (socket)=>{
  console.log("ユーザーが接続しました");
  
  socket.on("post", (msg)=>{
      console.log("ユーザーが発言しました");
    io.emit("member-post", msg);
  });
});

/**
 * 3000番でサーバを起動する
 */
http.listen(port, ()=>{
  console.log(`http://localhost:${port}`);
});