(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[36],{101:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.heartO=void 0;t.heartO={viewBox:"0 0 1792 1792",children:[{name:"path",attribs:{d:"M1664 596q0-81-21.5-143t-55-98.5-81.5-59.5-94-31-98-8-112 25.5-110.5 64-86.5 72-60 61.5q-18 22-49 22t-49-22q-24-28-60-61.5t-86.5-72-110.5-64-112-25.5-98 8-94 31-81.5 59.5-55 98.5-21.5 143q0 168 187 355l581 560 580-559q188-188 188-356zM1792 596q0 221-229 450l-623 600q-18 18-44 18t-44-18l-624-602q-10-8-27.5-26t-55.5-65.5-68-97.5-53.5-121-23.5-138q0-220 127-344t351-124q62 0 126.5 21.5t120 58 95.5 68.5 76 68q36-36 76-68t95.5-68.5 120-58 126.5-21.5q224 0 351 124t127 344z"}}]}},336:function(e,t,l){"use strict";l.r(t);var c=l(8),s=l(122),i=l(18),a=l(0),n=l(5),o=(l(102),l(101),l(99),l(22)),r=l(98),d=l(49),u=(l(27),l(100)),j=l(34),m=(l(111),l(118)),b=l.n(m),f=l(126),x=l(125),v=l(119),O=l(35),p=l(9),h=l(1),_=Object(a.lazy)((function(){return Promise.all([l.e(3),l.e(8)]).then(l.bind(null,197))}));var g=x.a().shape({price:x.b().required("Hokman bolmaly"),area:x.b().required("Hokman bolmaly"),description_tm:x.b().min(10,"Azyndan 10 simwol bolmaly").required("Hokman bolmaly"),description_ru:x.b().min(10,"Azyndan 10 simwol bolmaly").required("Hokman bolmaly")});t.default=function(e){var t,l,m,x,y,N,w=e.update_id,k=Object(a.useContext)(j.a),q=k.lang,S=(k.dispatchLang,Object(o.b)()),E=(Object(n.f)(),Object(o.c)(r.a),Object(o.c)(r.d),Object(o.c)(r.c)),C=Object(a.useState)(),L=Object(i.a)(C,2),z=L[0],A=L[1],H=Object(a.useState)(),M=Object(i.a)(H,2),B=M[0],F=M[1],J=Object(a.useState)(!0),P=Object(i.a)(J,2),V=P[0],T=P[1],U=Object(a.useState)([]),D=Object(i.a)(U,2),G=D[0],I=D[1],K=Object(a.useState)({}),Q=Object(i.a)(K,2),R=Q[0],W=Q[1],X=Object(a.useState)([]),Y=Object(i.a)(X,2),Z=Y[0],$=Y[1],ee=Object(a.useState)([]),te=Object(i.a)(ee,2),le=te[0],ce=te[1],se=Object(a.useState)(),ie=Object(i.a)(se,2),ae=ie[0],ne=ie[1],oe=Object(a.useState)(null),re=Object(i.a)(oe,2),de=(re[0],re[1]),ue="";ue="ru"==q?"ru":"tm";var je=Object(a.useState)({}),me=Object(i.a)(je,2),be=(me[0],me[1],Object(a.useState)({})),fe=Object(i.a)(be,2),xe=fe[0],ve=fe[1];Object(a.useEffect)((function(){ve({lat:null===R||void 0===R?void 0:R.lat,lng:null===R||void 0===R?void 0:R.lng})}),[R]),Object(a.useEffect)((function(){S(Object(d.a)({url:"tm/main-locations",token:"",action:function(e){e.success?$(e.data.rows):console.log("error_data ",e)}}))}),[]),Object(a.useEffect)((function(){ae&&S(Object(d.a)({url:"tm/region-locations/".concat(ae),token:"",action:function(e){e.success?ce(e.data.rows):console.log("error_data ",e)}}))}),[ae]),Object(a.useEffect)((function(){S(Object(d.a)({url:"user/tm/user-real-estate/".concat(w),token:E,action:function(e){e.success?(console.log("get_update ",e),A(e.data.rows),T(!1)):console.log("error_data ",e)}}))}),[ue]),Object(a.useEffect)((function(){(null===z||void 0===z?void 0:z.type_id)&&S(Object(d.a)({url:"tm/specifications-for-type/".concat(null===z||void 0===z?void 0:z.type_id,"/").concat(null===z||void 0===z?void 0:z.category_id),token:"",action:function(e){e.success?(console.log("get_form ",e),F(e.data.rows)):console.log("error_data ",e)}}))}),[z]);var Oe=Object(v.e)({resolver:Object(f.a)(g)}),pe=Oe.register,he=(Oe.watch,Oe.handleSubmit),_e=Oe.formState.errors,ge=Oe.setError,ye=Oe.setValue;return Oe.getValues,ye("price",null===z||void 0===z?void 0:z.price),ye("area",null===z||void 0===z?void 0:z.area),ye("description_tm",null===z||void 0===z?void 0:z.description_tm),ye("description_ru",null===z||void 0===z?void 0:z.description_ru),Object(a.useEffect)((function(){for(var e=function(e){I((function(t){return[].concat(Object(s.a)(t),[{id:B[e].specification_id,is_required:B[e].is_required,is_multiple:B[e].is_multiple,values:[]}])}))},t=0;t<(null===B||void 0===B?void 0:B.length);t++)e(t)}),[B]),console.log(G,"-----put"),console.log(G,"-------filter"),Object(h.jsx)(h.Fragment,{children:V?Object(h.jsx)("div",{className:"mt-10 w-full flex items-center justify-center",children:Object(h.jsx)(O.a,{type:"table"})}):Object(h.jsxs)("form",{onSubmit:he((function(e){e=Object(c.a)(Object(c.a)({},e),{},{specifications:G,position:xe}),console.log(e,"----useForm hook"),S(Object(d.b)({url:"user/tm/update-real-estate/".concat(null===z||void 0===z?void 0:z.real_estate_id),token:E,data:e,action:function(e){var t;if(e.success)console.log("update_response ",e),p.b.success("\xdcst\xfcnlikli \xfc\xfdtgedildi!");else if(console.log("error_data ",e),p.b.error("\xdcst\xfcnlikli bolmady!"),null===e||void 0===e||null===(t=e.message)||void 0===t?void 0:t.data){var l,c,s=null===Object||void 0===Object?void 0:Object.keys(null===e||void 0===e||null===(l=e.message)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.error);null===s||void 0===s||s.map((function(t){var l,c;ge(t,{type:"manual",message:null===e||void 0===e||null===(l=e.message)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.error[t]})}))}}}))})),className:"profile_main flex flex-col bg-white border rounded-md my-6 p-3",children:[Object(h.jsxs)("div",{className:"w-full flex flex-col sm:flex-row justify-between mt-5",children:[Object(h.jsx)("div",{className:"title_name1",children:Object(h.jsx)("p",{children:u.a[q].not15})}),Object(h.jsxs)("div",{className:"filter_links1",children:[Object(h.jsx)("input",Object(c.a)(Object(c.a)({type:"text"},pe("price")),{},{className:"p-1 px-2 border rounded-sm w-40 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"})),Object(h.jsx)("span",{children:u.a[q].not16}),Object(h.jsx)("p",{className:"text-red-500 my-1",children:(null===(t=_e.price)||void 0===t?void 0:t.message)?_e.price.message:null})]})]}),Object(h.jsxs)("div",{className:"w-full flex flex-col sm:flex-row justify-between mt-5",children:[Object(h.jsx)("div",{className:"title_name1",children:Object(h.jsx)("p",{children:u.a[q].not17})}),Object(h.jsxs)("div",{className:"filter_links1",children:[Object(h.jsx)("input",Object(c.a)(Object(c.a)({type:"text"},pe("area")),{},{className:"p-1 px-2 border rounded-sm w-40 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"})),Object(h.jsx)("span",{children:"\u043c\xb2"}),Object(h.jsx)("p",{className:"text-red-500 my-1",children:(null===(l=_e.area)||void 0===l?void 0:l.message)?_e.area.message:null})]})]}),Object(h.jsxs)("div",{className:"w-full flex flex-col sm:flex-row justify-between mt-5",children:[Object(h.jsx)("div",{className:"title_name1",children:Object(h.jsx)("p",{children:u.a[q].not18})}),Object(h.jsxs)("div",{className:"filter_links1",children:[Object(h.jsx)("textarea",Object(c.a)(Object(c.a)({},pe("description_tm")),{},{className:"border p-1 w-full sm:w-1/2 h-44 text-sm px-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"})),Object(h.jsx)("p",{className:"text-red-500 my-1",children:(null===(m=_e.description_tm)||void 0===m?void 0:m.message)?_e.description_tm.message:null})]})]}),Object(h.jsxs)("div",{className:"w-full flex flex-col sm:flex-row justify-between mt-5",children:[Object(h.jsx)("div",{className:"title_name1",children:Object(h.jsx)("p",{children:u.a[q].not19})}),Object(h.jsxs)("div",{className:"filter_links1",children:[Object(h.jsx)("textarea",Object(c.a)(Object(c.a)({},pe("description_ru")),{},{className:"border p-1 w-full sm:w-1/2 h-44 text-sm px-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"})),Object(h.jsx)("p",{className:"text-red-500 my-1",children:(null===(x=_e.description_ru)||void 0===x?void 0:x.message)?_e.description_ru.message:null})]})]}),null===B||void 0===B?void 0:B.map((function(e){var t,l,c;return Object(h.jsxs)("div",{className:"w-full flex flex-col sm:flex-row justify-between mt-5",children:[Object(h.jsx)("div",{className:"title_name1",children:Object(h.jsx)("p",{children:e.name},e.id)}),Object(h.jsx)("div",{className:"filter_links1",children:Object(h.jsxs)("div",{className:"flex flex-wrap",children:[e.is_multiple?Object(h.jsx)("div",{className:"flex flex-wrap",children:null===e||void 0===e||null===(t=e.values)||void 0===t?void 0:t.map((function(t){return Object(h.jsxs)("label",{className:"radio-toolbar mb-3 border outline-none cursor-pointer rounded-sm p-1 px-3 \r hover:text-white hover:bg-blue-600 mr-4",for:t.value_id,children:[Object(h.jsx)("input",{type:"checkbox",name:e.name,id:t.value_id,className:"hidden",onClick:function(l){var c,s;c=e.specification_id,s=t.value_id,I(G.map((function(e){return e.id==c&&(e.values.includes(s)?e.values=e.values.filter((function(e){return e!==s})):e.values.push(s)),e}))),document.querySelectorAll(".radio-toolbar").forEach((function(e){if(e.children[0].checked)e.classList.add("toolbar");else e.classList.remove("toolbar")}))}}),Object(h.jsx)("span",{children:t.absolute_value},t.value_id)]})}))}):Object(h.jsx)("div",{className:"flex flex-wrap",children:null===e||void 0===e||null===(l=e.values)||void 0===l?void 0:l.map((function(t){return Object(h.jsxs)("label",{className:"radio-toolbar mb-3 border outline-none cursor-pointer rounded-sm p-1 px-3 \r hover:text-white hover:bg-blue-600 mr-4",for:t.value_id,children:[Object(h.jsx)("input",{type:"radio",name:e.name,id:t.value_id,className:"hidden",onClick:function(){var l,c;l=e.specification_id,c=t.value_id,I(G.map((function(e){return e.id==l&&(e.values[0]=c),e}))),document.querySelectorAll(".radio-toolbar").forEach((function(e){if(e.children[0].checked)e.classList.add("toolbar");else e.classList.remove("toolbar")}))}}),Object(h.jsx)("span",{children:t.absolute_value},t.value_id)]})}))}),Object(h.jsx)("p",{className:"text-red-500 my-1 ml-2",children:(null===(c=_e.specifications)||void 0===c?void 0:c.message)?_e.specifications.message:null})]})})]})})),Object(h.jsxs)("div",{className:"w-full flex flex-col sm:flex-row justify-between mt-5",children:[Object(h.jsx)("div",{className:"title_name1",children:Object(h.jsx)("p",{children:"Location"})}),Object(h.jsxs)("div",{className:"filter_links1",children:[Object(h.jsxs)("div",{className:"flex flex-wrap",children:[null===Z||void 0===Z?void 0:Z.map((function(e){return Object(h.jsxs)("label",{className:"radio_loc mb-3 rounded-md border outline-none cursor-pointer rounded-sm p-1 px-3 \r hover:text-white hover:bg-blue-600 mr-4",onClick:function(){ne(e.id),document.querySelectorAll(".radio_loc").forEach((function(e){if(e.children[0].checked)e.classList.add("toolbar");else e.classList.remove("toolbar")}))},children:[Object(h.jsx)("input",{type:"radio",name:"loc",className:"hidden"}),Object(h.jsx)("span",{children:e.name})]})})),Object(h.jsx)("p",{className:"text-red-500 my-1",children:(null===(y=_e.location_id)||void 0===y?void 0:y.message)?_e.location_id.message:null})]}),Object(h.jsx)("hr",{}),Object(h.jsxs)("div",{className:"location_grid",children:[Object(h.jsx)("div",{className:"flex flex-col ",children:null===le||void 0===le?void 0:le.slice(0,7).map((function(e){return Object(h.jsxs)("label",{className:"my-1",onClick:function(){ye("location_id",e.id)},children:[Object(h.jsx)("input",{type:"radio",name:"loc1",className:"mr-3"}),Object(h.jsx)("span",{children:e.name})]})}))}),Object(h.jsx)("div",{className:"flex flex-col ",children:null===le||void 0===le?void 0:le.slice(7,15).map((function(e){return Object(h.jsxs)("label",{className:"my-1",onClick:function(){ye("location_id",e.id)},children:[Object(h.jsx)("input",{type:"radio",name:"loc1",className:"mr-3"}),Object(h.jsx)("span",{children:e.name})]})}))}),Object(h.jsx)("div",{className:"flex flex-col ",children:null===le||void 0===le?void 0:le.slice(15,23).map((function(e){return Object(h.jsxs)("label",{className:"my-1",onClick:function(){ye("location_id",e.id)},children:[Object(h.jsx)("input",{type:"radio",name:"loc1",className:"mr-3"}),Object(h.jsx)("span",{children:e.name})]})}))}),Object(h.jsx)("div",{className:"flex flex-col ",children:null===le||void 0===le?void 0:le.slice(23,30).map((function(e){return Object(h.jsxs)("label",{className:"my-1",onClick:function(){ye("location_id",e.id)},children:[Object(h.jsx)("input",{type:"radio",name:"loc1",className:"mr-3"}),Object(h.jsx)("span",{children:e.name})]})}))})]})]})]}),Object(h.jsxs)("div",{className:"w-full flex flex-col sm:flex-row justify-between mt-5",children:[Object(h.jsx)("div",{className:"title_name1",children:Object(h.jsx)("p",{children:u.a[q].not20})}),Object(h.jsxs)("div",{className:"filter_links1",children:[Object(h.jsx)("div",{className:"w-full sm:w-1/2 h-40 border flex justify-center items-center",children:Object(h.jsx)("input",{type:"file",name:"image",required:!0,onChange:function(e){de([]),de(e.target.files),console.log(e.target.files)},multiple:!0})}),Object(h.jsx)("p",{className:"text-sm text-gray-600",children:u.a[q].not21})]})]}),Object(h.jsx)("hr",{className:"my-8"}),Object(h.jsx)("p",{className:"font-medium my-3",children:u.a[q].not22}),Object(h.jsx)(_,{setLocation:W}),Object(h.jsx)("p",{className:"text-red-500 my-1",children:(null===(N=_e.position)||void 0===N?void 0:N.message)?_e.position.message:null}),Object(h.jsx)(b.a,{color:"lightBlue",buttonType:"link",size:"regular",rounded:!1,block:!1,iconOnly:!1,ripple:"dark",type:"submit",className:"w-40 flex self-center mb-5 mt-8",children:"Update"})]})})}}}]);
//# sourceMappingURL=36.0e5c6acd.chunk.js.map