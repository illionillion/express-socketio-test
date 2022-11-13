"use strict";
/// <reference path="https://cdn.socket.io/4.5.3/socket.io.min.js"/>

//-------------------------------------
// Socket.ioサーバへ接続
//-------------------------------------
const socket = io();

/**
 * [イベント] ページの読込み完了
 */
window.onload = () => {
  /**
   * [イベント] フォームが送信された
   */
  document.querySelector("#frm-post").addEventListener("submit", (e) => {
    // 規定の送信処理をキャンセル(画面遷移しないなど)
    e.preventDefault();

    // 入力内容を取得する
    const msg = document.querySelector("#msg");
    if (msg.value === "") {
      return false;
    }

    // Socket.ioサーバへ送信
    socket.emit("post", { text: msg.value });

    // 発言フォームを空にする
    msg.value = "";
  });

  /**
   * [イベント] 誰かが発言した
   */
  socket.on("member-post", (msg) => {
    const list = document.querySelector("#msglist");
    const li = document.createElement("li");
    li.innerHTML = `${msg.text}`;
    list.insertBefore(li, list.firstChild);
  });
  // テキストボックスを選択する
  document.querySelector("#msg").focus();
};
