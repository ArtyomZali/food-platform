(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1ac2271e"],{"293a":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-card",{staticClass:"chat"},[a("div",{staticClass:"chat-header"},[a("v-img",{staticClass:"avatar",attrs:{"max-width":"128","max-height":"128",src:e.otherPersonAvatar}}),a("h2",{staticClass:"mb-2"},[e._v(e._s(e.otherPersonName))])],1),a("div",{staticClass:"chat-body"},[e.chat&&!e.chat.ChatMessages.length?a("h1",[e._v(" В этом чате еще нет сообщений ")]):e.chat&&e.chat.ChatMessages.length?a("div",{staticClass:"chat-messages-container"},e._l(e.chat.ChatMessages,(function(t){return a("chat-message",{key:"chat-message-"+t.id,attrs:{message:t,userType:e.userType,otherPersonName:e.otherPersonName}})})),1):e._e()]),a("div",{staticClass:"chat-footer"},[a("v-text-field",{attrs:{label:"Введите сообщение"},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}),a("v-btn",{attrs:{color:"primary",disabled:!e.message,loading:e.isLoading},on:{click:e.sendMessage}},[e._v("Отправить")])],1)])],1)},s=[],n=a("1da1"),i=(a("96cf"),a("99af"),a("b0c0"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{class:"chat-message chat-message-"+(e.userType===e.message.author?"my":"not-my")},[e.message.author!==e.userType?a("h4",[e._v(e._s(e.otherPersonName))]):e._e(),a("p",[e._v(e._s(e.message.text))]),e.message.author===e.userType?a("div",{staticClass:"read-mark"},[a("v-icon",{attrs:{color:"primary"}},[e._v(e._s(e.message.isSeen?"mdi-check-all":"mdi-check"))])],1):e._e()])}),c=[],o={props:{message:{type:Object,required:!0},userType:{type:String,required:!0},otherPersonName:{type:String,required:!0}}},u=o,h=(a("ef5d"),a("2877")),d=a("6544"),l=a.n(d),v=a("b0af"),m=a("132d"),g=Object(h["a"])(u,i,c,!1,null,"6cfac941",null),p=g.exports;l()(g,{VCard:v["a"],VIcon:m["a"]});var f={components:{ChatMessage:p},data:function(){return{chat:null,message:"",isLoading:!1}},methods:{avatar:function(e){return e?"".concat(this.$api.BASE_URL).concat(e):a("113c")},getChat:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$api.getChat(e.$route.params.id);case 3:e.chat=t.sent.data,t.next=9;break;case 6:t.prev=6,t.t0=t["catch"](0),e.$router.push("/chats");case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()},sendMessage:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.message&&(e.isLoading=!0),t.next=3,e.$callWithErrorHandler(Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.sendMessage({id:e.chat.id,text:e.message});case 2:e.message="",e.getChat();case 4:case"end":return t.stop()}}),t)}))));case 3:e.isLoading=!1;case 4:case"end":return t.stop()}}),t)})))()},readMessages:function(){var e=this;this.$callWithErrorHandler(Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.readMessages({id:e.chat.id});case 2:e.getChat();case 3:case"end":return t.stop()}}),t)}))))}},computed:{otherPersonName:function(){var e,t,a,r;return(null===(e=this.$store.getters.userData)||void 0===e?void 0:e.id)===(null===(t=this.chat)||void 0===t?void 0:t.User.id)?null===(a=this.chat)||void 0===a?void 0:a.SellerProfile.name:null===(r=this.chat)||void 0===r?void 0:r.User.name},otherPersonAvatar:function(){var e,t,a,r;return(null===(e=this.$store.getters.userData)||void 0===e?void 0:e.id)===(null===(t=this.chat)||void 0===t?void 0:t.User.id)?this.avatar(null===(a=this.chat)||void 0===a?void 0:a.SellerProfile.avatar):this.avatar(null===(r=this.chat)||void 0===r?void 0:r.User.avatar)},userType:function(){var e,t;return(null===(e=this.$store.getters.userData)||void 0===e?void 0:e.id)===(null===(t=this.chat)||void 0===t?void 0:t.User.id)?"customer":"seller"}},beforeMount:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getChat();case 2:e.readMessages();case 3:case"end":return t.stop()}}),t)})))()}},w=f,b=(a("da8a"),a("8336")),x=a("a523"),C=a("adda"),_=a("8654"),y=Object(h["a"])(w,r,s,!1,null,"5d9b077a",null);t["default"]=y.exports;l()(y,{VBtn:b["a"],VCard:v["a"],VContainer:x["a"],VImg:C["a"],VTextField:_["a"]})},"94d5":function(e,t,a){},da8a:function(e,t,a){"use strict";a("94d5")},ef5d:function(e,t,a){"use strict";a("ff8a")},ff8a:function(e,t,a){}}]);
//# sourceMappingURL=chunk-1ac2271e.4c3520e3.js.map