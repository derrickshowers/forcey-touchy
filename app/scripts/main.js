/* jshint esnext: true */

import $ from 'jquery';
import ProgressBar from './progress-bar';

const COLOR_MAX_VALUE = 150;
const BAR_OPACITY = 0.7;

let progressBar;
let barElHeight;
let $bar;

function addEventListeners() {
  $('.touch-container').on('touchstart', touchHandler);
  $('.touch-container').on('touchmove', touchHandler);
}

function updateBar() {
  $bar.css('transform', `translate3d(0, ${barElHeight - progressBar.barHeight}px, 0)`);
  $bar.css('background', `rgba(${progressBar.colorValue}, ${COLOR_MAX_VALUE - progressBar.colorValue}, 0, ${BAR_OPACITY})`);
}

function resetBar() {
  $bar.css('transform', `translate3d(0, ${barElHeight}px, 0)`);
  $bar.css('background', `rgba(0, ${COLOR_MAX_VALUE}, 0, ${BAR_OPACITY})`);
}

function touchHandler(evt) {
  let touchActive = true;
  let touchChecker;

  evt = evt.originalEvent;

  function getHeightAndUpdate() {
    progressBar.barHeight = evt.touches[0].force;
    updateBar();
    if (touchActive) {
      window.requestAnimationFrame(getHeightAndUpdate);
    } else {
      resetBar();
    }
  }

  touchChecker = window.requestAnimationFrame(getHeightAndUpdate);

  $('.touch-container').on('touchend', () => {
    touchActive = false;
  });
}

function init() {
  $bar = $('.bar');
  barElHeight = $bar.height();
  progressBar = new ProgressBar(barElHeight);
  resetBar();
  addEventListeners();
}

init();
