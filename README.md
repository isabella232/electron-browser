## Electron Browser Boilerplate
**Getting started example browser made out of Electron**
I found the [Electron Sample Apps repo](https://github.com/hokein/electron-sample-apps) hard to follow, so I cleaned it up using Webpack and SCSS to manage dependencies and simplify logic.

But big props to those guys for providing this nice getting started point! Thank you :D 
Check out https://github.com/hokein/electron-sample-apps for other sample apps to get started with.

## Suggested Development Process
* `@import "your_file";` in `src/scss/entry.scss` at the bottom of the `import` list.
* `import yourModule from './your-new-js-module'` as needed inside `src/js/entry.js` or other modules as needed. 

## Build Process
* Make sure Electron is installed globally
  * `npm install -g electron`
* `npm install` to install dependencies
* `npm start` to kick off a build and open the Electron Browser app

## Description
* Electron is serving an HTML file at `static/browser.html`. 
  * This file has the layout for the browser UI, and wraps a `webview` (where the webpages load)