'use strict';

import $ from 'jquery';
import Logger from './components/logger';
import fireEvent from './components/event-emitter';

var logger = new Logger(document.querySelector('.log'));
var log = logger.log.bind(logger);

function allowDrop(event) {
  event.preventDefault();
}

function hasClass(el, className) {
  return el.className.indexOf(className) != -1;
}

function closest(el, className) {
  var p = el.parentNode;

  if (el && el.className && hasClass(el, className)) {
    return el;
  } else {
    return closest(p, className);
  }
}

var layersModule = document.querySelector('.js-layers');

var $draggable = $('[draggable]', layersModule);
var $droppable = $('[droppable]', layersModule);

var draggedElement = null;
var draggedClosestList = null;


/* ===================================================================== */
//
//    Bind Drag events
//
/* ===================================================================== */

layersModule.addEventListener('moved', e => {
  console.log("FOLDER MOVED");
  console.log(e);
});

$draggable.on('dragstart', function(event) {
  log(event.type);

  event.originalEvent.dataTransfer.setData("text/plain", event.target.id);

  draggedElement = event.target;
  draggedClosestList = closest(draggedElement, 'nested-list');

  console.log(draggedClosestList);
});

$draggable.on('drag', function(e) {
  e.preventDefault();
  var t = event.target;
  //console.log(e);
  //log(t.id + " " + t.hasAttribute('draggable') + " " + t.hasAttribute('droppable'));
});

// dragend also?
$draggable.on('dragleave', function(event) {
  var t = event.target;
  log(t.tagName + " " + t.id);

  $droppable.each( function(i, item) {
    item.style.backgroundColor = '';
  });
});

$draggable.on('dragexit', function(e) {
  var t = e.target;
  log(`Event: ${e.type}`);
  log(`${t.tagName} ${t.id} ${t.getAttribute('for')}`);
});

/**
 * Check whether the item can be dragged onto
 *
 * @param  {Event}
 */
$droppable.on('dragenter dragover', function(event) {
  allowDrop(event);

  if(event.target !== this) {
    event.originalEvent.dataTransfer.dropEffect = "move";
  }

  if(event.target === this) {
    event.stopPropagation(); // WOULD RATHER AVOID STOPPING PROPAGATION
  }

  //log(this.tagName);
  this.style.backgroundColor = '#DDD';
});

// Create element from HTML using a DOMElement Proxy
function createElementFromHTML(html) {
  var proxy = document.createElement('div');
  proxy.innerHTML = html;
  return proxy.childNodes();
}

function createNestedList(element) {
  var label = document.createElement('label');
  var newId = "layer-state-" + +(new Date().getTime() * Math.random()).toFixed(0);
  label.innerHTML = element.innerHTML + " ";
  label.setAttribute('for', newId);

  var input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('checked', 'checked');
  input.id = newId;

  var nestedList = document.createElement('ul');
  nestedList.className = "nested-list list-reset";

  element.innerHTML = "";
  element.appendChild(input);
  element.appendChild(label);
  element.appendChild(nestedList);

  return nestedList;
}

// Dropping [draggable] item in a [droppable]
$droppable.on('drop', function(e) {
  var event = e.originalEvent;
  var target = event.target; // {Droppable} that was dropped onto
  var currentTarget = event.currentTarget; // {Droppable} this Event Listener was bound to
  var closestDroppable = $(target).closest('[droppable]').get(0);

  // console.warn('DROP detected in %o', this);
  // console.info('Target: %o', target);
  // console.info('Current Target: %o', currentTarget);
  // console.info('Dragged: %o', draggedElement);
  // console.info('Closest %o', closestDroppable);

  // Respond to drop only if this element is the current target.
  if(this === draggedElement) {
    console.info('Cannot drop element on itself');
    return;
  }

  if(this !== closestDroppable) {
    return;
  }

  var nestedList = this.querySelector('.nested-list');

  if(!nestedList) {
    console.info('LIST NOT FOUND in %o', this);
    nestedList = createNestedList(this);
  } else {
    console.info('LIST FOUND in %o', this);
  }

  nestedList.appendChild(draggedElement);
  draggedElement = null;

  // @REVIEW: change to ES6
  var remainingLi = draggedClosestList.querySelectorAll('li');

  // OK removes the list but what about the controlling checkbox???
  // Method should change I think, based on actual toggle classes etc?
  if (remainingLi.length === 0) {
    var $draggedClosestList = $(draggedClosestList);
    var $li = $draggedClosestList.parent();
    var $label = $li.find('label');
    var text = $label.text();

    $li.text(text)

    $draggedClosestList.parent().find('input[type="checkbox"]').remove();
    $label.remove();
    draggedClosestList.remove();
  }

  log("Event: " + event.type);
  log("Element " + target.tagName + " " + target.id );

  fireEvent('moved', layersModule, {});

  return;
});