(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[25],{107:function(e,t,a){"use strict";a.p},108:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.smallDown=void 0;t.smallDown={viewBox:"0 0 20 20",children:[{name:"path",attribs:{d:"M13.418,7.859c0.271-0.268,0.709-0.268,0.978,0c0.27,0.268,0.272,0.701,0,0.969l-3.908,3.83\r\n\tc-0.27,0.268-0.707,0.268-0.979,0l-3.908-3.83c-0.27-0.267-0.27-0.701,0-0.969c0.271-0.268,0.709-0.268,0.978,0L10,11L13.418,7.859z\r\n\t"}}]}},109:function(e,t,a){"use strict";a.p},110:function(e,t,a){"use strict";a.p},111:function(e,t,a){"use strict";a.p},112:function(e,t,a){"use strict";t.a=a.p+"static/media/logo_gray.fef991ff.png"},352:function(e,t,a){"use strict";a.r(t);var c=a(18),n=a(0),l=a(5),o=(a(107),a(109),a(110),a(111),a(112),a(101),a(108),a(22)),i=a(49),s=a(99),r=a(98),d=a(34),m=a(1),b=Object(n.lazy)((function(){return a.e(7).then(a.bind(null,116))})),j=Object(n.lazy)((function(){return a.e(6).then(a.bind(null,177))})),u=Object(n.lazy)((function(){return a.e(4).then(a.bind(null,127))}));t.default=function(){var e,t,a,h,O,g,f,y,p,x=Object(n.useContext)(d.a),v=x.lang,k=(x.dispatchLang,Object(o.b)()),_=Object(l.f)(),N=Object(o.c)(s.a),w=Object(n.useState)(),z=Object(c.a)(w,2),S=z[0],T=z[1],G=Object(n.useState)(),M=Object(c.a)(G,2),E=M[0],B=M[1],C=Object(n.useState)(1),H=Object(c.a)(C,2),P=H[0],A=H[1];return p="ru"==v?"ru":"tm",Object(n.useEffect)((function(){console.log(P),k(Object(i.a)({url:"".concat(p,"/all-real-estates?page=0&limit=16&main_type_id=").concat(P),token:"",action:function(e){e.success?B(e.data.rows[0].real_estates_all):console.log("error_data ",e)}}))}),[P,p]),Object(n.useEffect)((function(){k(Object(i.a)({url:"".concat(p,"/commerce-filter"),token:"",action:function(e){e.success?(console.log("commerce ",e),T(e.data.rows)):console.log("error_data ",e)}}))}),[p]),Object(m.jsxs)("main",{children:[Object(m.jsx)(b,{}),Object(m.jsx)(j,{}),Object(m.jsx)("div",{className:"main py-8 bg-gray-100",children:Object(m.jsxs)("div",{className:"main1",children:[Object(m.jsx)("h1",{className:"text-xl sm:text-3xl font-medium mb-4",children:r.a[v].good_url}),Object(m.jsxs)("div",{className:"flex flex-col md:flex-row sm:justify-between",children:[Object(m.jsx)("div",{className:"categories",children:(null===S||void 0===S?void 0:S.length)>0?null===(e=S[0])||void 0===e||null===(t=e.estates)||void 0===t?void 0:t.slice(0,8).map((function(e){return Object(m.jsx)("div",{className:"cate_box1 cursor-pointer mb-4 sm:mb-0",style:{backgroundImage:"url(https://gamysh.com/".concat(e.destination?"".concat(e.destination):"uploads/images/hotel.jpg",")")},children:Object(m.jsxs)("div",{className:"box_text1 p-6",children:[Object(m.jsx)("p",{className:"text-2xl text-white font-medium cursor-pointer",children:null===e||void 0===e?void 0:e.name}),Object(m.jsxs)("div",{className:"flex mt-6",children:[Object(m.jsx)("div",{onClick:function(){var t;_.push("/products/".concat(null===(t=S[0])||void 0===t?void 0:t.category_id,"/").concat(null===e||void 0===e?void 0:e.type_id))},className:"cursor-pointer flex flex-col",children:Object(m.jsx)("span",{className:"text-sm text-white hover:border-b",children:"\u0410\u0440\u0435\u043d\u0434\u0430"})}),Object(m.jsx)("div",{onClick:function(){var t;_.push("/products/".concat(null===(t=S[0])||void 0===t?void 0:t.category_id,"/").concat(null===e||void 0===e?void 0:e.type_id))},className:"cursor-pointer flex flex-col ml-14",children:Object(m.jsx)("span",{className:"text-sm text-white hover:border-b",children:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430"})})]})]})})})):null}),Object(m.jsxs)("div",{className:"sub_category",children:[(null===S||void 0===S?void 0:S.length)>0?Object(m.jsxs)("div",{className:"w-full flex flex-col",children:[Object(m.jsx)("p",{className:"flex items-center font-medium pt-3 text-lg",children:"\u041f\u0440\u043e\u0434\u0430\u0435\u0442\u0441\u044f"}),null===(a=S[0])||void 0===a||null===(h=a.estates)||void 0===h?void 0:h.slice(0,8).map((function(e){return Object(m.jsxs)("div",{onClick:function(){var t;_.push("/products/".concat(null===(t=S[0])||void 0===t?void 0:t.category_id,"/").concat(null===e||void 0===e?void 0:e.type_id))},className:"cursor-pointer",children:[Object(m.jsx)("span",{className:"text-sm text-blue-600",children:null===e||void 0===e?void 0:e.name}),Object(m.jsx)("span",{className:"text-xs text-gray-500 ml-3",children:null===e||void 0===e?void 0:e.count})]})}))]}):null,(null===S||void 0===S?void 0:S.length)>0?Object(m.jsxs)("div",{className:"w-full flex flex-col pt-3",children:[Object(m.jsx)("p",{className:"flex items-center font-medium text-lg",children:"\u0421\u0434\u0430\u0435\u0442\u0441\u044f \u0432 \u0430\u0440\u0435\u043d\u0434\u0443"}),null===(O=S[1])||void 0===O||null===(g=O.estates)||void 0===g?void 0:g.slice(0,8).map((function(e){return Object(m.jsxs)("div",{onClick:function(){var t;_.push("/products/".concat(null===(t=S[1])||void 0===t?void 0:t.category_id,"/").concat(null===e||void 0===e?void 0:e.type_id))},className:"cursor-pointer",children:[Object(m.jsx)("span",{className:"text-sm text-blue-600",children:null===e||void 0===e?void 0:e.name}),Object(m.jsx)("span",{className:"text-xs text-gray-500 ml-3",children:null===e||void 0===e?void 0:e.count})]})}))]}):null]})]})]})}),Object(m.jsx)("div",{className:"main py-8 bg-gray-100",children:Object(m.jsxs)("div",{className:"main1",children:[Object(m.jsx)("h1",{className:"text-xl sm:text-3xl font-medium mb-4",children:r.a[v].hom15}),Object(m.jsxs)("div",{className:"flex items-center mb-5",children:[Object(m.jsx)("p",{className:"text-lg sm:text-xl font-medium mr-4",children:r.a[v].hom16}),null===(f=N[0])||void 0===f||null===(y=f.main_types)||void 0===y?void 0:y.map((function(e){return P==e.id?Object(m.jsx)("p",{className:"text-lg mr-4 cursor-pointer border-b-4 border-blue-600",onClick:function(){A(e.id)},children:null===e||void 0===e?void 0:e.name},e.id):Object(m.jsx)("p",{className:"text-lg mr-4 cursor-pointer",onClick:function(){A(e.id)},children:null===e||void 0===e?void 0:e.name},e.id)}))]}),Object(m.jsx)("div",{className:"cards",children:null===E||void 0===E?void 0:E.map((function(e){var t;return Object(m.jsxs)("div",{onClick:function(){return _.push("/single/".concat(null===e||void 0===e?void 0:e.id))},className:"card_box cursor-pointer",children:[null===e.images?Object(m.jsx)("div",{className:"card_img flex justify-center items-center bg-gray-200",children:Object(m.jsx)("img",{src:"https://gamysh.com/uploads/images/logo_gray.png",className:"img1"})}):Object(m.jsx)("img",{className:"card_img",src:"https://gamysh.com/".concat(null===(t=e.images[0])||void 0===t?void 0:t.destination,"-large.webp")}),Object(m.jsxs)("p",{className:"font-medium pl-2 pt-2 text-lg",children:[null===e||void 0===e?void 0:e.price," ",Object(m.jsx)("span",{className:"text-sm",children:"TMT"})]}),Object(m.jsx)("p",{className:"pl-2",children:null===e||void 0===e?void 0:e.real_estate_name}),Object(m.jsx)("p",{className:"mb-4 pb-2 pl-2 sm:mb-2",children:e.location})]},e.id)}))})]})}),Object(m.jsx)(u,{})]})}},98:function(e,t,a){"use strict";var c,n,l=a(23);t.a={ru:(c={login:"\u0412\u043e\u0439\u0442\u0438",fff:"+ \u0420\u0430\u0437\u043c\u0435\u0441\u0442\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435",commerce:"\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f",geo:"\u0410\u0448\u0433\u0430\u0431\u0430\u0442",MapSearching:"\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u043a\u0430\u0440\u0442\u0435",fo1:"\u041b\u0438\u0434\u0435\u0440 \u043e\u043d\u043b\u0430\u0439\u043d-\u043e\u0431\u044a\u0432\u043b\u0435\u043d\u0438\u0439 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435*",fo2:"\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 GAMYSH:",fo3:"Gamysh.com \u2014 \u0434\u043e\u0441\u0442\u043e\u0432\u0435\u0440\u043d\u0430\u044f \u0431\u0430\u0437\u0430 \u0434\u0430\u043d\u043d\u044b\u0445 \u043e \u043f\u0440\u043e\u0434\u0430\u0436\u0435 \u0438 \u0430\u0440\u0435\u043d\u0434\u0435 \u0436\u0438\u043b\u043e\u0439 \u0438 \u043a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u043e\u0439 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",fo4:"\xa9 2021 GAMYSH.\u0413\u0420\u0423\u041f\u041f",wihslist:"\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435",count_est:"\u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0439",fo5:"\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f \u0441\u0430\u0439\u0442\u0430",fff4:"\u0420\u0430\u0437\u043c\u0435\u0441\u0442\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435",hom1:"\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u0416\u041a",hom2:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom3:"\u043e\u0442 8 900 000 \u20bd",hom4:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom5:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom6:"\u043e\u0442 8 900 000 \u20bd",hom7:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom8:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom9:"\u043e\u0442 8 900 000 \u20bd",hom10:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom11:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom12:"\u043e\u0442 8 900 000 \u20bd",hom13:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom14:"\u041f\u043e\u043b\u0435\u0437\u043d\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0438",hom15:"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f",hom16:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430:",search1:"\u043b\u0443\u0447\u0448\u0438\u0435 \u0434\u043e\u043c\u0430 \u0438\u0449\u0438 \u043d\u0430 gamysh",search2:"\u0422\u0438\u043f \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",search3:"\u041f\u043b\u043e\u0449\u0430\u0434\u044c",search4:"\u0426\u0435\u043d\u0430",search5:"\u0413\u043e\u0440\u043e\u0434, \u0432\u0435\u043b\u0430\u044f\u0442",search6:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043d\u0430 \u043a\u0430\u0440\u0442\u0435",search7:"\u041f\u043e\u0438\u0441\u043a",search8:"\u0421\u0434\u0430\u0435\u0442\u0441\u044f \u0432 \u0430\u0440\u0435\u043d\u0434\u0443",search9:"\u041f\u0440\u043e\u0434\u0430\u0435\u0442\u0441\u044f",search10:"\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f",sell:"\u041f\u0440\u043e\u0434\u0430\u0435\u0442\u0441\u044f",rent:"\u0421\u0434\u0430\u0435\u0442\u0441\u044f \u0432 \u0430\u0440\u0435\u043d\u0434\u0443",good_url:"\u041f\u043e\u043b\u0435\u0437\u043d\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0438",log_out:"\u0412\u044b\u0439\u0442\u0438",waiting:"\u0412 \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u0438",accepted:"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u043d\u044b\u0439",rejected:"\u041e\u0442\u043a\u0430\u0437\u0430\u043d\u043e",profil:"\u041f\u0440\u043e\u0444\u0438\u043b\u044c",estates:"\u041c\u043e\u0438 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",name:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c",email:"\u041f\u043e\u0447\u0442\u0430",phone:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d",full_name:"\u0418\u043c\u044f",more_filter:"\u0415\u0449\u0451 \u0444\u0438\u043b\u044c\u0442\u0440\u044b",owner_type:"\u041e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f \u043e\u0442",room:"\u043a\u043e\u043c\u043d\u0430\u0442\u043d\u0430\u044f",type:"\u041d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u044c",category:"\u0421\u0434\u0435\u043b\u043a\u0430",price:"\u0426\u0435\u043da",dan:"\u043e\u0442",cenli:"\u0434\u043e",area:"\u041f\u043b\u043e\u0449\u0430\u0434\u044c",location:"\u0420\u0435\u0433\u0438\u043e\u043d",find:"\u041d\u0430\u0439\u0442\u0438",show:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043e\u0431\u044a\u0435\u043a\u0442\u044b",finded:"\u041d\u0430\u0439\u0434\u0435\u043d\u043e \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0439",buy_flat:"\u041a\u0443\u043f\u0438\u0442\u044c \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0443",rent_flat:"\u0421\u043d\u044f\u0442\u044c \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0443",text:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430/\u0410\u0440\u0435\u043d\u0434\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435",no_emlak:"\u041d\u0435\u0442 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",no_emlak1:"\u041d\u0435\u0442 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",change:"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043f\u0430\u0440\u043e\u043b\u044c",rent_message:"\u0410\u0440\u0435\u043d\u0434\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435",sell_message:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435",map1:"\u041d\u0430 \u043a\u0430\u0440\u0442\u0435",advice:"\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c \u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c",delete:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u0441\u0435",wished:"\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0435",wished_count:"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0445",password:"\u041f\u0430\u0440\u043e\u043b\u044c",dont_have:"\u041d\u0435\u0442 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430? \u0417\u0430\u0440\u0435\u0433\u0435\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044c!"},Object(l.a)(c,"rent","\u0410\u0440\u0435\u043d\u0434\u0430"),Object(l.a)(c,"sell","\u041f\u0440\u043e\u0434\u0430\u0436\u0430"),Object(l.a)(c,"\u0441ommerce","\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f"),Object(l.a)(c,"forgot","\u0417\u0430\u0431\u044b\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c"),Object(l.a)(c,"send","\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"),Object(l.a)(c,"welcome","\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c!"),Object(l.a)(c,"regist","\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"),Object(l.a)(c,"owner","\u0421\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a"),Object(l.a)(c,"rieltor","\u0420\u0438\u0435\u043b\u0442\u043e\u0440"),Object(l.a)(c,"already_have","\u0423\u0436\u0435 \u0435\u0441\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442?"),Object(l.a)(c,"VerifyCode","\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u043a\u043e\u0434\u0430"),Object(l.a)(c,"not1","\u041d\u043e\u0432\u043e\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435"),Object(l.a)(c,"not2","\u041e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435 \u0431\u0443\u0434\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e"),Object(l.a)(c,"not3","\u043d\u0430"),Object(l.a)(c,"not4"," \u0438 \u0432 \u043d\u0430\u0448\u0438\u0445 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0445"),Object(l.a)(c,"not5","\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u0445"),Object(l.a)(c,"not6","\u0422\u0438\u043f \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f"),Object(l.a)(c,"not7","\u0422\u0438\u043f \u0441\u0434\u0435\u043b\u043a\u0438"),Object(l.a)(c,"not8","\u041f\u0440\u043e\u0434\u0430\u0436\u0430"),Object(l.a)(c,"not9","\u0410\u0440\u0435\u043d\u0434\u0430"),Object(l.a)(c,"not10","\u0422\u0438\u043f \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438"),Object(l.a)(c,"not11","\u0416\u0438\u043b\u0430\u044f"),Object(l.a)(c,"not12","\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f"),Object(l.a)(c,"not13","\u041e\u0431\u044a\u0435\u043a\u0442"),Object(l.a)(c,"not14","\u041e\u0431 \u043e\u0431\u044a\u0435\u043a\u0442\u0435"),Object(l.a)(c,"not15","\u0426\u0435\u043d\u0430"),Object(l.a)(c,"not16","TMT"),Object(l.a)(c,"not17","\u041e\u0431\u0449\u0430\u044f \u043f\u043b\u043e\u0449\u0430\u0434\u044c"),Object(l.a)(c,"not18","\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043d\u0430 \u0442\u0443\u0440\u043a\u043c\u0435\u043d\u0441\u043a\u043e\u043c"),Object(l.a)(c,"not19","\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043d\u0430 \u0440\u0443\u0441\u0441\u043a\u043e\u043c"),Object(l.a)(c,"not30","\u0420\u0430\u0439\u043e\u043d"),Object(l.a)(c,"not20","\u0424\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438"),Object(l.a)(c,"not21","\u041d\u0435 \u0434\u043e,\u043f\u0443\u0441\u043a\u0430\u044e\u0442\u0441\u044f \u043a \u0440\u0430\u0437\u043c\u0435\u0449\u0435\u043d\u0438\u044e \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u0441 \u0432\u043e\u0434\u044f\u043d\u044b\u043c\u0438 \u0437\u043d\u0430\u043a\u0430\u043c\u0438, \u0447\u0443\u0436\u0438\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432 \u0438 \u0440\u0435\u043a\u043b\u0430\u043c\u043d\u044b\u0435 \u0431\u0430\u043d\u043d\u0435\u0440\u044b. JPG, PNG \u0438\u043b\u0438 SVG. \u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0437\u043c\u0435\u0440 \u0444\u0430\u0439\u043b\u0430 1 \u043c\u0431"),Object(l.a)(c,"not22","\u0420\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u043d\u0430 \u043a\u0430\u0440\u0442\u0435"),Object(l.a)(c,"not23","\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435"),c),tk:(n={login:"Girmek",fff:"Bildiri\u015f go\u015fmak",commerce:"T\xe4jir\xe7ilik",fff4:"Bildiri\u015f go\u015fmak",wihslist:"Halanlarym",geo:"Ashgabat",MapSearching:"\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u043a\u0430\u0440\u0442\u0435",fo1:"T\xfcrkmenistany\u0148 online-mahabatlary\u0148",fo2:"GAMYSH mobil programmasy",fo3:"Gamysh.com - bu \xfda\u015fa\xfdy\u015f, \u015f\xe4herda\u015fy  we s\xf6wda eml\xe4gini satmak baradaky maglumatlar bazasy",fo4:"\xa9 2021 GAMYSH.TOPAR",fo5:"sa\xfdty\u0148 mobil g\xf6rn\xfc\u015fi",hom1:"Maslahat berilyan \xfda\u015fa\xfdy\u015f ja\xfd toplumy",hom2:"\xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb \xfdjt",hom3:" 8 900 000 \u20bd-dan",hom4:"Seliger",hom5:"\xddJT \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom6:"8 900 000 \u20bd-dan",hom7:"Seliger",hom8:"\xddJT \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom9:"8 900 000 \u20bd-dan",hom10:"Seliger",hom11:"\xddJT \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom12:"8 900 000 \u20bd-dan",hom13:"Seliger",hom14:"Pe\xfddaly salgylanmalar",hom15:"Pe\xfddaly bildiri\u015fler",hom16:"Satlyk",search1:"I\u0148 gowy ja\xfdlary gamysh-da g\xf6zle",search2:"Eml\xe4gi\u0148 g\xf6rn\xfc\u015fi",search3:"Me\xfddan",search4:"Bahasy",search5:"\u015e\xe4her, wela\xfdat",search6:"Kartada g\xf6rkez",search7:"G\xf6zle",search8:"K\xe4rende",search9:"Satlyk",search10:"T\xe4jir\xe7ilik",count_est:" eml\xe4k",sell:"Satlyk",rent:"K\xe4rende",good_url:"Pe\xfddaly salgylanmalar",log_out:"\xc7ykmak",waiting:"Seredil\xfd\xe4r",accepted:"Tassyklandy",rejected:"Ret edildi",profil:"\u015eahsy otag",estates:"Eml\xe4kler",name:"Ulanyjy",email:"Elektron Salgy",phone:"Telefon",regist:"T\xe4ze ulanyjy",already_have:"Akkaundy\u0148yz barmy?",VerifyCode:"Kody tassyklamak",change:"Gizlin kody \xfc\xfdtgetmek"},Object(l.a)(n,"rent","K\xe4rende"),Object(l.a)(n,"sell","Satmak"),Object(l.a)(n,"commerce","T\xe4jir\xe7ilik"),Object(l.a)(n,"more_filter","Go\u015fma\xe7a s\xfczg\xfc\xe7ler"),Object(l.a)(n,"location","\u015e\xe4her"),Object(l.a)(n,"find","G\xf6zle"),Object(l.a)(n,"dan","dan"),Object(l.a)(n,"cenli","\xe7enli"),Object(l.a)(n,"no_emlak","Eml\xe4k tapylmady"),Object(l.a)(n,"no_emlak1","Eml\xe4k \xfdok"),Object(l.a)(n,"forgot","Gizlin kody unutdym"),Object(l.a)(n,"send","Ugratmak"),Object(l.a)(n,"welcome","Ho\u015f geldi\u0148iz!"),Object(l.a)(n,"password","Gizlin kod"),Object(l.a)(n,"dont_have","Ulgamda \xfdokmy? Ulgama go\u015fuly\u0148!"),Object(l.a)(n,"full_name","Ady\u0148yz"),Object(l.a)(n,"owner","E\xfdesi"),Object(l.a)(n,"rieltor","Rieltor"),Object(l.a)(n,"owner_type","Bildiri\u015f"),Object(l.a)(n,"show","Eml\xe4kleri g\xf6rkez"),Object(l.a)(n,"type","Eml\xe4k"),Object(l.a)(n,"text","T\xfcrkmenistanda eml\xe4keri satmak we karend\xe4 almak"),Object(l.a)(n,"category","Hereket"),Object(l.a)(n,"area","Me\xfddan"),Object(l.a)(n,"price","Bahasy"),Object(l.a)(n,"finded","Tapylan eml\xe4kler "),Object(l.a)(n,"rent_message","T\xfcrkmenistanda eml\xe4kleri k\xe4rend\xe4 almak"),Object(l.a)(n,"sell_message","T\xfcrkmenistanda eml\xe4kleri satmak"),Object(l.a)(n,"map1","kartadan g\xf6rkez"),Object(l.a)(n,"advice","Maslahat beril\xfd\xe4nler"),Object(l.a)(n,"delete","Hemmesini pozmak"),Object(l.a)(n,"wished","Halanlarym"),Object(l.a)(n,"wished_count","Halanlarymy\u0148 sany"),Object(l.a)(n,"buy_flat","Satlyk ja\xfdlar"),Object(l.a)(n,"rent_flat","Ja\xfdy k\xe4rend\xe4 almak"),Object(l.a)(n,"room","otagly"),Object(l.a)(n,"not1","T\xe4ze bildiri\u015f go\u015fmak"),Object(l.a)(n,"not2","Bildiri\u015f el\xfdeter bolar: "),Object(l.a)(n,"not3"," "),Object(l.a)(n,"not4"," we bizi\u0148 mobil"),Object(l.a)(n,"not5","programmamyzda"),Object(l.a)(n,"not6","Bildiri\u015fi\u0148 g\xf6rn\xfc\u015fi"),Object(l.a)(n,"not7","Bildir\u015fi\u0148 g\xf6rn\xfc\u015fi"),Object(l.a)(n,"not8","Satmak"),Object(l.a)(n,"not9","K\xe4rend\xe4 bermek"),Object(l.a)(n,"not10","Eml\xe4gi\u0148 g\xf6rn\xfc\u015fi"),Object(l.a)(n,"not11","\xdda\u015fa\xfdy\u015f"),Object(l.a)(n,"not12","T\xe4jir\xe7ilik"),Object(l.a)(n,"not13","Eml\xe4k"),Object(l.a)(n,"not14","Eml\xe4k barada"),Object(l.a)(n,"not15","Bahasy"),Object(l.a)(n,"not16","TMT"),Object(l.a)(n,"not17","Umumy me\xfddan"),Object(l.a)(n,"not18","D\xfc\u015f\xfcndiri\u015f (t\xfcrkmen dilinde)"),Object(l.a)(n,"not19","D\xfc\u015f\xfcndiri\u015f     (rus dilinde)"),Object(l.a)(n,"not30","Etrap\xe7a"),Object(l.a)(n,"not20","Suratlar"),Object(l.a)(n,"not21"," JPG, PNG \u0438\u043b\u0438 SVG suratlar go\xfdlup bilner. Mahabat bannerly, suraty\u0148 \xfd\xfcz\xfcne s\xf6zler go\xfdulmadyk bolmaly."),Object(l.a)(n,"not22","Kartada \xfderle\u015fi\u015fi"),Object(l.a)(n,"not23","Bildiri\u015f go\u015f"),n)}},99:function(e,t,a){"use strict";a.d(t,"b",(function(){return c})),a.d(t,"c",(function(){return n})),a.d(t,"d",(function(){return l})),a.d(t,"a",(function(){return o}));var c=function(e){return e.auth.isLogged},n=function(e){return e.auth.token},l=function(e){return e.auth.user},o=function(e){return e.data.categories}}}]);
//# sourceMappingURL=25.0dc05ef7.chunk.js.map