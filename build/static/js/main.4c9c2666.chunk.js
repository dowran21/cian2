(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[10],{11:function(t,e,n){"use strict";var r=n(2),a=n.n(r),c=n(7),u=n(47),i=n.n(u),o=n(20),s=n(6),l=n(23),d=i.a.create({baseURL:"http://109.106.244.215:2000",timeout:1e4,headers:{"Content-Type":"application/json",accept:"application/json",Authorization:null}});d.interceptors.response.use((function(t){return t}),(function(t){var e,n,r=t.config;if(401===(null===t||void 0===t||null===(e=t.response)||void 0===e?void 0:e.status)&&"Unauthorized"===(null===t||void 0===t||null===(n=t.response)||void 0===n?void 0:n.data)){return d.get("api/auth/token/refresh/",{withCredentials:!0}).then((function(t){return d.defaults.headers.Authorization="Bearer ".concat(t.data.token),r.headers.Authorization="Bearer ".concat(t.data.token),o.a.dispatch(Object(s.o)(t.data)),d(r)})).catch((function(e){return d.defaults.headers.Authorization=null,r.headers.Authorization=null,o.a.dispatch(Object(l.b)()),Promise.reject(t)}))}return d.defaults.headers.Authorization=null,r.headers.Authorization=null,Promise.reject(t)}));var p={getApi:function(){var t=Object(c.a)(a.a.mark((function t(e){var n,r,c,u,i,o;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.url,r=e.token,c=e.withCredentials,u=e.contentType,console.log(u),i={headers:{"Content-Type":u||"application/json",accept:"application/json",Authorization:"Bearer ".concat(r)},timeout:u?1e5:2e4,withCredentials:c},t.next=5,d.get("/api/".concat(n),i);case 5:return o=t.sent,t.abrupt("return",o);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),updateApi:function(){var t=Object(c.a)(a.a.mark((function t(e){var n,r,c,u,i,o;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.url,r=e.token,c=e.withCredentials,u=e.params,i={headers:{"Content-Type":"application/json",accept:"application/json",Authorization:"Bearer ".concat(r)},withCredentials:c},t.next=4,d.put("/api/".concat(n),u,i);case 4:return o=t.sent,t.abrupt("return",o);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),postApi:function(){var t=Object(c.a)(a.a.mark((function t(e){var n,r,c,u,i,o;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.url,r=e.token,c=e.withCredentials,u=e.params,i={headers:{"Content-Type":"application/json",accept:"application/json",Authorization:"Bearer ".concat(r)},withCredentials:c},t.next=4,d.post("/api/".concat(n),u,i);case 4:return o=t.sent,t.abrupt("return",o);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),deleteApi:function(){var t=Object(c.a)(a.a.mark((function t(e){var n,r,c,u,i,o;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.url,r=e.token,c=e.data,u=e.withCredentials,i={headers:{"Content-Type":"application/json",accept:"application/json",Authorization:"Bearer ".concat(r)},withCredentials:u,data:c},t.next=4,d.delete("/api/".concat(n),i);case 4:return o=t.sent,t.abrupt("return",o);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),uploadPhoto:function(){var t=Object(c.a)(a.a.mark((function t(e){var n,r,c,u,i,o;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.url,r=e.token,c=e.withCredentials,u=e.formData,i={headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer ".concat(r)},timeout:5e4,withCredentials:c},t.next=4,d.post("/api/".concat(n),u,i);case 4:return o=t.sent,t.abrupt("return",o);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()};e.a=p},20:function(t,e,n){"use strict";var r=n(48),a=n(15),c=n(8),u=n(6),i={token:"",isLogged:!1,isLoading:!0,categories:{},user:{}},o=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case u.c:return Object(c.a)(Object(c.a)({},t),{},{token:e.payload});case u.a:return Object(c.a)(Object(c.a)({},t),{},{token:e.payload.token,user:e.payload.data,isLoading:!1,isLogged:!0});case u.d:return Object(c.a)(Object(c.a)(Object(c.a)({},t),e.payload),{},{isLogged:!0,isLoading:!1});case u.b:return Object(c.a)(Object(c.a)({},t),{},{token:"",isLogged:!1,isLoading:!0,user:{}});case u.e:return Object(c.a)(Object(c.a)({},t),{},{isLoading:!0});case u.f:return Object(c.a)(Object(c.a)({},t),{},{token:"",isLogged:!1,isLoading:!1,user:{}});default:return t}},s=n(27),l={categories:[],filters:{}},d=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case s.a:return Object(c.a)(Object(c.a)({},t),{},{categories:e.payload.categories});case s.b:return Object(c.a)(Object(c.a)({},t),{},{filters:e.payload.filters});default:return t}},p=Object(a.b)({auth:o,data:d}),f=Object(r.a)({reducer:p});e.a=f},23:function(t,e,n){"use strict";n.d(e,"b",(function(){return d})),n.d(e,"a",(function(){return p}));var r=n(2),a=n.n(r),c=n(7),u=n(6),i=n(11),o=n(9),s=(n(37),n(17)),l=n.n(s),d=function(){return function(){var t=Object(c.a)(a.a.mark((function t(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i.a.getApi({url:"auth/logout/".concat(Date.now()+100),token:"",withCredentials:!0});case 3:e(Object(u.j)()),t.next=10;break;case 6:t.prev=6,t.t0=t.catch(0),e(Object(u.j)()),o.b.error("Unknown error");case 10:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e){return t.apply(this,arguments)}}()},p=function(){return function(){var t=Object(c.a)(a.a.mark((function t(e){var n,r,c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(Object(u.p)()),n=l.a.get("refresh_token"),t.next=4,i.a.getApi({url:"user/load-user",token:n,withCredentials:!0});case 4:200==(r=t.sent).status&&(c={token:r.data.token,data:r.data.data},e(Object(u.i)(c)));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}},27:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"b",(function(){return c}));var r="SET_CATEGORY",a=function(t){return{type:r,payload:t}},c="SET_FILTER_ID"},34:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(18),a=n(0),c=function(t,e){switch(e.type){case"Ru":return"ru";case"Tk":return"tk";default:return t}},u=n(1),i=Object(a.createContext)();e.b=function(t){var e=Object(a.useReducer)(c,"ru"),n=Object(r.a)(e,2),o=n[0],s=n[1];return Object(u.jsx)(i.Provider,{value:{lang:o,dispatchLang:s},children:t.children})}},35:function(t,e,n){"use strict";var r=n(21),a=n.n(r),c=n(1);e.a=function(t){var e=t.type;return Object(c.jsx)(c.Fragment,{children:"global"===e?Object(c.jsx)("div",{className:"z-50 bg-transparent absolute top-0 left-0 w-full h-full flex justify-center items-center",children:Object(c.jsx)(a.a,{type:"Puff",color:"#0468ff",height:80,width:80})}):"table"===e?Object(c.jsx)("div",{className:"z-50 w-full h-full flex justify-center items-center",children:Object(c.jsx)(a.a,{type:"Oval",color:"rgba(99, 102, 241, 1)",height:80,width:80})}):"button"===e?Object(c.jsx)("div",{className:"z-50 w-full h-full flex justify-center items-center",children:Object(c.jsx)(a.a,{type:"Bars",color:"white",height:21,width:21})}):"select"===e?Object(c.jsx)("div",{className:"z-50 w-full h-full flex justify-center items-center",children:Object(c.jsx)(a.a,{type:"Bars",color:"rgba(99, 102, 241, 1)",height:21,width:21})}):null})}},37:function(t,e,n){"use strict";(function(t){n.d(e,"a",(function(){return c}));var r=n(17),a=n.n(r),c=function(e,n){t.browser&&a.a.set(e,n,{expires:7})}}).call(this,n(42))},49:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return s}));var r=n(2),a=n.n(r),c=n(7),u=n(11),i=n(9),o=function(t){var e=t.url,n=t.token,r=t.action;return function(){var t=Object(c.a)(a.a.mark((function t(c){var o,s;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u.a.getApi({url:e,token:n,withCredentials:!1});case 3:return o=t.sent,t.abrupt("return",r({success:!0,data:o.data}));case 7:return t.prev=7,t.t0=t.catch(0),console.log(t.t0),i.b.error("\xdcstinlikli Bolmady"),t.abrupt("return",r({success:!1,message:null===t.t0||void 0===t.t0||null===(s=t.t0.response)||void 0===s?void 0:s.data}));case 12:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},s=function(t){var e=t.url,n=t.token,r=t.action,i=t.data;return function(){var t=Object(c.a)(a.a.mark((function t(c){var o;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u.a.postApi({url:e,params:i,withCredentials:!1,token:n});case 3:return o=t.sent,t.abrupt("return",r({success:!0,data:o.data}));case 7:return t.prev=7,t.t0=t.catch(0),t.abrupt("return",r({success:!1,message:null===t.t0||void 0===t.t0?void 0:t.t0.response}));case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()}},55:function(t,e,n){},6:function(t,e,n){"use strict";n.d(e,"c",(function(){return r})),n.d(e,"l",(function(){return a})),n.d(e,"b",(function(){return c})),n.d(e,"j",(function(){return u})),n.d(e,"e",(function(){return i})),n.d(e,"p",(function(){return o})),n.d(e,"f",(function(){return s})),n.d(e,"d",(function(){return l})),n.d(e,"o",(function(){return d})),n.d(e,"a",(function(){return p})),n.d(e,"i",(function(){return f})),n.d(e,"g",(function(){return h})),n.d(e,"m",(function(){return j})),n.d(e,"k",(function(){return b})),n.d(e,"n",(function(){return O})),n.d(e,"h",(function(){return v}));var r="SET_TOKEN",a=function(t){return{type:r,payload:t}},c="LOGOUT",u=function(){return{type:c}},i="USER_LOADING",o=function(){return{type:i}},s="USER_LOAD_FAILED",l="USER_LOADED",d=function(t){return{type:l,payload:t}},p="LOGIN_SUCCESS",f=function(t){return{type:p,payload:t}},h=function(t){return{type:"CREATE_STAFF",payload:t}},j=function(t){return{type:"UPDATE_STAFF",payload:t}},b=function(t){return{type:"SET_STAFF_LIST",payload:t}},O=function(t){return{type:"UPDATE_STAFF_STATUS",payload:t}},v=function(t){return{type:"DELETE_STAFF",payload:t}}},97:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),c=n(25),u=n.n(c),i=(n(55),n(5)),o=n(33),s=n(35),l=n(9),d=n(23),p=(n(49),n(34)),f=n(22),h=n(1),j=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(17)]).then(n.bind(null,340))})),b=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(19)]).then(n.bind(null,341))})),O=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(20)]).then(n.bind(null,342))})),v=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(14)]).then(n.bind(null,343))})),y=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(15)]).then(n.bind(null,344))})),x=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(16)]).then(n.bind(null,345))})),g=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(13)]).then(n.bind(null,346))})),m=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(18),n.e(31)]).then(n.bind(null,347))})),w=Object(r.lazy)((function(){return Promise.all([n.e(3),n.e(27)]).then(n.bind(null,348))})),k=Object(r.lazy)((function(){return n.e(39).then(n.bind(null,350))})),A=Object(r.lazy)((function(){return n.e(9).then(n.bind(null,332))}));var T=function(){Object(i.f)();var t=Object(f.b)();return Object(r.useEffect)((function(){t(Object(d.a)())}),[]),Object(h.jsxs)(o.a,{children:[Object(h.jsx)(r.Suspense,{fallback:Object(h.jsx)(s.a,{type:"global"}),children:Object(h.jsx)(p.b,{children:Object(h.jsxs)(i.c,{children:[Object(h.jsx)(i.a,{exact:!0,path:"/",children:Object(h.jsx)(j,{})}),Object(h.jsx)(i.a,{path:"/auth",children:Object(h.jsx)(k,{})}),Object(h.jsx)(i.a,{path:"/arenda",children:Object(h.jsx)(b,{})}),Object(h.jsx)(i.a,{path:"/kommercheskaya",children:Object(h.jsx)(O,{})}),Object(h.jsx)(i.a,{path:"/products",children:Object(h.jsx)(v,{})}),Object(h.jsx)(i.a,{path:"/wishlist",children:Object(h.jsx)(y,{})}),Object(h.jsx)(i.a,{path:"/single",children:Object(h.jsx)(x,{})}),Object(h.jsx)(i.a,{path:"/create_notice",children:Object(h.jsx)(g,{})}),Object(h.jsx)(i.a,{path:"/profile",children:Object(h.jsx)(m,{})}),Object(h.jsx)(i.a,{path:"/AllHomeMap",children:Object(h.jsx)(w,{})}),Object(h.jsx)(i.a,{path:"*",component:A})]})})}),Object(h.jsx)(l.a,{})]})},C=function(t){t&&t instanceof Function&&n.e(40).then(n.bind(null,351)).then((function(e){var n=e.getCLS,r=e.getFID,a=e.getFCP,c=e.getLCP,u=e.getTTFB;n(t),r(t),a(t),c(t),u(t)}))},z=n(20),E=n(18);var L=a.a.createContext(),S=function(t){var e=t.children,n=function(t){var e=!("theme"in localStorage)&&window.matchMedia("(prefers-color-scheme: dark)").matches,n=Object(r.useState)(localStorage.getItem(t)||e),a=Object(E.a)(n,2),c=a[0],u=a[1];return Object(r.useEffect)((function(){localStorage.setItem(t,c)}),[c,t]),[c,u]}("theme"),a=Object(E.a)(n,2),c=a[0],u=a[1],i=function(t){var e=Object(r.useRef)();return Object(r.useEffect)((function(){e.current=t})),e.current}(c);function o(){u("light"===c?"dark":"light")}Object(r.useLayoutEffect)((function(){document.documentElement.classList.remove("".concat(i)),document.documentElement.classList.add("".concat(c))}),[c,i]);var s=Object(r.useMemo)((function(){return{theme:c,toggleTheme:o}}),[c]);return Object(h.jsx)(L.Provider,{value:s,children:e})};u.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(S,{children:Object(h.jsx)(f.a,{store:z.a,children:Object(h.jsx)(T,{})})})}),document.getElementById("root")),C()}},[[97,11,12]]]);
//# sourceMappingURL=main.4c9c2666.chunk.js.map