import {inject} from 'aurelia-framework';
import {AppConf} from 'app-conf';
import Peer from 'peerjs';
import {Connection} from 'connection';

@inject(AppConf, Connection)
export class Monitor {
  peer = null;
  connection = null;
  myId = null;
  peerId = null;
  message = null;
  recieveMessage = null;
  recieveImg = null;
  canvasDisplay = "none";
  videoDisplay = "inline-block";
  imgDisplay = "none";
  
  constructor(appConf, conn) {
    this.connection = conn;
    this.peer = new Peer(appConf.peerConf);
    this.bindPeer(this.peer);
    this.initialize(appConf.myConst);
  }

  bindPeer(peer) {
    peer.on('open', (id) => {
      this.myId = id;
    });
    peer.on('connection', (conn) => {
      this.connection.conn = conn;
      conn.on('open', () => {
        conn.on('data', (data) => {
          if (data.type === 'message') {
            this.recieveMessage = data.payload; 
          } else if (data.type === 'image') {
            this.recieveImg = data.payload;
            this.imgDisplay = 'inline-block';
          }
        });
        conn.on('close', function() {
        });
        conn.on('error', function(error) {
          alert(error);          
        });
      });
    });
    peer.on('call', (call) => {
      call.answer(this.connection.myStream);
      call.on('stream', (stream) => {
        this.connection.peerStream = stream;
        this.connection.peerVideo = URL.createObjectURL(stream);
      });
      call.on('close', () => {
      });
      call.on('error', (error) => {
        alert(error);
      });
    });
    peer.on('close', () => {
    });
    peer.on('disconnected', () => {
      alert('reconnect');
      peer.reconnect();
    });
    peer.on('error', (err) => {
      alert(error);
    });
  }
  
  getUserMedia(constraints) {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      navigator.getUserMedia(constraints, (myStream) => {
        this.connection.myStream = myStream;
        this.connection.myVideo = URL.createObjectURL(myStream);
        resolve(myStream);
      }, (error) => {
        alert('getUserMedia error');
        reject(error);
      });
    });
  }
  
  initialize(constraints: {audio: true, video: true}) {
    this.getUserMedia(constraints);
  }
  
  call() {
    var conn = this.peer.connect(this.peerId);
    this.connection.conn = conn;
    conn.on('open', () => {
      conn.on('data', (data) => {
        if (data.type === 'message') {
          this.recieveMessage = data.payload; 
        } else if (data.type === 'image') {
          this.recieveImg = data.payload;
          this.imgDisplay = 'inline-block';
        }
      });
      conn.on('close', () => {
      });
      conn.on('error', (error) => {
        alert(error);          
      });
    });
    var call = this.peer.call(this.peerId, this.connection.myStream);
    call.on('stream', (stream) => {
      this.connection.peerStream = stream;
      this.connection.peerVideo = URL.createObjectURL(stream);
    });
    call.on('close', () => {
    });
    call.on('error', (error) => {
      alert(error);
    });
  }
  
  reset(){
    this.canvasDisplay = "none";
    this.videoDisplay = "inline-block";

  }

  live(){
    alert('live');
  }

  rec(){
    alert('rec');
  }

  stop(){
    alert('stop');
  }

  snap(){
    let canvas = document.getElementById('capture-canvas');
    let video = document.getElementById('peer-video');
    
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    
    let ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.canvasDisplay = "inline-block";
    this.videoDisplay = "none";
  }

  image(){
    alert('image');
  }
  
  send(){
    this.connection.conn.send({type: 'message', payload: this.message});
    
    let canvas = document.getElementById('capture-canvas');
    let image = canvas.toDataURL('image/png');
    
    this.connection.conn.send({type: 'image', payload: image});
  }
}
