(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[9],{148:function(t,e,n){"use strict";var l=n(8),o=n(1);e.a=function(t){return Object(o.jsx)("svg",Object(l.a)(Object(l.a)({baseProfile:"tiny",viewBox:"0 0 24 24",fill:"currentColor",height:"1em",width:"1em"},t),{},{children:Object(o.jsx)("path",{d:"M17.657 5.304c-3.124-3.073-8.189-3.073-11.313 0a7.78 7.78 0 000 11.13L12 21.999l5.657-5.565a7.78 7.78 0 000-11.13zM12 13.499c-.668 0-1.295-.26-1.768-.732a2.503 2.503 0 010-3.536c.472-.472 1.1-.732 1.768-.732s1.296.26 1.768.732a2.503 2.503 0 010 3.536c-.472.472-1.1.732-1.768.732z"})}))}},227:function(t,e,n){"use strict";n.r(e),n.d(e,"MapComponent",(function(){return v}));var l=n(18),o=n(149),r=n(0);function i(){return Object(o.c)().map}var a=n(383),c=n(387),u=n(148),s=n(1);function v(t){var e=t.setLocation,n=t.toCenter,l=t.location,o=i(),a=Object(r.useRef)(!0);return o.on("click",(function(t){var r,i;if(!a.current)return null;(null===l||void 0===l?void 0:l.lat)!==(null===(r=t.latlng)||void 0===r?void 0:r.lat)&&(null===l||void 0===l?void 0:l.lng)!==(null===(i=t.latlng)||void 0===i?void 0:i.lng)&&(o.setView(t.latlng,o.getZoom(),{animate:n.current||!1}),e(t.latlng))})),o.on("moveend",(function(t){var n,o;if(!a.current)return null;(null===l||void 0===l?void 0:l.lat)!==(null===(n=t.target.getCenter())||void 0===n?void 0:n.lat)&&(null===l||void 0===l?void 0:l.lng)!==(null===(o=t.target.getCenter())||void 0===o?void 0:o.lng)&&e(t.target.getCenter())})),Object(r.useEffect)((function(){return function(){a.current=!1}}),[]),null}e.default=function(t){var e=t.setLocation,n=t.position,o=(t.lat,t.lng,Object(r.useRef)(!1));console.log(n,"------lll");var i=Object(r.useState)(null),d=Object(l.a)(i,2),f=d[0],g=d[1];Object(r.useEffect)((function(){f&&f.flyTo([n.lat,n.lng])}),[null===n||void 0===n?void 0:n.lat]);var j=Object(r.useMemo)((function(){return Object(s.jsxs)(a.a,{center:[null===n||void 0===n?void 0:n.lat,null===n||void 0===n?void 0:n.lng],zoom:15,scrollWheelZoom:!0,style:{height:450},whenCreated:g,children:[Object(s.jsx)(u.a,{className:"absolute text-gray-800 top-1/2 left-1/2 text-5xl -mt-11 -ml-6",style:{zIndex:1e5}}),Object(s.jsx)(c.a,{url:"https://gamysh.com/map/tile/{z}/{x}/{y}.png",attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}),Object(s.jsx)(v,{setLocation:e,toCenter:o})]})}),[]);return Object(s.jsx)("div",{className:"relative",children:j})}}}]);
//# sourceMappingURL=9.76203c23.chunk.js.map