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

function resetDetails() {
  toolbar.libraryVersion.innerText = '-';
  toolbar.tagRevision.innerText = '-';
  toolbar.cache.innerText = '-';
  toolbar.requestData.innerText = '-';
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

export default function beginChecking() {
  queryElements();
  checkForInvoca();
}

export function stopChecking() {
  clearInterval(interval);
  queryElements();
  resetDetails();
}

