(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"2qSH":function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return l}));var r=n("q1tI"),a=n.n(r),i=n("ZMKu"),c=(n("9/5/"),n("EtNE")),o={BACK:"M33 26.672V21.8738C32.9994 21.5033 32.8891 21.1412 32.6831 20.8332C32.4771 20.5253 32.1845 20.2852 31.8422 20.1432C31.4999 20.0012 31.1233 19.9638 30.7598 20.0355C30.3962 20.1073 30.0621 20.285 29.7994 20.5463L18 32.1863L29.7994 43.8245C29.9731 43.9992 30.1797 44.1378 30.4072 44.2325C30.6347 44.3271 30.8786 44.3758 31.125 44.3758C31.3714 44.3758 31.6153 44.3271 31.8428 44.2325C32.0703 44.1378 32.2769 43.9992 32.4506 43.8245C32.6248 43.6505 32.763 43.4438 32.8573 43.2163C32.9516 42.9889 33 42.7451 33 42.4988V37.832C38.1562 37.9595 43.7906 38.8932 48 45.3113V43.4363C48 34.7495 41.4375 27.6057 33 26.672",SEARCH:"M39.7083 36.8333H38.1942L37.6575 36.3158C39.6008 34.0619 40.6688 31.1843 40.6667 28.2083C40.6667 25.7443 39.936 23.3356 38.5671 21.2869C37.1981 19.2381 35.2524 17.6413 32.9759 16.6983C30.6995 15.7554 28.1945 15.5087 25.7778 15.9894C23.3612 16.4701 21.1413 17.6566 19.399 19.399C17.6566 21.1413 16.4701 23.3612 15.9894 25.7778C15.5087 28.1945 15.7554 30.6995 16.6983 32.9759C17.6413 35.2524 19.2381 37.1981 21.2869 38.5671C23.3356 39.936 25.7443 40.6667 28.2083 40.6667C31.2942 40.6667 34.1308 39.5358 36.3158 37.6575L36.8333 38.1942V39.7083L46.4167 49.2725L49.2725 46.4167L39.7083 36.8333ZM28.2083 36.8333C23.4358 36.8333 19.5833 32.9808 19.5833 28.2083C19.5833 23.4358 23.4358 19.5833 28.2083 19.5833C32.9808 19.5833 36.8333 23.4358 36.8333 28.2083C36.8333 32.9808 32.9808 36.8333 28.2083 36.8333Z"};function l(e){var t=e.fabIconPath,n=void 0===t?o.BACK:t,l=e.onFabClick,f=e.fabPosition,s=void 0===f?"right":f,d=e.fabRadius,m=void 0===d?33:d,v=e.cutoutWidth,b=void 0===v?7:v,h=e.padding,E=void 0===h?20:h,w=e.actions,p=e.children,y=e.overhangActions,C=e.collapse,g=Object(r.useState)({width:1e3}),O=g[0],j=g[1],x=Object(r.useState)(0),k=x[0],L=x[1],N=C||k>0;Object(c.b)(j),Object(c.c)((function(e){var t=e.delta;return L(t)}));var S=Object(r.useMemo)((function(){switch(s){default:case"right":return[O.width-E-m-b,E];case"left":return[E+m+b,2*(E+m+b)];case"center":return[O.width/2+b]}}),[s,O,b]),B=S[0],F=S[1];return a.a.createElement("nav",{className:"bottom","data-mobile":!0},a.a.createElement("svg",{style:{display:"block"},"data-mobile":!0,width:O.width,height:"112",viewBox:"0 0 "+O.width+" 112",fill:"none",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"none"},a.a.createElement("defs",null,a.a.createElement("mask",{id:"fab-slot"},a.a.createElement("rect",{width:"100%",height:"100%",fill:"white",y:"10"}),a.a.createElement(i.a,null,a.a.createElement(i.b.circle,{initial:{r:0},animate:{r:40,y:N?-65:0},r:"0",cx:B,cy:"47",fill:"black"}))),a.a.createElement(u,null)),a.a.createElement(i.b.g,{animate:{y:N?65:0}},a.a.createElement(i.b.rect,{width:O.width,y:"47",height:"80",fill:"var(--primary)",mask:"url(#fab-slot)"}),a.a.createElement("foreignObject",{style:{overflow:"visible"},x:F,y:y?20:47,width:O.width-2*(E+b+m)-E,height:"80"},a.a.createElement(i.b.div,{initial:{opacity:0},animate:{opacity:k<=0?1:0},exit:{opacity:0},className:"actions"},w))),a.a.createElement("g",{transform:"translate("+(B-m)+" 14)"},a.a.createElement(i.a,null,a.a.createElement(i.b.g,{initial:{scale:0},animate:{scale:1,y:N?79-E-b-m:0},exit:{scale:0},whileTap:{scale:.8},onClick:l,className:"fab inset"},a.a.createElement("circle",{cx:"33",cy:"33",r:"33",filter:"url(#fabshadow)"}),a.a.createElement("path",{d:n,fill:"currentColor"}))))),p)}function u(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("filter",{id:"fabshadow",x:"0",y:"0",width:"74",height:"74",filterUnits:"userSpaceOnUse",colorInterpolationFilters:"sRGB"},a.a.createElement("feFlood",{floodOpacity:"0",result:"BackgroundImageFix"}),a.a.createElement("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}),a.a.createElement("feOffset",{dy:"4"}),a.a.createElement("feGaussianBlur",{stdDeviation:"2"}),a.a.createElement("feColorMatrix",{type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"}),a.a.createElement("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow"}),a.a.createElement("feBlend",{mode:"normal",in:"SourceGraphic",in2:"effect1_dropShadow",result:"shape"})))}},"9/5/":function(e,t,n){(function(t){n("pIFo"),n("a1Th"),n("h7Nl"),n("Btvt");var r=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,c=/^0o[0-7]+$/i,o=parseInt,l="object"==typeof t&&t&&t.Object===Object&&t,u="object"==typeof self&&self&&self.Object===Object&&self,f=l||u||Function("return this")(),s=Object.prototype.toString,d=Math.max,m=Math.min,v=function(){return f.Date.now()};function b(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function h(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==s.call(e)}(e))return NaN;if(b(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=b(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(r,"");var n=i.test(e);return n||c.test(e)?o(e.slice(2),n?2:8):a.test(e)?NaN:+e}e.exports=function(e,t,n){var r,a,i,c,o,l,u=0,f=!1,s=!1,E=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function w(t){var n=r,i=a;return r=a=void 0,u=t,c=e.apply(i,n)}function p(e){return u=e,o=setTimeout(C,t),f?w(e):c}function y(e){var n=e-l;return void 0===l||n>=t||n<0||s&&e-u>=i}function C(){var e=v();if(y(e))return g(e);o=setTimeout(C,function(e){var n=t-(e-l);return s?m(n,i-(e-u)):n}(e))}function g(e){return o=void 0,E&&r?w(e):(r=a=void 0,c)}function O(){var e=v(),n=y(e);if(r=arguments,a=this,l=e,n){if(void 0===o)return p(l);if(s)return o=setTimeout(C,t),w(l)}return void 0===o&&(o=setTimeout(C,t)),c}return t=h(t)||0,b(n)&&(f=!!n.leading,i=(s="maxWait"in n)?d(h(n.maxWait)||0,t):i,E="trailing"in n?!!n.trailing:E),O.cancel=function(){void 0!==o&&clearTimeout(o),u=0,r=l=a=o=void 0},O.flush=function(){return void 0===o?c:g(v())},O}}).call(this,n("yLpj"))},EtNE:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return l})),n.d(t,"c",(function(){return u}));var r=n("q1tI"),a=n("9/5/"),i=n.n(a),c=function(e){var t=Object(r.useRef)();return Object(r.useEffect)((function(){t.current=e}),[e]),t},o=function(e){var t=c(e);Object(r.useEffect)((function(){if(window){var e=function(){t.current({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",e),e(),function(){window.removeEventListener("resize",e)}}}),[])},l=function(e,t){var n=c(e);Object(r.useEffect)((function(){if(t){var e=t.current,r=function(e){"enter"===e.key.toLowerCase()&&n.current(e)};return e.addEventListener("keypress",r),function(){return e.removeEventListener("keypress",r)}}}))},u=function(e){var t=c(e);Object(r.useEffect)((function(){if(window){var e=0,n=window.scrollY,r=i()((function(){e=window.scrollY-n,n=window.scrollY,t.current({delta:e})}),5);return window.addEventListener("scroll",r,!1),function(){return window.removeEventListener("scroll",r,!1)}}}),[])}},askU:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return f}));n("rGqo"),n("yt8O"),n("Btvt"),n("RW0V"),n("91GP"),n("f3/d");var r=n("q1tI"),a=n.n(r),i=n("j6J2"),c=n("Wbzz"),o=(n("tx7Q"),n("gZR9")),l=n.n(o);var u=function(e){var t=e.diy,n=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,["diy"]),c=Object(r.useState)(Object(i.e)(t,!0)),o=c[0],u=c[1];return a.a.createElement("img",Object.assign({},n,{onError:function(){return u(l.a)},alt:t.name,src:o}))},f=function(e){var t=e.diy;return a.a.createElement(c.Link,{to:Object(i.d)(t),className:"critter block"},a.a.createElement("div",{className:"stack"},a.a.createElement(u,{diy:t})))}},lJhr:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return u}));n("f3/d");var r=n("askU"),a=n("q1tI"),i=n.n(a),c=n("2qSH"),o=n("Bl7J"),l=n("vrFN");function u(e){var t=e.pageContext,n=t.material,a=t.recipes,u=n.name;return i.a.createElement(o.a,null,i.a.createElement(l.a,{title:u+" | material"}),i.a.createElement("article",null,i.a.createElement("section",{style:{position:"relative",zIndex:0,overflow:"hidden"}},i.a.createElement("h1",null,u),i.a.createElement(r.b,{diy:n}),i.a.createElement("h3",null,"Obtained from"),n.obtainedFrom.map((function(e){return i.a.createElement("p",null,e)})),i.a.createElement("p",null,(+n.bells||0).toLocaleString()," bells")),i.a.createElement("section",null,i.a.createElement("h3",null,"Used in Recipes"),i.a.createElement("div",{className:"grid"},a.map((function(e){return i.a.createElement(r.a,{diy:e})}))))),i.a.createElement(c.b,{onFabClick:function(){return window.history.back()}}))}},tx7Q:function(e,t,n){}}]);
//# sourceMappingURL=component---src-templates-material-page-jsx-908c3dd9e9d8f87129d3.js.map