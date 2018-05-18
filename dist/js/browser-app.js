/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./static/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/entry.js":
/*!*************************!*\
  !*** ./src/js/entry.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ "./src/js/layout.js");
/* harmony import */ var _manage_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manage-browser */ "./src/js/manage-browser.js");



window.onresize = _layout__WEBPACK_IMPORTED_MODULE_0__["default"];
window.onload   = _manage_browser__WEBPACK_IMPORTED_MODULE_1__["default"];


/***/ }),

/***/ "./src/js/is-loading.js":
/*!******************************!*\
  !*** ./src/js/is-loading.js ***!
  \******************************/
/*! exports provided: isLoading, setLoading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLoading", function() { return isLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLoading", function() { return setLoading; });
let loadingState = false;

function isLoading() { return loadingState }
function setLoading(state) { loadingState = state; }

/***/ }),

/***/ "./src/js/layout.js":
/*!**************************!*\
  !*** ./src/js/layout.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return layout; });
function layout() {
  let webview        = document.querySelector('webview');
  let controls       = document.querySelector('#controls');
  let controlsHeight = controls.offsetHeight;
  let windowWidth    = document.documentElement.clientWidth;
  let windowHeight   = document.documentElement.clientHeight;
  let webviewWidth   = windowWidth;
  let webviewHeight  = windowHeight - controlsHeight;

  webview.style.width  = webviewWidth + 'px';
  webview.style.height = webviewHeight + 'px';

  let sadWebview              = document.querySelector('#sad-webview');
  sadWebview.style.width      = webviewWidth + 'px';
  sadWebview.style.height     = webviewHeight * 2/3 + 'px';
  sadWebview.style.paddingTop = webviewHeight/3 + 'px';
}


/***/ }),

/***/ "./src/js/manage-browser.js":
/*!**********************************!*\
  !*** ./src/js/manage-browser.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return manageBrowser; });
/* harmony import */ var _is_loading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-loading */ "./src/js/is-loading.js");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout */ "./src/js/layout.js");
/* harmony import */ var _manage_webview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manage-webview */ "./src/js/manage-webview.js");




function addControlsEvents() {
  let webview = document.querySelector('webview');

  onClick('#forward', webview.goForward);
  onClick('#back', webview.goBack);
  onClick('#home', () => navigateTo('http://www.github.com/'));
  onClick('#reload', () => {
    if (Object(_is_loading__WEBPACK_IMPORTED_MODULE_0__["isLoading"])()) {
      webview.stop();
    } else {
      webview.reload();
    }
  });

  document.querySelector('#reload').addEventListener('webkitAnimationIteration', () => {
    Object(_is_loading__WEBPACK_IMPORTED_MODULE_0__["isLoading"])() || document.body.classList.remove('loading');
  });

  document.querySelector("#location-form").addEventListener('submit', (e) => {
    e.preventDefault();
    navigateTo(document.querySelector('#location').value);
  });
}

function formatUrl(url) {
  const valid = url.match(/^http(s)?\:\/\//);

  if (valid) {
    return url;
  } else {
    return `http://${url}`;
  }
}

function navigateTo(url) {
  Object(_manage_webview__WEBPACK_IMPORTED_MODULE_2__["resetExitedState"])();
  const formattedUrl = formatUrl(url);
  document.querySelector('webview').src = formattedUrl;
}

function onClick(selector, callback) {
  document.querySelector(selector).addEventListener('click', callback);
}

function manageBrowser() {
  Object(_layout__WEBPACK_IMPORTED_MODULE_1__["default"])();
  addControlsEvents();
  Object(_manage_webview__WEBPACK_IMPORTED_MODULE_2__["manageWebview"])();
};


/***/ }),

/***/ "./src/js/manage-webview.js":
/*!**********************************!*\
  !*** ./src/js/manage-webview.js ***!
  \**********************************/
/*! exports provided: resetExitedState, manageWebview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetExitedState", function() { return resetExitedState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "manageWebview", function() { return manageWebview; });
/* harmony import */ var _is_loading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-loading */ "./src/js/is-loading.js");


function handleExit(event) {
  console.log(event.type);
  document.body.classList.add('exited');
  if (event.type == 'abnormal') {
    document.body.classList.add('crashed');
  } else if (event.type == 'killed') {
    document.body.classList.add('killed');
  }
}

function handleLoadCommit() {
  resetExitedState();
  var webview = document.querySelector('webview');
  document.querySelector('#location').value = webview.getURL();
  document.querySelector('#back').disabled = !webview.canGoBack();
  document.querySelector('#forward').disabled = !webview.canGoForward();
}

function handleLoadStart(event) {
  document.body.classList.add('loading');
  Object(_is_loading__WEBPACK_IMPORTED_MODULE_0__["setLoading"])(true);
  resetExitedState();

  if (!event.isTopLevel) {
    return;
  }

  event.url && (document.querySelector('#location').value = event.url);
}

function handleLoadStop(event) {
  Object(_is_loading__WEBPACK_IMPORTED_MODULE_0__["setLoading"])(false);
}

function handleLoadAbort(event) {
  console.log('LoadAbort');
  console.log('  url: ' + event.url);
  console.log('  isTopLevel: ' + event.isTopLevel);
  console.log('  type: ' + event.type);
}

function handleLoadRedirect(event) {
  resetExitedState();
  event.newUrl && (document.querySelector('#location').value = event.newUrl);
}

function resetExitedState() {
  document.body.classList.remove('exited');
  document.body.classList.remove('crashed');
  document.body.classList.remove('killed');
}

function manageWebview() {
  let webview = document.querySelector('webview');

  webview.addEventListener('close', handleExit);
  webview.addEventListener('did-start-loading', handleLoadStart);
  webview.addEventListener('did-stop-loading', handleLoadStop);
  webview.addEventListener('did-fail-load', handleLoadAbort);
  webview.addEventListener('did-get-redirect-request', handleLoadRedirect);
  webview.addEventListener('did-finish-load', handleLoadCommit);
}




/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2VudHJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9pcy1sb2FkaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9sYXlvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21hbmFnZS1icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYW5hZ2Utd2Vidmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ25FQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0pBO0FBQUE7O0FBRUEsc0JBQTZCO0FBQzdCLDRCQUFtQyxzQkFBc0IsRTs7Ozs7Ozs7Ozs7Ozs7QUNIekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCb0I7QUFDcEI7QUFDMEM7O0FBRTFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gscUJBQXFCLElBQUk7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BEcUI7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVRIiwiZmlsZSI6ImJyb3dzZXItYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi9zdGF0aWMvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2VudHJ5LmpzXCIpO1xuIiwiaW1wb3J0IGxheW91dCBmcm9tICcuL2xheW91dCdcbmltcG9ydCBvbmxvYWQgZnJvbSAnLi9tYW5hZ2UtYnJvd3Nlcidcblxud2luZG93Lm9ucmVzaXplID0gbGF5b3V0O1xud2luZG93Lm9ubG9hZCAgID0gb25sb2FkO1xuIiwibGV0IGxvYWRpbmdTdGF0ZSA9IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNMb2FkaW5nKCkgeyByZXR1cm4gbG9hZGluZ1N0YXRlIH1cbmV4cG9ydCBmdW5jdGlvbiBzZXRMb2FkaW5nKHN0YXRlKSB7IGxvYWRpbmdTdGF0ZSA9IHN0YXRlOyB9IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGF5b3V0KCkge1xuICBsZXQgd2VidmlldyAgICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd3ZWJ2aWV3Jyk7XG4gIGxldCBjb250cm9scyAgICAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250cm9scycpO1xuICBsZXQgY29udHJvbHNIZWlnaHQgPSBjb250cm9scy5vZmZzZXRIZWlnaHQ7XG4gIGxldCB3aW5kb3dXaWR0aCAgICA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgbGV0IHdpbmRvd0hlaWdodCAgID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgbGV0IHdlYnZpZXdXaWR0aCAgID0gd2luZG93V2lkdGg7XG4gIGxldCB3ZWJ2aWV3SGVpZ2h0ICA9IHdpbmRvd0hlaWdodCAtIGNvbnRyb2xzSGVpZ2h0O1xuXG4gIHdlYnZpZXcuc3R5bGUud2lkdGggID0gd2Vidmlld1dpZHRoICsgJ3B4JztcbiAgd2Vidmlldy5zdHlsZS5oZWlnaHQgPSB3ZWJ2aWV3SGVpZ2h0ICsgJ3B4JztcblxuICBsZXQgc2FkV2VidmlldyAgICAgICAgICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2FkLXdlYnZpZXcnKTtcbiAgc2FkV2Vidmlldy5zdHlsZS53aWR0aCAgICAgID0gd2Vidmlld1dpZHRoICsgJ3B4JztcbiAgc2FkV2Vidmlldy5zdHlsZS5oZWlnaHQgICAgID0gd2Vidmlld0hlaWdodCAqIDIvMyArICdweCc7XG4gIHNhZFdlYnZpZXcuc3R5bGUucGFkZGluZ1RvcCA9IHdlYnZpZXdIZWlnaHQvMyArICdweCc7XG59XG4iLCJpbXBvcnQgeyBpc0xvYWRpbmcgfSBmcm9tICcuL2lzLWxvYWRpbmcnXG5pbXBvcnQgbGF5b3V0IGZyb20gJy4vbGF5b3V0J1xuaW1wb3J0IHsgbWFuYWdlV2VidmlldywgcmVzZXRFeGl0ZWRTdGF0ZSB9IGZyb20gJy4vbWFuYWdlLXdlYnZpZXcnXG5cbmZ1bmN0aW9uIGFkZENvbnRyb2xzRXZlbnRzKCkge1xuICBsZXQgd2VidmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3dlYnZpZXcnKTtcblxuICBvbkNsaWNrKCcjZm9yd2FyZCcsIHdlYnZpZXcuZ29Gb3J3YXJkKTtcbiAgb25DbGljaygnI2JhY2snLCB3ZWJ2aWV3LmdvQmFjayk7XG4gIG9uQ2xpY2soJyNob21lJywgKCkgPT4gbmF2aWdhdGVUbygnaHR0cDovL3d3dy5naXRodWIuY29tLycpKTtcbiAgb25DbGljaygnI3JlbG9hZCcsICgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nKCkpIHtcbiAgICAgIHdlYnZpZXcuc3RvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3ZWJ2aWV3LnJlbG9hZCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JlbG9hZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdEFuaW1hdGlvbkl0ZXJhdGlvbicsICgpID0+IHtcbiAgICBpc0xvYWRpbmcoKSB8fCBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKTtcbiAgfSk7XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NhdGlvbi1mb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIG5hdmlnYXRlVG8oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvY2F0aW9uJykudmFsdWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VXJsKHVybCkge1xuICBjb25zdCB2YWxpZCA9IHVybC5tYXRjaCgvXmh0dHAocyk/XFw6XFwvXFwvLyk7XG5cbiAgaWYgKHZhbGlkKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYGh0dHA6Ly8ke3VybH1gO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5hdmlnYXRlVG8odXJsKSB7XG4gIHJlc2V0RXhpdGVkU3RhdGUoKTtcbiAgY29uc3QgZm9ybWF0dGVkVXJsID0gZm9ybWF0VXJsKHVybCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3dlYnZpZXcnKS5zcmMgPSBmb3JtYXR0ZWRVcmw7XG59XG5cbmZ1bmN0aW9uIG9uQ2xpY2soc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2FsbGJhY2spO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYW5hZ2VCcm93c2VyKCkge1xuICBsYXlvdXQoKTtcbiAgYWRkQ29udHJvbHNFdmVudHMoKTtcbiAgbWFuYWdlV2VidmlldygpO1xufTtcbiIsImltcG9ydCB7IHNldExvYWRpbmcgfSBmcm9tICcuL2lzLWxvYWRpbmcnXG5cbmZ1bmN0aW9uIGhhbmRsZUV4aXQoZXZlbnQpIHtcbiAgY29uc29sZS5sb2coZXZlbnQudHlwZSk7XG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZXhpdGVkJyk7XG4gIGlmIChldmVudC50eXBlID09ICdhYm5vcm1hbCcpIHtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2NyYXNoZWQnKTtcbiAgfSBlbHNlIGlmIChldmVudC50eXBlID09ICdraWxsZWQnKSB7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdraWxsZWQnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVMb2FkQ29tbWl0KCkge1xuICByZXNldEV4aXRlZFN0YXRlKCk7XG4gIHZhciB3ZWJ2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignd2VidmlldycpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9jYXRpb24nKS52YWx1ZSA9IHdlYnZpZXcuZ2V0VVJMKCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYWNrJykuZGlzYWJsZWQgPSAhd2Vidmlldy5jYW5Hb0JhY2soKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZvcndhcmQnKS5kaXNhYmxlZCA9ICF3ZWJ2aWV3LmNhbkdvRm9yd2FyZCgpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVMb2FkU3RhcnQoZXZlbnQpIHtcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nJyk7XG4gIHNldExvYWRpbmcodHJ1ZSk7XG4gIHJlc2V0RXhpdGVkU3RhdGUoKTtcblxuICBpZiAoIWV2ZW50LmlzVG9wTGV2ZWwpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBldmVudC51cmwgJiYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbicpLnZhbHVlID0gZXZlbnQudXJsKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlTG9hZFN0b3AoZXZlbnQpIHtcbiAgc2V0TG9hZGluZyhmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUxvYWRBYm9ydChldmVudCkge1xuICBjb25zb2xlLmxvZygnTG9hZEFib3J0Jyk7XG4gIGNvbnNvbGUubG9nKCcgIHVybDogJyArIGV2ZW50LnVybCk7XG4gIGNvbnNvbGUubG9nKCcgIGlzVG9wTGV2ZWw6ICcgKyBldmVudC5pc1RvcExldmVsKTtcbiAgY29uc29sZS5sb2coJyAgdHlwZTogJyArIGV2ZW50LnR5cGUpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVMb2FkUmVkaXJlY3QoZXZlbnQpIHtcbiAgcmVzZXRFeGl0ZWRTdGF0ZSgpO1xuICBldmVudC5uZXdVcmwgJiYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbicpLnZhbHVlID0gZXZlbnQubmV3VXJsKTtcbn1cblxuZnVuY3Rpb24gcmVzZXRFeGl0ZWRTdGF0ZSgpIHtcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdleGl0ZWQnKTtcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdjcmFzaGVkJyk7XG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgna2lsbGVkJyk7XG59XG5cbmZ1bmN0aW9uIG1hbmFnZVdlYnZpZXcoKSB7XG4gIGxldCB3ZWJ2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignd2VidmlldycpO1xuXG4gIHdlYnZpZXcuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCBoYW5kbGVFeGl0KTtcbiAgd2Vidmlldy5hZGRFdmVudExpc3RlbmVyKCdkaWQtc3RhcnQtbG9hZGluZycsIGhhbmRsZUxvYWRTdGFydCk7XG4gIHdlYnZpZXcuYWRkRXZlbnRMaXN0ZW5lcignZGlkLXN0b3AtbG9hZGluZycsIGhhbmRsZUxvYWRTdG9wKTtcbiAgd2Vidmlldy5hZGRFdmVudExpc3RlbmVyKCdkaWQtZmFpbC1sb2FkJywgaGFuZGxlTG9hZEFib3J0KTtcbiAgd2Vidmlldy5hZGRFdmVudExpc3RlbmVyKCdkaWQtZ2V0LXJlZGlyZWN0LXJlcXVlc3QnLCBoYW5kbGVMb2FkUmVkaXJlY3QpO1xuICB3ZWJ2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2RpZC1maW5pc2gtbG9hZCcsIGhhbmRsZUxvYWRDb21taXQpO1xufVxuXG5leHBvcnQgeyByZXNldEV4aXRlZFN0YXRlLCBtYW5hZ2VXZWJ2aWV3IH1cbiJdLCJzb3VyY2VSb290IjoiIn0=