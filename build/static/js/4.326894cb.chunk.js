(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[4,7,30],{101:function(e,t,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.heartO=void 0;t.heartO={viewBox:"0 0 1792 1792",children:[{name:"path",attribs:{d:"M1664 596q0-81-21.5-143t-55-98.5-81.5-59.5-94-31-98-8-112 25.5-110.5 64-86.5 72-60 61.5q-18 22-49 22t-49-22q-24-28-60-61.5t-86.5-72-110.5-64-112-25.5-98 8-94 31-81.5 59.5-55 98.5-21.5 143q0 168 187 355l581 560 580-559q188-188 188-356zM1792 596q0 221-229 450l-623 600q-18 18-44 18t-44-18l-624-602q-10-8-27.5-26t-55.5-65.5-68-97.5-53.5-121-23.5-138q0-220 127-344t351-124q62 0 126.5 21.5t120 58 95.5 68.5 76 68q36-36 76-68t95.5-68.5 120-58 126.5-21.5q224 0 351 124t127 344z"}}]}},102:function(e,t,c){"use strict";c.p},118:function(e,t,c){"use strict";c.r(t);var n=c(18),i=c(0),s=c(5),a=c(33),l=c(100),o=c(101),d=(c(102),c(23)),r=c(49),m=c(27),j=c(99),b=c(98),u=c(34),h=c(128),x=c(133),v=c(134),p=c(129),O=c(135),f=c(1);t.default=function(e){var t,c=e.page,_=(e.setPage,Object(i.useContext)(u.a)),g=_.lang,y=_.dispatchLang,N=Object(d.b)(),z=Object(s.f)(),k=Object(d.c)(j.a),w=Object(d.c)(j.d),M=Object(i.useState)(),I=Object(n.a)(M,2),C=I[0],q=I[1];function H(){document.getElementById("mySidenav").style.width="0",document.getElementById("mySidenav").style.left="-25px"}return t="ru"==g?"ru":"tm",console.log(c," -------page"),Object(i.useEffect)((function(){N(Object(r.a)({url:"page-images/4",token:"",action:function(e){e.success?q(e.data.rows):console.log("error_data ",e)}}))}),[]),Object(i.useEffect)((function(){N(Object(r.a)({url:"".concat(t,"/categories-types"),token:"",action:function(e){e.success?(console.log("get_category ",e),N(Object(m.c)({categories:e.data.rows}))):console.log("error_data ",e)}}))}),[t]),Object(f.jsxs)("main",{children:[Object(f.jsxs)("div",{id:"mySidenav",className:"sidenav p-3 shadow-lg",children:[Object(f.jsx)("div",{className:"py-2",children:Object(f.jsx)(l.Icon,{onClick:function(){return H()},size:35,icon:v.ic_keyboard_arrow_left,className:"mr-1"})}),(null===w||void 0===w?void 0:w.id)?Object(f.jsxs)(a.b,{to:"/profile",className:"flex font-medium text-lg py-3",children:[Object(f.jsx)(l.Icon,{size:25,icon:h.ic_person,className:"mr-2"}),null===w||void 0===w?void 0:w.full_name]}):Object(f.jsxs)(a.b,{to:"/auth/login",className:"flex font-medium text-lg py-3 ",children:[Object(f.jsx)(l.Icon,{size:26,icon:p.ic_logout,className:"mr-2"}),Object(f.jsx)("span",{children:b.a[g].login})]}),Object(f.jsx)("hr",{}),Object(f.jsxs)(a.b,{onClick:function(){(null===w||void 0===w?void 0:w.id)?z.push("/create_notice"):z.push("/auth/login")},className:"flex font-medium text-lg py-3 mt-1",children:[Object(f.jsx)(l.Icon,{size:28,icon:O.ic_add_circle_outline_outline,className:"mr-2"}),Object(f.jsx)("span",{children:b.a[g].fff4})]}),Object(f.jsxs)(a.b,{to:"/wishlist",className:"flex font-medium text-lg py-3 mt-1",children:[Object(f.jsx)(l.Icon,{size:23,icon:o.heartO,className:"mr-2"}),Object(f.jsx)("span",{children:b.a[g].wihslist})]}),Object(f.jsxs)("select",{className:"langReact1 lang font-medium py-1 pl-2 rounded-md my-3",name:"lang",value:g,onChange:function(e){y({type:e.target.value}),H()},children:[Object(f.jsx)("option",{className:"langReact",children:g}),Object(f.jsx)("option",{children:"Ru"}),Object(f.jsx)("option",{children:"Tk"})]}),Object(f.jsx)("hr",{}),Object(f.jsx)(a.b,{to:"/arenda/1",onClick:function(){H()},className:"flex py-3",children:Object(f.jsx)("span",{children:b.a[g].rent})}),Object(f.jsx)(a.b,{to:"/arenda/2",onClick:function(){H()},className:"flex py-3",children:Object(f.jsx)("span",{children:b.a[g].sell})}),Object(f.jsx)(a.b,{to:"/kommercheskaya",className:"flex py-3 ",children:Object(f.jsx)("span",{children:b.a[g].commerce})})]}),Object(f.jsx)("div",{className:"main",children:Object(f.jsx)("div",{className:"main1",children:Object(f.jsxs)("div",{className:"nav",children:[Object(f.jsxs)("div",{className:"nav1",children:[Object(f.jsxs)("div",{className:"brand flex items-center",children:[Object(f.jsx)("div",{className:"header_icon",children:Object(f.jsx)(l.Icon,{onClick:function(){return document.getElementById("mySidenav").style.width="100%",void(document.getElementById("mySidenav").style.left="0")},size:26,icon:x.ic_notes,className:" text-black mr-1"})}),Object(f.jsx)(a.b,{to:"/",className:"flex items-center text-lg font-bold",children:C?Object(f.jsx)("img",{src:"https://gamysh.com/".concat(C.destination),className:"logo_img"}):null})]}),Object(f.jsxs)("div",{className:"link_more",children:[null===k||void 0===k?void 0:k.map((function(e){var t;return Object(f.jsxs)("li",{className:"nav_dropdown",children:[c==e.id?Object(f.jsx)("p",{className:"border-b border-blue-600",onClick:function(){z.push("/arenda/".concat(e.id))},children:e.name},e.id):Object(f.jsx)("p",{onClick:function(){z.push("/arenda/".concat(e.id))},children:e.name},e.id),Object(f.jsx)("div",{style:{zIndex:1e6},className:"dropdown_content border-t shadow-lg",children:Object(f.jsxs)("div",{className:"header_text p-8",children:[Object(f.jsx)("div",{className:"category_grid",children:null===(t=e.main_types)||void 0===t?void 0:t.map((function(t){var c;return Object(f.jsxs)("div",{className:"cate_box",children:[Object(f.jsx)("span",{className:"font-medium text-xl mb-2",children:t.name},t.id),null===t||void 0===t||null===(c=t.sub_types)||void 0===c?void 0:c.slice(0,7).map((function(c){return Object(f.jsx)(a.b,{to:"/products?type_id=".concat(JSON.stringify([c.id]),"&category_id=").concat(e.id,"&main_type_id=").concat(t.id),className:"hover:text-blue-600 mb-3 text-base",children:c.name},c.id)}))]})}))}),Object(f.jsx)("div",{className:"flex text-sm mt-6"})]})})]})})),Object(f.jsxs)("li",{className:"nav_dropdown",children:[3==c?Object(f.jsx)("p",{className:"border-b border-blue-600",onClick:function(){return z.push("/kommercheskaya")},children:b.a[g].commerce}):Object(f.jsx)("p",{onClick:function(){return z.push("/kommercheskaya")},children:b.a[g].commerce}),Object(f.jsx)("div",{style:{zIndex:1e6},className:"dropdown_content border-t shadow-lg",children:Object(f.jsxs)("div",{className:"header_text p-8",children:[Object(f.jsx)("div",{className:"category_grid",children:null===k||void 0===k?void 0:k.map((function(e){var t;return Object(f.jsxs)("div",{className:"cate_box",children:[Object(f.jsx)("span",{className:"font-medium text-xl mb-2",children:e.name},e.id),null===(t=e.main_types)||void 0===t?void 0:t.map((function(t){var c;if(2==t.id)return null===(c=t.sub_types)||void 0===c?void 0:c.map((function(t){return Object(f.jsx)(a.b,{to:"/products?type_id=".concat(JSON.stringify([t.id]),"&category_id=").concat(e.id,"&main_type_id=2"),className:"hover:text-blue-600 mb-3 text-base",children:t.name},t.id)}))}))]})}))}),Object(f.jsx)("div",{className:"flex text-sm mt-6"})]})})]})]})]}),Object(f.jsxs)("div",{className:"nav2",children:[Object(f.jsx)(a.b,{to:"/wishlist",children:Object(f.jsx)(l.Icon,{size:17,icon:o.heartO,className:"text-gray-700 hover:text-black mr-6 font-bold cursor-pointer"})}),Object(f.jsx)(a.b,{onClick:function(){(null===w||void 0===w?void 0:w.id)?z.push("/create_notice"):z.push("/auth/login")},className:"btn1 font-medium text-sm",children:b.a[g].fff}),(null===w||void 0===w?void 0:w.id)?Object(f.jsxs)(a.b,{to:"/profile",className:"btn2 font-medium text-sm flex items-center",children:[Object(f.jsx)(l.Icon,{size:20,icon:h.ic_person,className:"text-blue-600 mr-2"}),null===w||void 0===w?void 0:w.full_name]}):Object(f.jsx)(a.b,{to:"/auth/login",className:"btn2 font-medium text-sm",children:b.a[g].login}),Object(f.jsxs)("select",{className:"langReact1 lang cursor-pointer ml-4 text-blue-600 font-medium py-1 pl-2 rounded-md text-xs bg-blue-100 hover:bg-blue-200",name:"lang",value:g,onChange:function(e){return y({type:e.target.value})},children:[Object(f.jsx)("option",{className:"langReact",children:g}),Object(f.jsx)("option",{children:"Ru"}),Object(f.jsx)("option",{children:"Tk"})]})]}),Object(f.jsx)(a.b,{to:"/wishlist",className:"header_icon",children:Object(f.jsx)(l.Icon,{size:19,icon:o.heartO,className:"text-gray-700 font-bold cursor-pointer"})})]})})}),Object(f.jsx)("hr",{})]})}},128:function(e,t,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ic_person=void 0;t.ic_person={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"},children:[]}]}},129:function(e,t,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ic_logout=void 0;t.ic_logout={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"},children:[]}]}},133:function(e,t,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ic_notes=void 0;t.ic_notes={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0V0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z"},children:[]}]}},134:function(e,t,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ic_keyboard_arrow_left=void 0;t.ic_keyboard_arrow_left={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0V0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"},children:[]}]}},135:function(e,t,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ic_add_circle_outline_outline=void 0;t.ic_add_circle_outline_outline={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0V0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"},children:[]}]}}}]);
//# sourceMappingURL=4.326894cb.chunk.js.map