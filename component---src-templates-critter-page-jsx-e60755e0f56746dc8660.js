(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"8oxB":function(e,t){var n,r,a=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function c(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:o}catch(e){r=o}}();var l,u=[],s=!1,f=-1;function m(){s&&l&&(s=!1,l.length?u=l.concat(u):f=-1,u.length&&d())}function d(){if(!s){var e=c(m);s=!0;for(var t=u.length;t;){for(l=u,u=[];++f<t;)l&&l[f].run();f=-1,t=u.length}l=null,s=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===o||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function p(){}a.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new h(e,t)),1!==u.length||s||c(d)},h.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=p,a.addListener=p,a.once=p,a.off=p,a.removeListener=p,a.removeAllListeners=p,a.emit=p,a.prependListener=p,a.prependOnceListener=p,a.listeners=function(e){return[]},a.binding=function(e){throw new Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(e){throw new Error("process.chdir is not supported")},a.umask=function(){return 0}},B7px:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{d:"M15 8.67196V3.87384C14.9994 3.50329 14.8891 3.14122 14.6831 2.83324C14.4771 2.52526 14.1845 2.28517 13.8422 2.14321C13.4999 2.00125 13.1233 1.96377 12.7598 2.03551C12.3962 2.10725 12.0621 2.28499 11.7994 2.54633L0 14.1863L11.7994 25.8245C11.9731 25.9992 12.1797 26.1378 12.4072 26.2325C12.6347 26.3271 12.8786 26.3758 13.125 26.3758C13.3714 26.3758 13.6153 26.3271 13.8428 26.2325C14.0703 26.1378 14.2769 25.9992 14.4506 25.8245C14.6248 25.6505 14.763 25.4438 14.8573 25.2163C14.9516 24.9889 15 24.7451 15 24.4988V19.832C20.1562 19.9595 25.7906 20.8932 30 27.3113V25.4363C30 16.7495 23.4375 9.60571 15 8.67196Z",fill:"currentColor"}))}a.defaultProps={width:"30",height:"30",viewBox:"0 0 30 30",fill:"none"},e.exports=a,a.default=a},CBiH:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{d:"M2.30344 6.8139L0 8.88321L5.92214 15.4802L16.7025 1.92814L14.2751 0L5.78097 10.6805L2.30344 6.8139Z",fill:"#00B905"}))}a.defaultProps={width:"17",height:"16",viewBox:"0 0 17 16",fill:"none"},e.exports=a,a.default=a},CX2u:function(e,t,n){"use strict";var r=n("XKFU"),a=n("g3g5"),i=n("dyZX"),o=n("69bn"),c=n("vKrd");r(r.P+r.R,"Promise",{finally:function(e){var t=o(this,a.Promise||i.Promise),n="function"==typeof e;return this.then(n?function(n){return c(t,e()).then((function(){return n}))}:e,n?function(n){return c(t,e()).then((function(){throw n}))}:e)}})},F6bP:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,[r.createElement("path",{d:"M29.4042 2.31157C29.7866 1.47368 30.4999 1.23735 31.0928 1.21157C31.9952 1.1686 32.9405 1.79165 33.83 2.52641C34.4616 3.2397 35.2178 3.7897 36.0944 4.17641C36.7003 4.39124 37.3018 4.43421 37.912 4.40413C38.7714 4.36116 39.6436 4.17212 40.5073 4.12915L40.5546 4.12485L40.9456 4.09048C41.9339 4.04321 42.8663 4.27524 43.7514 4.78655C44.5635 5.52561 44.9202 6.44514 44.8085 7.55374C44.6194 8.46897 44.7827 9.30686 45.294 10.0674C46.1749 10.6862 47.0987 11.2276 48.0698 11.6873C49.0753 12.2373 49.7069 13.0666 49.9819 14.1709C50.0807 15.3397 49.5393 16.0873 48.3706 16.4096C46.8495 16.792 44.8042 16.792 43.0811 18.1241C40.5632 20.2252 39.7725 22.3436 38.6768 22.6658C38.1397 22.0557 34.7882 19.4647 29.1678 18.2229C28.1624 14.7553 27.5522 6.38499 29.4042 2.31157Z",fill:"#FCC21B",key:0}),r.createElement("path",{d:"M35.0752 17.484C36.0635 15.5074 38.8779 12.0313 39.5525 12.7188C40.2186 13.4664 38.6846 17.3508 37.6061 19.2543C37.2236 18.8504 35.9904 18.0039 35.4533 17.8621",fill:"#D19B15",key:1}),r.createElement("path",{d:"M40.0471 23.813C39.467 23.813 38.8998 23.5165 38.5776 22.9837C35.6213 18.1196 28.9268 18.631 28.8623 18.6396C27.917 18.7169 27.0834 18.0208 27.0018 17.0798C26.9618 16.6272 27.1025 16.1771 27.3931 15.8277C27.6837 15.4784 28.1006 15.2581 28.553 15.215C28.9139 15.1806 37.4346 14.4802 41.5166 21.2048C42.0108 22.0169 41.7487 23.0739 40.9408 23.5638C40.6573 23.7314 40.3522 23.813 40.0471 23.813Z",fill:"#C70707",key:2}),r.createElement("path",{d:"M41.276 52.452C33.9154 54.2653 23.6846 54.1364 16.3756 52.6926C9.53497 51.3391 4.29707 47.3043 4.89864 39.3637C5.50879 31.3286 10.8326 23.7618 18.1545 20.4274C25.24 17.2004 34.749 15.6278 39.7592 22.9497C41.0053 24.7715 43.3857 28.8149 43.4975 30.8C43.5061 30.959 43.5147 31.1008 43.549 31.2383C43.5576 31.7368 43.7596 32.2395 44.2494 32.609C47.399 34.9938 49.6936 38.1563 50.1147 42.4918C50.6131 47.661 45.7232 51.3563 41.276 52.452Z",fill:"#FCC21B",key:3}),r.createElement("path",{d:"M32.9185 33.7035L27.3795 32.8998L24.9035 27.8878C24.8359 27.7505 24.7246 27.6394 24.5872 27.5719C24.2425 27.402 23.8237 27.5436 23.6513 27.8878L21.1753 32.8998L15.6363 33.7035C15.4836 33.7253 15.344 33.7972 15.2371 33.9061C15.1079 34.0387 15.0367 34.2171 15.0391 34.4022C15.0416 34.5872 15.1175 34.7637 15.2502 34.8928L19.2577 38.794L18.3109 44.3025C18.2887 44.431 18.3029 44.5625 18.3519 44.6832C18.4009 44.8035 18.4827 44.9079 18.5881 44.9844C18.6935 45.0609 18.8182 45.106 18.9481 45.1155C19.0781 45.1245 19.208 45.0974 19.3232 45.0368L24.2774 42.4359L29.2317 45.0368C29.3669 45.1086 29.524 45.1327 29.6745 45.1065C30.0541 45.0411 30.3094 44.6815 30.2439 44.3025L29.2971 38.794L33.3046 34.8928C33.4137 34.7861 33.4857 34.6467 33.5075 34.4942C33.5664 34.113 33.3002 33.7602 32.9185 33.7035Z",fill:"black",key:4})])}a.defaultProps={width:"55",height:"55",viewBox:"0 0 55 55",fill:"none"},e.exports=a,a.default=a},MNZE:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,[r.createElement("circle",{cx:"33.5",cy:"33.5",r:"33.5",fill:"#13B132",fillOpacity:"0.6",key:0}),r.createElement("path",{d:"M23.8911 26.3804L18.5693 31.1612L32.2515 46.4025L57.1579 15.0926L51.5498 10.6379L31.9254 35.3136L23.8911 26.3804Z",fill:"white",key:1})])}a.defaultProps={width:"67",height:"67",viewBox:"0 0 67 67",fill:"none"},e.exports=a,a.default=a},NNCn:function(e,t,n){"use strict";n.d(t,"b",(function(){return m})),n.d(t,"a",(function(){return h}));n("rGqo"),n("yt8O"),n("Btvt"),n("RW0V"),n("dRSK"),n("91GP"),n("f3/d");var r=n("q1tI"),a=n.n(r),i=n("TSYQ"),o=n.n(i),c=n("MNZE"),l=n.n(c),u=n("Wbzz"),s=(n("ZMKu"),n("tumo")),f=n.n(s);var m=function(e){var t=e.type,n=e.name,r=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,["type","name"]);return a.a.createElement("img",Object.assign({},r,{alt:n,src:"/"+t+"/"+n[0]+n.slice(1).toLowerCase()+".png"}))},d=function(e){var t=e.name,n=e.type,r=e.caught,i=e.no,c=e.leaving;return a.a.createElement(u.Link,{to:"/critter/"+n+"/"+i},a.a.createElement("div",{className:o()("critter block",{caught:r,leaving:c})},a.a.createElement("div",{className:"stack"},a.a.createElement(m,{type:n,name:t}),r&&a.a.createElement(l.a,null),c&&a.a.createElement(f.a,{className:"critter badge"}))))},h=function(e){var t=e.critters,n=e.caught,r=e.splitCaught,i=e.leaving,o=void 0===i?[]:i,c=t.filter((function(e){return!!n.find((function(t){return t.type===e.type&&t.no===e.no}))})),l=c.map((function(e){return e.id})),u=t;return r&&(u=t.filter((function(e){return!~l.indexOf(e.id)}))),a.a.createElement(a.a.Fragment,null,u.map((function(e){return a.a.createElement(d,Object.assign({key:e.id},e,{leaving:!!~o.indexOf(e.id),caught:!r&&!!~l.indexOf(e.id)}))})),r&&c.map((function(e){return a.a.createElement(d,Object.assign({key:e.id},e,{caught:!0,leaving:!!~o.indexOf(e.id)}))})))}},NO8f:function(e,t,n){n("7DDg")("Uint8",1,(function(e){return function(t,n,r){return e(this,t,n,r)}}))},RR1V:function(e,t,n){"use strict";var r=new(n("dM4a").a)("critterDb");r.version(1).stores({caught:"++id, type, no"}),t.a=r},SFXk:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return I}));n("91GP"),n("f3/d");var r=n("TSYQ"),a=n.n(r),i=n("Wbzz"),o=n("ExVU"),c=n("q1tI"),l=n.n(c),u=n("RR1V"),s=n("j6J2"),f=n("CBiH"),m=n.n(f);function d(e){var t=e.checked,n=e.onChange,r=e.label;return l.a.createElement("div",{className:a()("checkbox",{checked:t}),onClick:function(){return n&&n(!t)}},l.a.createElement("div",{className:"checkmark box"},t&&l.a.createElement(m.a,null)),r&&l.a.createElement("label",null,r))}var h=n("NNCn");n("a1Th"),n("Btvt"),n("XfO3"),n("HEwt"),n("rGqo"),n("rE2o"),n("ioFf"),n("bHtr");function p(e){return function(e){if(Array.isArray(e))return v(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return v(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var g=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"],C=function(e){var t=e.ranges,n=void 0===t?[]:t,r=o.DateTime.local(),i=g.map((function(e,t){var r=n.filter((function(e){return null!==e[0]&&s.d.apply(void 0,[{month:t+1}].concat(p(e)))})).length,a=[];return r&&a.push("active"),1===r&&(~n.map((function(e){return e[0]})).indexOf(t+1)?a.push("first"):~n.map((function(e){return e[1]})).indexOf(t+1)&&a.push("last")),a.join(" ")}));return l.a.createElement("div",{className:"date range month"},g.map((function(e,t){return l.a.createElement("div",{"data-content":e,key:e,className:a()("date month",i[t],{now:r.month===t+1})},e)})))},y=function(e){var t=e.ranges,n=void 0===t?[]:t,r=o.DateTime.local(),i=Array(24).fill(0).map((function(e,t){return t%12+1+((t+1)%4?"":t/12>1?"pm":"am")}));i.unshift(i.pop());var c=i.map((function(e,t){var r=n.filter((function(e){return null!==e[0]&&s.c.apply(void 0,[{hour:t}].concat(p(e)))})).length,a=[];return r&&a.push("active"),1===r&&(~n.map((function(e){return e[0]})).indexOf(t)?a.push("first"):~n.map((function(e){return e[1]})).indexOf(t)&&a.push("last")),a.join(" ")}));return l.a.createElement("div",{className:"date range hour"},i.map((function(e,t){return l.a.createElement("div",{"data-content":e,className:a()("date hour",c[t],{now:t===r.hour})},e)})))},E=n("Bl7J"),b=n("F6bP"),w=n.n(b),T=n("B7px"),x=n.n(T),k=n("tumo"),L=n.n(k),O=n("vrFN");function I(e){var t=e.pageContext.critter,n=t.name,r=t.desc,f=t.bells,m=t.type,p=t.no,v=Object(c.useState)(!1),g=v[0],b=v[1];Object(c.useEffect)((function(){u.a.caught.get({type:m,no:p}).then((function(e){return b(!!e)}))}),[m,p]);var T=o.DateTime.local(),k=Object(s.e)(T,t),I=Object(s.e)(T.plus({months:1}),t),B=k&&!I;return l.a.createElement(E.a,null,l.a.createElement(O.a,{title:n,description:r}),l.a.createElement("article",{className:a()("critter detail",{warning:B})},B&&l.a.createElement("div",{className:"banner warning"},"This catch is about to get away!"),l.a.createElement("section",null,l.a.createElement("h1",{style:{marginBottom:"0.5em",marginTop:"16px"}},B&&l.a.createElement(L.a,null)," ",n),l.a.createElement(h.b,Object.assign({style:{width:"100%",height:"300px",objectFit:"contain"}},t)),l.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"1.45em"}},l.a.createElement("div",null,l.a.createElement("div",{style:{display:"flex",alignItems:"flex-end"}},l.a.createElement(w.a,{style:{height:"28px",width:"28px",marginRight:"6px"}}),l.a.createElement("h3",{style:{marginBottom:"0"}},(f||0).toLocaleString()))),l.a.createElement("div",{style:{display:"flex",alignContent:"center"}},l.a.createElement(d,{checked:g,onChange:function(e){e?u.a.caught.put({type:m,no:p}):u.a.caught.where({type:m,no:p}).delete(),b(e)},label:"Mark as Caught"}))),l.a.createElement("p",{style:{textAlign:"left"}},r)),l.a.createElement("section",null,l.a.createElement("h3",{style:{marginTop:"16px"}},"Dates Available"),l.a.createElement(C,{ranges:[[t.smonth,t.emonth],[t.smonth2,t.emonth2]]}),l.a.createElement(y,{ranges:[[t.stime,t.etime],[t.stime2,t.etime2]]}))),l.a.createElement("nav",{"data-mobile":!0,className:"bottom"},l.a.createElement("div",{className:"bottom nav menu"},l.a.createElement("div",{className:"nav fab",onClick:function(){return Object(i.navigate)("/")}},l.a.createElement(x.a,null)))))}},URgk:function(e,t,n){(function(e){var r=void 0!==e&&e||"undefined"!=typeof self&&self||window,a=Function.prototype.apply;function i(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new i(a.call(setTimeout,r,arguments),clearTimeout)},t.setInterval=function(){return new i(a.call(setInterval,r,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(r,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout((function(){e._onTimeout&&e._onTimeout()}),t))},n("YBdB"),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n("yLpj"))},YBdB:function(e,t,n){(function(e,t){n("Btvt"),n("V+eJ"),function(e,n){"use strict";if(!e.setImmediate){var r,a,i,o,c,l=1,u={},s=!1,f=e.document,m=Object.getPrototypeOf&&Object.getPrototypeOf(e);m=m&&m.setTimeout?m:e,"[object process]"==={}.toString.call(e.process)?r=function(e){t.nextTick((function(){h(e)}))}:!function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?e.MessageChannel?((i=new MessageChannel).port1.onmessage=function(e){h(e.data)},r=function(e){i.port2.postMessage(e)}):f&&"onreadystatechange"in f.createElement("script")?(a=f.documentElement,r=function(e){var t=f.createElement("script");t.onreadystatechange=function(){h(e),t.onreadystatechange=null,a.removeChild(t),t=null},a.appendChild(t)}):r=function(e){setTimeout(h,0,e)}:(o="setImmediate$"+Math.random()+"$",c=function(t){t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(o)&&h(+t.data.slice(o.length))},e.addEventListener?e.addEventListener("message",c,!1):e.attachEvent("onmessage",c),r=function(t){e.postMessage(o+t,"*")}),m.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var a={callback:e,args:t};return u[l]=a,r(l),l++},m.clearImmediate=d}function d(e){delete u[e]}function h(e){if(s)setTimeout(h,0,e);else{var t=u[e];if(t){s=!0;try{!function(e){var t=e.callback,n=e.args;switch(n.length){case 0:t();break;case 1:t(n[0]);break;case 2:t(n[0],n[1]);break;case 3:t(n[0],n[1],n[2]);break;default:t.apply(void 0,n)}}(t)}finally{d(e),s=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,n("yLpj"),n("8oxB"))},Zshi:function(e,t,n){var r=n("0/R4");n("Xtr8")("isFrozen",(function(e){return function(t){return!r(t)||!!e&&e(t)}}))},bHtr:function(e,t,n){var r=n("XKFU");r(r.P,"Array",{fill:n("Nr18")}),n("nGyu")("fill")},tumo:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,[r.createElement("g",{clipPath:"url(#clip0)",key:0},r.createElement("path",{d:"M28.1695 28.1695C34.6128 21.7262 34.6128 11.2777 28.1695 4.83441C21.7262 -1.60886 11.2777 -1.60886 4.83441 4.83441C-1.60886 11.2777 -1.60886 21.7262 4.83441 28.1695C11.2777 34.6128 21.7262 34.6128 28.1695 28.1695ZM14.656 8.52623C15.074 7.62069 16.0492 7.13309 17.0244 7.37689C17.9647 7.62069 18.5917 8.52623 18.522 9.53625C18.4872 10.198 18.4523 10.8249 18.4175 11.4866C18.2782 13.9246 18.1389 16.3626 18.0344 18.7658C17.9996 19.5669 17.3378 20.1938 16.5368 20.1938C15.7009 20.1938 15.074 19.5669 15.0392 18.6961C15.0043 18.2085 15.0043 17.7209 14.9695 17.2334C14.865 15.6661 14.7954 14.0988 14.6909 12.4967C14.6212 11.4866 14.5864 10.4766 14.5167 9.4666C14.4819 9.18797 14.5132 8.83968 14.656 8.52623ZM16.502 21.6183C17.6165 21.6183 18.522 22.5238 18.5568 23.6383C18.5568 24.7528 17.6513 25.6584 16.5368 25.6584C15.4571 25.6584 14.5167 24.7528 14.5167 23.6731C14.4819 22.5621 15.384 21.6183 16.502 21.6183Z",fill:"#ED4B92"})),r.createElement("defs",{key:1},r.createElement("clipPath",{id:"clip0"},r.createElement("rect",{width:"33",height:"33",fill:"white"})))])}a.defaultProps={width:"33",height:"33",viewBox:"0 0 33 33",fill:"none"},e.exports=a,a.default=a}}]);
//# sourceMappingURL=component---src-templates-critter-page-jsx-e60755e0f56746dc8660.js.map