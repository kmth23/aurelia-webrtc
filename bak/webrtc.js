import {Peer} from 'peerjs';

export class Webrtc{
  peer = null;
  peerConf = {
    'host': '183.182.163.247',
    'port': '8080',
    'path': '/remote-monitor',
    'debug': '3',
    'config': {
      'iceServers': [
        {
          'credential': 'kccs0000',
          'url': 'turn:183.182.163.222:80?transport=tcp',
          'username': 'kccs'
        }
      ]
    }
  }

  constructor(){

  }
}