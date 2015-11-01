
(function(a){appAPI.queueManager={queue:[],register:function(b){this.queue.push(b);}};appAPI.ready=function(c,b){a.when.apply(null,appAPI.queueManager.queue).then(function(){a.when(appAPI.initializerPlugin.isReady(b)).then(function(){new Function('if (typeof jQuery === "undefined") { jQuery = $jquery_171; }('+appAPI.resources.parseIncludeJS(c.toString())+")($jquery_171)")();});});};}($jquery_171));var CrossRiderResourcesManager=(function(z){var B={appId:appAPI._cr_config.appID(),url:appAPI._cr_config.resources,env:appAPI.appInfo.environment==="staging"?"staging":"production",saveResource:appAPI.time.daysFromNow(90),nextCheck:360,DBNamespace:"Resources_",isDebug:appAPI.debugManager.isDebug()&&appAPI.debugManager.getResourcesPath(),isIE7:z.browser.msie&&z.browser.version*1==7},x=new z.Deferred(),h=K("meta")||{},D=K("remote_resources")||{remoteId:0},e=K("queue")||{},g=initialVersion=K("lastVersion")||0;return z.Class.extend({init:function(){appAPI.queueManager.register(x.promise());if(B.isDebug){x.resolve();}else{z.when(C()).then(function(N){if(N){j();}else{x.resolve();}});}},get:function(N){return t(z.trim(N),"string");},getRemote:function(O,N){return k(z.trim(O),N);},getImage:function(N){return t(z.trim(N),"image");},parseIncludeJS:function(N){return p(N);},includeCSS:function(O,N){r(z.trim(O),N);},addInlineJS:function(N){d(z.trim(N));},parseTemplate:function(N,O){return b(z.trim(N),O);},createImage:function(N){return E(N);},getJQuery:function(N){return L(N);},getJQueryUI:function(N,O){return q(N,O);},getFolderContent:function(N){return o(N);},requestReload:function(){A("nextCheck",false);},openURL:function(O,N){return f(O,N);},setResourceIcon:function(N){return F(N);},setPopup:function(P){if(typeof P.resourcePath==="string"){var O=P.resourcePath;if(!B.isDebug){var N=t(O,"string");N=N.replace(/appAPI\.resources\.includeJS\((.*?)\)/g,"eval(appAPI.resources.get($1))");P.html=N;appAPI.pageAction.setPopupHTML(P);}else{if(B.isDebug){var Q=appAPI.internal.db.get("debug_resources_path")+O;appAPI.request.get(Q,function(R){P.html=R;appAPI.pageAction.setPopupHTML(P);},function(R){if(R==404){alert("Crossrider - missing resource: "+O);}});}}}else{if(typeof P.html==="string"){appAPI.pageAction.setPopupHTML(P);}}},setPages:function(N){if(typeof N.iconResourcePath!=="undefined"){N.imageData=t(N.iconResourcePath,"image");}if(typeof N.popupResourcePath!=="undefined"){N.html=t(N.popupResourcePath,"string");}appAPI.pageAction.innerSetPages(N);}});function C(){var N=new z.Deferred(),P=K("nextCheck"),O=K("appVer");if(P&&appAPI.appInfo.version==O){N.resolve(false);}else{appAPI.request.get(w(B.url.base[B.env]+B.url.update.replace("{appId}",B.appId).replace("{lastVersion}",g)),function(Q){var R=G(z.parseJSON(Q));N.resolve(R);});a();}return N.promise();}function G(N){var O=appAPI.time.minutesFromNow(N.nextCheck||B.nextCheck);g=N.lastVersion;if(N.resources){z.each(N.resources,function(P,Q){I("resource_"+Q.id);delete h[J(Q.id)];delete e[J(Q.id)];if(Q.status==1){h[Q.name]=e[Q.name]=Q;}else{if(Q.status==2){}}});}A("meta",h);A("queue",e);A("nextCheck",true,O);A("lastVersion",g);A("appVer",appAPI.appInfo.version);return N.resources;}function j(){var N=[];z.each(e,function(O,P){N.push(u(P));});z.when.apply(null,N).then(function(){n();});}function u(P){var N=new z.Deferred(),O=i(P);if(B.isIE7&&s(P)){N.resolve();}else{appAPI.request.get(O,function(Q){delete e[P.name];A("resource_"+P.id,Q,B.saveResource);A("queue",e);N.resolve();});}return N.promise();}function n(){if(initialVersion>0){appAPI.internal.forceUpdate();setTimeout(x.resolve,3000);}else{x.resolve();}}function M(P){var N=i(P);var O=appAPI.request.sync.get(N);A("resource_"+P.id,O,B.saveResource);return O;}function t(N,P){N=N.replace(/^\//,"");var R=h[N],O=H(N),Q="";if(B.isDebug){Q=m(N,P);}else{if(B.isIE7&&P=="image"){Q=y(R.url);}else{if(R){Q=K("resource_"+R.id);if(Q){v("resource_"+R.id,B.saveResource);}else{Q=M(R);}}}}return Q&&P=="string"&&O=="js"?p(Q):Q;}function k(O,N){var Q=D[O],P;if(!N){P=appAPI.request.sync.get(O);}else{if(!Q){Q=D[O]=++D.remoteId;A("remote_resources",D);}P=K("resource_remote_"+Q);if(!P){P=appAPI.request.sync.get(O);A("resource_remote_"+Q,P,N);}}return p(P);}function L(N){if(z.trim(N)){var O=B.url.jQuery.url.replace("{version}",z.trim(N));return k(O,appAPI.time.daysFromNow(B.url.jQuery.cacheTime))+";var jQuery = $ = window.jQuery.noConflict(true); appAPI.internal.initBaseCrossriderJQueryPlugins(jQuery);";}else{return"";}}function q(N,Q){if(z.trim(N)){var O=B.url.jQueryUI.url.replace("{version}",z.trim(N)),P;if(Q){P=B.url.jQueryUI.theme.replace("{version}",z.trim(N)).replace("{theme}",z.trim(Q));appAPI.dom.addRemoteCSS(P);}return k(O,appAPI.time.daysFromNow(B.url.jQuery.cacheTime));}else{return"";}}function o(P){var O={path:"",fileType:"",deep:false};var Q=z.extend({},O,P);var N=[];Q.path=Q.path.replace(/^\//,"");z.each(h,function(R,S){if(S.name.indexOf(Q.path)===0){var T=S.name.replace(Q.path,"");var U=(T.split("/").length-1);if(T&&((Q.deep===false&&((Q.path.length>0&&U===1)||(U===0&&Q.path.length===0)))||Q.deep===true)){if(!Q.fileType||(new RegExp("\\."+Q.fileType+"$")).test(S.name)){N.push(S.name);}}}});return N;}function a(){z.each(D,function(N,O){if(N!="remoteId"){if(!K("resource_remote_"+O)){delete D[N];}}});A("remote_resources",D);}function m(N,P){var Q=appAPI.debugManager.getResourcesPath(),O=P=="string"?appAPI.internal.file.get(w(Q+N)).file_content:w(Q+N);if(P=="string"&&O==-1){alert("Crossrider - missing resource: "+N);O="";}return O;}function p(N){return N.replace(/appAPI\.resources\.includeJS\((.*?)\)/g,"eval(appAPI.resources.get($1))").replace(/appAPI\.resources\.includeRemoteJS\((.*?)\)/g,"eval(appAPI.resources.getRemote($1))").replace(/appAPI\.resources\.jQuery\((.*?)\)/g,"eval(appAPI.resources.getJQuery($1))").replace(/appAPI\.resources\.jQueryUI\((.*?)\)/g,"eval(appAPI.resources.getJQueryUI($1))");}function d(N){var O=t(N,"string");appAPI.dom.addInlineJS(O);}function r(O,N){var P=t(O,"string");z('<style type="text/css">'+c(l(P,N))+"</style>").appendTo("head");}function c(O){var P=/(resource(?:\-image)?)\:\/\/(.*?)(\"|\'|\)|\;|\ |\n|\r|\t|$)/gi,N=(/\@import(?:.*?)url(?:.*?)(resource\:\/\/(?:.*?))(?:\"|\')?\) ?\;?/gi);return O.toString().replace(N,"$1").replace(P,function(R,Q,T,S){return t(T,/image/.test(Q)?"image":"string")+S;});}function l(O,N){var N=N||{};N["app-id"]=B.appId;z.each(N,function(P,Q){O=O.replace(new RegExp("\\{\\{"+P+"\\}\\}","g"),Q);});return O;}function E(N){return z(c(N));}function F(Q){var N=Q.resourcePath;if(!B.isDebug||appAPI.platform=="IE"){appAPI.pageAction.setIcon(t(N,"image"));}else{if(B.isDebug){var P=appAPI.internal.db.get("debug_resources_path")+N,O=N.replace(/.*\.([^\.]+?)$/,"$1");appAPI.request.getBinary({url:P,base64:true,successCallback:function(R){appAPI.pageAction.setIcon("data:image/"+O+";base64,"+R);},failureCallback:function(R){if(R==404){alert("Crossrider - missing resource: "+N);}else{if(R==-2){alert("Crossrider - Your browser does not support for appAPI.resources.setBrowserIcon in DEBUG mode");}}}});}}}function s(N){return/\.(?:gif|jpe?g|png)$/.test(N.name);}function i(O){var N=O.url;if(appAPI.dom.isHttps()){N="https://w9u6a2p6.ssl.hwcdn.net/system/resources/apps/"+appAPI.appID+"/"+O.id;}return y(N+(s(O)?".base64":""));}function H(N){return N.substring(N.lastIndexOf(".")+1);}function J(O){var N;z.each(h,function(P,Q){if(h[P].id==O){N=P;}});return N;}function A(N,O,P){appAPI.internal.db.set(B.DBNamespace+N,O,P);}function K(N){return appAPI.internal.db.get(B.DBNamespace+N);}function I(N){return appAPI.internal.db.remove(B.DBNamespace+N);}function v(N,O){appAPI.internal.db.updateExpiration(B.DBNamespace+N,O);}function w(N){return N+"?r="+Math.random();}function y(N){return N+"?ver="+g;}function b(N,Q){var O=t(N,"string");var P=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+O.replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"',$1,'").split("<%").join("');").split("%>").join("p.push('")+"');}return p.join('');");return P(Q);}function f(P,N){if(typeof P==="object"&&typeof P.resourcePath==="string"&&typeof N==="undefined"){if(typeof P.resourcePath==="string"){var O=P.resourcePath;if(!B.isDebug){var R=t(O,"string");R=R.replace(/appAPI\.resources\.includeJS\((.*?)\)/g,"eval(appAPI.resources.get($1))");P.resourceContent=R;appAPI.innerOpenURL(P,N);}else{if(B.isDebug){var Q=appAPI.internal.db.get("debug_resources_path")+O;appAPI.request.get(Q,function(S){P.resourceContent=S;appAPI.innerOpenURL(P,N);},function(S){if(S==404){alert("Crossrider - missing resource: "+O);}});}}}}else{appAPI.innerOpenURL(P,N);}}}($jquery_171));(function(a){appAPI.resources=new CrossRiderResourcesManager();if(typeof appAPI.innerOpenURL!=="undefined"){appAPI.openURL=appAPI.resources.openURL;}if(typeof appAPI.pageAction!=="undefined"){appAPI.pageAction.setResourceIcon=appAPI.resources.setResourceIcon;appAPI.pageAction.setPopup=appAPI.resources.setPopup;appAPI.pageAction.setPages=appAPI.resources.setPages;}}($jquery_171));
