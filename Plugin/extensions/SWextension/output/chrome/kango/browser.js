﻿"use strict";
_kangoLoader.add("kango/browser", function(require, exports, module) {
var utils=require("kango/utils"),object=utils.object,array=utils.array,EventTarget=utils.EventTarget,IEventTarget=utils.IEventTarget,NotImplementedException=utils.NotImplementedException;function BrowserCookie(){this.path=this.hostOnly=this.domain=this.value=this.name="";this.session=this.httpOnly=this.secure=!1;this.expires=0}function BrowserBase(){EventTarget.call(this)}
BrowserBase.prototype=object.extend(EventTarget,{event:{DOCUMENT_COMPLETE:"DocumentComplete",BEFORE_NAVIGATE:"BeforeNavigate",TAB_CHANGED:"TabChanged",TAB_CREATED:"TabCreated",TAB_REMOVED:"TabRemoved",WINDOW_CHANGED:"WindowChanged"},getName:function(){throw new NotImplementedException;},cookies:{getCookies:function(a,b){throw new NotImplementedException;},getCookie:function(a,b,c){throw new NotImplementedException;},setCookie:function(a,b){throw new NotImplementedException;}},tabs:{},windows:{getAll:function(a){throw new NotImplementedException;
},getCurrent:function(a){throw new NotImplementedException;},create:function(a){throw new NotImplementedException;}}});function BrowserTabsBase(){}BrowserTabsBase.prototype={getAll:function(a){throw new NotImplementedException;},getCurrent:function(a){throw new NotImplementedException;},create:function(a){throw new NotImplementedException;},broadcastMessage:function(a,b){this.getAll(function(c){array.forEach(c,function(c){c.dispatchMessage(a,b)})})}};function IBrowserWindow(){}
IBrowserWindow.prototype={getId:function(){throw new NotImplementedException;},getTabs:function(a){throw new NotImplementedException;},getCurrentTab:function(a){throw new NotImplementedException;},isActive:function(){throw new NotImplementedException;}};function IBrowserTab(){}
IBrowserTab.prototype={getId:function(){throw new NotImplementedException;},getUrl:function(){throw new NotImplementedException;},getTitle:function(){throw new NotImplementedException;},getDOMWindow:function(){throw new NotImplementedException;},isActive:function(){throw new NotImplementedException;},isPrivate:function(){throw new NotImplementedException;},navigate:function(a){throw new NotImplementedException;},activate:function(){throw new NotImplementedException;},dispatchMessage:function(a,b){throw new NotImplementedException;
},close:function(){throw new NotImplementedException;}};function getPublicApi(){return utils.createApiWrapper(module.exports,BrowserBase.prototype,IEventTarget.prototype)};








var utils=require("kango/utils"),func=utils.func,array=utils.array,object=utils.object;function BrowserTabs(){}BrowserTabs.prototype=object.extend(BrowserTabsBase,{getAll:function(a){chrome.tabs.query({windowType:"normal"},function(b){a(array.map(b,function(a){return new BrowserTab(a)}))})},getCurrent:function(a){chrome.tabs.query({currentWindow:!0,active:!0},function(b){a(new BrowserTab(b[0]))})},create:function(a){chrome.tabs.create({url:a.url,active:"undefined"!=typeof a.focused?a.focused:!0})}});
function Browser(){BrowserBase.call(this);this.tabs=new BrowserTabs;chrome.tabs.onActivated.addListener(func.bind(this._onTabChanged,this));chrome.tabs.onCreated.addListener(func.bind(this._onTabCreated,this));chrome.tabs.onRemoved.addListener(func.bind(this._onTabRemoved,this));chrome.windows.onFocusChanged.addListener(func.bind(this._onWindowChanged,this));chrome.webNavigation&&(chrome.webNavigation.onBeforeNavigate.addListener(func.bind(this._onBeforeNavigate,this)),chrome.webNavigation.onCompleted.addListener(func.bind(this._onNavigationCompleted,
this)))}
Browser.prototype=object.extend(BrowserBase,{_onBeforeNavigate:function(a){0==a.frameId&&0<a.tabId&&chrome.tabs.get(a.tabId,func.bind(function(b){"undefined"!=typeof b&&(b={url:a.url,target:new BrowserTab(b)},this.fireEvent(this.event.BEFORE_NAVIGATE,b))},this))},_onNavigationCompleted:function(a){0==a.frameId&&0<a.tabId&&chrome.tabs.get(a.tabId,func.bind(function(b){"undefined"!=typeof b&&(b={url:a.url,title:b.title,target:new BrowserTab(b)},this.fireEvent(this.event.DOCUMENT_COMPLETE,b))},this))},
_onTabCreated:function(a){this.fireEvent(this.event.TAB_CREATED,{tabId:a.id,target:new BrowserTab(a)})},_onTabRemoved:function(a,b){this.fireEvent(this.event.TAB_REMOVED,{tabId:a})},_onTabChanged:function(a){0<a.tabId&&chrome.tabs.get(a.tabId,func.bind(function(b){"undefined"!=typeof b&&(b={url:b.url,title:b.title,tabId:a.tabId,target:new BrowserTab(b)},this.fireEvent(this.event.TAB_CHANGED,b))},this))},_onWindowChanged:function(a){0<a&&chrome.windows.get(a,func.bind(function(b){this.fireEvent(this.event.WINDOW_CHANGED,
{target:new BrowserWindow(b),windowId:a})},this))},getName:function(){return"chrome"},cookies:{getCookies:function(a,b){chrome.cookies.getAll({url:a},function(a){b(array.map(a,function(a){return{name:a.name,value:a.value,domain:a.domain,hostOnly:a.hostOnly,path:a.path,secure:a.secure,httpOnly:a.httpOnly,session:a.session,expires:a.expirationDate}}))})},getCookie:function(a,b,c){chrome.cookies.get({url:a,name:b},function(a){var b=null;null!=a&&(b={name:a.name,value:a.value,domain:a.domain,hostOnly:a.hostOnly,
path:a.path,secure:a.secure,httpOnly:a.httpOnly,session:a.session,expires:a.expirationDate});c(b)})},setCookie:function(a,b){var c={url:a,name:b.name,value:b.value};"undefined"!=typeof b.expires&&(c.expirationDate=b.expires);chrome.cookies.set(c)}},windows:{getAll:function(a){chrome.windows.getAll({populate:!1},function(b){a(array.map(b,function(a){return new BrowserWindow(a)}))})},getCurrent:function(a){chrome.windows.getCurrent(function(b){a(new BrowserWindow(b))})},create:function(a){chrome.windows.create({url:a.url,
type:a.type,width:a.width,height:a.height})}}});function BrowserWindow(a){this._window=a}BrowserWindow.prototype={getId:function(){return this._window.id},getTabs:function(a){chrome.tabs.query({windowId:this._window.id},function(b){a(array.map(b,function(a){return new BrowserTab(a)}))})},getCurrentTab:function(a){chrome.tabs.query({active:!0,windowId:this._window.id},function(b){a(new BrowserTab(b[0]))})},isActive:function(){return this._window.focused}};function BrowserTab(a){this._tab=a}
BrowserTab.prototype={getId:function(){return this._tab.id},getUrl:function(){return this._tab.url},getTitle:function(){return this._tab.title},getDOMWindow:function(){return null},isActive:function(){return this._tab.active},isPrivate:function(){return this._tab.incognito},navigate:function(a){chrome.tabs.update(this._tab.id,{url:a})},activate:function(){chrome.tabs.update(this._tab.id,{active:!0})},dispatchMessage:function(a,b){if(0!=this.getUrl().indexOf("chrome://")){var c={name:a,data:b,origin:"background",
target:null,source:null,tab:{id:this.getId(),isPrivate:this.isPrivate()}};chrome.tabs.sendMessage(this.getId(),c);return!0}return!1},close:function(){chrome.tabs.remove(this.getId())}};module.exports=new Browser;module.exports.getPublicApi=getPublicApi;module.exports.BrowserTab=BrowserTab;

});