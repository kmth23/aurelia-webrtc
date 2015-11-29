import Peer from 'peerjs';

export class NewDataConnection {
  constructor(conn) {
    this.conn = conn;
  }
  initialize(dc) {
    return this.conn.initialize(dc);
  }
  _configureDataChannel() {
    return this.conn._configureDataChannel();
  }
  _handleDataMessage(e) {
    return this.conn._handleDataMessage();
  }
  close() {
    return this.conn.close();
  }
  send(data, chunked) {
    return this.conn.send(data, chunked);
  }
  _bufferedSend(msg) {
    this.conn._bufferedSend(msg);
  }
  _trySend(msg) {
   this.conn._trySend(msg); 
  }
  _tryBuffer() {
   this.conn._tryBuffer(); 
  }
  _sendChunks(blob) {
    this.conn._sendChunks(blob);
  }
  handleMessage(message) {
    this.conn.handleMessage(message);
  }
  
  on(event) {
    return new Promise((resolve, reject) => {
      if ('open' === event) {
        this.conn.on(event, () => {
          resolve(this.conn);
        });                
      } else {
        this.conn.on(event, (args) => {
          resolve(args);
        });        
      }      
    });
  }
}

export class NewMediaConnection {
  constructor(call) {
    this.call = call;
  }
  addStream(remoteStream) {
    return this.call.addStream(remoteStream);
  }
  handleMessage(message) {
    return this.call.handleMessage(message);
  }
  answer(stream) {
    return this.call.answer(stream);
  }
  close() {
    return this.call.close();
  }
  
  on(event) {
    return new Promise((resolve, reject) => {
      this.call.on(event, (args) => {
        resolve(args);
      });
    });    
  }  
}

export class NewPeer extends Peer {
  on(event) {
    return new Promise((resolve, reject) => {
      if ('connection' === event) {
        super.on(event, (conn) => {
          resolve(new NewDataConnection(conn));
        });
      } else if ('call' === event) {
        super.on(event, (call) => {
          resolve(new NewMediaConnection(call));
        });
      } else {
        super.on(event, (args) => {
          resolve(args);
        });
      }
    });
  }
}
