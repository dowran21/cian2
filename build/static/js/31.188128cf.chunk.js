(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[31],{121:function(e,a,t){"use strict";t.p},122:function(e,a,t){"use strict";t.p},349:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t(33),l=t(5),o=t(23),i=(t(24),t(99),t(112)),c=t.n(i),s=t(103),m=t.n(s),d=(t(350),t(125)),b=t(123),j=t(116),u=t(49),O=t(7),h=(t(121),t(122),t(98)),g=t(34),y=t(1);var p=function(e){return b.a().shape({phone:b.b().min(8,h.a[e].phone_min).max(8,h.a[e].phone_max).required(h.a[e].required).matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,h.a[e].only_number),password:b.b().min(8,h.a[e].password_min).max(50,h.a[e].password_max).required(h.a[e].required).matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,h.a[e].password_regex),full_name:b.b().min(3,h.a[e].name_min).max(50,h.a[e].name_max).required(h.a[e].required)})};a.default=function(){var e=Object(r.useContext)(g.a),a=e.lang,t=(e.dispatchLang,Object(j.e)({resolver:Object(d.a)(p(a))})),i=t.control,s=t.handleSubmit,b=t.formState.errors,k=t.setError,f=Object(o.b)(),_=Object(l.f)();return Object(y.jsx)("div",{className:"flex justify-center items-center h-full w-full fon_gamysh",style:{backgroundImage:"url(https://gamysh.com/uploads/images/fon_gamysh.svg)"},children:Object(y.jsx)("div",{className:"flex max-w-sm mx-auto overflow-hidden rounded-lg shadow-xl dark:bg-gray-800 lg:w-80",children:Object(y.jsxs)("form",{onSubmit:s((function(e){e.owner_id=parseFloat(e.owner_id),f(Object(u.b)({url:"user/registration",token:"",data:e,action:function(e){var a,t,r;e.success?(console.log("gelen register",e.data),f(Object(O.l)(e.data.access_token)),_.push("/auth/verifycode")):(console.log(e),k("phone",{type:"manual",message:null===e||void 0===e||null===(a=e.message)||void 0===a||null===(t=a.data)||void 0===t||null===(r=t.error)||void 0===r?void 0:r.phone}))}}))})),className:"w-full px-6 py-4 md:px-8",children:[Object(y.jsx)(n.b,{to:"/",className:"flex justify-center w-full  items-start",children:Object(y.jsx)("img",{src:"https://gamysh.com/uploads/images/logo1.svg",className:"auth_img"})}),Object(y.jsx)("h2",{className:"text-2xl font-semibold text-center text-gray-700 dark:text-white",children:h.a[a].regist}),Object(y.jsx)("div",{className:"mt-6 w-full",children:Object(y.jsx)(j.a,{control:i,name:"full_name",render:function(e){var t,r=e.field,n=r.onChange,l=r.onBlur;r.value,r.ref;return Object(y.jsx)(c.a,{onChange:n,onBlur:l,type:"text",size:"regular",color:"blue",outline:!0,placeholder:h.a[a].full_name,error:null===(t=b.name)||void 0===t?void 0:t.message,className:"back_white"})}})}),Object(y.jsx)("div",{className:"mt-6 w-full",children:Object(y.jsx)(j.a,{control:i,name:"email",render:function(e){var t,r=e.field,n=r.onChange,l=r.onBlur;r.value,r.ref;return Object(y.jsx)(c.a,{onChange:n,onBlur:l,type:"email",size:"regular",color:"blue",outline:!0,placeholder:h.a[a].email,error:null===(t=b.email)||void 0===t?void 0:t.message})}})}),Object(y.jsx)("div",{className:"mt-6 w-full",children:Object(y.jsx)(j.a,{control:i,name:"phone",render:function(e){var t,r=e.field,n=r.onChange,l=r.onBlur;r.value,r.ref;return Object(y.jsx)(c.a,{onChange:n,onBlur:l,type:"tel",size:"regular",color:"blue",outline:!0,placeholder:h.a[a].phone,error:null===(t=b.phone)||void 0===t?void 0:t.message})}})}),Object(y.jsx)("div",{className:"mt-6 w-full",children:Object(y.jsx)(j.a,{control:i,name:"password",render:function(e){var t,r=e.field,n=r.onChange,l=r.onBlur;r.value,r.ref;return Object(y.jsx)(c.a,{onChange:n,onBlur:l,type:"password",size:"regular",color:"blue",outline:!0,placeholder:h.a[a].password,error:null===(t=b.password)||void 0===t?void 0:t.message})}})}),Object(y.jsxs)("div",{className:"mt-6 w-full flex",children:[Object(y.jsx)("div",{children:Object(y.jsx)(j.a,{control:i,name:"owner_id",render:function(e){var t=e.field,r=t.onChange,n=t.onBlur;t.value,t.ref;return Object(y.jsxs)("label",{className:"flex items-center",children:[Object(y.jsx)("input",{type:"radio",name:"owner_id",onChange:r,onBlur:n,value:1}),Object(y.jsx)("p",{className:"ml-2 text-sm",children:h.a[a].owner})]})}})}),Object(y.jsx)("div",{className:"ml-7",children:Object(y.jsx)(j.a,{control:i,name:"owner_id",render:function(e){var t=e.field,r=t.onChange,n=t.onBlur;t.value,t.ref;return Object(y.jsxs)("label",{className:"flex items-center",children:[Object(y.jsx)("input",{type:"radio",name:"owner_id",onChange:r,onBlur:n,value:2}),Object(y.jsx)("p",{className:"ml-2 text-sm",children:h.a[a].rieltor})]})}})})]}),Object(y.jsxs)("div",{className:"mt-4 w-full flex justify-between items-center",children:[Object(y.jsx)("div",{className:"flex items-center justify-between",children:Object(y.jsx)("div",{className:"text-xs w-4/6 text-gray-500 dark:text-gray-400 hover:underline text-center cursor-pointer",children:Object(y.jsx)(n.b,{to:"/auth/login",children:h.a[a].already_have})})}),Object(y.jsx)(m.a,{color:"lightBlue",buttonType:"link",size:"regular",rounded:!1,block:!1,iconOnly:!1,ripple:"dark",className:"bg-blue-200",children:h.a[a].regist})]})]})})})}},98:function(e,a,t){"use strict";var r,n,l=t(22);a.a={ru:(r={login:"\u0412\u043e\u0439\u0442\u0438",fff:"+ \u0420\u0430\u0437\u043c\u0435\u0441\u0442\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435",commerce:"\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f",geo:"\u0410\u0448\u0433\u0430\u0431\u0430\u0442",MapSearching:"\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u043a\u0430\u0440\u0442\u0435",mapfirst:"\u041f\u043e\u0438\u0441\u043a \u043d\u0430 \u043a\u0430\u0440\u0442\u0435",mapsecond:"\u0418\u0449\u0438\u0442\u0435 \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u044b \u0440\u044f\u0434\u043e\u043c \u0441 \u0440\u0430\u0431\u043e\u0442\u043e\u0439,",mapsecond1:"\u043f\u0430\u0440\u043a\u043e\u043c \u0438\u043b\u0438 \u0440\u043e\u0434\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a\u0430\u043c\u0438",mapbutton:"\u041d\u0430\u0439\u0442\u0438 \u043d\u0430 \u043a\u0430\u0440\u0442\u0435",fo1:"\u041b\u0438\u0434\u0435\u0440 \u043e\u043d\u043b\u0430\u0439\u043d-\u043e\u0431\u044a\u0432\u043b\u0435\u043d\u0438\u0439 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435*",fo2:"\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 GAMY\u015e:",fo3:"gamysh.com \u2014 \u0434\u043e\u0441\u0442\u043e\u0432\u0435\u0440\u043d\u0430\u044f \u0431\u0430\u0437\u0430 \u0434\u0430\u043d\u043d\u044b\u0445 \u043e \u043f\u0440\u043e\u0434\u0430\u0436\u0435 \u0438 \u0430\u0440\u0435\u043d\u0434\u0435 \u0436\u0438\u043b\u043e\u0439 \u0438 \u043a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u043e\u0439 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",fo4:"\xa9 2021 GAMYSH.\u0413\u0420\u0423\u041f\u041f",wihslist:"\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435",count_est:"\u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0439",fo5:"\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f \u0441\u0430\u0439\u0442\u0430",fff4:"\u0420\u0430\u0437\u043c\u0435\u0441\u0442\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435",hom1:"\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043e\u0441\u0442\u0438",hom2:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom3:"\u043e\u0442 8 900 000 \u20bd",hom4:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom5:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom6:"\u043e\u0442 8 900 000 \u20bd",hom7:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom8:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom9:"\u043e\u0442 8 900 000 \u20bd",hom10:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom11:"\u0416\u041a \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom12:"\u043e\u0442 8 900 000 \u20bd",hom13:"\u0421\u0435\u043b\u0438\u0433\u0435\u0440\u0441\u043a\u0430\u044f",hom14:"\u041f\u043e\u043b\u0435\u0437\u043d\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0438",hom15:"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f",hom16:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430:",hom17:"\u0410\u0440\u0435\u043d\u0434\u0430:",search1:"\u043b\u0443\u0447\u0448\u0438\u0435 \u0434\u043e\u043c\u0430 \u0438\u0449\u0438 \u043d\u0430 gamysh",search2:"\u0422\u0438\u043f \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",search3:"\u041f\u043b\u043e\u0449\u0430\u0434\u044c",search4:"\u0426\u0435\u043d\u0430",search5:"\u0413\u043e\u0440\u043e\u0434, \u0432\u0435\u043b\u0430\u044f\u0442",search6:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043d\u0430 \u043a\u0430\u0440\u0442\u0435",search7:"\u041f\u043e\u0438\u0441\u043a",search8:"\u0421\u0434\u0430\u0435\u0442\u0441\u044f \u0432 \u0430\u0440\u0435\u043d\u0434\u0443",search9:"\u041f\u0440\u043e\u0434\u0430\u0435\u0442\u0441\u044f",search10:"\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f",sell:"\u041f\u0440\u043e\u0434\u0430\u0435\u0442\u0441\u044f",rent:"\u0421\u0434\u0430\u0435\u0442\u0441\u044f \u0432 \u0430\u0440\u0435\u043d\u0434\u0443",good_url:"\u041f\u043e\u043b\u0435\u0437\u043d\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0438",log_out:"\u0412\u044b\u0439\u0442\u0438",waiting:"\u0412 \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u0438",accepted:"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u043d\u044b\u0439",rejected:"\u041e\u0442\u043a\u0430\u0437\u0430\u043d\u043e",reject_title:"\u041f\u0440\u0438\u0447\u0438\u043d\u0430 \u043e\u0442\u043a\u0430\u0437\u0430",profil:"\u041f\u0440\u043e\u0444\u0438\u043b\u044c",estates:"\u041c\u043e\u0438 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",name:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c",email:"\u041f\u043e\u0447\u0442\u0430",phone:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d",full_name:"\u0418\u043c\u044f",more_filter:"\u0415\u0449\u0451 \u0444\u0438\u043b\u044c\u0442\u0440\u044b",owner_type:"\u041e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f \u043e\u0442",room:"\u043a\u043e\u043c\u043d\u0430\u0442\u043d\u0430\u044f",type:"\u041d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u044c",category:"\u0421\u0434\u0435\u043b\u043a\u0430",price:"\u0426\u0435\u043da",dan:"\u043e\u0442",cenli:"\u0434\u043e",area:"\u041f\u043b\u043e\u0449\u0430\u0434\u044c",location:"\u0420\u0435\u0433\u0438\u043e\u043d",find:"\u041d\u0430\u0439\u0442\u0438",show:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043e\u0431\u044a\u0435\u043a\u0442\u044b",finded:"\u041d\u0430\u0439\u0434\u0435\u043d\u043e \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0439",buy_flat:"\u041a\u0443\u043f\u0438\u0442\u044c \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0443",rent_flat:"\u0421\u043d\u044f\u0442\u044c \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0443",buy_commer:"\u041a\u0443\u043f\u0438\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0443\u044e \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u044c",rent_commer:"\u0421\u043d\u044f\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0443\u044e \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u044c",text:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430 / \u0410\u0440\u0435\u043d\u0434\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435",no_emlak:"\u041d\u0435\u0442 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",no_emlak1:"\u041d\u0435\u0442 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438",change:"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043f\u0430\u0440\u043e\u043b\u044c",rent_message:"\u0410\u0440\u0435\u043d\u0434\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435",sell_message:"\u041f\u0440\u043e\u0434\u0430\u0436\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 \u0432 \u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d\u0435",map1:"\u041d\u0430 \u043a\u0430\u0440\u0442\u0435",advice:"\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c \u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c",delete:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u0441\u0435",wished:"\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0435",wished_count:"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0445",wish_no:"\u043d\u0435\u0442 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0445",password:"\u041f\u0430\u0440\u043e\u043b\u044c",dont_have:"\u041d\u0435\u0442 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430? \u0417\u0430\u0440\u0435\u0433\u0435\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044c!"},Object(l.a)(r,"rent","\u0410\u0440\u0435\u043d\u0434\u0430"),Object(l.a)(r,"sell","\u041f\u0440\u043e\u0434\u0430\u0436\u0430"),Object(l.a)(r,"\u0441ommerce","\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f"),Object(l.a)(r,"forgot","\u0417\u0430\u0431\u044b\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c"),Object(l.a)(r,"send","\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"),Object(l.a)(r,"welcome","\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c!"),Object(l.a)(r,"regist","\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"),Object(l.a)(r,"owner","\u0421\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a"),Object(l.a)(r,"rieltor","\u0420\u0438\u0435\u043b\u0442\u043e\u0440"),Object(l.a)(r,"already_have","\u0423\u0436\u0435 \u0435\u0441\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442?"),Object(l.a)(r,"VerifyCode","\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u043a\u043e\u0434\u0430"),Object(l.a)(r,"not1","\u041d\u043e\u0432\u043e\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435"),Object(l.a)(r,"not2","\u041e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435 \u0431\u0443\u0434\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e"),Object(l.a)(r,"not3","\u043d\u0430"),Object(l.a)(r,"not4"," \u0438 \u0432 \u043d\u0430\u0448\u0438\u0445 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0445"),Object(l.a)(r,"not5","\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u0445"),Object(l.a)(r,"not6","\u0422\u0438\u043f \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f"),Object(l.a)(r,"not7","\u0422\u0438\u043f \u0441\u0434\u0435\u043b\u043a\u0438"),Object(l.a)(r,"not8","\u041f\u0440\u043e\u0434\u0430\u0436\u0430"),Object(l.a)(r,"not9","\u0410\u0440\u0435\u043d\u0434\u0430"),Object(l.a)(r,"not10","\u0422\u0438\u043f \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438"),Object(l.a)(r,"not11","\u0416\u0438\u043b\u0430\u044f"),Object(l.a)(r,"not12","\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f"),Object(l.a)(r,"not13","\u041e\u0431\u044a\u0435\u043a\u0442"),Object(l.a)(r,"not14","\u041e\u0431 \u043e\u0431\u044a\u0435\u043a\u0442\u0435"),Object(l.a)(r,"not15","\u0426\u0435\u043d\u0430"),Object(l.a)(r,"not16","TMT"),Object(l.a)(r,"not17","\u041e\u0431\u0449\u0430\u044f \u043f\u043b\u043e\u0449\u0430\u0434\u044c"),Object(l.a)(r,"not18","\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043d\u0430 \u0442\u0443\u0440\u043a\u043c\u0435\u043d\u0441\u043a\u043e\u043c"),Object(l.a)(r,"not19","\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043d\u0430 \u0440\u0443\u0441\u0441\u043a\u043e\u043c"),Object(l.a)(r,"not30","\u0420\u0430\u0439\u043e\u043d"),Object(l.a)(r,"not20","\u0424\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438"),Object(l.a)(r,"not21","\u041d\u0435 \u0434\u043e\u043f\u0443\u0441\u043a\u0430\u044e\u0442\u0441\u044f \u043a \u0440\u0430\u0437\u043c\u0435\u0449\u0435\u043d\u0438\u044e \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u0441 \u0432\u043e\u0434\u044f\u043d\u044b\u043c\u0438 \u0437\u043d\u0430\u043a\u0430\u043c\u0438, \u0447\u0443\u0436\u0438\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432 \u0438 \u0440\u0435\u043a\u043b\u0430\u043c\u043d\u044b\u0435 \u0431\u0430\u043d\u043d\u0435\u0440\u044b. JPG, PNG \u0438\u043b\u0438 SVG. \u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0437\u043c\u0435\u0440 \u0444\u0430\u0439\u043b\u0430 3 \u043c\u0431"),Object(l.a)(r,"not22","\u0420\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u043d\u0430 \u043a\u0430\u0440\u0442\u0435"),Object(l.a)(r,"not23","\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435"),Object(l.a)(r,"add_wishlist","\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435"),Object(l.a)(r,"add_errors","\u041d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043e\u043e\u0435!"),Object(l.a)(r,"update","\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u043e"),Object(l.a)(r,"update_btn","\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c"),Object(l.a)(r,"errors","\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c!"),Object(l.a)(r,"notice_success","\u0412\u044b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0434\u043e\u0431\u0430\u0432\u0438\u043b\u0438!"),Object(l.a)(r,"notice_choose","\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u043f\u043e\u043b\u044f!"),Object(l.a)(r,"notice_enough","\u0412\u044b \u043d\u0435 \u043c\u043e\u0436\u0435\u0442\u0435 \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438!"),Object(l.a)(r,"notice_img_error","\u0424\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e!"),Object(l.a)(r,"phone_min","\u041c\u0438\u043d\u0438\u043c\u0443\u043c 8 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(l.a)(r,"phone_max","\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 8 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(l.a)(r,"required","\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u043b\u0435"),Object(l.a)(r,"only_number","\u0422\u043e\u043b\u044c\u043a\u043e \u0446\u0438\u0444\u0440\u044b"),Object(l.a)(r,"password_regex","\u041f\u0430\u0440\u043e\u043b\u044c \u0434\u043e\u043b\u0436\u0435\u043d \u0432\u043a\u043b\u044e\u0447\u0430\u0442\u044c \u0432 \u0441\u0435\u0431\u044f \u043e\u0434\u043d\u0443 \u0446\u0438\u0444\u0440\u0443 \u0438 \u043e\u0434\u043d\u0443 \u0431\u0443\u043a\u0432\u0443"),Object(l.a)(r,"password_min","\u041c\u0438\u043d\u0438\u043c\u0443\u043c 8 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(l.a)(r,"password_max","\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 50 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(l.a)(r,"name_min","\u041c\u0438\u043d\u0438\u043c\u0443\u043c 3 \u0441\u0438\u043c\u0432\u043e\u043b\u0430"),Object(l.a)(r,"name_max","\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 50 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(l.a)(r,"new_password","\u041d\u043e\u0432\u044b\u0439 \u043f\u0430\u0440\u043e\u043b\u044c"),Object(l.a)(r,"price_min","\u041c\u0430\u043a\u0441\u0438\u0441\u043c\u0443\u043c 10 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0439"),Object(l.a)(r,"area_min","\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 5 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0439"),Object(l.a)(r,"description_min","\u041c\u0438\u043d\u0438\u043c\u0443 10 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"),Object(l.a)(r,"description_max1","\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 150 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0439"),Object(l.a)(r,"title_arz","\u0416\u0430\u043b\u043e\u0432\u0430\u0442\u044c\u0441\u044f"),Object(l.a)(r,"des_send","\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"),Object(l.a)(r,"error_description","\u0432\u044b \u043d\u0435 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u043e\u0432\u0430\u043d\u044b!"),Object(l.a)(r,"success_description","\u0412\u0430\u0448\u0430 \u0436\u0430\u043b\u043e\u0431\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430!"),Object(l.a)(r,"imgSize","P\u0430\u0437\u043c\u0435\u0440 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0439 \u043d\u0435 \u0434\u043e\u043b\u0436\u0435\u043d \u043f\u0440\u0435\u0432\u044b\u0448\u0430\u0442\u044c 3 \u043c\u0431!"),Object(l.a)(r,"imgQty","\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0439 \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435 3 \u0438 \u043c\u0435\u043d\u044c\u0448\u0435 16!"),Object(l.a)(r,"error_delete","\u041d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u044c \u0443\u0434\u0435\u043b\u0435\u043d\u0430!"),r),tk:(n={login:"Girmek",fff:"Bildiri\u015f go\u015fmak",commerce:"T\xe4jir\xe7ilik",fff4:"Bildiri\u015f go\u015fmak",wihslist:"Halanlarym",geo:"Ashgabat",MapSearching:"Kartadan g\xf6zlemek",mapfirst:"Kartadan g\xf6zlemek",mapsecond:"Eml\xe4kleri i\u015fi\u0148, ma\u015fyn duralgany\u0148 \xfda-da ",mapsecond1:"garynda\u015flary\u0148 \xfdanynda tapy\u0148",mapbutton:"Kartadan tapmak",fo1:"T\xfcrkmenistany\u0148 online-mahabatlary\u0148",fo2:"GAMY\u015e mobil programmasy",fo3:"gamysh.com - bu \xfda\u015fa\xfdy\u015f, \u015f\xe4herda\u015fy  we s\xf6wda eml\xe4gini satmak baradaky maglumatlar bazasy",fo4:"\xa9 2021 GAMYSH.TOPAR",fo5:"sa\xfdty\u0148 mobil g\xf6rn\xfc\u015fi",hom1:"Maslahat berilyan eml\xe4kler",hom2:"\xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb \xfdjt",hom3:" 8 900 000 \u20bd-dan",hom4:"Seliger",hom5:"\xddJT \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom6:"8 900 000 \u20bd-dan",hom7:"Seliger",hom8:"\xddJT \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom9:"8 900 000 \u20bd-dan",hom10:"Seliger",hom11:"\xddJT \xab\u0421\u0435\u043b\u0438\u0433\u0435\u0440 \u0421\u0438\u0442\u0438\xbb",hom12:"8 900 000 \u20bd-dan",hom13:"Seliger",hom14:"Pe\xfddaly salgylanmalar",hom15:"Pe\xfddaly bildiri\u015fler",hom16:"Satlyk:",hom17:"K\xe4rende:",search1:"I\u0148 gowy ja\xfdlary gamysh-da g\xf6zle",search2:"Eml\xe4gi\u0148 g\xf6rn\xfc\u015fi",search3:"Me\xfddan",search4:"Bahasy",search5:"\u015e\xe4her, wela\xfdat",search6:"Kartada g\xf6rkez",search7:"G\xf6zle",search8:"K\xe4rende",search9:"Satlyk",search10:"T\xe4jir\xe7ilik",count_est:" eml\xe4k",sell:"Satlyk",rent:"K\xe4rende",good_url:"Pe\xfddaly salgylanmalar",log_out:"\xc7ykmak",waiting:"Seredil\xfd\xe4r",accepted:"Tassyklandy",rejected:"Kabul edildi",reject_title:"Kabul edilm\xe4ndigi\u0148 seb\xe4bi",profil:"\u015eahsy otag",estates:"Eml\xe4kler",name:"Ulanyjy",email:"Elektron Salgy",phone:"Telefon",regist:"T\xe4ze ulanyjy",already_have:"Akkaundy\u0148yz barmy?",VerifyCode:"Kody tassyklamak",change:"Gizlin kody \xfc\xfdtgetmek"},Object(l.a)(n,"rent","K\xe4rende"),Object(l.a)(n,"sell","Satmak"),Object(l.a)(n,"commerce","T\xe4jir\xe7ilik"),Object(l.a)(n,"more_filter","Go\u015fma\xe7a s\xfczg\xfc\xe7ler"),Object(l.a)(n,"location","\u015e\xe4her"),Object(l.a)(n,"find","G\xf6zle"),Object(l.a)(n,"dan","dan"),Object(l.a)(n,"cenli","\xe7enli"),Object(l.a)(n,"no_emlak","Eml\xe4k tapylmady"),Object(l.a)(n,"no_emlak1","Eml\xe4k \xfdok"),Object(l.a)(n,"forgot","Gizlin kody unutdym"),Object(l.a)(n,"send","Ugratmak"),Object(l.a)(n,"welcome","Ho\u015f geldi\u0148iz!"),Object(l.a)(n,"password","Gizlin kod"),Object(l.a)(n,"dont_have","Ulgamda \xfdokmy? Ulgama go\u015fuly\u0148!"),Object(l.a)(n,"full_name","Ady\u0148yz"),Object(l.a)(n,"owner","E\xfdesi"),Object(l.a)(n,"rieltor","Rieltor"),Object(l.a)(n,"owner_type","Bildiri\u015f"),Object(l.a)(n,"show","Eml\xe4kleri g\xf6rkez"),Object(l.a)(n,"type","Eml\xe4k"),Object(l.a)(n,"text","T\xfcrkmenistanda eml\xe4keri satmak we karend\xe4 almak"),Object(l.a)(n,"category","Hereket"),Object(l.a)(n,"area","Me\xfddan"),Object(l.a)(n,"price","Bahasy"),Object(l.a)(n,"finded","Tapylan eml\xe4kler "),Object(l.a)(n,"rent_message","T\xfcrkmenistanda eml\xe4kleri k\xe4rend\xe4 almak"),Object(l.a)(n,"sell_message","T\xfcrkmenistanda eml\xe4kleri satmak"),Object(l.a)(n,"map1","kartadan g\xf6rkez"),Object(l.a)(n,"advice","Maslahat beril\xfd\xe4nler"),Object(l.a)(n,"delete","Hemmesini pozmak"),Object(l.a)(n,"wished","Halanlarym"),Object(l.a)(n,"wished_count","Halanlarymy\u0148 sany"),Object(l.a)(n,"wish_no","Halanlarym \xfdok"),Object(l.a)(n,"buy_flat","Satlyk ja\xfdlar"),Object(l.a)(n,"rent_flat","Ja\xfdy k\xe4rend\xe4 almak"),Object(l.a)(n,"buy_commer","Satlyk t\xe4\xe7irjilik eml\xe4kleri"),Object(l.a)(n,"rent_commer","K\xe4rende t\xe4\xe7irjilik eml\xe4kleri"),Object(l.a)(n,"room","otagly"),Object(l.a)(n,"not1","T\xe4ze bildiri\u015f go\u015fmak"),Object(l.a)(n,"not2","Bildiri\u015f el\xfdeter bolar: "),Object(l.a)(n,"not3"," "),Object(l.a)(n,"not4"," we bizi\u0148 mobil"),Object(l.a)(n,"not5","programmamyzda"),Object(l.a)(n,"not6","Bildiri\u015fi\u0148 g\xf6rn\xfc\u015fi"),Object(l.a)(n,"not7","Bildir\u015fi\u0148 g\xf6rn\xfc\u015fi"),Object(l.a)(n,"not8","Satmak"),Object(l.a)(n,"not9","K\xe4rend\xe4 bermek"),Object(l.a)(n,"not10","Eml\xe4gi\u0148 g\xf6rn\xfc\u015fi"),Object(l.a)(n,"not11","\xdda\u015fa\xfdy\u015f"),Object(l.a)(n,"not12","T\xe4jir\xe7ilik"),Object(l.a)(n,"not13","Eml\xe4k"),Object(l.a)(n,"not14","Eml\xe4k barada"),Object(l.a)(n,"not15","Bahasy"),Object(l.a)(n,"not16","TMT"),Object(l.a)(n,"not17","Umumy me\xfddan"),Object(l.a)(n,"not18","D\xfc\u015f\xfcndiri\u015f (t\xfcrkmen dilinde)"),Object(l.a)(n,"not19","D\xfc\u015f\xfcndiri\u015f (rus dilinde)"),Object(l.a)(n,"not30","Etrap\xe7a"),Object(l.a)(n,"not20","Suratlar"),Object(l.a)(n,"not21"," JPG, PNG \u0438\u043b\u0438 SVG suratlar go\xfdlup bilner. Mahabat bannerly, suraty\u0148 \xfd\xfcz\xfcne s\xf6zler go\xfdulmadyk we g\xf6wr\xfcmi 3 mb az bolmaly."),Object(l.a)(n,"not22","Kartada \xfderle\u015fi\u015fi"),Object(l.a)(n,"not23","Bildiri\u015f go\u015f"),Object(l.a)(n,"add_wishlist","Halanlaryma go\u015fuldy"),Object(l.a)(n,"add_errors","Halanlaryma go\u015fulmady!"),Object(l.a)(n,"update","\xdcst\xfcnlikli \xfc\xfdtgedildi"),Object(l.a)(n,"update_btn","\xdc\xfdtgetmek"),Object(l.a)(n,"errors","\xdcst\xfcnlikli bolmady"),Object(l.a)(n,"notice_success","Siz \xfcst\xfcnlikli go\u015fdy\u0148yz!"),Object(l.a)(n,"notice_choose","H\xf6kmany maglumatlary doldury\u0148!"),Object(l.a)(n,"notice_enough","Siz mundan artyk eml\xe4k go\u015fup bilmersi\u0148iz!"),Object(l.a)(n,"notice_img_error","H\xf6kman surat go\u015fmaly!"),Object(l.a)(n,"phone_min","Azyndan 8 simwol"),Object(l.a)(n,"phone_max","Maksimum 8 simwol"),Object(l.a)(n,"required","H\xf6kmany doldurylmaly"),Object(l.a)(n,"only_number","Di\u0148e san bolmaly"),Object(l.a)(n,"password_regex","H\xf6kman 1 harp we 1 san bolmaly"),Object(l.a)(n,"password_min","Azyndan 8 simwol bolmaly"),Object(l.a)(n,"password_max","Maksimum 50 simwol bolmaly"),Object(l.a)(n,"name_min","Minimum 3 simwol bolmaly"),Object(l.a)(n,"name_max","Maksimum 3 simwol bolmaly"),Object(l.a)(n,"new_password","T\xe4ze gizlin kod"),Object(l.a)(n,"price_min","Maksimum 10 belgi bolmaly"),Object(l.a)(n,"area_min","Maksimum 5 belgi bolmaly"),Object(l.a)(n,"description_min","Minimum 10 simwol bolmaly"),Object(l.a)(n,"description_max1","Maksimum 150 simwol bolmaly"),Object(l.a)(n,"title_arz","Arz etmek"),Object(l.a)(n,"des_send","Ugratmak"),Object(l.a)(n,"error_description","Siz ulgama girmedi\u0148iz!"),Object(l.a)(n,"success_description","Sizi\u0148 arz-\u015fika\xfd\xe4ty\u0148yz ugradyldy!"),Object(l.a)(n,"imgSize","Suratlary\u0148 g\xf6wr\xfcmi 3 mb az bolmaly!"),Object(l.a)(n,"imgQty","Suratlary\u0148 sany 3-den k\xf6p 16-dan az bolmaly!"),Object(l.a)(n,"error_delete","Eml\xe4k pozuldy!"),n)}},99:function(e,a,t){"use strict";t.d(a,"b",(function(){return r})),t.d(a,"c",(function(){return n})),t.d(a,"d",(function(){return l})),t.d(a,"a",(function(){return o}));var r=function(e){return e.auth.isLogged},n=function(e){return e.auth.token},l=function(e){return e.auth.user},o=function(e){return e.data.categories}}}]);
//# sourceMappingURL=31.188128cf.chunk.js.map