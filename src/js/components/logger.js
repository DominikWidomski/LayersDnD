// @constructor
function Logger(element) {
  this.element = element;
}

Logger.prototype.log = function(str) {
  let a = document.createElement('div');
  a.className = "log-l";
  a.appendChild(document.createTextNode(str));

  let logElement = this.element;
  logElement.appendChild(a);
  // logElement.html(logElement.html() + "<div class='log-l'>" + str + "</div>");
  logElement.scrollTop = logElement.scrollHeight;

  // Perhaps make this optional? Maybe have two logs? One that gets cleared and one that stays?
  // setTimeout(function() {
  //   a.remove();
  // }, 1000);
}

export default Logger;
