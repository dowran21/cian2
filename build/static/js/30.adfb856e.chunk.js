(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[30],{100:function(e,t,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.heartO=void 0;t.heartO={viewBox:"0 0 1792 1792",children:[{name:"path",attribs:{d:"M1664 596q0-81-21.5-143t-55-98.5-81.5-59.5-94-31-98-8-112 25.5-110.5 64-86.5 72-60 61.5q-18 22-49 22t-49-22q-24-28-60-61.5t-86.5-72-110.5-64-112-25.5-98 8-94 31-81.5 59.5-55 98.5-21.5 143q0 168 187 355l581 560 580-559q188-188 188-356zM1792 596q0 221-229 450l-623 600q-18 18-44 18t-44-18l-624-602q-10-8-27.5-26t-55.5-65.5-68-97.5-53.5-121-23.5-138q0-220 127-344t351-124q62 0 126.5 21.5t120 58 95.5 68.5 76 68q36-36 76-68t95.5-68.5 120-58 126.5-21.5q224 0 351 124t127 344z"}}]}},102:function(e,t,c){"use strict";t.a=c.p+"static/media/logo.070d5664.svg"},116:function(e,t,c){"use strict";c.r(t);var n=c(0),s=c(5),i=c(33),a=c(101),l=c(100),o=(c(102),c(22)),d=c(49),r=c(27),m=c(99),j=c(98),b=c(34),h=c(118),u=c(121),x=c(122),v=c(119),p=c(123),O=c(1);t.default=function(){var e,t=Object(n.useContext)(b.a),c=t.lang,f=t.dispatchLang,g=Object(o.b)(),_=Object(s.f)(),N=Object(o.c)(m.a),y=Object(o.c)(m.d);function k(){document.getElementById("mySidenav").style.width="0",document.getElementById("mySidenav").style.left="-25px"}return e="ru"==c?"ru":"tm",Object(n.useEffect)((function(){g(Object(d.a)({url:"".concat(e,"/categories-types"),token:"",action:function(e){e.success?(console.log("get_category ",e),g(Object(r.c)({categories:e.data.rows}))):console.log("error_data ",e)}}))}),[e]),Object(O.jsxs)("main",{children:[Object(O.jsxs)("div",{id:"mySidenav",className:"sidenav p-3 shadow-lg",children:[Object(O.jsx)("div",{className:"py-2",children:Object(O.jsx)(a.Icon,{onClick:function(){return k()},size:35,icon:x.ic_keyboard_arrow_left,className:"mr-1"})}),(null===y||void 0===y?void 0:y.id)?Object(O.jsxs)(i.b,{to:"/profile",className:"flex font-medium text-lg py-3",children:[Object(O.jsx)(a.Icon,{size:25,icon:h.ic_person,className:"mr-2"}),null===y||void 0===y?void 0:y.full_name]}):Object(O.jsxs)(i.b,{to:"/auth/login",className:"flex font-medium text-lg py-3 ",children:[Object(O.jsx)(a.Icon,{size:26,icon:v.ic_logout,className:"mr-2"}),Object(O.jsx)("span",{children:j.a[c].login})]}),Object(O.jsx)("hr",{}),Object(O.jsxs)(i.b,{onClick:function(){(null===y||void 0===y?void 0:y.id)?_.push("/create_notice"):_.push("/auth/login")},className:"flex font-medium text-lg py-3 mt-1",children:[Object(O.jsx)(a.Icon,{size:28,icon:p.ic_add_circle_outline_outline,className:"mr-2"}),Object(O.jsx)("span",{children:j.a[c].fff4})]}),Object(O.jsxs)(i.b,{to:"/wishlist",className:"flex font-medium text-lg py-3 mt-1",children:[Object(O.jsx)(a.Icon,{size:23,icon:l.heartO,className:"mr-2"}),Object(O.jsx)("span",{children:j.a[c].wihslist})]}),Object(O.jsxs)("select",{className:"langReact1 lang font-medium py-1 pl-2 rounded-md my-3",name:"lang",value:c,onChange:function(e){f({type:e.target.value}),k()},children:[Object(O.jsx)("option",{className:"langReact",children:c}),Object(O.jsx)("option",{children:"Ru"}),Object(O.jsx)("option",{children:"Tk"})]}),Object(O.jsx)("hr",{}),Object(O.jsx)(i.b,{to:"/arenda/1",onClick:function(){k()},className:"flex py-3",children:Object(O.jsx)("span",{children:j.a[c].rent})}),Object(O.jsx)(i.b,{to:"/arenda/2",onClick:function(){k()},className:"flex py-3",children:Object(O.jsx)("span",{children:j.a[c].sell})}),Object(O.jsx)(i.b,{to:"/kommercheskaya",className:"flex py-3 ",children:Object(O.jsx)("span",{children:j.a[c].commerce})})]}),Object(O.jsx)("div",{className:"main",children:Object(O.jsx)("div",{className:"main1",children:Object(O.jsxs)("div",{className:"nav",children:[Object(O.jsxs)("div",{className:"nav1",children:[Object(O.jsxs)("div",{className:"brand flex items-center",children:[Object(O.jsx)("div",{className:"header_icon",children:Object(O.jsx)(a.Icon,{onClick:function(){return document.getElementById("mySidenav").style.width="100%",void(document.getElementById("mySidenav").style.left="0")},size:26,icon:u.ic_notes,className:" text-black mr-1"})}),Object(O.jsx)(i.b,{to:"/",className:"flex items-center text-lg font-bold",children:Object(O.jsx)("img",{src:"https://gamysh.com/uploads/images/logo.svg",className:"logo_img"})})]}),Object(O.jsxs)("div",{className:"link_more",children:[null===N||void 0===N?void 0:N.map((function(e){var t;return Object(O.jsxs)("li",{className:"nav_dropdown",children:[Object(O.jsx)("p",{onClick:function(){_.push("/arenda/".concat(e.id))},children:e.name},e.id),Object(O.jsx)("div",{style:{zIndex:1e6},className:"dropdown_content border-t",children:Object(O.jsxs)("div",{className:"header_text p-8",children:[Object(O.jsx)("div",{className:"category_grid",children:null===(t=e.main_types)||void 0===t?void 0:t.map((function(t){var c;return Object(O.jsxs)("div",{className:"cate_box",children:[Object(O.jsx)("span",{className:"font-medium text-xl mb-2",children:t.name},t.id),null===t||void 0===t||null===(c=t.sub_types)||void 0===c?void 0:c.slice(0,7).map((function(t){return Object(O.jsx)(i.b,{onClick:function(){_.push("/products/".concat(e.id,"/").concat(t.id))},className:"hover:text-blue-600 mb-3 text-base",children:t.name},t.id)}))]})}))}),Object(O.jsxs)("div",{className:"flex text-sm mt-6",children:[Object(O.jsx)("p",{className:"mr-4 hover:text-blue-600",children:j.a[c].geo}),Object(O.jsx)("p",{className:"text-gray-500 hover:text-blue-600",children:j.a[c].MapSearching})]})]})})]})})),Object(O.jsxs)("li",{className:"nav_dropdown",children:[Object(O.jsx)("p",{onClick:function(){return _.push("/kommercheskaya")},children:j.a[c].commerce}),Object(O.jsx)("div",{style:{zIndex:1e6},className:"dropdown_content border-t",children:Object(O.jsxs)("div",{className:"header_text p-8",children:[Object(O.jsx)("div",{className:"category_grid",children:null===N||void 0===N?void 0:N.map((function(e){var t;return Object(O.jsxs)("div",{className:"cate_box",children:[Object(O.jsx)("span",{className:"font-medium text-xl mb-2",children:e.name},e.id),null===(t=e.main_types)||void 0===t?void 0:t.map((function(e){var t;if(2==e.id)return null===(t=e.sub_types)||void 0===t?void 0:t.map((function(e){return Object(O.jsx)(i.b,{onClick:function(){_.push("/products/3/".concat(e.id))},className:"hover:text-blue-600 mb-3 text-base",children:e.name},e.id)}))}))]})}))}),Object(O.jsxs)("div",{className:"flex text-sm mt-6",children:[Object(O.jsx)("p",{className:"mr-4 hover:text-blue-600",children:j.a[c].geo}),Object(O.jsx)("p",{className:"text-gray-500 hover:text-blue-600",children:j.a[c].MapSearching})]})]})})]})]})]}),Object(O.jsxs)("div",{className:"nav2",children:[Object(O.jsx)(i.b,{to:"/wishlist",children:Object(O.jsx)(a.Icon,{size:17,icon:l.heartO,className:"text-gray-700 mr-6 font-bold cursor-pointer"})}),Object(O.jsx)(i.b,{onClick:function(){(null===y||void 0===y?void 0:y.id)?_.push("/create_notice"):_.push("/auth/login")},className:"btn1 font-medium text-sm",children:j.a[c].fff}),(null===y||void 0===y?void 0:y.id)?Object(O.jsxs)(i.b,{to:"/profile",className:"btn2 font-medium text-sm flex items-center",children:[Object(O.jsx)(a.Icon,{size:20,icon:h.ic_person,className:"text-blue-600 mr-2"}),null===y||void 0===y?void 0:y.full_name]}):Object(O.jsx)(i.b,{to:"/auth/login",className:"btn2 font-medium text-sm",children:j.a[c].login}),Object(O.jsxs)("select",{className:"langReact1 lang cursor-pointer ml-4 text-blue-600 font-medium py-1 pl-2 rounded-md text-xs bg-blue-100",name:"lang",value:c,onChange:function(e){return f({type:e.target.value})},children:[Object(O.jsx)("option",{className:"langReact",children:c}),Object(O.jsx)("option",{children:"Ru"}),Object(O.jsx)("option",{children:"Tk"})]})]}),Object(O.jsx)(i.b,{to:"/wishlist",className:"header_icon",children:Object(O.jsx)(a.Icon,{size:19,icon:l.heartO,className:"text-gray-700 font-bold cursor-pointer"})})]})})}),Object(O.jsx)("hr",{})]})}},121:function(e,t,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ic_notes=void 0;t.ic_notes={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0V0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z"},children:[]}]}},122:function(e,t,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ic_keyboard_arrow_left=void 0;t.ic_keyboard_arrow_left={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0V0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"},children:[]}]}},123:function(e,t,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ic_add_circle_outline_outline=void 0;t.ic_add_circle_outline_outline={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0V0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"},children:[]}]}}}]);
//# sourceMappingURL=30.adfb856e.chunk.js.map