/* jshint esnext: true */

import $ from 'jquery';

var $output = $('<input/>');

$output.appendTo('body');

function addEvents() {
  $(window).on('touchmove', trackTouch);
}

function trackTouch(evt) {
  evt = evt.originalEvent;
  console.log('hello');
  $output.val(evt.touches[0].force);
}

function init() {
  addEvents();
}

init();
