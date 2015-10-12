/* jshint esnext: true */

import $ from 'jquery';
import ProgressBar from './progress-bar';

const COLOR_MAX_VALUE = 150;
const BAR_OPACITY = 0.7;

let progressBar;
let barElHeight;
let $bar;

function addEventListeners() {
  $('.touch-container').on('touchstart', containerTouched);
  $('.options').on('touchstart', optionsTouched);
}

function updateBar() {
  $bar.css('transform', `translate3d(0, ${barElHeight - progressBar.barHeight}px, 0)`);
  $bar.css('background', `rgba(${progressBar.colorValue}, ${COLOR_MAX_VALUE - progressBar.colorValue}, 0, ${BAR_OPACITY})`);
}

function resetBar() {
  $bar.css('transform', `translate3d(0, ${barElHeight}px, 0)`);
  $bar.css('background', `rgba(0, ${COLOR_MAX_VALUE}, 0, ${BAR_OPACITY})`);
}

function touchChecker(props) {
  let touchActive = true;
  let _touchChecker;

  function getHeightAndUpdate() {
    props.whileTouching();
    if (touchActive) {
      window.requestAnimationFrame(getHeightAndUpdate);
    } else {
      props.doneTouching();
    }
  }

  _touchChecker = window.requestAnimationFrame(getHeightAndUpdate);

  props.$el.on('touchend', () => {
    touchActive = false;
  });
}

function containerTouched(evt) {
  evt = evt.originalEvent;
  touchChecker({
    $el: $('.touch-container'),
    whileTouching() {
      progressBar.barHeight = evt.touches[0].force;
      updateBar();
    },
    doneTouching() {
      resetBar();
    }
  });
}

function optionsTouched(evt) {
  let $el = $('.options');
  let forced = false;
  evt.preventDefault();
  evt = evt.originalEvent;
  touchChecker({
    $el,
    whileTouching() {
      if (evt.touches[0].force >= 1) {
        $el.addClass('selected');
        $el.text('Tap to dismiss');
        forced = true;
      } else if (!forced) {
        $el.removeClass('selected');
        $el.text('Force touch for options');
        forced = false;
      }
    },
    doneTouching() {
      // we don't need to do anything when finished
    }
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
