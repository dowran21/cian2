(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[27],{101:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.heartO=void 0;a.heartO={viewBox:"0 0 1792 1792",children:[{name:"path",attribs:{d:"M1664 596q0-81-21.5-143t-55-98.5-81.5-59.5-94-31-98-8-112 25.5-110.5 64-86.5 72-60 61.5q-18 22-49 22t-49-22q-24-28-60-61.5t-86.5-72-110.5-64-112-25.5-98 8-94 31-81.5 59.5-55 98.5-21.5 143q0 168 187 355l581 560 580-559q188-188 188-356zM1792 596q0 221-229 450l-623 600q-18 18-44 18t-44-18l-624-602q-10-8-27.5-26t-55.5-65.5-68-97.5-53.5-121-23.5-138q0-220 127-344t351-124q62 0 126.5 21.5t120 58 95.5 68.5 76 68q36-36 76-68t95.5-68.5 120-58 126.5-21.5q224 0 351 124t127 344z"}}]}},118:function(e,a,t){"use strict";t.r(a);var c=t(18),n=t(0),i=t(5),o=t(33),l=t(100),r=t(101),s=(t(102),t(23)),m=t(49),d=t(27),b=t(99),j=t(98),O=t(34),h=t(128),u=t(133),y=t(134),g=t(129),p=t(135),_=t(1);a.default=function(e){var a,t=e.page,f=(e.setPage,Object(n.useContext)(O.a)),x=f.lang,k=f.dispatchLang,v=Object(s.b)(),w=Object(i.f)(),z=Object(s.c)(b.a),N=Object(s.c)(b.d),M=Object(n.useState)(),S=Object(c.a)(M,2),H=S[0],T=S[1];function B(){document.getElementById("mySidenav").style.width="0",document.getElementById("mySidenav").style.left="-25px"}return a="ru"==x?"ru":"tm",console.log(t," -------page"),Object(n.useEffect)((function(){v(Object(m.a)({url:"page-images/4",token:"",action:function(e){e.success?T(e.data.rows):console.log("error_data ",e)}}))}),[]),Object(n.useEffect)((function(){v(Object(m.a)({url:"".concat(a,"/categories-types"),token:"",action:function(e){e.success?(console.log("get_category ",e),v(Object(d.c)({categories:e.data.rows}))):console.log("error_data ",e)}}))}),[a]),Object(_.jsxs)("main",{children:[Object(_.jsxs)("div",{id:"mySidenav",className:"sidenav p-3 shadow-lg",children:[Object(_.jsx)("div",{className:"py-2",children:Object(_.jsx)(l.Icon,{onClick:function(){return B()},size:35,icon:y.ic_keyboard_arrow_left,className:"mr-1"})}),(null===N||void 0===N?void 0:N.id)?Object(_.jsxs)(o.b,{to:"/profile",className:"flex font-medium text-lg py-3",children:[Object(_.jsx)(l.Icon,{size:25,icon:h.ic_person,className:"mr-2"}),null===N||void 0===N?void 0:N.full_name]}):Object(_.jsxs)(o.b,{to:"/auth/login",className:"flex font-medium text-lg py-3 ",children:[Object(_.jsx)(l.Icon,{size:26,icon:g.ic_logout,className:"mr-2"}),Object(_.jsx)("span",{children:j.a[x].login})]}),Object(_.jsx)("hr",{}),Object(_.jsxs)(o.b,{onClick:function(){(null===N||void 0===N?void 0:N.id)?w.push("/create_notice"):w.push("/auth/login")},className:"flex font-medium text-lg py-3 mt-1",children:[Object(_.jsx)(l.Icon,{size:28,icon:p.ic_add_circle_outline_outline,className:"mr-2"}),Object(_.jsx)("span",{children:j.a[x].fff4})]}),Object(_.jsxs)(o.b,{to:"/wishlist",className:"flex font-medium text-lg py-3 mt-1",children:[Object(_.jsx)(l.Icon,{size:23,icon:r.heartO,className:"mr-2"}),Object(_.jsx)("span",{children:j.a[x].wihslist})]}),Object(_.jsxs)("select",{className:"langReact1 lang font-medium py-1 pl-2 rounded-md my-3",name:"lang",value:x,onChange:function(e){k({type:e.target.value}),B()},children:[Object(_.jsx)("option",{className:"langReact",children:x}),Object(_.jsx)("option",{children:"Ru"}),Object(_.jsx)("option",{children:"Tk"})]}),Object(_.jsx)("hr",{}),Object(_.jsx)(o.b,{to:"/arenda/1",onClick:function(){B()},className:"flex py-3",children:Object(_.jsx)("span",{children:j.a[x].rent})}),Object(_.jsx)(o.b,{to:"/arenda/2",onClick:function(){B()},className:"flex py-3",children:Object(_.jsx)("span",{children:j.a[x].sell})}),Object(_.jsx)(o.b,{to:"/kommercheskaya",className:"flex py-3 ",children:Object(_.jsx)("span",{children:j.a[x].commerce})})]}),Object(_.jsx)("div",{className:"main",children:Object(_.jsx)("div",{className:"main1",children:Object(_.jsxs)("div",{className:"nav",children:[Object(_.jsxs)("div",{className:"nav1",children:[Object(_.jsxs)("div",{className:"brand flex items-center",children:[Object(_.jsx)("div",{className:"header_icon",children:Object(_.jsx)(l.Icon,{onClick:function(){return document.getElementById("mySidenav").style.width="100%",void(document.getElementById("mySidenav").style.left="0")},size:26,icon:u.ic_notes,className:" text-black mr-1"})}),Object(_.jsx)(o.b,{to:"/",className:"flex items-center text-lg font-bold",children:H?Object(_.jsx)("img",{src:"https://gamysh.com/".concat(H.destination),className:"logo_img"}):null})]}),Object(_.jsxs)("div",{className:"link_more",children:[null===z||void 0===z?void 0:z.map((function(e){var a;return Object(_.jsxs)("li",{className:"nav_dropdown",children:[t==e.id?Object(_.jsx)("p",{className:"border-b border-blue-600",onClick:function(){w.push("/arenda/".concat(e.id))},children:e.name},e.id):Object(_.jsx)("p",{onClick:function(){w.push("/arenda/".concat(e.id))},children:e.name},e.id),Object(_.jsx)("div",{style:{zIndex:1e6},className:"dropdown_content border-t shadow-lg",children:Object(_.jsxs)("div",{className:"header_text p-8",children:[Object(_.jsx)("div",{className:"category_grid",children:null===(a=e.main_types)||void 0===a?void 0:a.map((function(a){var t;return Object(_.jsxs)("div",{className:"cate_box",children:[Object(_.jsx)("span",{className:"font-medium text-xl mb-2",children:a.name},a.id),null===a||void 0===a||null===(t=a.sub_types)||void 0===t?void 0:t.slice(0,7).map((function(t){return Object(_.jsx)(o.b,{to:"/products?type_id=".concat(JSON.stringify([t.id]),"&category_id=").concat(e.id,"&main_type_id=").concat(a.id),className:"hover:text-blue-600 mb-3 text-base",children:t.name},t.id)}))]})}))}),Object(_.jsx)("div",{className:"flex text-sm mt-6"})]})})]})})),Object(_.jsxs)("li",{className:"nav_dropdown",children:[3==t?Object(_.jsx)("p",{className:"border-b border-blue-600",onClick:function(){return w.push("/kommercheskaya")},children:j.a[x].commerce}):Object(_.jsx)("p",{onClick:function(){return w.push("/kommercheskaya")},children:j.a[x].commerce}),Object(_.jsx)("div",{style:{zIndex:1e6},className:"dropdown_content border-t shadow-lg",children:Object(_.jsxs)("div",{className:"header_text p-8",children:[Object(_.jsx)("div",{className:"category_grid",children:null===z||void 0===z?void 0:z.map((function(e){var a;return Object(_.jsxs)("div",{className:"cate_box",children:[Object(_.jsx)("span",{className:"font-medium text-xl mb-2",children:e.name},e.id),null===(a=e.main_types)||void 0===a?void 0:a.map((function(a){var t;if(2==a.id)return null===(t=a.sub_types)||void 0===t?void 0:t.map((function(a){return Object(_.jsx)(o.b,{to:"/products?type_id=".concat(JSON.stringify([a.id]),"&category_id=").concat(e.id,"&main_type_id=2"),className:"hover:text-blue-600 mb-3 text-base",children:a.name},a.id)}))}))]})}))}),Object(_.jsx)("div",{className:"flex text-sm mt-6"})]})})]})]})]}),Object(_.jsxs)("div",{className:"nav2",children:[Object(_.jsx)(o.b,{to:"/wishlist",children:Object(_.jsx)(l.Icon,{size:17,icon:r.heartO,className:"text-gray-700 hover:text-black mr-6 font-bold cursor-pointer"})}),Object(_.jsx)(o.b,{onClick:function(){(null===N||void 0===N?void 0:N.id)?w.push("/create_notice"):w.push("/auth/login")},className:"btn1 font-medium text-sm",children:j.a[x].fff}),(null===N||void 0===N?void 0:N.id)?Object(_.jsxs)(o.b,{to:"/profile",className:"btn2 font-medium text-sm flex items-center",children:[Object(_.jsx)(l.Icon,{size:20,icon:h.ic_person,className:"text-blue-600 mr-2"}),null===N||void 0===N?void 0:N.full_name]}):Object(_.jsx)(o.b,{to:"/auth/login",className:"btn2 font-medium text-sm",children:j.a[x].login}),Object(_.jsxs)("select",{className:"langReact1 lang cursor-pointer ml-4 text-blue-600 font-medium py-1 pl-2 rounded-md text-xs bg-blue-100 hover:bg-blue-200",name:"lang",value:x,onChange:function(e){return k({type:e.target.value})},children:[Object(_.jsx)("option",{className:"langReact",children:x}),Object(_.jsx)("option",{children:"Ru"}),Object(_.jsx)("option",{children:"Tk"})]})]}),Object(_.jsx)(o.b,{to:"/wishlist",className:"header_icon",children:Object(_.jsx)(l.Icon,{size:19,icon:r.heartO,className:"text-gray-700 font-bold cursor-pointer"})})]})})}),Object(_.jsx)("hr",{})]})}},128:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.ic_person=void 0;a.ic_person={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"},children:[]}]}},129:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.ic_logout=void 0;a.ic_logout={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"},children:[]}]}},133:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.ic_notes=void 0;a.ic_notes={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0V0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z"},children:[]}]}},134:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.ic_keyboard_arrow_left=void 0;a.ic_keyboard_arrow_left={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0V0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"},children:[]}]}},135:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.ic_add_circle_outline_outline=void 0;a.ic_add_circle_outline_outline={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0V0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"},children:[]}]}},98:function(e,a,t){"use strict";var c,n,i=t(22);a.a={ru:(c={login:"\u0412\u043e\u0439\u0442\u0438",fff:"+ \u0420\u0430\u0437\u043c\u0435\u0441\u0442\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435",commerce:"\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f",geo:"\u0410\u0448\u0433\u0430\u0431\u0430\u0442",MapSearching:"\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u043a\u0430\u0440\u0442\u0435",mapfirst:"\u041f\u043e\u0438\u0441\u043a \u043d\u0430 \u043a\u0430\u0440\u0442\u0435",mapsecond:"\u0418\u0449\u0438\u0442\u0435 \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u044b \u0440\u044f\u0434\u043e\u043c \u0441 \u0440\u0430\u0431\u043e\u0442\u043e\u0439,",mapsecond1:"\u043f\u0430\u0440\u043a\u043e\u043c \u0438\u043b\u0438 \u0440\u043e\u0434\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a\u0430\u043c\u0438",mapbutton:"\u041d\u0430\u0439\u0442\u0438 \u043d\u0430 \u043a\u0430\u0440\u0442\u0435",fo1:"\u041b\u0438\u0434\u0435\u0440 \u043e\u043d\u043b\u0430\u0439\u043d-\u043e\u0431\u044a\u0432\u043b\u0435\u043d\u0438\u0439 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435*",fo2:"\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 GAMY\u015e:",fo3:"gamysh.com \u2014 \u0434\u043e\u0441\u0442\u043e\u0432\u0435\u0440\u043d\u0430\u044f \u0431\u0430\u0437\u0430 \u0434\u0430\u043d\u043d\u044b\u0445 \u043e \u043f\u0440\u043e\u0434\u0430\u0436\u0435 \u0438 \u0430\u0440\u0435\u043d\u0434\u0435 \u0436\u0438\u043b\u043e\u0439 \u0438 \u043a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u043e\u0439 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",fo4:"\xa9 2021 GAMYSH.\u0413\u0420\u0423\u041f\u041f",wihslist:"\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435",count_est:"\u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0439",fo5:"\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f \u0441\u0430\u0439\u0442\u0430",fff4:"\u0420\u0430\u0437\u043c\u0435\u0441\u0442\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435",hom1:"\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043e\u0441\u0442\u0438",hom2:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom3:"\u043e\u0442 8 900 000 \u20bd",hom4:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom5:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom6:"\u043e\u0442 8 900 000 \u20bd",hom7:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom8:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom9:"\u043e\u0442 8 900 000 \u20bd",hom10:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom11:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom12:"\u043e\u0442 8 900 000 \u20bd",hom13:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom14:"\u041f\u043e\u043b\u0435\u0437\u043d\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0438",hom15:"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f",hom16:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430:",hom17:"\u0410\u0440\u0435\u043d\u0434\u0430:",search1:"\u043b\u0443\u0447\u0448\u0438\u0435 \u0434\u043e\u043c\u0430 \u0438\u0449\u0438 \u043d\u0430 gamysh",search2:"\u0422\u0438\u043f \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",search3:"\u041f\u043b\u043e\u0449\u0430\u0434\u044c",search4:"\u0426\u0435\u043d\u0430",search5:"\u0413\u043e\u0440\u043e\u0434, \u0432\u0435\u043b\u0430\u044f\u0442",search6:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043d\u0430 \u043a\u0430\u0440\u0442\u0435",search7:"\u041f\u043e\u0438\u0441\u043a",search8:"\u0421\u0434\u0430\u0435\u0442\u0441\u044f \u0432 \u0430\u0440\u0435\u043d\u0434\u0443",search9:"\u041f\u0440\u043e\u0434\u0430\u0435\u0442\u0441\u044f",search10:"\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f",sell:"\u041f\u0440\u043e\u0434\u0430\u0435\u0442\u0441\u044f",rent:"\u0421\u0434\u0430\u0435\u0442\u0441\u044f \u0432 \u0430\u0440\u0435\u043d\u0434\u0443",good_url:"\u041f\u043e\u043b\u0435\u0437\u043d\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0438",log_out:"\u0412\u044b\u0439\u0442\u0438",waiting:"\u0412 \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u0438",accepted:"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u043d\u044b\u0439",rejected:"\u041e\u0442\u043a\u0430\u0437\u0430\u043d\u043e",reject_title:"\u041f\u0440\u0438\u0447\u0438\u043d\u0430 \u043e\u0442\u043a\u0430\u0437\u0430",profil:"\u041f\u0440\u043e\u0444\u0438\u043b\u044c",estates:"\u041c\u043e\u0438 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",name:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c",email:"\u041f\u043e\u0447\u0442\u0430",phone:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d",full_name:"\u0418\u043c\u044f",more_filter:"\u0415\u0449\u0451 \u0444\u0438\u043b\u044c\u0442\u0440\u044b",owner_type:"\u041e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f \u043e\u0442",room:"\u043a\u043e\u043c\u043d\u0430\u0442\u043d\u0430\u044f",type:"\u041d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u044c",category:"\u0421\u0434\u0435\u043b\u043a\u0430",price:"\u0426\u0435\u043da",dan:"\u043e\u0442",cenli:"\u0434\u043e",area:"\u041f\u043b\u043e\u0449\u0430\u0434\u044c",location:"\u0420\u0435\u0433\u0438\u043e\u043d",find:"\u041d\u0430\u0439\u0442\u0438",show:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043e\u0431\u044a\u0435\u043a\u0442\u044b",finded:"\u041d\u0430\u0439\u0434\u0435\u043d\u043e \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0439",buy_flat:"\u041a\u0443\u043f\u0438\u0442\u044c \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0443",rent_flat:"\u0421\u043d\u044f\u0442\u044c \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0443",buy_commer:"\u041a\u0443\u043f\u0438\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0443\u044e \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u044c",rent_commer:"\u0421\u043d\u044f\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0443\u044e \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u044c",text:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430 / \u0410\u0440\u0435\u043d\u0434\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435",no_emlak:"\u041d\u0435\u0442 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",no_emlak1:"\u041d\u0435\u0442 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",change:"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043f\u0430\u0440\u043e\u043b\u044c",rent_message:"\u0410\u0440\u0435\u043d\u0434\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435",sell_message:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435",map1:"\u041d\u0430 \u043a\u0430\u0440\u0442\u0435",advice:"\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c \u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c",delete:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u0441\u0435",wished:"\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0435",wished_count:"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0445",wish_no:"\u043d\u0435\u0442 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0445",password:"\u041f\u0430\u0440\u043e\u043b\u044c",dont_have:"\u041d\u0435\u0442 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430? \u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044c!"},Object(i.a)(c,"rent","\u0410\u0440\u0435\u043d\u0434\u0430"),Object(i.a)(c,"sell","\u041f\u0440\u043e\u0434\u0430\u0436\u0430"),Object(i.a)(c,"\u0441ommerce","\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f"),Object(i.a)(c,"forgot","\u0417\u0430\u0431\u044b\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c"),Object(i.a)(c,"send","\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"),Object(i.a)(c,"welcome","\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c!"),Object(i.a)(c,"regist","\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"),Object(i.a)(c,"owner","\u0421\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a"),Object(i.a)(c,"rieltor","\u0420\u0438\u0435\u043b\u0442\u043e\u0440"),Object(i.a)(c,"already_have","\u0423\u0436\u0435 \u0435\u0441\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442?"),Object(i.a)(c,"VerifyCode","\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u043a\u043e\u0434\u0430"),Object(i.a)(c,"not1","\u041d\u043e\u0432\u043e\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435"),Object(i.a)(c,"not2","\u041e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435 \u0431\u0443\u0434\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e"),Object(i.a)(c,"not3","\u043d\u0430"),Object(i.a)(c,"not4"," \u0438 \u0432 \u043d\u0430\u0448\u0438\u0445 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0445"),Object(i.a)(c,"not5","\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u0445"),Object(i.a)(c,"not6","\u0422\u0438\u043f \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f"),Object(i.a)(c,"not7","\u0422\u0438\u043f \u0441\u0434\u0435\u043b\u043a\u0438"),Object(i.a)(c,"not8","\u041f\u0440\u043e\u0434\u0430\u0436\u0430"),Object(i.a)(c,"not9","\u0410\u0440\u0435\u043d\u0434\u0430"),Object(i.a)(c,"not10","\u0422\u0438\u043f \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438"),Object(i.a)(c,"not11","\u0416\u0438\u043b\u0430\u044f"),Object(i.a)(c,"not12","\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f"),Object(i.a)(c,"not13","\u041e\u0431\u044a\u0435\u043a\u0442"),Object(i.a)(c,"not14","\u041e\u0431 \u043e\u0431\u044a\u0435\u043a\u0442\u0435"),Object(i.a)(c,"not15","\u0426\u0435\u043d\u0430"),Object(i.a)(c,"not16","TMT"),Object(i.a)(c,"not17","\u041e\u0431\u0449\u0430\u044f \u043f\u043b\u043e\u0449\u0430\u0434\u044c"),Object(i.a)(c,"not18","\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043d\u0430 \u0442\u0443\u0440\u043a\u043c\u0435\u043d\u0441\u043a\u043e\u043c"),Object(i.a)(c,"not19","\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043d\u0430 \u0440\u0443\u0441\u0441\u043a\u043e\u043c"),Object(i.a)(c,"not30","\u0420\u0430\u0439\u043e\u043d"),Object(i.a)(c,"not20","\u0424\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438"),Object(i.a)(c,"not21","\u041d\u0435 \u0434\u043e\u043f\u0443\u0441\u043a\u0430\u044e\u0442\u0441\u044f \u043a \u0440\u0430\u0437\u043c\u0435\u0449\u0435\u043d\u0438\u044e \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u0441 \u0432\u043e\u0434\u044f\u043d\u044b\u043c\u0438 \u0437\u043d\u0430\u043a\u0430\u043c\u0438, \u0447\u0443\u0436\u0438\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432 \u0438 \u0440\u0435\u043a\u043b\u0430\u043c\u043d\u044b\u0435 \u0431\u0430\u043d\u043d\u0435\u0440\u044b. JPG, PNG \u0438\u043b\u0438 SVG. \u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0437\u043c\u0435\u0440 \u0444\u0430\u0439\u043b\u0430 3 \u043c\u0431"),Object(i.a)(c,"not22","\u0420\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u043d\u0430 \u043a\u0430\u0440\u0442\u0435"),Object(i.a)(c,"not23","\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435"),Object(i.a)(c,"add_wishlist","\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435"),Object(i.a)(c,"add_errors","\u041d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043e\u043e\u0435!"),Object(i.a)(c,"update","\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u043e"),Object(i.a)(c,"update_btn","\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c"),Object(i.a)(c,"errors","\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c!"),Object(i.a)(c,"notice_success","\u0412\u044b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0434\u043e\u0431\u0430\u0432\u0438\u043b\u0438!"),Object(i.a)(c,"notice_choose","\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u043f\u043e\u043b\u044f!"),Object(i.a)(c,"notice_enough","\u0412\u044b \u043d\u0435 \u043c\u043e\u0436\u0435\u0442\u0435 \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438!"),Object(i.a)(c,"notice_img_error","\u0424\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e!"),Object(i.a)(c,"phone_min","\u041c\u0438\u043d\u0438\u043c\u0443\u043c 8 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(i.a)(c,"phone_max","\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 8 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(i.a)(c,"required","\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u043b\u0435"),Object(i.a)(c,"only_number","\u0422\u043e\u043b\u044c\u043a\u043e \u0446\u0438\u0444\u0440\u044b"),Object(i.a)(c,"password_regex","\u041f\u0430\u0440\u043e\u043b\u044c \u0434\u043e\u043b\u0436\u0435\u043d \u0432\u043a\u043b\u044e\u0447\u0430\u0442\u044c \u0432 \u0441\u0435\u0431\u044f \u043e\u0434\u043d\u0443 \u0446\u0438\u0444\u0440\u0443 \u0438 \u043e\u0434\u043d\u0443 \u0431\u0443\u043a\u0432\u0443"),Object(i.a)(c,"password_min","\u041c\u0438\u043d\u0438\u043c\u0443\u043c 8 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(i.a)(c,"password_max","\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 50 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(i.a)(c,"name_min","\u041c\u0438\u043d\u0438\u043c\u0443\u043c 3 \u0441\u0438\u043c\u0432\u043e\u043b\u0430"),Object(i.a)(c,"name_max","\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 50 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(i.a)(c,"new_password","\u041d\u043e\u0432\u044b\u0439 \u043f\u0430\u0440\u043e\u043b\u044c"),Object(i.a)(c,"price_min","\u041c\u0430\u043a\u0441\u0438\u0441\u043c\u0443\u043c 10 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0439"),Object(i.a)(c,"area_min","\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 5 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0439"),Object(i.a)(c,"description_min","\u041c\u0438\u043d\u0438\u043c\u0443 10 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(i.a)(c,"description_max1","\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 150 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0439"),Object(i.a)(c,"title_arz","\u0416\u0430\u043b\u043e\u0432\u0430\u0442\u044c\u0441\u044f"),Object(i.a)(c,"des_send","\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"),Object(i.a)(c,"error_description","\u0432\u044b \u043d\u0435 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u043e\u0432\u0430\u043d\u044b!"),Object(i.a)(c,"success_description","\u0412\u0430\u0448\u0430 \u0436\u0430\u043b\u043e\u0431\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430!"),Object(i.a)(c,"imgSize","P\u0430\u0437\u043c\u0435\u0440 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0439 \u043d\u0435 \u0434\u043e\u043b\u0436\u0435\u043d \u043f\u0440\u0435\u0432\u044b\u0448\u0430\u0442\u044c 3 \u043c\u0431!"),Object(i.a)(c,"imgQty","\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0439 \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435 3 \u0438 \u043c\u0435\u043d\u044c\u0448\u0435 16!"),Object(i.a)(c,"error_delete","\u041d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u044c \u0443\u0434\u0435\u043b\u0435\u043d\u0430!"),c),tk:(n={login:"Girmek",fff:"Bildiri\u015f go\u015fmak",commerce:"T\xe4jir\xe7ilik",fff4:"Bildiri\u015f go\u015fmak",wihslist:"Halanlarym",geo:"Ashgabat",MapSearching:"Kartadan g\xf6zlemek",mapfirst:"Kartadan g\xf6zlemek",mapsecond:"Eml\xe4kleri i\u015fi\u0148, ma\u015fyn duralgany\u0148 \xfda-da ",mapsecond1:"garynda\u015flary\u0148 \xfdanynda tapy\u0148",mapbutton:"Kartadan tapmak",fo1:"T\xfcrkmenistany\u0148 online-mahabatlary\u0148",fo2:"GAMY\u015e mobil programmasy",fo3:"gamysh.com - bu \xfda\u015fa\xfdy\u015f, \u015f\xe4herda\u015fy  we s\xf6wda eml\xe4gini satmak baradaky maglumatlar bazasy",fo4:"\xa9 2021 GAMYSH.TOPAR",fo5:"sa\xfdty\u0148 mobil g\xf6rn\xfc\u015fi",hom1:"Maslahat berilyan eml\xe4kler",hom2:"\xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb \xfdjt",hom3:" 8 900 000 \u20bd-dan",hom4:"Seliger",hom5:"\xddJT \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom6:"8 900 000 \u20bd-dan",hom7:"Seliger",hom8:"\xddJT \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom9:"8 900 000 \u20bd-dan",hom10:"Seliger",hom11:"\xddJT \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom12:"8 900 000 \u20bd-dan",hom13:"Seliger",hom14:"Pe\xfddaly salgylanmalar",hom15:"Pe\xfddaly bildiri\u015fler",hom16:"Satlyk:",hom17:"K\xe4rende:",search1:"I\u0148 gowy ja\xfdlary gamysh-da g\xf6zle",search2:"Eml\xe4gi\u0148 g\xf6rn\xfc\u015fi",search3:"Me\xfddan",search4:"Bahasy",search5:"\u015e\xe4her, wela\xfdat",search6:"Kartada g\xf6rkez",search7:"G\xf6zle",search8:"K\xe4rende",search9:"Satlyk",search10:"T\xe4jir\xe7ilik",count_est:" eml\xe4k",sell:"Satlyk",rent:"K\xe4rende",good_url:"Pe\xfddaly salgylanmalar",log_out:"\xc7ykmak",waiting:"Seredil\xfd\xe4r",accepted:"Tassyklandy",rejected:"Kabul edildi",reject_title:"Kabul edilm\xe4ndigi\u0148 seb\xe4bi",profil:"\u015eahsy otag",estates:"Eml\xe4kler",name:"Ulanyjy",email:"Elektron Salgy",phone:"Telefon",regist:"T\xe4ze ulanyjy",already_have:"Akkaundy\u0148yz barmy?",VerifyCode:"Kody tassyklamak",change:"Gizlin kody \xfc\xfdtgetmek"},Object(i.a)(n,"rent","K\xe4rende"),Object(i.a)(n,"sell","Satmak"),Object(i.a)(n,"commerce","T\xe4jir\xe7ilik"),Object(i.a)(n,"more_filter","Go\u015fma\xe7a s\xfczg\xfc\xe7ler"),Object(i.a)(n,"location","\u015e\xe4her"),Object(i.a)(n,"find","G\xf6zle"),Object(i.a)(n,"dan","dan"),Object(i.a)(n,"cenli","\xe7enli"),Object(i.a)(n,"no_emlak","Eml\xe4k tapylmady"),Object(i.a)(n,"no_emlak1","Eml\xe4k \xfdok"),Object(i.a)(n,"forgot","Gizlin kody unutdym"),Object(i.a)(n,"send","Ugratmak"),Object(i.a)(n,"welcome","Ho\u015f geldi\u0148iz!"),Object(i.a)(n,"password","Gizlin kod"),Object(i.a)(n,"dont_have","Ulgamda \xfdokmy? Ulgama go\u015fuly\u0148!"),Object(i.a)(n,"full_name","Ady\u0148yz"),Object(i.a)(n,"owner","E\xfdesi"),Object(i.a)(n,"rieltor","Rieltor"),Object(i.a)(n,"owner_type","Bildiri\u015f"),Object(i.a)(n,"show","Eml\xe4kleri g\xf6rkez"),Object(i.a)(n,"type","Eml\xe4k"),Object(i.a)(n,"text","T\xfcrkmenistanda eml\xe4keri satmak we karend\xe4 almak"),Object(i.a)(n,"category","Hereket"),Object(i.a)(n,"area","Me\xfddan"),Object(i.a)(n,"price","Bahasy"),Object(i.a)(n,"finded","Tapylan eml\xe4kler "),Object(i.a)(n,"rent_message","T\xfcrkmenistanda eml\xe4kleri k\xe4rend\xe4 almak"),Object(i.a)(n,"sell_message","T\xfcrkmenistanda eml\xe4kleri satmak"),Object(i.a)(n,"map1","kartadan g\xf6rkez"),Object(i.a)(n,"advice","Maslahat beril\xfd\xe4nler"),Object(i.a)(n,"delete","Hemmesini pozmak"),Object(i.a)(n,"wished","Halanlarym"),Object(i.a)(n,"wished_count","Halanlarymy\u0148 sany"),Object(i.a)(n,"wish_no","Halanlarym \xfdok"),Object(i.a)(n,"buy_flat","Satlyk ja\xfdlar"),Object(i.a)(n,"rent_flat","Ja\xfdy k\xe4rend\xe4 almak"),Object(i.a)(n,"buy_commer","Satlyk t\xe4\xe7irjilik eml\xe4kleri"),Object(i.a)(n,"rent_commer","K\xe4rende t\xe4\xe7irjilik eml\xe4kleri"),Object(i.a)(n,"room","otagly"),Object(i.a)(n,"not1","T\xe4ze bildiri\u015f go\u015fmak"),Object(i.a)(n,"not2","Bildiri\u015f el\xfdeter bolar: "),Object(i.a)(n,"not3"," "),Object(i.a)(n,"not4"," we bizi\u0148 mobil"),Object(i.a)(n,"not5","programmamyzda"),Object(i.a)(n,"not6","Bildiri\u015fi\u0148 g\xf6rn\xfc\u015fi"),Object(i.a)(n,"not7","Bildir\u015fi\u0148 g\xf6rn\xfc\u015fi"),Object(i.a)(n,"not8","Satmak"),Object(i.a)(n,"not9","K\xe4rend\xe4 bermek"),Object(i.a)(n,"not10","Eml\xe4gi\u0148 g\xf6rn\xfc\u015fi"),Object(i.a)(n,"not11","\xdda\u015fa\xfdy\u015f"),Object(i.a)(n,"not12","T\xe4jir\xe7ilik"),Object(i.a)(n,"not13","Eml\xe4k"),Object(i.a)(n,"not14","Eml\xe4k barada"),Object(i.a)(n,"not15","Bahasy"),Object(i.a)(n,"not16","TMT"),Object(i.a)(n,"not17","Umumy me\xfddan"),Object(i.a)(n,"not18","D\xfc\u015f\xfcndiri\u015f (t\xfcrkmen dilinde)"),Object(i.a)(n,"not19","D\xfc\u015f\xfcndiri\u015f (rus dilinde)"),Object(i.a)(n,"not30","Etrap\xe7a"),Object(i.a)(n,"not20","Suratlar"),Object(i.a)(n,"not21"," JPG, PNG \u0438\u043b\u0438 SVG suratlar go\xfdlup bilner. Mahabat bannerly, suraty\u0148 \xfd\xfcz\xfcne s\xf6zler go\xfdulmadyk we g\xf6wr\xfcmi 3 mb az bolmaly."),Object(i.a)(n,"not22","Kartada \xfderle\u015fi\u015fi"),Object(i.a)(n,"not23","Bildiri\u015f go\u015f"),Object(i.a)(n,"add_wishlist","Halanlaryma go\u015fuldy"),Object(i.a)(n,"add_errors","Halanlaryma go\u015fulmady!"),Object(i.a)(n,"update","\xdcst\xfcnlikli \xfc\xfdtgedildi"),Object(i.a)(n,"update_btn","\xdc\xfdtgetmek"),Object(i.a)(n,"errors","\xdcst\xfcnlikli bolmady"),Object(i.a)(n,"notice_success","Siz \xfcst\xfcnlikli go\u015fdy\u0148yz!"),Object(i.a)(n,"notice_choose","H\xf6kmany maglumatlary doldury\u0148!"),Object(i.a)(n,"notice_enough","Siz mundan artyk eml\xe4k go\u015fup bilmersi\u0148iz!"),Object(i.a)(n,"notice_img_error","H\xf6kman surat go\u015fmaly!"),Object(i.a)(n,"phone_min","Azyndan 8 simwol"),Object(i.a)(n,"phone_max","Maksimum 8 simwol"),Object(i.a)(n,"required","H\xf6kmany doldurylmaly"),Object(i.a)(n,"only_number","Di\u0148e san bolmaly"),Object(i.a)(n,"password_regex","H\xf6kman 1 harp we 1 san bolmaly"),Object(i.a)(n,"password_min","Azyndan 8 simwol bolmaly"),Object(i.a)(n,"password_max","Maksimum 50 simwol bolmaly"),Object(i.a)(n,"name_min","Minimum 3 simwol bolmaly"),Object(i.a)(n,"name_max","Maksimum 3 simwol bolmaly"),Object(i.a)(n,"new_password","T\xe4ze gizlin kod"),Object(i.a)(n,"price_min","Maksimum 10 belgi bolmaly"),Object(i.a)(n,"area_min","Maksimum 5 belgi bolmaly"),Object(i.a)(n,"description_min","Minimum 10 simwol bolmaly"),Object(i.a)(n,"description_max1","Maksimum 150 simwol bolmaly"),Object(i.a)(n,"title_arz","Arz etmek"),Object(i.a)(n,"des_send","Ugratmak"),Object(i.a)(n,"error_description","Siz ulgama girmedi\u0148iz!"),Object(i.a)(n,"success_description","Sizi\u0148 arz-\u015fika\xfd\xe4ty\u0148yz ugradyldy!"),Object(i.a)(n,"imgSize","Suratlary\u0148 g\xf6wr\xfcmi 3 mb az bolmaly!"),Object(i.a)(n,"imgQty","Suratlary\u0148 sany 3-den k\xf6p 16-dan az bolmaly!"),Object(i.a)(n,"error_delete","Eml\xe4k pozuldy!"),n)}},99:function(e,a,t){"use strict";t.d(a,"b",(function(){return c})),t.d(a,"c",(function(){return n})),t.d(a,"d",(function(){return i})),t.d(a,"a",(function(){return o}));var c=function(e){return e.auth.isLogged},n=function(e){return e.auth.token},i=function(e){return e.auth.user},o=function(e){return e.data.categories}}}]);
//# sourceMappingURL=27.a282a055.chunk.js.map