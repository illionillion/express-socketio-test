"use strict";
/// <reference path="https://cdn.socket.io/4.5.3/socket.io.min.js"/>
/// <reference path="../../node_modules/socket.io-client/build/esm/index.js"/>

// どっちでもioが使える
// import '/socket.io/socket.io.js'
// import 'https://cdn.socket.io/4.5.3/socket.io.min.js'
// import 'https://code.jquery.com/jquery-3.3.1.js' // jQuery

// import maps
import 'socket.io-client'
import 'jQuery' // jQuery

// import { io } from 'socket.io-client'; // これはできない
// import { io } from 'https://cdn.socket.io/4.5.3/socket.io.min.js' // これもダメ

//-------------------------------------
// Socket.ioサーバへ接続
//-------------------------------------
const socket = io();

/**
 * [イベント] ページの読込み完了
 */
window.onload = () => {

  // $が使える
  console.log($('body'));
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
