﻿"use strict";
(function() {
var exports = {};
var NotImplementedException=exports.NotImplementedException=function(a){this.prototype=Error.prototype;this.name="NotImplementedException";this.message="Method "+(a?a+" ":"")+"is not implemented";this.toString=function(){return this.name+": "+this.message}};
exports.createApiWrapper=function(a){var c={},b=Array.prototype.slice.call(arguments,1);array.forEach(b,function(b){object.forEach(b,function(b,d){if("_"!=d[0]){if("undefined"==typeof a[d])throw new NotImplementedException(d);c[d]="function"==typeof a[d]?function(){return a[d].apply(a,arguments)}:a[d]}})});return c};var Event=exports.Event=function(a,c,b){this.type=a;this.target=b||null;this.result=null;"object"==typeof c&&object.mixin(this,c)},IEventTarget=exports.IEventTarget=function(){};
IEventTarget.prototype={addEventListener:function(a,c){throw new NotImplementedException;},removeEventListener:function(a,c){throw new NotImplementedException;}};var EventTarget=exports.EventTarget=function(){this._eventListeners={}};
EventTarget.prototype={dispatchEvent:function(a,c){var b=a.type.toLowerCase();if("undefined"!=typeof this._eventListeners[b]){for(var b=this._eventListeners[b],d=0;d<b.length;d++){var f=!1;if("unknown"==typeof b[d].call)f=!0;else{try{var e=b[d](a)}catch(g){if(-2146828218==g.number||-2146823277==g.number)f=!0;else throw g;}"undefined"!=typeof e&&"undefined"!=typeof c&&(c.value=e)}f&&(b.splice(d,1),d--)}return!0}return!1},fireEvent:function(a,c){var b={value:null},d=this.dispatchEvent(new Event(a,c),
b);d&&null!=b.value&&(c.result=b.value);return d},addEventListener:function(a,c){if("undefined"!=typeof c.call&&"undefined"!=typeof c.apply){for(var b=a.toLowerCase(),b=this._eventListeners[b]=this._eventListeners[b]||[],d=0;d<b.length;d++)if(b[d]==c)return!1;b.push(c);return!0}return!1},removeEventListener:function(a,c){var b=a.toLowerCase();if("undefined"!=typeof this._eventListeners[b])for(var b=this._eventListeners[b],d=0;d<b.length;d++)if(b[d]==c)return b.splice(d,1),!0;return!1},removeAllEventListeners:function(){this._eventListeners=
{}}};
var array=exports.array={map:function(a,c,b){for(var d=a.length,f=Array(d),e=0;e<d;e++)f[e]=c.call(b||null,a[e],e);return f},forEach:function(a,c,b){for(var d=a.length,f=0;f<d;f++)c.call(b||null,a[f],f)},filter:function(a,c,b){for(var d=[],f=a.length,e=0;e<f;e++)c.call(b||null,a[e],e)&&d.push(a[e]);return d},remove:function(a,c){for(var b;-1!=(b=a.indexOf(c));)a.splice(b,1)}},string=exports.string={format:function(a,c){if("object"==typeof c&&null!=c)object.forEach(c,function(b,f){a=a.replace(RegExp("\\{"+f+
"}","g"),c[f])});else for(var b=1;b<arguments.length;b++)a=a.replace(RegExp("\\{"+(b-1)+"}","g"),arguments[b]);return a},isAlpha:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a},isDigit:function(a){return"0"<=a&&"9">=a},parseUri:function(a){a=a.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/);return{scheme:a[2],authority:a[4],path:a[5],query:a[7],fragment:a[9]}}},object=exports.object={getKeys:function(a){var c=[],b;for(b in a)a.hasOwnProperty(b)&&c.push(b);return c},isArray:function(a){return a instanceof
Array||"[object Array]"==Object.prototype.toString.call(a)},isObject:function(a){return"object"==typeof a||"[object Object]"==Object.prototype.toString.call(a)},isString:function(a){return"string"==typeof a||a instanceof String},clone:function(a){return JSON.parse(JSON.stringify(a))},copy:function(a){var c={};this.forEach(a,function(a,d){c[d]=a});return c},sanitize:function(a){return JSON.parse(JSON.stringify(a))},resolveName:function(a,c){for(var b=a,d=c.split("."),f=d.pop(),e=0;e<d.length;e++)b=
b[d[e]];return{parent:b,terminalName:f}},resolveOrCreateName:function(a,c){for(var b=a,d=c.split("."),f=d.pop(),e=0;e<d.length;e++)b[d[e]]=b[d[e]]||{},b=b[d[e]];return{parent:b,terminalName:f,setValue:function(a){b[f]=a}}},forEach:function(a,c,b){for(var d in a)a.hasOwnProperty(d)&&c.call(b||null,a[d],d)},extend:function(a,c){return this.mixin(this.create(a.prototype),c)},mixin:function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b]);return a},create:function(a){var c=function(){};c.prototype=
a;return new c},freeze:function(a){return Object.freeze?Object.freeze(a):a}},date=exports.date={diff:function(a,c){return Math.ceil((a.getTime()-c.getTime())/1E3)||0}},func=exports.func={isCallable:function(a){return"function"==typeof a||a&&"undefined"!=typeof a.call&&"undefined"!=typeof a.apply},bind:function(a,c){var b=Array.prototype.slice.call(arguments,2);return function(){return a.apply(c,b.concat(Array.prototype.slice.call(arguments,0)))}},invoke:function(a,c,b){a=object.resolveName(a,c);c=
a.parent;return c[a.terminalName].apply(c,b)},decorate:function(a,c){return function(){return c.call(this,a,arguments)}}},utils=exports.utils={getDomainFromId:function(a){for(var c="",b=0;b<a.length;b++)if(string.isAlpha(a[b])||string.isDigit(a[b])||"-"==a[b])c+=a[b];return c.toLowerCase()}};

function InvokeAsyncModule(p,q,k,g){function r(a){var b=arguments[arguments.length-1],c=b.isCallbackInvoke?l:m,d=Array.prototype.slice.call(arguments,1,arguments.length-1),e=null;b.isNotifyInvoke||(e=(Math.random()+s++).toString(),f[e]=b);q(c,{id:e,method:a,params:d})}var m="KangoInvokeAsyncModule_invoke",l="KangoInvokeAsyncModule_invokeCallback",f={},s=0,h=function(a){return"undefined"!=typeof a.call&&"undefined"!=typeof a.apply},t=function(a,b){var c={id:a.id,result:null,error:null};try{c.result=
k(a.method,a.params)}catch(d){var e=d.message;d.stack&&(e+="\nStack:\n"+d.stack);c.error=e;g("Error during async call method "+a.method+". Details: "+e,d)}null!=a.id&&b.dispatchMessage("KangoInvokeAsyncModule_result",c)},u=function(a,b){var c={id:a.id,result:null,error:null};try{a.params.push(function(d){c.result=d;null!=a.id&&b.dispatchMessage("KangoInvokeAsyncModule_result",c)}),k(a.method,a.params)}catch(d){c.error=d.toString(),null!=a.id?b.dispatchMessage("KangoInvokeAsyncModule_result",c):g("Error during async call method "+
a.method+". Details: "+c.error,d)}},v=function(a,b){if("undefined"!=typeof a.id&&"undefined"!=typeof f[a.id]){var c=f[a.id];try{if(null==a.error&&h(c.onSuccess))c.onSuccess(a.result);else if(h(c.onError))c.onError(a.error)}finally{delete f[a.id]}}};p("message",function(a){var b={};b[m]=t;b[l]=u;b.KangoInvokeAsyncModule_result=v;var c=a.data,d;for(d in b)if(b.hasOwnProperty(d)&&d==a.name){b[d](c,a.source);break}});var n=function(a,b){b=Array.prototype.slice.call(b,0);var c=b[b.length-1],d={onSuccess:function(){},
onError:function(a){g("Error during async call method "+b[0]+". Details: "+a)},isCallbackInvoke:a,isNotifyInvoke:!1};null!=c&&h(c)?(d.onSuccess=function(a){c(a)},b[b.length-1]=d):(d.isNotifyInvoke=!0,b.push(d));r.apply(this,b)};this.invokeAsync=function(a){n(!1,arguments)};this.invokeAsyncCallback=function(a){n(!0,arguments)}}"undefined"!=typeof module&&(module.exports=InvokeAsyncModule);

function StorageSyncModule(b,f,d){var c="undefined"!=typeof module,e={setItem:function(a){b.setItem(a.name,a.value,!c)},removeItem:function(a){return b.removeItem(a.name,!c)},clear:function(){return b.clear(!c)}};f("message",function(a){var b=a.data,d=a.name.split("_");if("KangoStorage"==d[0])for(var c in e)if(e.hasOwnProperty(c)&&c==d[1]){e[c](b,a.source);break}});b.addEventListener("setItem",function(a){d(["KangoStorage",a.type].join("_"),a.data)});b.addEventListener("removeItem",function(a){d(["KangoStorage",
a.type].join("_"),a.data)});b.addEventListener("clear",function(a){d(["KangoStorage",a.type].join("_"))})}"undefined"!=typeof module&&(module.exports=StorageSyncModule);

function MessageTargetModule(g){var a={},h=this.addMessageListener=function(d,c){if("undefined"!=typeof c.call&&"undefined"!=typeof c.apply){a[d]=a[d]||[];for(var b=0;b<a[d].length;b++)if(a[d][b]==c)return!1;a[d].push(c);return!0}return!1};this.removeMessageListener=function(d,c){if("undefined"!=typeof a[d])for(var b=0;b<a[d].length;b++)if(a[d][b]==c)return a[d].splice(b,1),!0;return!1};this.removeAllMessageListeners=function(){a={}};g("message",function(d){var c=d.name;if("undefined"!=typeof a[c])for(var b=
0;b<a[c].length;b++){var e=!1;if("unknown"==typeof a[c][b].call)e=!0;else try{a[c][b](d)}catch(f){if(-2146828218==f.number||-2146823277==f.number)e=!0;else throw f;}e&&(a[c].splice(b,1),b--)}});this.onMessage=function(a,c,b){h(a,function(a){c(a.data,function(b,c){a.source.dispatchMessage(b,c)})})}}"undefined"!=typeof module&&(module.exports=MessageTargetModule);

var kango=window.kango={};kango.lang={evalInSandbox:function(a,c,b){(new Function(c+"\n//# sourceURL=sandboxed-"+b+".js"))()},evalScriptsInSandbox:function(a,c,b){for(var d="",e=0;e<c.length;e++){for(var f=0;f<c[e].requires.length;f++)d+=c[e].requires[f].text+"\n\n";d+=c[e].text+"\n\n"}return this.evalInSandbox(a,d,b)}};kango.console={log:function(a){console.log(a)},warn:function(a){console.warn(a)},error:function(a){console.error(a)}};kango.tab={isPrivate:function(){return!1}};
kango.xhr={send:function(a,c){var b=a.contentType;if("xml"==b||"json"==b)a.contentType="text";a.sanitizeData=!0;kango.invokeAsyncCallback("kango.xhr.send",a,function(d){if(""!=d.response&&null!=d.response)if("json"==b)try{d.response=JSON.parse(d.response)}catch(e){d.response=null}else if("xml"==b)try{var f=new DOMParser;d.response=f.parseFromString(d.response,"text/xml")}catch(g){d.response=null}a.contentType=b;c(d)})}};
var apiReady=function(){var a=!1,c=[];return{on:function(b){a?b():c.push(b)},fire:function(){a=!0;array.forEach(c,function(b){b()});c=[]}}}();
function initStorage(a){var c=a;kango.storage={setItem:function(b,d,a){"undefined"!=typeof d?"function"!=typeof d&&(c[b]=d,a||this.fireEvent("setItem",{data:{name:b,value:d}})):this.removeItem(b)},getItem:function(b){return"undefined"!=typeof c[b]?c[b]:null},removeItem:function(b,a){delete c[b];a||this.fireEvent("removeItem",{data:{name:b}})},getKeys:function(){var b=[],a;for(a in c)c.hasOwnProperty(a)&&b.push(a);return b},clear:function(a){c={};a||this.fireEvent("clear")}};object.mixin(kango.storage,
EventTarget.prototype);object.mixin(kango.storage,new EventTarget);StorageSyncModule(kango.storage,func.bind(kango.addEventListener,kango),func.bind(kango.dispatchMessage,kango))}function initI18n(a,c){kango.i18n={getMessages:function(){return c},getMessage:function(a){var d=c[a]?c[a]:a;return 1<arguments.length?string.format.apply(string,[d].concat(Array.prototype.slice.call(arguments,1))):d},getCurrentLocale:function(){return a}}}
function initApi(){initMessaging();var a=new MessageTargetModule(func.bind(kango.addEventListener,kango));kango.addMessageListener=func.bind(a.addMessageListener,a);kango.removeMessageListener=func.bind(a.removeMessageListener,a);a=new InvokeAsyncModule(func.bind(kango.addEventListener,kango),func.bind(kango.dispatchMessage,kango),null,func.bind(kango.console.log,kango.console));kango.invokeAsync=a.invokeAsync;kango.invokeAsyncCallback=a.invokeAsyncCallback;kango.invokeAsync("modules/kango/extension_info/getRawData",
function(a){kango.getExtensionInfo=function(){return a};kango.invokeAsync("modules/kango/storage/storage.getItems",function(a){initStorage(a);kango.invokeAsync("modules/kango/i18n/getCurrentLocale",function(a){kango.invokeAsync("modules/kango/i18n/getMessages",function(b){initI18n(a,b);apiReady.fire()})})})})};








kango.browser={getName:function(){return"safari"}};kango.io={getResourceUrl:function(c){return safari.extension.baseURI+c}};
function initMessaging(){var c=[];safari.self.addEventListener("message",function(a){a={name:a.name,data:a.message,origin:"background",source:kango,target:kango};for(var b=0;b<c.length;b++)c[b](a)});kango.dispatchMessage=function(a,b){safari.self.tab.dispatchMessage(a,b);return!0};kango.addEventListener=function(a,b){if("message"==a){for(var d=0;d<c.length;d++)if(c[d]==b)return;c.push(b)}}};

(function(e){var f=function(c){var a=c("kango/core").createApiInstance("popup");"undefined"!=typeof window.addEventListener?window.addEventListener("unload",function(){a.clear()},!1):window.attachEvent("onunload",function(){a.clear()});return a.obj};e.KangoAPI=new function(){var c=[],a=!1;this.onReady=function(b){a?b():c.push(b)};this.closeWindow=function(){};this.resizeWindow=function(b,a){};this.getBackgroundPage=function(){};this._fireReady=function(){if(KangoAPI.getBackgroundPage()){var b=KangoAPI._require("kango/utils").object;
b.forEach(f(KangoAPI._require),function(a,b){window[b]=a})}for(var d=0;d<c.length;d++)c[d]();a=!0;delete this._fireReady;delete this._require;b&&b.freeze(this)}}})(window);








window.addEventListener("DOMContentLoaded",function(){if("undefined"!=typeof safari.extension.globalPage){var a=safari.extension.globalPage.contentWindow._kangoLoader.require;KangoAPI.getBackgroundPage=function(){return safari.extension.globalPage.contentWindow};KangoAPI.closeWindow=function(){a("kango-ui/browser_button").closePopup()};KangoAPI.resizeWindow=function(b,a){safari.self.width=b;safari.self.height=a};KangoAPI._require=function(b){return a(b)}}else initApi(),KangoAPI.closeWindow=function(){window.close()};
KangoAPI._fireReady()},!1);


})();