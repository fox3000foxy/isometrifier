//Constants
const PORT = 4300

//Server
const express = require('express')
const appli = express()
const http = require('http');
const server = http.createServer(appli);
const { Server } = require("socket.io");
const io = new Server(server);

appli.get('/',(req,res)=>{
	res.sendFile(__dirname+'/public/index.html')
})
appli.use(express.static("public"))

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT)

//Front
// const { app, BrowserWindow } = require('electron')
// const path = require('path')

// function createWindow () {
  // const win = new BrowserWindow({
    // width: 800,
    // height: 600,
    // webPreferences: {
      // preload: path.join(__dirname, 'preload.js')
    // }
  // })

  // win.loadURL('http://localhost:'+PORT+'/logos.html')
  // win.setMenu(null)
  // win.setFullScreen(true);
// }

// app.whenReady().then(() => {
  // createWindow()
  // app.on('activate', () => {
    // if (BrowserWindow.getAllWindows().length === 0) {
      // createWindow()
    // }
  // })
// })

// app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {app.quit()}
// })