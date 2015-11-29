import Peer from 'peerjs';

export class PeerBase{
  constructor(peerConf) {
    this.peer = new Peer(peerConf);
    this.bindPeer(this.peer);
  }
}
