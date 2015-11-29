import {bindable} from 'aurelia-framework';

export class Notification {
  title = "message";
  icon = "fa-commenting-o";
  @bindable imgDisplay = null;
  @bindable message = null;
  @bindable img = null;
  
  constructor() {
  }
}
