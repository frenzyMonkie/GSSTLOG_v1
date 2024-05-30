// // components.loader
// // Указываем в обратном порядке, т.к. цепляем по нулевому индексу
// function loadScript(src, type) {
//     var n = document.getElementsByTagName("script")[0];
//     var s = document.createElement('script');
//     s.async = false;
//     // script.defer = true;
//     s.src = src;
//     s.type = type
//     n.parentNode.insertBefore(s, n);
//     // document.body.appendChild(s);
// }


// const sourcePaths = [

//     // React
//     "/js/integrated/react.elements/datepicker.integrated.jsx", // // jQuery-ui-datepicker-multidate-compound
//     "/js/libs/react-router/react-router-dom.min.js", // react-router.js
//     "/js/libs/react-router/react-router.min.js", // react-router.js
//     "/js/libs/react/react-dom.production.min.js", // react-dom.js
//     "/js/libs/react/react.production.min.js", // react.js

//     // Babel
//     "/js/libs/babel/babel.min.js", // babel.js

//     // jQuery
//     "/js/libs/jquery/jquery.datepicker.extension.range.min.js",  // jQuery-ui-datepicker-multidate
//     "/js/libs/jquery/jquery-ui-datepicker-ru.js", // jQuery-ui-datepicker-ru
//     "/js/libs/jquery/jquery-ui-datepicker.js", // jQuery-ui-datepicker-basic
//     "/js/libs/jquery/jquery-3.7.1.min.js", // jQuery-3.7.1
// ];

// const components = [
//     // Components
//     '/integrated/react.pages/login.jsx',
//     "/integrated/react.elements/datepicker.integrated.jsx", // // jQuery-ui-datepicker-multidate-compound
//     // "/js/integrated/react.elements/dropdown.integrated.jsx", // jQuery-dropdown-autocomplete-compound
// ];
// for (var src of components) {
//     loadScript(src, 'text/jsx')
// }

// for (var src of sourcePaths) {
//     loadScript(src, 'text/javascript')
// }



// var s = document.createElement('script');
// s.src = '/js/app.js'
// s.type = 'text/babel'
// // s.defer = true
// document.body.appendChild(s);



// window.onload = function() {

//     for (const src of sourcePaths) {
//         loadScript(src, 'text/javascript')

//     }
//     for (const src of components) {
//         loadScript(src, 'text/jsx')
//     }

//     var scr= document.createElement('script');
//     scr.src = '/app.js'
//     scr.type = 'text/babel'
//     // scr.defer = true;
//     scr.text = alert("WORKING");
//     document.body.append(scr);

//     // var s = document.createElement('script');
//     // s.type = 'text/javascript';
//     // var code = 'alert("hello world!");';
//     // try {
//     //   s.appendChild(document.createTextNode(code));
//     //   document.body.appendChild(s);
//     // } catch (e) {
//     //   s.text = code;
//     //   document.body.appendChild(s);
//     // }
//   }


