(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[7,29],{101:function(e,t,n){"use strict";t.a=n.p+"static/media/logo.070d5664.svg"},103:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ic_person=void 0;t.ic_person={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"},children:[]}]}},110:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n(5),i=n(33),c=n(102),s=n(100),l=n(101),r=n(22),d=n(49),m=n(27),h=n(98),b=n(99),j=n(34),u=n(103),x=n(116),v=n(117),f=n(1);t.default=function(){var e,t=Object(a.useContext)(j.a),n=t.lang,p=t.dispatchLang,g=Object(r.b)(),O=Object(o.f)(),y=Object(r.c)(h.a),_=Object(r.c)(h.d);return e="ru"==n?"ru":"tm",Object(a.useEffect)((function(){g(Object(d.a)({url:"".concat(e,"/categories-types"),token:"",action:function(e){e.success?(console.log("get_category ",e),g(Object(m.c)({categories:e.data.rows}))):console.log("error_data ",e)}}))}),[e]),Object(f.jsxs)("main",{children:[Object(f.jsxs)("div",{id:"mySidenav",className:"sidenav p-3",children:[Object(f.jsx)(c.Icon,{onClick:function(){return document.getElementById("mySidenav").style.width="0",void(document.getElementById("mySidenav").style.left="-25px")},size:30,icon:v.ic_keyboard_arrow_left,className:"text-white mr-1"}),Object(f.jsx)("p",{className:"text-white",children:"lorem"})]}),Object(f.jsx)("div",{className:"main",children:Object(f.jsx)("div",{className:"main1",children:Object(f.jsxs)("div",{className:"nav",children:[Object(f.jsxs)("div",{className:"nav1",children:[Object(f.jsxs)("div",{className:"brand flex items-center",children:[Object(f.jsx)(c.Icon,{onClick:function(){return document.getElementById("mySidenav").style.width="100%",void(document.getElementById("mySidenav").style.left="0")},size:26,icon:x.ic_notes,className:"header_icon mr-1"}),Object(f.jsx)(i.b,{to:"/",className:"flex items-center text-lg font-bold",children:Object(f.jsx)("img",{src:l.a,className:"logo_img"})})]}),Object(f.jsxs)("div",{className:"link_more",children:[null===y||void 0===y?void 0:y.map((function(e){var t;return Object(f.jsxs)("li",{className:"nav_dropdown",children:[Object(f.jsx)("p",{onClick:function(){O.push("/arenda/".concat(e.id))},children:e.name},e.id),Object(f.jsx)("div",{className:"dropdown_content border-t",children:Object(f.jsxs)("div",{className:"header_text p-8",children:[Object(f.jsx)("div",{className:"category_grid",children:null===(t=e.main_types)||void 0===t?void 0:t.map((function(t){var n;return Object(f.jsxs)("div",{className:"cate_box",children:[Object(f.jsx)("span",{className:"font-medium text-xl mb-2",children:t.name},t.id),null===t||void 0===t||null===(n=t.sub_types)||void 0===n?void 0:n.slice(0,7).map((function(t){return Object(f.jsx)(i.b,{onClick:function(){O.push("/products/".concat(e.id,"/").concat(t.id))},className:"hover:text-blue-600 mb-3 text-base",children:t.name},t.id)}))]})}))}),Object(f.jsxs)("div",{className:"flex text-sm mt-6",children:[Object(f.jsx)("p",{className:"mr-4 hover:text-blue-600",children:b.a[n].geo}),Object(f.jsx)("p",{className:"text-gray-500 hover:text-blue-600",children:b.a[n].MapSearching})]})]})})]})})),Object(f.jsxs)("li",{className:"nav_dropdown",children:[Object(f.jsx)(i.b,{to:"/kommercheskaya",children:Object(f.jsx)("p",{children:b.a[n].commerce})}),Object(f.jsx)("div",{className:"dropdown_content border-t",children:Object(f.jsxs)("div",{className:"header_text p-8",children:[Object(f.jsx)("div",{className:"category_grid",children:null===y||void 0===y?void 0:y.map((function(e){var t;return Object(f.jsxs)("div",{className:"cate_box",children:[Object(f.jsx)("span",{className:"font-medium text-xl mb-2",children:e.name},e.id),null===(t=e.main_types)||void 0===t?void 0:t.map((function(e){var t;return null===(t=e.sub_types)||void 0===t?void 0:t.slice(0,4).map((function(e){return Object(f.jsx)(i.b,{onClick:function(){O.push("/products/3/".concat(e.id))},className:"hover:text-blue-600 mb-3 text-base",children:e.name},e.id)}))}))]})}))}),Object(f.jsxs)("div",{className:"flex text-sm mt-6",children:[Object(f.jsx)("p",{className:"mr-4 hover:text-blue-600",children:b.a[n].geo}),Object(f.jsx)("p",{className:"text-gray-500 hover:text-blue-600",children:b.a[n].MapSearching})]})]})})]})]})]}),Object(f.jsxs)("div",{className:"nav2",children:[Object(f.jsx)(i.b,{to:"/wishlist",children:Object(f.jsx)(c.Icon,{size:17,icon:s.heartO,className:"text-gray-700 mr-6 font-bold cursor-pointer"})}),Object(f.jsx)(i.b,{to:"/create_notice",className:"btn1 font-medium text-sm",children:b.a[n].fff}),(null===_||void 0===_?void 0:_.id)?Object(f.jsxs)(i.b,{to:"/profile",className:"btn2 font-medium text-sm flex items-center",children:[Object(f.jsx)(c.Icon,{size:20,icon:u.ic_person,className:"text-blue-600 mr-2"}),null===_||void 0===_?void 0:_.full_name]}):Object(f.jsx)(i.b,{to:"/auth/login",className:"btn2 font-medium text-sm",children:b.a[n].login}),Object(f.jsxs)("select",{className:"langReact1 lang ml-4 text-blue-600 font-medium py-1 pl-2 rounded-md text-xs bg-blue-100",name:"lang",value:n,onChange:function(e){return p({type:e.target.value})},children:[Object(f.jsx)("option",{className:"langReact",children:n}),Object(f.jsx)("option",{children:"Ru"}),Object(f.jsx)("option",{children:"Tk"})]})]}),Object(f.jsx)(i.b,{to:"/wishlist",className:"header_icon",children:Object(f.jsx)(c.Icon,{size:19,icon:s.heartO,className:"text-gray-700 font-bold cursor-pointer"})})]})})}),Object(f.jsx)("hr",{})]})}},116:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ic_notes=void 0;t.ic_notes={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0V0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z"},children:[]}]}},117:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ic_keyboard_arrow_left=void 0;t.ic_keyboard_arrow_left={viewBox:"0 0 24 24",children:[{name:"path",attribs:{d:"M0 0h24v24H0V0z",fill:"none"},children:[]},{name:"path",attribs:{d:"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"},children:[]}]}},99:function(e,t,n){"use strict";t.a={ru:{login:"\u0412\u043e\u0439\u0442\u0438",fff:"+ \u0420\u0430\u0437\u043c\u0435\u0441\u0442\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435",commerce:"\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f",geo:"\u0410\u0448\u0433\u0430\u0431\u0430\u0442",MapSearching:"\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u043a\u0430\u0440\u0442\u0435",fo1:"\u041b\u0438\u0434\u0435\u0440 \u043e\u043d\u043b\u0430\u0439\u043d-\u043e\u0431\u044a\u0432\u043b\u0435\u043d\u0438\u0439 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0430*",fo2:"\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 GAMYSH:",fo3:"Gamysh.com \u2014 \u0434\u043e\u0441\u0442\u043e\u0432\u0435\u0440\u043d\u0430\u044f \u0431\u0430\u0437\u0430 \u0434\u0430\u043d\u043d\u044b\u0445 \u043e \u043f\u0440\u043e\u0434\u0430\u0436\u0435 \u0438 \u0430\u0440\u0435\u043d\u0434\u0435 \u0436\u0438\u043b\u043e\u0439, \u0437\u0430\u0433\u043e\u0440\u043e\u0434\u043d\u043e\u0439 \u0438 \u043a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u043e\u0439 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",fo4:"\xa9 2021 GAMYSH.\u0413\u0420\u0423\u041f\u041f",fo5:"\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f \u0441\u0430\u0439\u0442\u0430",hom1:"\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u0416\u041a",hom2:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom3:"\u043e\u0442 8 900 000 \u20bd",hom4:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom5:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom6:"\u043e\u0442 8 900 000 \u20bd",hom7:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom8:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom9:"\u043e\u0442 8 900 000 \u20bd",hom10:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom11:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom12:"\u043e\u0442 8 900 000 \u20bd",hom13:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom14:"\u041f\u043e\u043b\u0435\u0437\u043d\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0438",hom15:"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f",hom16:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430:",not1:"\u041d\u043e\u0432\u043e\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435",not2:"\u041e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435 \u0431\u0443\u0434\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e",not3:"\u043d\u0430",not4:" \u0438 \u0432 \u043d\u0430\u0448\u0438\u0445 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0445",not5:"\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u0445",not6:"\u0422\u0438\u043f \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f",not7:"\u0422\u0438\u043f \u0441\u0434\u0435\u043b\u043a\u0438",not8:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430",not9:"\u0410\u0440\u0435\u043d\u0434\u0430",not10:"\u0422\u0438\u043f \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",not11:"\u0416\u0438\u043b\u0430\u044f",not12:"\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f",not13:"\u041e\u0431\u044a\u0435\u043a\u0442",not14:"\u041e\u0431 \u043e\u0431\u044a\u0435\u043a\u0442\u0435",not15:"\u0426\u0435\u043d\u0430",not16:"\u0432 \u043c\u0435\u0441\u044f\u0446",not17:"\u041e\u0431\u0449\u0430\u044f \u043f\u043b\u043e\u0449\u0430\u0434\u044c",not18:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435_tm",not19:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435_ru",not20:"\u0424\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438",not21:"\u041d\u0435 \u0434\u043e,\u043f\u0443\u0441\u043a\u0430\u044e\u0442\u0441\u044f \u043a \u0440\u0430\u0437\u043c\u0435\u0449\u0435\u043d\u0438\u044e \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u0441 \u0432\u043e\u0434\u044f\u043d\u044b\u043c\u0438 \u0437\u043d\u0430\u043a\u0430\u043c\u0438, \u0447\u0443\u0436\u0438\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432 \u0438 \u0440\u0435\u043a\u043b\u0430\u043c\u043d\u044b\u0435 \u0431\u0430\u043d\u043d\u0435\u0440\u044b. JPG, PNG \u0438\u043b\u0438 SVG. \u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0437\u043c\u0435\u0440 \u0444\u0430\u0439\u043b\u0430 1 \u043c\u0431",not22:"\u0410\u0434\u0440\u0435\u0441",not23:"+ Add \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435"},tk:{login:"Girmek",fff:"Bildiri\u015f go\u015fmak",commerce:"T\xe4jir\xe7ilik",geo:"Ashgabat",MapSearching:"\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u043a\u0430\u0440\u0442\u0435",fo1:"T\xfcrkmenistany\u0148 online-mahabatlary\u0148",fo2:"GAMYSH mobil programmasy",fo3:"Gamysh.com - bu \xfda\u015fa\xfdy\u015f, \u015f\xe4herda\u015fy  we s\xf6wda eml\xe4gini satmak baradaky maglumatlar bazasy",fo4:"\xa9 2021 GAMYSH.TOPAR",fo5:"sa\xfdty\u0148 mobil g\xf6rn\xfc\u015fi",hom1:"Maslahat berilyan \xfda\u015fa\xfdy\u015f ja\xfd toplumy",hom2:"\xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb \xfdjt",hom3:" 8 900 000 \u20bd-dan",hom4:"Seliger",hom5:"\xddJT \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom6:"8 900 000 \u20bd-dan",hom7:"Seliger",hom8:"\xddJT \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom9:"8 900 000 \u20bd-dan",hom10:"Seliger",hom11:"\xddJT \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom12:"8 900 000 \u20bd-dan",hom13:"Seliger",hom14:"Pe\xfddaly salgylanmalar",hom15:"Pe\xfddaly bildiri\u015fler",hom16:"Satuw",not1:"T\xe4ze bildiri\u015f",not2:"Bildiri\u015f el\xfdeter bolar",not3:"",not4:"we bizi\u0148 mobil",not5:"programmamyzda",not6:"Bildiri\u015fi\u0148 g\xf6rn\xfc\u015fi",not7:"\u015fertnamany\u0148 g\xf6rn\xfc\u015fi",not8:"Satuw",not9:"K\xe4rende",not10:"Eml\xe4gi\u0148 g\xf6rn\xfc\u015fi",not11:"\xdda\u015fa\xfdy\u015f",not12:"kommersi\xfda",not13:"\u041eb\xfdekt",not14:"ob\xfdekt barada",not15:"Bahasy",not16:"a\xfdyna",not17:"umumy me\xfddan",not18:"d\xfc\u015f\xfcndiri\u015fi_tm",not19:"d\xfc\u015f\xfcndiri\u015f_ru",not20:"suratlar",not21:" JPG, PNG \u0438\u043b\u0438 SVG suratlar go\xfdlup bilner. Mahabat bannerly, suraty\u0148 \xfd\xfcz\xfcne s\xf6zler go\xfdulmadyk bolmaly.",not22:"salgy",not23:"bildiri\u015f go\u015f"}}}}]);
//# sourceMappingURL=7.76b23006.chunk.js.map