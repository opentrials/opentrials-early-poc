# Open Trails Prototype App

## Development

### Getting started

Getting setup for local development is easy. We use [io.js](https://iojs.org/), and [nvm](https://github.com/creationix/nvm) for managing multiple node versions locally.

1. On Mac OS X, install nvm: `brew install nvm`. Note the setup requires some additions to your shell config.
2. Install iojs with nvm: `nvm install iojs` (now that you have nvm, you can also install the latest Node version with it: `nvm install stable`).
3. Use a node version with nvm's `use`. We want io.js, so: `nvm use iojs`
4. Tip: you can always check the version you are running with `nvm current`
5. Tip: If, after installing `nvm` and `iojs`, you experience issues with v8flags when running gulp, [see here](https://github.com/gulpjs/gulp/issues/873#issuecomment-75615249).

Once we have our base environment setup to use io.js, then you can configure the actual app:

1. Create your own fork of `https://github.com/okfn/opentrials-prototype`
2. Clone your fork locally with `https://github.com/{YOUR_USERNAME}/opentrials-prototype.git`
3. Install the dependencies with `npm install`
4. Run the server with `npm run develop`, and visit the app at `http://localhost:3000`

That's it. Other things you can do:

* Run the test suite with `npm test`
* Run the server in production mode with `npm start`
* Check your code style with `npm run jscs` (according to the Google style guide)

#### Contributing

We welcome contributions. Please keep the style consistent. Refer to [Open Knowledge Coding Standards](https://github.com/okfn/coding-standards).

In summary, in this codebase we:

* Write all code in Node.js-style Javascript using modules, exports and require, and employ [Browserify]((http://browserify.org/)) to build front end distributions of the code
* Use two spaces for indentation
* Use semi-colons, and import modules with the full `var {name} = require('{name}');` syntax
  * No leading commas in this codebase :)
* Accept pull requests on feature branches (e.g.: `feature/my-feature`), or some similar pattern of branches **from the `develop` branch**

Also, notice the following conventions:

* All core business logic goes in packages under `src/components` (e.g: the `ui` package).
* Code must have unit tests or functional tests (See examples in the `tests` directory).
* All presentation and glue code for the web interface goes under `src/components/ui`.
* A browser-compatible build of the code is generated automatically into `dist`
* We separate the browser scripts to two bundles:
  * `vendor.min.js` has our dependencies
  * `app.min.js` has our code
* Dependencies should be managed in `npm`, and **not `bower`**. [Add dependencies to this list](https://github.com/okfn/opentrials-prototype/blob/master/gulpfile.js#L24) to include them in `vendor.min.js`

If you are new to some of the tooling we use - don't worry, it is not difficult! Refer to [Node Modules](https://nodejs.org/api/modules.html), [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), [Browserify](http://browserify.org/), [Gulp](http://gulpjs.com/) and [BrowserSync](http://www.browsersync.io/) for further information. These are all key tools to organizing our code and workflow.
