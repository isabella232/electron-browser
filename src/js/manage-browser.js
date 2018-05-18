import { isLoading } from './is-loading'
import layout from './layout'
import { manageWebview, resetExitedState } from './manage-webview'

function addControlsEvents() {
  let webview = document.querySelector('webview');

  onClick('#forward', webview.goForward);
  onClick('#back', webview.goBack);
  onClick('#home', () => navigateTo('http://www.github.com/'));
  onClick('#reload', () => {
    if (isLoading()) {
      webview.stop();
    } else {
      webview.reload();
    }
  });

  document.querySelector('#reload').addEventListener('webkitAnimationIteration', () => {
    isLoading() || document.body.classList.remove('loading');
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
  resetExitedState();
  const formattedUrl = formatUrl(url);
  document.querySelector('webview').src = formattedUrl;
}

function onClick(selector, callback) {
  document.querySelector(selector).addEventListener('click', callback);
}

export default function manageBrowser() {
  layout();
  addControlsEvents();
  manageWebview();
};
