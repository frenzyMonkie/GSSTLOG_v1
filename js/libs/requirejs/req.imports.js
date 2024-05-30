// For any third party dependencies, like jQuery, place them in the lib folder.
// https://github.com/volojs/create-template/tree/master/www
// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'libs',
    paths: {
        jsfolder: '../',
        libs: './',
        babel: './babel',
        jquery: './jquery',
        react: './react',
        reactrouter: './react-router',
        reactcookie: './react-cookie',
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['jsfolder/req.main']);
// https://requirejs.org/docs/jquery.html

// https://stackoverflow.com/questions/19059580/browser-uncaught-referenceerror-require-is-not-defined
// This is because require() does not exist in the browser/client-side JavaScript.
// Now you're going to have to make some choices about your client-side JavaScript script management.
// You have three options:
// Use the <script> tag.
// Use a CommonJS implementation. It has synchronous dependencies like Node.js
// Use an asynchronous module definition (AMD) implementation.
// CommonJS client side-implementations include (most of them require a build step before you deploy):
// Browserify - You can use most Node.js modules in the browser. This is my personal favorite.
// Webpack - Does everything (bundles JavaScript code, CSS, etc.). It was made popular by the surge of React, but it is notorious for its difficult learning curve.
// Rollup - a new contender. It leverages ES6 modules and includes tree-shaking abilities (removes unused code).
// You can read more about my comparison of Browserify vs (deprecated) Component.
// AMD implementations include:
// RequireJS - Very popular amongst client-side JavaScript developers. It is not my taste because of its asynchronous nature.
// Note, in your search for choosing which one to go with, you'll read about Bower. Bower is only for package dependencies and is unopinionated on module definitions like CommonJS and AMD.
