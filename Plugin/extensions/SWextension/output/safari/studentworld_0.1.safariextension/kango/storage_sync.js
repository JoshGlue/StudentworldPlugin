﻿"use strict";
_kangoLoader.add("kango/storage_sync", function(require, exports, module) {
function StorageSyncModule(b,f,d){var c="undefined"!=typeof module,e={setItem:function(a){b.setItem(a.name,a.value,!c)},removeItem:function(a){return b.removeItem(a.name,!c)},clear:function(){return b.clear(!c)}};f("message",function(a){var b=a.data,d=a.name.split("_");if("KangoStorage"==d[0])for(var c in e)if(e.hasOwnProperty(c)&&c==d[1]){e[c](b,a.source);break}});b.addEventListener("setItem",function(a){d(["KangoStorage",a.type].join("_"),a.data)});b.addEventListener("removeItem",function(a){d(["KangoStorage",
a.type].join("_"),a.data)});b.addEventListener("clear",function(a){d(["KangoStorage",a.type].join("_"))})}"undefined"!=typeof module&&(module.exports=StorageSyncModule);

});