export default function layout() {
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
