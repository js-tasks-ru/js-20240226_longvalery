export default class NotificationMessage {
    message = "";
    options = {};
    duration = 0;
    type = "";
    element = null;

    constructor(message = "", options = {duration: 1000, type: 'success' }) {
      this.message = message;
      this.duration = options["duration"] || 1000 ;
      this.type = options["type"] || "success";

      this.element = this.createTemplate();
      this.createTimer();
    }

    createTemplate() {
      const div = document.createElement('div');
      div.setAttribute("id", "messageDiv");
      div.className = "notification " + this.type;
      const textBody = '<div class="timer"></div><div class="inner-wrapper"><div class="notification-header">' +
                        this.type +
                        '</div><div class="notification-body">' +
                        this.message +
                        '</div></div>';
      div.innerHTML = textBody;
      return div;
    }
    
    createTimer() {
      this.timer = setTimeout(() => { this.remove();}, this.duration);
    }
    
    remove() {
      this.element.remove();
    }
    
    removeTimer() {
      clearTimeout(this.timer);
    } 

    destroy() {
      this.removeTimer();
      this.remove();
    }

    checkAndDestroy() {
      const element = document.getElementById("messageDiv");
      if (element != undefined) { element.remove(); return true; }
      return false;
    }

    show(item) {
      if (item != undefined) { this.element = item; } // !!!! No SOLID
      if (this.checkAndDestroy()) { return ;}
      else { document.body.append(this.element); }
    }                                                                        

}
