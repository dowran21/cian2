(this.webpackJsonpgamysh=this.webpackJsonpgamysh||[]).push([[24],{103:function(t,e,i){Object.defineProperty(e,"__esModule",{value:!0});var n=i(0);function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t}).apply(this,arguments)}var s=n.createElement("svg",{viewBox:"-2 -5 14 20",height:"100%",width:"100%",style:{position:"absolute",top:0}},n.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"})),a=n.createElement("svg",{height:"100%",width:"100%",viewBox:"-2 -5 17 21",style:{position:"absolute",top:0}},n.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}));function c(t){if(7===t.length)return t;for(var e="#",i=1;i<4;i+=1)e+=t[i]+t[i];return e}function r(t,e,i,n,o){return function(t,e,i,n,o){var s=(t-i)/(e-i);if(0===s)return n;if(1===s)return o;for(var a="#",c=1;c<6;c+=2){var r=parseInt(n.substr(c,2),16),l=parseInt(o.substr(c,2),16),h=Math.round((1-s)*r+s*l).toString(16);1===h.length&&(h="0"+h),a+=h}return a}(t,e,i,c(n),c(o))}var l=function(t){function e(e){t.call(this,e);var i=e.height,n=e.width,o=e.checked;this.t=e.handleDiameter||i-2,this.i=Math.max(n-i,n-(i+this.t)/2),this.o=Math.max(0,(i-this.t)/2),this.state={h:o?this.i:this.o},this.l=0,this.u=0,this.p=this.p.bind(this),this.v=this.v.bind(this),this.g=this.g.bind(this),this.k=this.k.bind(this),this.M=this.M.bind(this),this.m=this.m.bind(this),this.T=this.T.bind(this),this.$=this.$.bind(this),this.C=this.C.bind(this),this.D=this.D.bind(this),this.O=this.O.bind(this),this.S=this.S.bind(this)}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.componentDidMount=function(){this.W=!0},e.prototype.componentDidUpdate=function(t){t.checked!==this.props.checked&&this.setState({h:this.props.checked?this.i:this.o})},e.prototype.componentWillUnmount=function(){this.W=!1},e.prototype.I=function(t){this.H.focus(),this.setState({R:t,j:!0,B:Date.now()})},e.prototype.L=function(t){var e=this.state,i=e.R,n=e.h,o=(this.props.checked?this.i:this.o)+t-i;e.N||t===i||this.setState({N:!0});var s=Math.min(this.i,Math.max(this.o,o));s!==n&&this.setState({h:s})},e.prototype.U=function(t){var e=this.state,i=e.h,n=e.N,o=e.B,s=this.props.checked,a=(this.i+this.o)/2;this.setState({h:this.props.checked?this.i:this.o});var c=Date.now()-o;(!n||c<250||s&&i<=a||!s&&i>=a)&&this.A(t),this.W&&this.setState({N:!1,j:!1}),this.l=Date.now()},e.prototype.p=function(t){t.preventDefault(),"number"==typeof t.button&&0!==t.button||(this.I(t.clientX),window.addEventListener("mousemove",this.v),window.addEventListener("mouseup",this.g))},e.prototype.v=function(t){t.preventDefault(),this.L(t.clientX)},e.prototype.g=function(t){this.U(t),window.removeEventListener("mousemove",this.v),window.removeEventListener("mouseup",this.g)},e.prototype.k=function(t){this.X=null,this.I(t.touches[0].clientX)},e.prototype.M=function(t){this.L(t.touches[0].clientX)},e.prototype.m=function(t){t.preventDefault(),this.U(t)},e.prototype.$=function(t){Date.now()-this.l>50&&(this.A(t),Date.now()-this.u>50&&this.W&&this.setState({j:!1}))},e.prototype.C=function(){this.u=Date.now()},e.prototype.D=function(){this.setState({j:!0})},e.prototype.O=function(){this.setState({j:!1})},e.prototype.S=function(t){this.H=t},e.prototype.T=function(t){t.preventDefault(),this.H.focus(),this.A(t),this.W&&this.setState({j:!1})},e.prototype.A=function(t){var e=this.props;(0,e.onChange)(!e.checked,t,e.id)},e.prototype.render=function(){var t=this.props,e=t.checked,i=t.disabled,s=t.className,a=t.offColor,c=t.onColor,l=t.offHandleColor,h=t.onHandleColor,d=t.checkedIcon,u=t.uncheckedIcon,p=t.checkedHandleIcon,f=t.uncheckedHandleIcon,b=t.boxShadow,j=t.activeBoxShadow,m=t.height,x=t.width,y=t.borderRadius,v=function(t,e){var i={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&-1===e.indexOf(n)&&(i[n]=t[n]);return i}(t,["checked","disabled","className","offColor","onColor","offHandleColor","onHandleColor","checkedIcon","uncheckedIcon","checkedHandleIcon","uncheckedHandleIcon","boxShadow","activeBoxShadow","height","width","borderRadius","handleDiameter"]),O=this.state,g=O.h,w=O.N,k=O.j,T={position:"relative",display:"inline-block",textAlign:"left",opacity:i?.5:1,direction:"ltr",borderRadius:m/2,WebkitTransition:"opacity 0.25s",MozTransition:"opacity 0.25s",transition:"opacity 0.25s",touchAction:"none",WebkitTapHighlightColor:"rgba(0, 0, 0, 0)",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",userSelect:"none"},E={height:m,width:x,margin:Math.max(0,(this.t-m)/2),position:"relative",background:r(g,this.i,this.o,a,c),borderRadius:"number"==typeof y?y:m/2,cursor:i?"default":"pointer",WebkitTransition:w?null:"background 0.25s",MozTransition:w?null:"background 0.25s",transition:w?null:"background 0.25s"},S={height:m,width:Math.min(1.5*m,x-(this.t+m)/2+1),position:"relative",opacity:(g-this.o)/(this.i-this.o),pointerEvents:"none",WebkitTransition:w?null:"opacity 0.25s",MozTransition:w?null:"opacity 0.25s",transition:w?null:"opacity 0.25s"},C={height:m,width:Math.min(1.5*m,x-(this.t+m)/2+1),position:"absolute",opacity:1-(g-this.o)/(this.i-this.o),right:0,top:0,pointerEvents:"none",WebkitTransition:w?null:"opacity 0.25s",MozTransition:w?null:"opacity 0.25s",transition:w?null:"opacity 0.25s"},N={height:this.t,width:this.t,background:r(g,this.i,this.o,l,h),display:"inline-block",cursor:i?"default":"pointer",borderRadius:"number"==typeof y?y-1:"50%",position:"absolute",transform:"translateX("+g+"px)",top:Math.max(0,(m-this.t)/2),outline:0,boxShadow:k?j:b,border:0,WebkitTransition:w?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",MozTransition:w?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",transition:w?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s"},M={height:this.t,width:this.t,opacity:Math.max(2*(1-(g-this.o)/(this.i-this.o)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:w?null:"opacity 0.25s",MozTransition:w?null:"opacity 0.25s",transition:w?null:"opacity 0.25s"},D={height:this.t,width:this.t,opacity:Math.max(2*((g-this.o)/(this.i-this.o)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:w?null:"opacity 0.25s",MozTransition:w?null:"opacity 0.25s",transition:w?null:"opacity 0.25s"};return n.createElement("div",{className:s,style:T},n.createElement("div",{className:"react-switch-bg",style:E,onClick:i?null:this.T,onMouseDown:function(t){return t.preventDefault()}},d&&n.createElement("div",{style:S},d),u&&n.createElement("div",{style:C},u)),n.createElement("div",{className:"react-switch-handle",style:N,onClick:function(t){return t.preventDefault()},onMouseDown:i?null:this.p,onTouchStart:i?null:this.k,onTouchMove:i?null:this.M,onTouchEnd:i?null:this.m,onTouchCancel:i?null:this.O},f&&n.createElement("div",{style:M},f),p&&n.createElement("div",{style:D},p)),n.createElement("input",o({},{type:"checkbox",role:"switch","aria-checked":e,checked:e,disabled:i,style:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}},v,{ref:this.S,onFocus:this.D,onBlur:this.O,onKeyUp:this.C,onChange:this.$})))},e}(n.Component);l.defaultProps={disabled:!1,offColor:"#888",onColor:"#080",offHandleColor:"#fff",onHandleColor:"#fff",uncheckedIcon:s,checkedIcon:a,boxShadow:null,activeBoxShadow:"0 0 2px 3px #3bf",height:28,width:56},e.default=l},105:function(t,e,i){"use strict";var n=i(110),o=i(2);e.a=function(t){var e=t.limit,i=t.setLimit,s=t.setPage,a=t.count,c=t.page;return Object(o.jsxs)("div",{className:"relative flex flex-row w-full justify-between px-2",children:[Object(o.jsx)("div",{}),Object(o.jsx)(n.a,{pageSize:e,current:c+1,className:"",total:a,showTotal:function(t,e){return Object(o.jsx)("div",{className:"hidden md:flex absolute top-0 left-2",children:"".concat(e[0]," - ").concat(e[1]," \u0438\u0437 ").concat(t)})},onChange:function(t){return s(t-1)}}),Object(o.jsxs)("select",{className:"focus:outline-none p-1",value:e,onChange:function(t){return i(t.target.value)},children:[Object(o.jsx)("option",{value:10,children:"10"}),Object(o.jsx)("option",{value:20,children:"20"}),Object(o.jsx)("option",{value:30,children:"30"}),Object(o.jsx)("option",{value:40,children:"40"}),Object(o.jsx)("option",{value:50,children:"50"})]})]})}},1161:function(t,e,i){"use strict";i.r(e);var n=i(12),o=i(9),s=i(13),a=i(0),c=i(82),r=i(87),l=i(93),h=i(90),d=i(89),u=i(94),p=i(88),f=i(14),b=i(16),j=i(95),m=i(91),x=i.n(m),y=i(105),v=i(2);function O(t,e){switch(console.log(e),e.type){case"SET_DATA":return Object(o.a)(Object(o.a)({},t),{},{data:e.payload.complaints,count:+e.payload.count,loading:!1});case"ACCEPT_COMPLAINT":return Object(o.a)(Object(o.a)({},t),{},{data:t.data.filter((function(t){return t.id!==e.payload}))});case"SET_ACCEPTED":return Object(o.a)(Object(o.a)({},t),{},{trigger:!t.trigger,accepted:e.payload});case"SET_LOADING":return Object(o.a)(Object(o.a)({},t),{},{loading:e.payload});case"SET_PAGE":return Object(o.a)(Object(o.a)({},t),{},{loading:!0,page:e.payload,trigger:!t.trigger});case"SET_LIMIT":return Object(o.a)(Object(o.a)({},t),{},{loading:!0,limit:e.payload,page:0,trigger:!t.trigger});default:return t}}e.default=function(){var t,e=Object(a.useReducer)(O,{data:[],page:0,loading:!0,limit:30,count:0,accepted:!1,trigger:!0}),i=Object(n.a)(e,2),o=i[0],m=i[1],g=Object(s.b)(),w=Object(s.c)((function(t){return t.auth.token}));return Object(a.useEffect)((function(){g(Object(c.a)({url:"api/admin/get-complaints?accepted=".concat(o.accepted,"&page=").concat(o.page,"&limit=").concat(o.limit),token:w,action:function(t){t.success?(console.log(t.data.rows),m({type:"SET_DATA",payload:t.data.rows})):f.b.error("\u041d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430")}}))}),[o.trigger]),Object(v.jsxs)(r.a,{footer:Object(v.jsx)(y.a,{setPage:function(t){return m({type:"SET_PAGE",payload:t})},limit:+o.limit,count:+o.count,page:o.page,setLimit:function(t){return m({type:"SET_LIMIT",payload:t})}}),children:[Object(v.jsxs)("div",{className:"flex flex-row justify-start items-start bg-blue-50 w-full h-12 overflow-x-auto",children:[Object(v.jsx)("button",{onClick:function(){return m({type:"SET_ACCEPTED",payload:!1})},className:"".concat(!1===o.accepted?"bg-white":""," flex justify-center items-center min-w-200 whitespace-nowrap px-3 h-full rounded-t-lg focus:outline-none"),children:"\u041d\u0435\u043f\u0440\u0438\u043d\u044f\u0442\u044b\u0435"}),Object(v.jsx)("button",{onClick:function(){return m({type:"SET_ACCEPTED",payload:!0})},className:"".concat(o.accepted?"bg-white":""," flex justify-center items-center min-w-200 whitespace-nowrap px-3 h-full rounded-t-lg focus:outline-none"),children:"\u041f\u0440\u0438\u043d\u044f\u0442\u044b\u0435"})]}),Object(v.jsx)(b.a,{loading:o.loading}),Object(v.jsx)("div",{className:"w-full h-full px-6 overflow-y-auto pb-20 ",children:Object(v.jsxs)(p.a,{children:[Object(v.jsx)(d.a,{children:Object(v.jsx)(u.a,{children:Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(h.a,{children:Object(v.jsx)("div",{className:"px-2 py-4 font-medium flex flex-row justify-start items-center ",children:Object(v.jsx)("span",{children:"\u0418\u043c\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u0435\u043b\u044f"})})}),Object(v.jsx)("div",{className:"px-2 py-4 font-medium flex flex-row justify-start items-center ",children:Object(v.jsx)("span",{children:"\u041d\u043e\u043c\u0435\u0440 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u0435\u043b\u044f"})}),Object(v.jsx)(h.a,{children:Object(v.jsx)("div",{className:"px-2 py-4 font-medium flex flex-row justify-start items-center ",children:Object(v.jsx)("span",{children:"ID \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438"})})}),Object(v.jsx)("div",{className:"px-2 py-4 font-medium flex flex-row justify-start items-center ",children:Object(v.jsx)("span",{children:"\u0418\u043c\u044f \u0430\u0434\u0440\u0435\u0441\u0430\u0442\u0430"})}),Object(v.jsx)(h.a,{children:Object(v.jsx)("div",{className:"px-2 py-4 font-medium flex flex-row justify-start items-center ",children:Object(v.jsx)("span",{children:"\u041d\u043e\u043c\u0435\u0440 \u0430\u0434\u0440\u0435\u0441\u0430\u0442\u0430"})})}),Object(v.jsx)(h.a,{children:Object(v.jsx)("div",{className:"px-2 py-4 font-medium flex flex-row justify-start items-center ",children:Object(v.jsx)("span",{children:"\u0416\u0430\u043b\u043e\u0431\u0430"})})}),Object(v.jsx)(h.a,{children:Object(v.jsx)("div",{className:"px-2 py-4 font-medium flex flex-row justify-start items-center ",children:Object(v.jsx)("span",{children:"\u041f\u0440\u0438\u043d\u044f\u0442\u044c"})})})]})})}),Object(v.jsx)(l.a,{children:(null===(t=o.data)||void 0===t?void 0:t.length)>0?o.data.map((function(t){return Object(v.jsx)(u.a,{children:Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(h.a,{children:Object(v.jsx)("div",{className:"p-2",children:t.sender_name})}),Object(v.jsx)(h.a,{children:Object(v.jsx)("div",{className:"p-2",children:t.sender_phone})}),Object(v.jsx)(h.a,{children:Object(v.jsx)("div",{className:"p-2",children:t.real_estate_id})}),Object(v.jsx)(h.a,{children:Object(v.jsx)("div",{className:"p-2",children:t.address_name})}),Object(v.jsx)(h.a,{children:Object(v.jsx)("div",{className:"p-2",children:t.address_phone})}),Object(v.jsx)(h.a,{children:Object(v.jsx)("div",{className:"p-2 w-72 break-words",children:t.message})}),Object(v.jsx)(h.a,{children:Object(v.jsx)("div",{className:"p-2",children:Object(v.jsx)(x.a,{onChange:function(){return e=t.id,m({type:"SET_LOADING",payload:!0}),void g(Object(c.b)({url:"api/admin/accept-complaint/".concat(e),token:w,action:function(t){t.success?(m({type:"ACCEPT_COMPLAINT",payload:e}),m({type:"SET_LOADING",payload:!1})):(m({type:"SET_LOADING",payload:!1}),f.b.error("\u041d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u0430 \u043e\u0448\u0438\u0431\u043a\u0430"))}}));var e},checked:t.accepted,disabled:t.accepted,height:18,width:37})})})]})},t.id)})):!0===o.loading?null:Object(v.jsx)("tr",{children:Object(v.jsx)("td",{colSpan:"10",children:Object(v.jsx)("div",{className:"flex w-full h-full py-20 justify-center items-center",children:Object(v.jsx)(j.a,{title:"\u041d\u0435\u0442 \u0416\u0430\u043b\u043e\u0431"})})})})})]})})]})}},91:function(t,e,i){t.exports=i(103)}}]);
//# sourceMappingURL=24.a443312e.chunk.js.map