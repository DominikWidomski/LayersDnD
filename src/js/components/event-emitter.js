export default function fireEvent(eventType, element, properties) {
  var customEvent = document.createEvent('Event');

  customEvent.initEvent(eventType, true, true);

  for(var property in properties) {
    if (properties.hasOwnProperty(property)) {
      try {
        customEvent[property] = properties[property];
      } catch(ex) {
        console.debug('Properties ' + property + ' cannot be copied');
      }
    }
  }

  element.dispatchEvent(customEvent);
}