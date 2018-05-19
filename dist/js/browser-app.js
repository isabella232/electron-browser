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

/***/ "./src/js/invoca.js":
/*!**************************!*\
  !*** ./src/js/invoca.js ***!
  \**************************/
/*! exports provided: default, stopChecking */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return beginChecking; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopChecking", function() { return stopChecking; });
let Invoca;
let toolbar;
let interval;
let webview;
const intervalDuration = 1000;

function queryElements() {
  webview = document.querySelector("webview");
  toolbar = {
    libraryVersion: document.querySelector('[data-mount="library-version"]'),
    tagRevision:    document.querySelector('[data-mount="tag-revision"]'),
    cache:          document.querySelector('[data-mount="cache"]'),
    requestData:    document.querySelector('[data-mount="request-data"]')
  };
}

function updateDetails(Invoca) {
  updateFromPage(toolbar.libraryVersion, 'Invoca.PNAPI.version');
  updateFromPage(toolbar.tagRevision,    'Invoca.Client.getRevisionId()');
  updateFromPage(toolbar.cache,          'Object.keys(Invoca._Cache.get("session")).length');
  updateFromPage(toolbar.requestData,    'Invoca._RequestData.get().length');
}

function updateFromPage(object, command) {
  executeInWebview(command, function(response) {
    object.innerText = response;
  });
}

// Check for Invoca on interval because we may take a while to load
// due to internet weather, tag managers, etc.
function checkForInvoca() {
  interval = setInterval(function() {
    executeInWebview("window.Invoca", verifyInvoca);
  }, intervalDuration);
}


// If we've really found Invoca, keep updating on an interval anyway.
// things may change from re-run, and since our tag is just a proxy
// we don't want a half build object
function verifyInvoca(response) {
  if (response && typeof response.PNAPI === "object") {
    updateDetails(response);
  }
}

function executeInWebview(command, callback) {
  webview.executeJavaScript(command, false, callback);
}

function beginChecking() {
  queryElements();
  checkForInvoca();
}

function stopChecking() {
  clearInterval(interval);
}



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
/* harmony import */ var _invoca__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invoca */ "./src/js/invoca.js");



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
  document.querySelector('#location').value   = webview.getURL();
  document.querySelector('#back').disabled    = !webview.canGoBack();
  document.querySelector('#forward').disabled = !webview.canGoForward();
  Object(_invoca__WEBPACK_IMPORTED_MODULE_1__["default"])();
}

function handleLoadStart(event) {
  Object(_invoca__WEBPACK_IMPORTED_MODULE_1__["stopChecking"])();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2VudHJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9pbnZvY2EuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2lzLWxvYWRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xheW91dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFuYWdlLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21hbmFnZS13ZWJ2aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzFEQTtBQUFBOztBQUVBLHNCQUE2QjtBQUM3Qiw0QkFBbUMsc0JBQXNCLEU7Ozs7Ozs7Ozs7Ozs7O0FDSHpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQm9CO0FBQ3BCO0FBQzBDOztBQUUxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILHFCQUFxQixJQUFJO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcERxQjtBQUM0Qjs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVRIiwiZmlsZSI6ImJyb3dzZXItYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi9zdGF0aWMvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2VudHJ5LmpzXCIpO1xuIiwiaW1wb3J0IGxheW91dCBmcm9tICcuL2xheW91dCdcbmltcG9ydCBvbmxvYWQgZnJvbSAnLi9tYW5hZ2UtYnJvd3Nlcidcblxud2luZG93Lm9ucmVzaXplID0gbGF5b3V0O1xud2luZG93Lm9ubG9hZCAgID0gb25sb2FkO1xuIiwibGV0IEludm9jYTtcbmxldCB0b29sYmFyO1xubGV0IGludGVydmFsO1xubGV0IHdlYnZpZXc7XG5jb25zdCBpbnRlcnZhbER1cmF0aW9uID0gMTAwMDtcblxuZnVuY3Rpb24gcXVlcnlFbGVtZW50cygpIHtcbiAgd2VidmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ3ZWJ2aWV3XCIpO1xuICB0b29sYmFyID0ge1xuICAgIGxpYnJhcnlWZXJzaW9uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tb3VudD1cImxpYnJhcnktdmVyc2lvblwiXScpLFxuICAgIHRhZ1JldmlzaW9uOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tb3VudD1cInRhZy1yZXZpc2lvblwiXScpLFxuICAgIGNhY2hlOiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tb3VudD1cImNhY2hlXCJdJyksXG4gICAgcmVxdWVzdERhdGE6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW1vdW50PVwicmVxdWVzdC1kYXRhXCJdJylcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRGV0YWlscyhJbnZvY2EpIHtcbiAgdXBkYXRlRnJvbVBhZ2UodG9vbGJhci5saWJyYXJ5VmVyc2lvbiwgJ0ludm9jYS5QTkFQSS52ZXJzaW9uJyk7XG4gIHVwZGF0ZUZyb21QYWdlKHRvb2xiYXIudGFnUmV2aXNpb24sICAgICdJbnZvY2EuQ2xpZW50LmdldFJldmlzaW9uSWQoKScpO1xuICB1cGRhdGVGcm9tUGFnZSh0b29sYmFyLmNhY2hlLCAgICAgICAgICAnT2JqZWN0LmtleXMoSW52b2NhLl9DYWNoZS5nZXQoXCJzZXNzaW9uXCIpKS5sZW5ndGgnKTtcbiAgdXBkYXRlRnJvbVBhZ2UodG9vbGJhci5yZXF1ZXN0RGF0YSwgICAgJ0ludm9jYS5fUmVxdWVzdERhdGEuZ2V0KCkubGVuZ3RoJyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUZyb21QYWdlKG9iamVjdCwgY29tbWFuZCkge1xuICBleGVjdXRlSW5XZWJ2aWV3KGNvbW1hbmQsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgb2JqZWN0LmlubmVyVGV4dCA9IHJlc3BvbnNlO1xuICB9KTtcbn1cblxuLy8gQ2hlY2sgZm9yIEludm9jYSBvbiBpbnRlcnZhbCBiZWNhdXNlIHdlIG1heSB0YWtlIGEgd2hpbGUgdG8gbG9hZFxuLy8gZHVlIHRvIGludGVybmV0IHdlYXRoZXIsIHRhZyBtYW5hZ2VycywgZXRjLlxuZnVuY3Rpb24gY2hlY2tGb3JJbnZvY2EoKSB7XG4gIGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgZXhlY3V0ZUluV2VidmlldyhcIndpbmRvdy5JbnZvY2FcIiwgdmVyaWZ5SW52b2NhKTtcbiAgfSwgaW50ZXJ2YWxEdXJhdGlvbik7XG59XG5cblxuLy8gSWYgd2UndmUgcmVhbGx5IGZvdW5kIEludm9jYSwga2VlcCB1cGRhdGluZyBvbiBhbiBpbnRlcnZhbCBhbnl3YXkuXG4vLyB0aGluZ3MgbWF5IGNoYW5nZSBmcm9tIHJlLXJ1biwgYW5kIHNpbmNlIG91ciB0YWcgaXMganVzdCBhIHByb3h5XG4vLyB3ZSBkb24ndCB3YW50IGEgaGFsZiBidWlsZCBvYmplY3RcbmZ1bmN0aW9uIHZlcmlmeUludm9jYShyZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2UgJiYgdHlwZW9mIHJlc3BvbnNlLlBOQVBJID09PSBcIm9iamVjdFwiKSB7XG4gICAgdXBkYXRlRGV0YWlscyhyZXNwb25zZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXhlY3V0ZUluV2Vidmlldyhjb21tYW5kLCBjYWxsYmFjaykge1xuICB3ZWJ2aWV3LmV4ZWN1dGVKYXZhU2NyaXB0KGNvbW1hbmQsIGZhbHNlLCBjYWxsYmFjayk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJlZ2luQ2hlY2tpbmcoKSB7XG4gIHF1ZXJ5RWxlbWVudHMoKTtcbiAgY2hlY2tGb3JJbnZvY2EoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BDaGVja2luZygpIHtcbiAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG59XG5cbiIsImxldCBsb2FkaW5nU3RhdGUgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTG9hZGluZygpIHsgcmV0dXJuIGxvYWRpbmdTdGF0ZSB9XG5leHBvcnQgZnVuY3Rpb24gc2V0TG9hZGluZyhzdGF0ZSkgeyBsb2FkaW5nU3RhdGUgPSBzdGF0ZTsgfSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxheW91dCgpIHtcbiAgbGV0IHdlYnZpZXcgICAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignd2VidmlldycpO1xuICBsZXQgY29udHJvbHMgICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udHJvbHMnKTtcbiAgbGV0IGNvbnRyb2xzSGVpZ2h0ID0gY29udHJvbHMub2Zmc2V0SGVpZ2h0O1xuICBsZXQgd2luZG93V2lkdGggICAgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIGxldCB3aW5kb3dIZWlnaHQgICA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIGxldCB3ZWJ2aWV3V2lkdGggICA9IHdpbmRvd1dpZHRoO1xuICBsZXQgd2Vidmlld0hlaWdodCAgPSB3aW5kb3dIZWlnaHQgLSBjb250cm9sc0hlaWdodDtcblxuICB3ZWJ2aWV3LnN0eWxlLndpZHRoICA9IHdlYnZpZXdXaWR0aCArICdweCc7XG4gIHdlYnZpZXcuc3R5bGUuaGVpZ2h0ID0gd2Vidmlld0hlaWdodCArICdweCc7XG5cbiAgbGV0IHNhZFdlYnZpZXcgICAgICAgICAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhZC13ZWJ2aWV3Jyk7XG4gIHNhZFdlYnZpZXcuc3R5bGUud2lkdGggICAgICA9IHdlYnZpZXdXaWR0aCArICdweCc7XG4gIHNhZFdlYnZpZXcuc3R5bGUuaGVpZ2h0ICAgICA9IHdlYnZpZXdIZWlnaHQgKiAyLzMgKyAncHgnO1xuICBzYWRXZWJ2aWV3LnN0eWxlLnBhZGRpbmdUb3AgPSB3ZWJ2aWV3SGVpZ2h0LzMgKyAncHgnO1xufVxuIiwiaW1wb3J0IHsgaXNMb2FkaW5nIH0gZnJvbSAnLi9pcy1sb2FkaW5nJ1xuaW1wb3J0IGxheW91dCBmcm9tICcuL2xheW91dCdcbmltcG9ydCB7IG1hbmFnZVdlYnZpZXcsIHJlc2V0RXhpdGVkU3RhdGUgfSBmcm9tICcuL21hbmFnZS13ZWJ2aWV3J1xuXG5mdW5jdGlvbiBhZGRDb250cm9sc0V2ZW50cygpIHtcbiAgbGV0IHdlYnZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd3ZWJ2aWV3Jyk7XG5cbiAgb25DbGljaygnI2ZvcndhcmQnLCB3ZWJ2aWV3LmdvRm9yd2FyZCk7XG4gIG9uQ2xpY2soJyNiYWNrJywgd2Vidmlldy5nb0JhY2spO1xuICBvbkNsaWNrKCcjaG9tZScsICgpID0+IG5hdmlnYXRlVG8oJ2h0dHA6Ly93d3cuZ2l0aHViLmNvbS8nKSk7XG4gIG9uQ2xpY2soJyNyZWxvYWQnLCAoKSA9PiB7XG4gICAgaWYgKGlzTG9hZGluZygpKSB7XG4gICAgICB3ZWJ2aWV3LnN0b3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2Vidmlldy5yZWxvYWQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWxvYWQnKS5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRBbmltYXRpb25JdGVyYXRpb24nLCAoKSA9PiB7XG4gICAgaXNMb2FkaW5nKCkgfHwgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJyk7XG4gIH0pO1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jYXRpb24tZm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBuYXZpZ2F0ZVRvKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbicpLnZhbHVlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFVybCh1cmwpIHtcbiAgY29uc3QgdmFsaWQgPSB1cmwubWF0Y2goL15odHRwKHMpP1xcOlxcL1xcLy8pO1xuXG4gIGlmICh2YWxpZCkge1xuICAgIHJldHVybiB1cmw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGBodHRwOi8vJHt1cmx9YDtcbiAgfVxufVxuXG5mdW5jdGlvbiBuYXZpZ2F0ZVRvKHVybCkge1xuICByZXNldEV4aXRlZFN0YXRlKCk7XG4gIGNvbnN0IGZvcm1hdHRlZFVybCA9IGZvcm1hdFVybCh1cmwpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd3ZWJ2aWV3Jykuc3JjID0gZm9ybWF0dGVkVXJsO1xufVxuXG5mdW5jdGlvbiBvbkNsaWNrKHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNhbGxiYWNrKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFuYWdlQnJvd3NlcigpIHtcbiAgbGF5b3V0KCk7XG4gIGFkZENvbnRyb2xzRXZlbnRzKCk7XG4gIG1hbmFnZVdlYnZpZXcoKTtcbn07XG4iLCJpbXBvcnQgeyBzZXRMb2FkaW5nIH0gZnJvbSAnLi9pcy1sb2FkaW5nJ1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBiZWdpbkNoZWNraW5nLCBzdG9wQ2hlY2tpbmcgfSBmcm9tICcuL2ludm9jYSdcblxuZnVuY3Rpb24gaGFuZGxlRXhpdChldmVudCkge1xuICBjb25zb2xlLmxvZyhldmVudC50eXBlKTtcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdleGl0ZWQnKTtcbiAgaWYgKGV2ZW50LnR5cGUgPT0gJ2Fibm9ybWFsJykge1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnY3Jhc2hlZCcpO1xuICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT0gJ2tpbGxlZCcpIHtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2tpbGxlZCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUxvYWRDb21taXQoKSB7XG4gIHJlc2V0RXhpdGVkU3RhdGUoKTtcbiAgdmFyIHdlYnZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd3ZWJ2aWV3Jyk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbicpLnZhbHVlICAgPSB3ZWJ2aWV3LmdldFVSTCgpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmFjaycpLmRpc2FibGVkICAgID0gIXdlYnZpZXcuY2FuR29CYWNrKCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3J3YXJkJykuZGlzYWJsZWQgPSAhd2Vidmlldy5jYW5Hb0ZvcndhcmQoKTtcbiAgYmVnaW5DaGVja2luZygpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVMb2FkU3RhcnQoZXZlbnQpIHtcbiAgc3RvcENoZWNraW5nKCk7XG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpO1xuICBzZXRMb2FkaW5nKHRydWUpO1xuICByZXNldEV4aXRlZFN0YXRlKCk7XG5cbiAgaWYgKCFldmVudC5pc1RvcExldmVsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZXZlbnQudXJsICYmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9jYXRpb24nKS52YWx1ZSA9IGV2ZW50LnVybCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUxvYWRTdG9wKGV2ZW50KSB7XG4gIHNldExvYWRpbmcoZmFsc2UpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVMb2FkQWJvcnQoZXZlbnQpIHtcbiAgY29uc29sZS5sb2coJ0xvYWRBYm9ydCcpO1xuICBjb25zb2xlLmxvZygnICB1cmw6ICcgKyBldmVudC51cmwpO1xuICBjb25zb2xlLmxvZygnICBpc1RvcExldmVsOiAnICsgZXZlbnQuaXNUb3BMZXZlbCk7XG4gIGNvbnNvbGUubG9nKCcgIHR5cGU6ICcgKyBldmVudC50eXBlKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlTG9hZFJlZGlyZWN0KGV2ZW50KSB7XG4gIHJlc2V0RXhpdGVkU3RhdGUoKTtcbiAgZXZlbnQubmV3VXJsICYmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9jYXRpb24nKS52YWx1ZSA9IGV2ZW50Lm5ld1VybCk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0RXhpdGVkU3RhdGUoKSB7XG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZXhpdGVkJyk7XG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnY3Jhc2hlZCcpO1xuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2tpbGxlZCcpO1xufVxuXG5mdW5jdGlvbiBtYW5hZ2VXZWJ2aWV3KCkge1xuICBsZXQgd2VidmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3dlYnZpZXcnKTtcblxuICB3ZWJ2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgaGFuZGxlRXhpdCk7XG4gIHdlYnZpZXcuYWRkRXZlbnRMaXN0ZW5lcignZGlkLXN0YXJ0LWxvYWRpbmcnLCBoYW5kbGVMb2FkU3RhcnQpO1xuICB3ZWJ2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2RpZC1zdG9wLWxvYWRpbmcnLCBoYW5kbGVMb2FkU3RvcCk7XG4gIHdlYnZpZXcuYWRkRXZlbnRMaXN0ZW5lcignZGlkLWZhaWwtbG9hZCcsIGhhbmRsZUxvYWRBYm9ydCk7XG4gIHdlYnZpZXcuYWRkRXZlbnRMaXN0ZW5lcignZGlkLWdldC1yZWRpcmVjdC1yZXF1ZXN0JywgaGFuZGxlTG9hZFJlZGlyZWN0KTtcbiAgd2Vidmlldy5hZGRFdmVudExpc3RlbmVyKCdkaWQtZmluaXNoLWxvYWQnLCBoYW5kbGVMb2FkQ29tbWl0KTtcbn1cblxuZXhwb3J0IHsgcmVzZXRFeGl0ZWRTdGF0ZSwgbWFuYWdlV2VidmlldyB9XG4iXSwic291cmNlUm9vdCI6IiJ9