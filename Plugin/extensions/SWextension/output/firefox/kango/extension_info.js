﻿var utils=require("kango/utils"),object=utils.object;
function ExtensionInfo(a){this.getRawData=function(){return object.clone(a)};this.update=function(b){object.mixin(a,b);object.mixin(this,b)};this.homepage_url=this.creator=this.description=this.version=this.name="";this.background_scripts=[];this.content_scripts=[];this.browser_button=null;this.options_page=this.update_path_url="";this.context_menu_item=null;this.default_locale="";this.permissions={};this.debug=!1;this.modules=[];this.settings={};object.mixin(this,a)};








module.exports=new ExtensionInfo(__extensionInfo);
