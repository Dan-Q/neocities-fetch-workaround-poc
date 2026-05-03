## Neocities &lt;mini-chat> proof-of-concept

A proof-of-concept that a remotely-hosted Web Component can use JSONP to pass messages to and from a remote service, despite Neocities' restrictive `connect-src` etc. Content-Security-Policy directives.

### Demonstration

Go to https://embed-html.neocities.org/poc and see that you can engage in almost-live chat. View the source code to see that all JS is hosted remotely and the chat is handled by a remote server.

**This is not designed to be used in production. It is a proof-of-concept/teaching example only!**

### Development

To build or host it yourself, you'll need PHP (tested with 8.5) and Node (tested with 24). This project wasn't designed for you to just "pick up and use" - it's a proof-of-concept/learning example - so the steps are slightly involved:

1. Check out this repository.
2. Manually create a `data/` directory, editable by your webserver/PHP process.
3. Manually edit `src/index.js` to change the `callApi` method so it points to _your_ PHP server.
4. `npm install` to get the dependencies.
5. `npm start` to start watch-and-building the JS component (or `npm run build` to make a one-off build).
6. On your Neocities (or wherever) page, add `<script type="module" src=".../dist/bundle.js"></script>`  but pointing to the URL of your `dist/bundle.js` file created by step 5; this can be hosted anywhere, even on Neocities itself.
7. On your Neocities (or wherever) page, add `<mini-chat></mini-chat>` wherever you want the chat box to appear.

### Discussion

Inspired by a conversation at https://forum.melonland.net/index.php?topic=5548.0
