(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[33],{100:function(e,t,c){"use strict";t.a=c.p+"static/media/logo.070d5664.svg"},103:function(e,t,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ic_person=void 0;t.ic_person={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"},children:[]}]}},110:function(e,t,c){"use strict";c.r(t);var s=c(0),n=c(5),a=c(33),i=c(102),l=c(99),r=c(100),o=c(22),d=c(49),j=c(27),m=c(98),b=c(101),x=c(34),u=c(103),h=c(1);t.default=function(){var e,t=Object(s.useContext)(x.a),c=t.lang,v=t.dispatchLang,O=Object(o.b)(),p=Object(n.f)(),f=Object(o.c)(m.a),N=Object(o.c)(m.d);return e="ru"==c?"ru":"tm",Object(s.useEffect)((function(){O(Object(d.a)({url:"".concat(e,"/categories-types"),token:"",action:function(e){e.success?(console.log("get_category ",e),O(Object(j.c)({categories:e.data.rows}))):console.log("error_data ",e)}}))}),[e]),Object(h.jsxs)("main",{children:[Object(h.jsx)("div",{className:"main",children:Object(h.jsx)("div",{className:"main1",children:Object(h.jsxs)("div",{className:"nav",children:[Object(h.jsxs)("div",{className:"nav1",children:[Object(h.jsx)("div",{className:"brand flex items-center",children:Object(h.jsx)(a.b,{to:"/",className:"flex items-center text-lg font-bold",children:Object(h.jsx)("img",{src:r.a,className:"logo_img"})})}),Object(h.jsxs)("div",{className:"link_more",children:[null===f||void 0===f?void 0:f.map((function(e){var t;return Object(h.jsxs)("li",{className:"nav_dropdown",children:[Object(h.jsx)("p",{onClick:function(){p.push("/arenda/".concat(e.id))},children:e.name},e.id),Object(h.jsx)("div",{className:"dropdown_content border-t",children:Object(h.jsxs)("div",{className:"header_text p-8",children:[Object(h.jsx)("div",{className:"category_grid",children:null===(t=e.main_types)||void 0===t?void 0:t.map((function(t){var c;return Object(h.jsxs)("div",{className:"cate_box",children:[Object(h.jsx)("span",{className:"font-medium text-xl mb-2",children:t.name},t.id),null===t||void 0===t||null===(c=t.sub_types)||void 0===c?void 0:c.slice(0,7).map((function(t){return Object(h.jsx)(a.b,{onClick:function(){p.push("/products/".concat(e.id,"/").concat(t.id))},className:"hover:text-blue-600 mb-3 text-base",children:t.name},t.id)}))]})}))}),Object(h.jsxs)("div",{className:"flex text-sm mt-6",children:[Object(h.jsx)("p",{className:"mr-4 hover:text-blue-600",children:b.a[c].geo}),Object(h.jsx)("p",{className:"text-gray-500 hover:text-blue-600",children:b.a[c].MapSearching})]})]})})]})})),Object(h.jsxs)("li",{className:"nav_dropdown",children:[Object(h.jsx)(a.b,{to:"/kommercheskaya",children:Object(h.jsx)("p",{children:b.a[c].commerce})}),Object(h.jsx)("div",{className:"dropdown_content border-t",children:Object(h.jsxs)("div",{className:"header_text p-8",children:[Object(h.jsx)("div",{className:"category_grid",children:null===f||void 0===f?void 0:f.map((function(e){var t;return Object(h.jsxs)("div",{className:"cate_box",children:[Object(h.jsx)("span",{className:"font-medium text-xl mb-2",children:e.name},e.id),null===(t=e.main_types)||void 0===t?void 0:t.map((function(e){var t;return null===(t=e.sub_types)||void 0===t?void 0:t.slice(0,4).map((function(e){return Object(h.jsx)(a.b,{onClick:function(){p.push("/products/3/".concat(e.id))},className:"hover:text-blue-600 mb-3 text-base",children:e.name},e.id)}))}))]})}))}),Object(h.jsxs)("div",{className:"flex text-sm mt-6",children:[Object(h.jsx)("p",{className:"mr-4 hover:text-blue-600",children:b.a[c].geo}),Object(h.jsx)("p",{className:"text-gray-500 hover:text-blue-600",children:b.a[c].MapSearching})]})]})})]})]})]}),Object(h.jsxs)("div",{className:"nav2",children:[Object(h.jsx)(a.b,{to:"/wishlist",children:Object(h.jsx)(i.Icon,{size:17,icon:l.heartO,className:"text-gray-700 mr-6 font-bold cursor-pointer"})}),Object(h.jsx)(a.b,{to:"/create_notice",className:"btn1 font-medium text-sm",children:b.a[c].fff}),(null===N||void 0===N?void 0:N.id)?Object(h.jsxs)(a.b,{to:"/profile",className:"btn2 font-medium text-sm flex items-center",children:[Object(h.jsx)(i.Icon,{size:20,icon:u.ic_person,className:"text-blue-600 mr-2"}),null===N||void 0===N?void 0:N.full_name]}):Object(h.jsx)(a.b,{to:"/auth/login",className:"btn2 font-medium text-sm",children:b.a[c].login}),Object(h.jsxs)("select",{className:"langReact1 lang ml-4 text-blue-600 font-medium py-1 pl-2 rounded-md text-xs bg-blue-100",name:"lang",value:c,onChange:function(e){return v({type:e.target.value})},children:[Object(h.jsx)("option",{className:"langReact",children:c}),Object(h.jsx)("option",{children:"Ru"}),Object(h.jsx)("option",{children:"Tk"})]})]}),Object(h.jsx)(a.b,{to:"/wishlist",className:"header_icon",children:Object(h.jsx)(i.Icon,{size:19,icon:l.heartO,className:"text-gray-700 font-bold cursor-pointer"})})]})})}),Object(h.jsx)("hr",{})]})}}}]);
//# sourceMappingURL=33.c1e5b569.chunk.js.map