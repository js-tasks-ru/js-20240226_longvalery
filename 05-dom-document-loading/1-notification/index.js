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

      const div = document.createElement('div');
      div.setAttribute("id", "messageDiv");
      div.className = "notification " + this.type;
      const textBody = '<div class="timer"></div><div class="inner-wrapper"><div class="notification-header">' +
                        this.type +
                        '</div><div class="notification-body">' +
                        this.message +
                        '</div></div>';
      div.innerHTML = textBody;
      this.element = div;
      setTimeout(() => {console.log("remove"); this.remove(); }, this.duration);
    }
    
    remove() {
      this.element.remove();
    }

    destroy() {
      this.element.remove();
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
