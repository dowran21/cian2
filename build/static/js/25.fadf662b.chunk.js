(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[25],{107:function(e,a,t){"use strict";a.a=t.p+"static/media/logo_gray.fef991ff.png"},110:function(e,a,t){"use strict";t.p},111:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.smallDown=void 0;a.smallDown={viewBox:"0 0 20 20",children:[{name:"path",attribs:{d:"M13.418,7.859c0.271-0.268,0.709-0.268,0.978,0c0.27,0.268,0.272,0.701,0,0.969l-3.908,3.83\r\n\tc-0.27,0.268-0.707,0.268-0.979,0l-3.908-3.83c-0.27-0.267-0.27-0.701,0-0.969c0.271-0.268,0.709-0.268,0.978,0L10,11L13.418,7.859z\r\n\t"}}]}},113:function(e,a,t){"use strict";t.p},114:function(e,a,t){"use strict";t.p},115:function(e,a,t){"use strict";t.p},356:function(e,a,t){"use strict";t.r(a);var c=t(18),i=t(0),n=t(5),l=(t(110),t(113),t(114),t(115),t(107),t(100),t(111),t(23)),o=t(49),s=t(99),r=t(98),m=t(34),d=t(1),b=Object(i.lazy)((function(){return t.e(4).then(t.bind(null,118))})),j=Object(i.lazy)((function(){return t.e(6).then(t.bind(null,178))})),u=Object(i.lazy)((function(){return t.e(2).then(t.bind(null,123))}));a.default=function(){var e,a,t,O,h,g,y,p,f,x=Object(i.useContext)(m.a),v=x.lang,_=(x.dispatchLang,Object(l.b)()),k=Object(n.f)(),w=Object(l.c)(s.a),z=Object(i.useState)(),N=Object(c.a)(z,2),S=N[0],M=N[1],T=Object(l.c)(s.d),G=Object(i.useState)(),E=Object(c.a)(G,2),H=E[0],A=E[1],B=Object(i.useState)(1),C=Object(c.a)(B,2),P=C[0],J=C[1];return f="ru"==v?"ru":"tm",Object(i.useEffect)((function(){console.log(P),_(Object(o.a)({url:"".concat(f,"/all-real-estates?page=0&limit=16&main_type_id=").concat(P,"&user_id=").concat((null===T||void 0===T?void 0:T.id)?null===T||void 0===T?void 0:T.id:""),token:"",action:function(e){e.success?A(e.data.rows[0].real_estates_all):console.log("error_data ",e)}}))}),[P,f]),Object(i.useEffect)((function(){_(Object(o.a)({url:"".concat(f,"/commerce-filter"),token:"",action:function(e){e.success?(console.log("commerce ",e),M(e.data.rows)):console.log("error_data ",e)}}))}),[f]),Object(d.jsxs)("main",{children:[Object(d.jsx)(b,{}),Object(d.jsx)(j,{}),Object(d.jsx)("div",{className:"main py-8 bg-gray-100",children:Object(d.jsxs)("div",{className:"main1",children:[Object(d.jsx)("h1",{className:"text-xl sm:text-3xl font-medium mb-4",children:r.a[v].good_url}),Object(d.jsxs)("div",{className:"flex flex-col md:flex-row sm:justify-between",children:[Object(d.jsx)("div",{className:"categories",children:(null===S||void 0===S?void 0:S.length)>0?null===(e=S[0])||void 0===e||null===(a=e.estates)||void 0===a?void 0:a.slice(0,8).map((function(e){return Object(d.jsx)("div",{className:"cate_box1 cursor-pointer mb-4 sm:mb-0",style:{backgroundImage:"url(https://gamysh.com/".concat(e.destination?"".concat(e.destination):"uploads/images/hotel.jpg",")")},children:Object(d.jsxs)("div",{className:"box_text1 p-6",children:[Object(d.jsx)("p",{className:"text-2xl text-white font-medium cursor-pointer",children:null===e||void 0===e?void 0:e.name}),Object(d.jsxs)("div",{className:"flex mt-6",children:[Object(d.jsx)("div",{onClick:function(){var a;k.push("/products/".concat(null===(a=S[0])||void 0===a?void 0:a.category_id,"/").concat(null===e||void 0===e?void 0:e.type_id))},className:"cursor-pointer flex flex-col",children:Object(d.jsx)("span",{className:"text-sm text-white hover:border-b",children:"\u0410\u0440\u0435\u043d\u0434\u0430"})}),Object(d.jsx)("div",{onClick:function(){var a;k.push("/products/".concat(null===(a=S[0])||void 0===a?void 0:a.category_id,"/").concat(null===e||void 0===e?void 0:e.type_id))},className:"cursor-pointer flex flex-col ml-14",children:Object(d.jsx)("span",{className:"text-sm text-white hover:border-b",children:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430"})})]})]})})})):null}),Object(d.jsxs)("div",{className:"sub_category",children:[(null===S||void 0===S?void 0:S.length)>0?Object(d.jsxs)("div",{className:"w-full flex flex-col",children:[Object(d.jsx)("p",{className:"flex items-center font-medium pt-3 text-lg",children:"\u041f\u0440\u043e\u0434\u0430\u0435\u0442\u0441\u044f"}),null===(t=S[0])||void 0===t||null===(O=t.estates)||void 0===O?void 0:O.slice(0,8).map((function(e){return Object(d.jsxs)("div",{onClick:function(){var a;k.push("/products/".concat(null===(a=S[0])||void 0===a?void 0:a.category_id,"/").concat(null===e||void 0===e?void 0:e.type_id))},className:"cursor-pointer",children:[Object(d.jsx)("span",{className:"text-sm text-blue-600",children:null===e||void 0===e?void 0:e.name}),Object(d.jsx)("span",{className:"text-xs text-gray-500 ml-3",children:null===e||void 0===e?void 0:e.count})]})}))]}):null,(null===S||void 0===S?void 0:S.length)>0?Object(d.jsxs)("div",{className:"w-full flex flex-col pt-3",children:[Object(d.jsx)("p",{className:"flex items-center font-medium text-lg",children:"\u0421\u0434\u0430\u0435\u0442\u0441\u044f \u0432 \u0430\u0440\u0435\u043d\u0434\u0443"}),null===(h=S[1])||void 0===h||null===(g=h.estates)||void 0===g?void 0:g.slice(0,8).map((function(e){return Object(d.jsxs)("div",{onClick:function(){var a;k.push("/products/".concat(null===(a=S[1])||void 0===a?void 0:a.category_id,"/").concat(null===e||void 0===e?void 0:e.type_id))},className:"cursor-pointer",children:[Object(d.jsx)("span",{className:"text-sm text-blue-600",children:null===e||void 0===e?void 0:e.name}),Object(d.jsx)("span",{className:"text-xs text-gray-500 ml-3",children:null===e||void 0===e?void 0:e.count})]})}))]}):null]})]})]})}),Object(d.jsx)("div",{className:"main py-8 bg-gray-100",children:Object(d.jsxs)("div",{className:"main1",children:[Object(d.jsx)("h1",{className:"text-xl sm:text-3xl font-medium mb-4",children:r.a[v].hom15}),Object(d.jsxs)("div",{className:"flex items-center mb-5",children:[Object(d.jsx)("p",{className:"text-lg sm:text-xl font-medium mr-4",children:r.a[v].hom16}),null===(y=w[0])||void 0===y||null===(p=y.main_types)||void 0===p?void 0:p.map((function(e){return P==e.id?Object(d.jsx)("p",{className:"text-lg mr-4 cursor-pointer border-b-4 border-blue-600",onClick:function(){J(e.id)},children:null===e||void 0===e?void 0:e.name},e.id):Object(d.jsx)("p",{className:"text-lg mr-4 cursor-pointer",onClick:function(){J(e.id)},children:null===e||void 0===e?void 0:e.name},e.id)}))]}),Object(d.jsx)("div",{className:"cards",children:null===H||void 0===H?void 0:H.map((function(e){var a;return Object(d.jsxs)("div",{onClick:function(){return k.push("/single/".concat(null===e||void 0===e?void 0:e.id))},className:"card_box cursor-pointer relative ".concat(1===(null===e||void 0===e?void 0:e.vip_type_id)?"bg-yellow-100":"bg-white"),children:[1===(null===e||void 0===e?void 0:e.vip_type_id)?Object(d.jsx)("div",{className:"absolute top-1 left-2",children:Object(d.jsx)("img",{src:"https://gamysh.com/uploads/images/vip.png",className:"w-10"})}):null,null===e.images?Object(d.jsx)("div",{className:"card_img flex justify-center items-center bg-gray-200",children:Object(d.jsx)("img",{src:"https://gamysh.com/uploads/images/logo_gray.png",className:"img1"})}):Object(d.jsx)("img",{className:"card_img",src:"https://gamysh.com/".concat(null===(a=e.images[0])||void 0===a?void 0:a.destination,"-large.webp")}),Object(d.jsxs)("p",{className:"font-medium pl-2 pt-2 text-lg",children:[null===e||void 0===e?void 0:e.price," ",Object(d.jsx)("span",{className:"text-sm",children:"TMT"})]}),Object(d.jsx)("p",{className:"pl-2",children:null===e||void 0===e?void 0:e.real_estate_name}),Object(d.jsx)("p",{className:"mb-4 pb-2 pl-2 sm:mb-2",children:e.location})]},e.id)}))})]})}),Object(d.jsx)(u,{})]})}},98:function(e,a,t){"use strict";var c,i,n=t(22);a.a={ru:(c={login:"\u0412\u043e\u0439\u0442\u0438",fff:"+ \u0420\u0430\u0437\u043c\u0435\u0441\u0442\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435",commerce:"\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f",geo:"\u0410\u0448\u0433\u0430\u0431\u0430\u0442",MapSearching:"\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u043a\u0430\u0440\u0442\u0435",fo1:"\u041b\u0438\u0434\u0435\u0440 \u043e\u043d\u043b\u0430\u0439\u043d-\u043e\u0431\u044a\u0432\u043b\u0435\u043d\u0438\u0439 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435*",fo2:"\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 GAMY\u015e:",fo3:"gamysh.com \u2014 \u0434\u043e\u0441\u0442\u043e\u0432\u0435\u0440\u043d\u0430\u044f \u0431\u0430\u0437\u0430 \u0434\u0430\u043d\u043d\u044b\u0445 \u043e \u043f\u0440\u043e\u0434\u0430\u0436\u0435 \u0438 \u0430\u0440\u0435\u043d\u0434\u0435 \u0436\u0438\u043b\u043e\u0439 \u0438 \u043a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u043e\u0439 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",fo4:"\xa9 2021 GAMYSH.\u0413\u0420\u0423\u041f\u041f",wihslist:"\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435",count_est:"\u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0439",fo5:"\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f \u0441\u0430\u0439\u0442\u0430",fff4:"\u0420\u0430\u0437\u043c\u0435\u0441\u0442\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435",hom1:"\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u0416\u041a",hom2:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom3:"\u043e\u0442 8 900 000 \u20bd",hom4:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom5:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom6:"\u043e\u0442 8 900 000 \u20bd",hom7:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom8:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom9:"\u043e\u0442 8 900 000 \u20bd",hom10:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom11:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom12:"\u043e\u0442 8 900 000 \u20bd",hom13:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom14:"\u041f\u043e\u043b\u0435\u0437\u043d\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0438",hom15:"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f",hom16:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430:",search1:"\u043b\u0443\u0447\u0448\u0438\u0435 \u0434\u043e\u043c\u0430 \u0438\u0449\u0438 \u043d\u0430 gamysh",search2:"\u0422\u0438\u043f \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",search3:"\u041f\u043b\u043e\u0449\u0430\u0434\u044c",search4:"\u0426\u0435\u043d\u0430",search5:"\u0413\u043e\u0440\u043e\u0434, \u0432\u0435\u043b\u0430\u044f\u0442",search6:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043d\u0430 \u043a\u0430\u0440\u0442\u0435",search7:"\u041f\u043e\u0438\u0441\u043a",search8:"\u0421\u0434\u0430\u0435\u0442\u0441\u044f \u0432 \u0430\u0440\u0435\u043d\u0434\u0443",search9:"\u041f\u0440\u043e\u0434\u0430\u0435\u0442\u0441\u044f",search10:"\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f",sell:"\u041f\u0440\u043e\u0434\u0430\u0435\u0442\u0441\u044f",rent:"\u0421\u0434\u0430\u0435\u0442\u0441\u044f \u0432 \u0430\u0440\u0435\u043d\u0434\u0443",good_url:"\u041f\u043e\u043b\u0435\u0437\u043d\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0438",log_out:"\u0412\u044b\u0439\u0442\u0438",waiting:"\u0412 \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u0438",accepted:"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u043d\u044b\u0439",rejected:"\u041e\u0442\u043a\u0430\u0437\u0430\u043d\u043e",profil:"\u041f\u0440\u043e\u0444\u0438\u043b\u044c",estates:"\u041c\u043e\u0438 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",name:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c",email:"\u041f\u043e\u0447\u0442\u0430",phone:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d",full_name:"\u0418\u043c\u044f",more_filter:"\u0415\u0449\u0451 \u0444\u0438\u043b\u044c\u0442\u0440\u044b",owner_type:"\u041e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f \u043e\u0442",room:"\u043a\u043e\u043c\u043d\u0430\u0442\u043d\u0430\u044f",type:"\u041d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u044c",category:"\u0421\u0434\u0435\u043b\u043a\u0430",price:"\u0426\u0435\u043da",dan:"\u043e\u0442",cenli:"\u0434\u043e",area:"\u041f\u043b\u043e\u0449\u0430\u0434\u044c",location:"\u0420\u0435\u0433\u0438\u043e\u043d",find:"\u041d\u0430\u0439\u0442\u0438",show:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043e\u0431\u044a\u0435\u043a\u0442\u044b",finded:"\u041d\u0430\u0439\u0434\u0435\u043d\u043e \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0439",buy_flat:"\u041a\u0443\u043f\u0438\u0442\u044c \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0443",rent_flat:"\u0421\u043d\u044f\u0442\u044c \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0443",text:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430/\u0410\u0440\u0435\u043d\u0434\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435",no_emlak:"\u041d\u0435\u0442 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",no_emlak1:"\u041d\u0435\u0442 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",change:"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043f\u0430\u0440\u043e\u043b\u044c",rent_message:"\u0410\u0440\u0435\u043d\u0434\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435",sell_message:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435",map1:"\u041d\u0430 \u043a\u0430\u0440\u0442\u0435",advice:"\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c \u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c",delete:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u0441\u0435",wished:"\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0435",wished_count:"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0445",wish_no:"\u043d\u0435\u0442 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0445",password:"\u041f\u0430\u0440\u043e\u043b\u044c",dont_have:"\u041d\u0435\u0442 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430? \u0417\u0430\u0440\u0435\u0433\u0435\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044c!"},Object(n.a)(c,"rent","\u0410\u0440\u0435\u043d\u0434\u0430"),Object(n.a)(c,"sell","\u041f\u0440\u043e\u0434\u0430\u0436\u0430"),Object(n.a)(c,"\u0441ommerce","\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f"),Object(n.a)(c,"forgot","\u0417\u0430\u0431\u044b\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c"),Object(n.a)(c,"send","\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"),Object(n.a)(c,"welcome","\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c!"),Object(n.a)(c,"regist","\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"),Object(n.a)(c,"owner","\u0421\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a"),Object(n.a)(c,"rieltor","\u0420\u0438\u0435\u043b\u0442\u043e\u0440"),Object(n.a)(c,"already_have","\u0423\u0436\u0435 \u0435\u0441\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442?"),Object(n.a)(c,"VerifyCode","\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u043a\u043e\u0434\u0430"),Object(n.a)(c,"not1","\u041d\u043e\u0432\u043e\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435"),Object(n.a)(c,"not2","\u041e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435 \u0431\u0443\u0434\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e"),Object(n.a)(c,"not3","\u043d\u0430"),Object(n.a)(c,"not4"," \u0438 \u0432 \u043d\u0430\u0448\u0438\u0445 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0445"),Object(n.a)(c,"not5","\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u0445"),Object(n.a)(c,"not6","\u0422\u0438\u043f \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f"),Object(n.a)(c,"not7","\u0422\u0438\u043f \u0441\u0434\u0435\u043b\u043a\u0438"),Object(n.a)(c,"not8","\u041f\u0440\u043e\u0434\u0430\u0436\u0430"),Object(n.a)(c,"not9","\u0410\u0440\u0435\u043d\u0434\u0430"),Object(n.a)(c,"not10","\u0422\u0438\u043f \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438"),Object(n.a)(c,"not11","\u0416\u0438\u043b\u0430\u044f"),Object(n.a)(c,"not12","\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f"),Object(n.a)(c,"not13","\u041e\u0431\u044a\u0435\u043a\u0442"),Object(n.a)(c,"not14","\u041e\u0431 \u043e\u0431\u044a\u0435\u043a\u0442\u0435"),Object(n.a)(c,"not15","\u0426\u0435\u043d\u0430"),Object(n.a)(c,"not16","TMT"),Object(n.a)(c,"not17","\u041e\u0431\u0449\u0430\u044f \u043f\u043b\u043e\u0449\u0430\u0434\u044c"),Object(n.a)(c,"not18","\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043d\u0430 \u0442\u0443\u0440\u043a\u043c\u0435\u043d\u0441\u043a\u043e\u043c"),Object(n.a)(c,"not19","\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043d\u0430 \u0440\u0443\u0441\u0441\u043a\u043e\u043c"),Object(n.a)(c,"not30","\u0420\u0430\u0439\u043e\u043d"),Object(n.a)(c,"not20","\u0424\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438"),Object(n.a)(c,"not21","\u041d\u0435 \u0434\u043e\u043f\u0443\u0441\u043a\u0430\u044e\u0442\u0441\u044f \u043a \u0440\u0430\u0437\u043c\u0435\u0449\u0435\u043d\u0438\u044e \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u0441 \u0432\u043e\u0434\u044f\u043d\u044b\u043c\u0438 \u0437\u043d\u0430\u043a\u0430\u043c\u0438, \u0447\u0443\u0436\u0438\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432 \u0438 \u0440\u0435\u043a\u043b\u0430\u043c\u043d\u044b\u0435 \u0431\u0430\u043d\u043d\u0435\u0440\u044b. JPG, PNG \u0438\u043b\u0438 SVG. \u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0437\u043c\u0435\u0440 \u0444\u0430\u0439\u043b\u0430 3 \u043c\u0431"),Object(n.a)(c,"not22","\u0420\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u043d\u0430 \u043a\u0430\u0440\u0442\u0435"),Object(n.a)(c,"not23","\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435"),Object(n.a)(c,"add_wishlist","\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435"),Object(n.a)(c,"add_errors","\u041d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043e\u043e\u0435!"),Object(n.a)(c,"update","\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u043e"),Object(n.a)(c,"errors","\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c!"),Object(n.a)(c,"notice_success","\u0412\u044b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0434\u043e\u0431\u0430\u0432\u0438\u043b\u0438!"),Object(n.a)(c,"notice_choose","\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u043f\u043e\u043b\u044f!"),Object(n.a)(c,"notice_enough","\u0412\u044b \u043d\u0435 \u043c\u043e\u0436\u0435\u0442\u0435 \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438!"),Object(n.a)(c,"phone_min","\u041c\u0438\u043d\u0438\u043c\u0443\u043c 8 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(n.a)(c,"phone_max","\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 8 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(n.a)(c,"required","\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u043b\u0435"),Object(n.a)(c,"only_number","\u0422\u043e\u043b\u044c\u043a\u043e \u0446\u0438\u0444\u0440\u044b"),Object(n.a)(c,"password_regex","\u041f\u0430\u0440\u043e\u043b\u044c \u0434\u043e\u043b\u0436\u0435\u043d \u0432\u043a\u043b\u044e\u0447\u0430\u0442\u044c \u0432 \u0441\u0435\u0431\u044f \u043e\u0434\u043d\u0443 \u0446\u0438\u0444\u0440\u0443 \u0438 \u043e\u0434\u043d\u0443 \u0431\u0443\u043a\u0432\u0443"),Object(n.a)(c,"password_min","\u041c\u0438\u043d\u0438\u043c\u0443\u043c 8 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(n.a)(c,"password_max","\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 50 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(n.a)(c,"name_min","\u041c\u0438\u043d\u0438\u043c\u0443\u043c 3 \u0441\u0438\u043c\u0432\u043e\u043b\u0430"),Object(n.a)(c,"name_max","\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 50 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(n.a)(c,"new_password","\u041d\u043e\u0432\u044b\u0439 \u043f\u0430\u0440\u043e\u043b\u044c"),Object(n.a)(c,"price_min","\u041c\u0430\u043a\u0441\u0438\u0441\u043c\u0443\u043c 10 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0439"),Object(n.a)(c,"area_min","\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 5 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0439"),Object(n.a)(c,"description_min","\u041c\u0438\u043d\u0438\u043c\u0443 10 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(n.a)(c,"description_max1","\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 150 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0439"),Object(n.a)(c,"title_arz","\u0416\u0430\u043b\u043e\u0432\u0430\u0442\u044c\u0441\u044f"),Object(n.a)(c,"des_send","\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"),Object(n.a)(c,"error_description","\u0432\u044b \u043d\u0435 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u043e\u0432\u0430\u043d\u044b!"),Object(n.a)(c,"success_description","\u0412\u0430\u0448\u0430 \u0436\u0430\u043b\u043e\u0431\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430!"),Object(n.a)(c,"imgSize","P\u0430\u0437\u043c\u0435\u0440 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0439 \u043d\u0435 \u0434\u043e\u043b\u0436\u0435\u043d \u043f\u0440\u0435\u0432\u044b\u0448\u0430\u0442\u044c 3 \u043c\u0431!"),Object(n.a)(c,"imgQty","\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0439 \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435 3 \u0438 \u043c\u0435\u043d\u044c\u0448\u0435 16!"),c),tk:(i={login:"Girmek",fff:"Bildiri\u015f go\u015fmak",commerce:"T\xe4jir\xe7ilik",fff4:"Bildiri\u015f go\u015fmak",wihslist:"Halanlarym",geo:"Ashgabat",MapSearching:"\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u043a\u0430\u0440\u0442\u0435",fo1:"T\xfcrkmenistany\u0148 online-mahabatlary\u0148",fo2:"GAMY\u015e mobil programmasy",fo3:"gamysh.com - bu \xfda\u015fa\xfdy\u015f, \u015f\xe4herda\u015fy  we s\xf6wda eml\xe4gini satmak baradaky maglumatlar bazasy",fo4:"\xa9 2021 GAMYSH.TOPAR",fo5:"sa\xfdty\u0148 mobil g\xf6rn\xfc\u015fi",hom1:"Maslahat berilyan \xfda\u015fa\xfdy\u015f ja\xfd toplumy",hom2:"\xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb \xfdjt",hom3:" 8 900 000 \u20bd-dan",hom4:"Seliger",hom5:"\xddJT \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom6:"8 900 000 \u20bd-dan",hom7:"Seliger",hom8:"\xddJT \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom9:"8 900 000 \u20bd-dan",hom10:"Seliger",hom11:"\xddJT \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom12:"8 900 000 \u20bd-dan",hom13:"Seliger",hom14:"Pe\xfddaly salgylanmalar",hom15:"Pe\xfddaly bildiri\u015fler",hom16:"Satlyk",search1:"I\u0148 gowy ja\xfdlary gamysh-da g\xf6zle",search2:"Eml\xe4gi\u0148 g\xf6rn\xfc\u015fi",search3:"Me\xfddan",search4:"Bahasy",search5:"\u015e\xe4her, wela\xfdat",search6:"Kartada g\xf6rkez",search7:"G\xf6zle",search8:"K\xe4rende",search9:"Satlyk",search10:"T\xe4jir\xe7ilik",count_est:" eml\xe4k",sell:"Satlyk",rent:"K\xe4rende",good_url:"Pe\xfddaly salgylanmalar",log_out:"\xc7ykmak",waiting:"Seredil\xfd\xe4r",accepted:"Tassyklandy",rejected:"Ret edildi",profil:"\u015eahsy otag",estates:"Eml\xe4kler",name:"Ulanyjy",email:"Elektron Salgy",phone:"Telefon",regist:"T\xe4ze ulanyjy",already_have:"Akkaundy\u0148yz barmy?",VerifyCode:"Kody tassyklamak",change:"Gizlin kody \xfc\xfdtgetmek"},Object(n.a)(i,"rent","K\xe4rende"),Object(n.a)(i,"sell","Satmak"),Object(n.a)(i,"commerce","T\xe4jir\xe7ilik"),Object(n.a)(i,"more_filter","Go\u015fma\xe7a s\xfczg\xfc\xe7ler"),Object(n.a)(i,"location","\u015e\xe4her"),Object(n.a)(i,"find","G\xf6zle"),Object(n.a)(i,"dan","dan"),Object(n.a)(i,"cenli","\xe7enli"),Object(n.a)(i,"no_emlak","Eml\xe4k tapylmady"),Object(n.a)(i,"no_emlak1","Eml\xe4k \xfdok"),Object(n.a)(i,"forgot","Gizlin kody unutdym"),Object(n.a)(i,"send","Ugratmak"),Object(n.a)(i,"welcome","Ho\u015f geldi\u0148iz!"),Object(n.a)(i,"password","Gizlin kod"),Object(n.a)(i,"dont_have","Ulgamda \xfdokmy? Ulgama go\u015fuly\u0148!"),Object(n.a)(i,"full_name","Ady\u0148yz"),Object(n.a)(i,"owner","E\xfdesi"),Object(n.a)(i,"rieltor","Rieltor"),Object(n.a)(i,"owner_type","Bildiri\u015f"),Object(n.a)(i,"show","Eml\xe4kleri g\xf6rkez"),Object(n.a)(i,"type","Eml\xe4k"),Object(n.a)(i,"text","T\xfcrkmenistanda eml\xe4keri satmak we karend\xe4 almak"),Object(n.a)(i,"category","Hereket"),Object(n.a)(i,"area","Me\xfddan"),Object(n.a)(i,"price","Bahasy"),Object(n.a)(i,"finded","Tapylan eml\xe4kler "),Object(n.a)(i,"rent_message","T\xfcrkmenistanda eml\xe4kleri k\xe4rend\xe4 almak"),Object(n.a)(i,"sell_message","T\xfcrkmenistanda eml\xe4kleri satmak"),Object(n.a)(i,"map1","kartadan g\xf6rkez"),Object(n.a)(i,"advice","Maslahat beril\xfd\xe4nler"),Object(n.a)(i,"delete","Hemmesini pozmak"),Object(n.a)(i,"wished","Halanlarym"),Object(n.a)(i,"wished_count","Halanlarymy\u0148 sany"),Object(n.a)(i,"wish_no","Halanlarym \xfdok"),Object(n.a)(i,"buy_flat","Satlyk ja\xfdlar"),Object(n.a)(i,"rent_flat","Ja\xfdy k\xe4rend\xe4 almak"),Object(n.a)(i,"room","otagly"),Object(n.a)(i,"not1","T\xe4ze bildiri\u015f go\u015fmak"),Object(n.a)(i,"not2","Bildiri\u015f el\xfdeter bolar: "),Object(n.a)(i,"not3"," "),Object(n.a)(i,"not4"," we bizi\u0148 mobil"),Object(n.a)(i,"not5","programmamyzda"),Object(n.a)(i,"not6","Bildiri\u015fi\u0148 g\xf6rn\xfc\u015fi"),Object(n.a)(i,"not7","Bildir\u015fi\u0148 g\xf6rn\xfc\u015fi"),Object(n.a)(i,"not8","Satmak"),Object(n.a)(i,"not9","K\xe4rend\xe4 bermek"),Object(n.a)(i,"not10","Eml\xe4gi\u0148 g\xf6rn\xfc\u015fi"),Object(n.a)(i,"not11","\xdda\u015fa\xfdy\u015f"),Object(n.a)(i,"not12","T\xe4jir\xe7ilik"),Object(n.a)(i,"not13","Eml\xe4k"),Object(n.a)(i,"not14","Eml\xe4k barada"),Object(n.a)(i,"not15","Bahasy"),Object(n.a)(i,"not16","TMT"),Object(n.a)(i,"not17","Umumy me\xfddan"),Object(n.a)(i,"not18","D\xfc\u015f\xfcndiri\u015f (t\xfcrkmen dilinde)"),Object(n.a)(i,"not19","D\xfc\u015f\xfcndiri\u015f (rus dilinde)"),Object(n.a)(i,"not30","Etrap\xe7a"),Object(n.a)(i,"not20","Suratlar"),Object(n.a)(i,"not21"," JPG, PNG \u0438\u043b\u0438 SVG suratlar go\xfdlup bilner. Mahabat bannerly, suraty\u0148 \xfd\xfcz\xfcne s\xf6zler go\xfdulmadyk we g\xf6wr\xfcmi 3 mb az bolmaly."),Object(n.a)(i,"not22","Kartada \xfderle\u015fi\u015fi"),Object(n.a)(i,"not23","Bildiri\u015f go\u015f"),Object(n.a)(i,"add_wishlist","Halanlaryma go\u015fuldy"),Object(n.a)(i,"add_errors","Halanlaryma go\u015fulmady!"),Object(n.a)(i,"update","\xdcst\xfcnlikli \xfc\xfdtgedildi"),Object(n.a)(i,"errors","\xdcst\xfcnlikli bolmady"),Object(n.a)(i,"notice_success","Siz \xfcst\xfcnlikli go\u015fdy\u0148yz!"),Object(n.a)(i,"notice_choose","H\xf6kmany maglumatlary doldury\u0148!"),Object(n.a)(i,"notice_enough","Siz mundan artyk eml\xe4k go\u015fup bilmersi\u0148iz!"),Object(n.a)(i,"phone_min","Azyndan 8 simwol"),Object(n.a)(i,"phone_max","Maksimum 8 simwol"),Object(n.a)(i,"required","H\xf6kmany doldurylmaly"),Object(n.a)(i,"only_number","Di\u0148e san bolmaly"),Object(n.a)(i,"password_regex","H\xf6kman 1 harp we 1 san bolmaly"),Object(n.a)(i,"password_min","Azyndan 8 simwol bolmaly"),Object(n.a)(i,"password_max","Maksimum 50 simwol bolmaly"),Object(n.a)(i,"name_min","Minimum 3 simwol bolmaly"),Object(n.a)(i,"name_max","Maksimum 3 simwol bolmaly"),Object(n.a)(i,"new_password","T\xe4ze gizlin kod"),Object(n.a)(i,"price_min","Maksimum 10 belgi bolmaly"),Object(n.a)(i,"area_min","Maksimum 5 belgi bolmaly"),Object(n.a)(i,"description_min","Minimum 10 simwol bolmaly"),Object(n.a)(i,"description_max1","Maksimum 150 simwol bolmaly"),Object(n.a)(i,"title_arz","Arz etmek"),Object(n.a)(i,"des_send","Ugratmak"),Object(n.a)(i,"error_description","Siz ulgama girmedi\u0148iz!"),Object(n.a)(i,"success_description","Sizi\u0148 arz-\u015fika\xfd\xe4ty\u0148yz ugradyldy!"),Object(n.a)(i,"imgSize","Suratlary\u0148 g\xf6wr\xfcmi 3 mb az bolmaly!"),Object(n.a)(i,"imgQty","Suratlary\u0148 sany 3-den k\xf6p 16-dan az bolmaly!"),i)}},99:function(e,a,t){"use strict";t.d(a,"b",(function(){return c})),t.d(a,"c",(function(){return i})),t.d(a,"d",(function(){return n})),t.d(a,"a",(function(){return l}));var c=function(e){return e.auth.isLogged},i=function(e){return e.auth.token},n=function(e){return e.auth.user},l=function(e){return e.data.categories}}}]);
//# sourceMappingURL=25.fadf662b.chunk.js.map