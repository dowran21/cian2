(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[9],{146:function(t,e,n){"use strict";var o=n(8),l=n(1);e.a=function(t){return Object(l.jsx)("svg",Object(o.a)(Object(o.a)({baseProfile:"tiny",viewBox:"0 0 24 24",fill:"currentColor",height:"1em",width:"1em"},t),{},{children:Object(l.jsx)("path",{d:"M17.657 5.304c-3.124-3.073-8.189-3.073-11.313 0a7.78 7.78 0 000 11.13L12 21.999l5.657-5.565a7.78 7.78 0 000-11.13zM12 13.499c-.668 0-1.295-.26-1.768-.732a2.503 2.503 0 010-3.536c.472-.472 1.1-.732 1.768-.732s1.296.26 1.768.732a2.503 2.503 0 010 3.536c-.472.472-1.1.732-1.768.732z"})}))}},204:function(t,e,n){"use strict";n.r(e),n.d(e,"MapComponent",(function(){return s}));var o=n(147),l=n(0);function i(){return Object(o.c)().map}var r=n(359),c=n(363),a=n(146),u=n(1);function s(t){var e=t.setLocation,n=t.toCenter,o=t.location,r=i(),c=Object(l.useRef)(!0);return r.on("click",(function(t){var l,i;if(!c.current)return null;(null===o||void 0===o?void 0:o.lat)!==(null===(l=t.latlng)||void 0===l?void 0:l.lat)&&(null===o||void 0===o?void 0:o.lng)!==(null===(i=t.latlng)||void 0===i?void 0:i.lng)&&(r.setView(t.latlng,r.getZoom(),{animate:n.current||!1}),e(t.latlng))})),r.on("moveend",(function(t){var n,l;if(!c.current)return null;(null===o||void 0===o?void 0:o.lat)!==(null===(n=t.target.getCenter())||void 0===n?void 0:n.lat)&&(null===o||void 0===o?void 0:o.lng)!==(null===(l=t.target.getCenter())||void 0===l?void 0:l.lng)&&e(t.target.getCenter())})),Object(l.useEffect)((function(){return function(){c.current=!1}}),[]),null}e.default=function(t){var e=t.setLocation,n=t.position,o=Object(l.useRef)(!1),i=Object(l.useMemo)((function(){return Object(u.jsxs)(r.a,{center:(null===n||void 0===n?void 0:n.lat)?[null===n||void 0===n?void 0:n.lat,null===n||void 0===n?void 0:n.lng]:[37.92227,58.37601],zoom:15,scrollWheelZoom:!0,style:{height:450},children:[Object(u.jsx)(a.a,{className:"absolute text-gray-800 top-1/2 left-1/2 text-5xl -mt-11 -ml-6",style:{zIndex:1e5}}),Object(u.jsx)(c.a,{url:"https://gamysh.com/map/tile/{z}/{x}/{y}.png",attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}),Object(u.jsx)(s,{setLocation:e,toCenter:o})]})}),[]);return Object(u.jsx)("div",{className:"relative",children:i})}}}]);
//# sourceMappingURL=9.08044cfe.chunk.js.map