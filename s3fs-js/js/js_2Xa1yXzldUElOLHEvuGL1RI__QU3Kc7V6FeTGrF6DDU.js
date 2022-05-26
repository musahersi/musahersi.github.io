/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
;
/*!
 * jQuery Form Plugin
 * version: 2.69 (06-APR-2011)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(a){function b(){if(a.fn.ajaxSubmit.debug){var b="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(b):window.opera&&window.opera.postError&&window.opera.postError(b)}}a.fn.ajaxSubmit=function(c){function r(){function t(){if(!j.aborted){var c=i.contentWindow?i.contentWindow.document:i.contentDocument?i.contentDocument:i.document;if(!c||c.location.href==e.iframeSrc)if(!m)return;i.detachEvent?i.detachEvent("onload",t):i.removeEventListener("load",t,!1);var d=!0;try{if(m)throw"timeout";var f=e.dataType=="xml"||c.XMLDocument||a.isXMLDoc(c);b("isXml="+f);if(!f&&window.opera&&(c.body==null||c.body.innerHTML=="")&&--s){b("requeing onLoad callback, DOM not available"),setTimeout(t,250);return}j.responseText=c.body?c.body.innerHTML:c.documentElement?c.documentElement.innerHTML:null,j.responseXML=c.XMLDocument?c.XMLDocument:c,j.getResponseHeader=function(a){var b={"content-type":e.dataType};return b[a]};var g=/(json|script)/.test(e.dataType);if(g||e.textarea){var l=c.getElementsByTagName("textarea")[0];if(l)j.responseText=l.value;else if(g){var n=c.getElementsByTagName("pre")[0],o=c.getElementsByTagName("body")[0];n?j.responseText=n.textContent:o&&(j.responseText=o.innerHTML)}}else e.dataType=="xml"&&!j.responseXML&&j.responseText!=null&&(j.responseXML=u(j.responseText));q=w(j,e.dataType,e)}catch(p){b("error caught:",p),d=!1,j.error=p,e.error&&e.error.call(e.context,j,"error",p),k&&a.event.trigger("ajaxError",[j,e,p])}j.aborted&&(b("upload aborted"),d=!1),d&&(e.success&&e.success.call(e.context,q,"success",j),k&&a.event.trigger("ajaxSuccess",[j,e])),k&&a.event.trigger("ajaxComplete",[j,e]),k&&!--a.active&&a.event.trigger("ajaxStop"),e.complete&&e.complete.call(e.context,j,d?"success":"error"),setTimeout(function(){h.removeData("form-plugin-onload"),h.remove(),j.responseXML=null},100)}}function p(){var b=l.attr("target"),c=l.attr("action");d.setAttribute("target",f),d.getAttribute("method")!="POST"&&d.setAttribute("method","POST"),d.getAttribute("action")!=e.url&&d.setAttribute("action",e.url),e.skipEncodingOverride||l.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),e.timeout&&setTimeout(function(){m=!0,t()},e.timeout);var g=[];try{if(e.extraData)for(var j in e.extraData)g.push(a('<input type="hidden" name="'+j+'" value="'+e.extraData[j]+'" />').appendTo(d)[0]);h.appendTo("body"),i.attachEvent?i.attachEvent("onload",t):i.addEventListener("load",t,!1),d.submit()}finally{d.setAttribute("action",c),b?d.setAttribute("target",b):l.removeAttr("target"),a(g).remove()}}var d=l[0];if(a(":input[name=submit],:input[id=submit]",d).length)alert('Error: Form elements must not have name or id of "submit".');else{var e=a.extend(!0,{},a.ajaxSettings,c);e.context=e.context||e;var f="jqFormIO"+(new Date).getTime(),g="_"+f,h=a('<iframe id="'+f+'" name="'+f+'" src="'+e.iframeSrc+'" />'),i=h[0];h.css({position:"absolute",top:"-1000px",left:"-1000px"});var j={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(){b("aborting upload...");var c="aborted";this.aborted=1,h.attr("src",e.iframeSrc),j.error=c,e.error&&e.error.call(e.context,j,"error",c),k&&a.event.trigger("ajaxError",[j,e,c]),e.complete&&e.complete.call(e.context,j,"error")}},k=e.global;k&&!(a.active++)&&a.event.trigger("ajaxStart"),k&&a.event.trigger("ajaxSend",[j,e]);if(e.beforeSend&&e.beforeSend.call(e.context,j,e)===!1){e.global&&a.active--;return}if(j.aborted)return;var m=0,n=d.clk;if(n){var o=n.name;o&&!n.disabled&&(e.extraData=e.extraData||{},e.extraData[o]=n.value,n.type=="image"&&(e.extraData[o+".x"]=d.clk_x,e.extraData[o+".y"]=d.clk_y))}e.forceSync?p():setTimeout(p,10);var q,r,s=50,u=a.parseXML||function(a,b){window.ActiveXObject?(b=new ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(a)):b=(new DOMParser).parseFromString(a,"text/xml");return b&&b.documentElement&&b.documentElement.nodeName!="parsererror"?b:null},v=a.parseJSON||function(a){return window.eval("("+a+")")},w=function(b,c,d){var e=b.getResponseHeader("content-type")||"",f=c==="xml"||!c&&e.indexOf("xml")>=0,g=f?b.responseXML:b.responseText;f&&g.documentElement.nodeName==="parsererror"&&a.error&&a.error("parsererror"),d&&d.dataFilter&&(g=d.dataFilter(g,c)),typeof g=="string"&&(c==="json"||!c&&e.indexOf("json")>=0?g=v(g):(c==="script"||!c&&e.indexOf("javascript")>=0)&&a.globalEval(g));return g}}}if(!this.length){b("ajaxSubmit: skipping submit process - no element selected");return this}typeof c=="function"&&(c={success:c});var d=this.attr("action"),e=typeof d=="string"?a.trim(d):"";e&&(e=(e.match(/^([^#]+)/)||[])[1]),e=e||window.location.href||"",c=a.extend(!0,{url:e,success:a.ajaxSettings.success,type:this[0].getAttribute("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},c);var f={};this.trigger("form-pre-serialize",[this,c,f]);if(f.veto){b("ajaxSubmit: submit vetoed via form-pre-serialize trigger");return this}if(c.beforeSerialize&&c.beforeSerialize(this,c)===!1){b("ajaxSubmit: submit aborted via beforeSerialize callback");return this}var g,h,i=this.formToArray(c.semantic);if(c.data){c.extraData=c.data;for(g in c.data)if(c.data[g]instanceof Array)for(var j in c.data[g])i.push({name:g,value:c.data[g][j]});else h=c.data[g],h=a.isFunction(h)?h():h,i.push({name:g,value:h})}if(c.beforeSubmit&&c.beforeSubmit(i,this,c)===!1){b("ajaxSubmit: submit aborted via beforeSubmit callback");return this}this.trigger("form-submit-validate",[i,this,c,f]);if(f.veto){b("ajaxSubmit: submit vetoed via form-submit-validate trigger");return this}var k=a.param(i);c.type.toUpperCase()=="GET"?(c.url+=(c.url.indexOf("?")>=0?"&":"?")+k,c.data=null):c.data=k;var l=this,m=[];c.resetForm&&m.push(function(){l.resetForm()}),c.clearForm&&m.push(function(){l.clearForm()});if(!c.dataType&&c.target){var n=c.success||function(){};m.push(function(b){var d=c.replaceTarget?"replaceWith":"html";a(c.target)[d](b).each(n,arguments)})}else c.success&&m.push(c.success);c.success=function(a,b,d){var e=c.context||c;for(var f=0,g=m.length;f<g;f++)m[f].apply(e,[a,b,d||l,l])};var o=a("input:file",this).length>0,p="multipart/form-data",q=l.attr("enctype")==p||l.attr("encoding")==p;c.iframe!==!1&&(o||c.iframe||q)?c.closeKeepAlive?a.get(c.closeKeepAlive,r):r():a.ajax(c),this.trigger("form-submit-notify",[this,c]);return this},a.fn.ajaxForm=function(c){if(this.length===0){var d={s:this.selector,c:this.context};if(!a.isReady&&d.s){b("DOM not ready, queuing ajaxForm"),a(function(){a(d.s,d.c).ajaxForm(c)});return this}b("terminating; zero elements found by selector"+(a.isReady?"":" (DOM not ready)"));return this}return this.ajaxFormUnbind().bind("submit.form-plugin",function(b){b.isDefaultPrevented()||(b.preventDefault(),a(this).ajaxSubmit(c))}).bind("click.form-plugin",function(b){var c=b.target,d=a(c);if(!d.is(":submit,input:image")){var e=d.closest(":submit");if(e.length==0)return;c=e[0]}var f=this;f.clk=c;if(c.type=="image")if(b.offsetX!=undefined)f.clk_x=b.offsetX,f.clk_y=b.offsetY;else if(typeof a.fn.offset=="function"){var g=d.offset();f.clk_x=b.pageX-g.left,f.clk_y=b.pageY-g.top}else f.clk_x=b.pageX-c.offsetLeft,f.clk_y=b.pageY-c.offsetTop;setTimeout(function(){f.clk=f.clk_x=f.clk_y=null},100)})},a.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},a.fn.formToArray=function(b){var c=[];if(this.length===0)return c;var d=this[0],e=b?d.getElementsByTagName("*"):d.elements;if(!e)return c;var f,g,h,i,j,k,l;for(f=0,k=e.length;f<k;f++){j=e[f],h=j.name;if(!h)continue;if(b&&d.clk&&j.type=="image"){!j.disabled&&d.clk==j&&(c.push({name:h,value:a(j).val()}),c.push({name:h+".x",value:d.clk_x},{name:h+".y",value:d.clk_y}));continue}i=a.fieldValue(j,!0);if(i&&i.constructor==Array)for(g=0,l=i.length;g<l;g++)c.push({name:h,value:i[g]});else i!==null&&typeof i!="undefined"&&c.push({name:h,value:i})}if(!b&&d.clk){var m=a(d.clk),n=m[0];h=n.name,h&&!n.disabled&&n.type=="image"&&(c.push({name:h,value:m.val()}),c.push({name:h+".x",value:d.clk_x},{name:h+".y",value:d.clk_y}))}return c},a.fn.formSerialize=function(b){return a.param(this.formToArray(b))},a.fn.fieldSerialize=function(b){var c=[];this.each(function(){var d=this.name;if(!!d){var e=a.fieldValue(this,b);if(e&&e.constructor==Array)for(var f=0,g=e.length;f<g;f++)c.push({name:d,value:e[f]});else e!==null&&typeof e!="undefined"&&c.push({name:this.name,value:e})}});return a.param(c)},a.fn.fieldValue=function(b){for(var c=[],d=0,e=this.length;d<e;d++){var f=this[d],g=a.fieldValue(f,b);if(g===null||typeof g=="undefined"||g.constructor==Array&&!g.length)continue;g.constructor==Array?a.merge(c,g):c.push(g)}return c},a.fieldValue=function(b,c){var d=b.name,e=b.type,f=b.tagName.toLowerCase();c===undefined&&(c=!0);if(c&&(!d||b.disabled||e=="reset"||e=="button"||(e=="checkbox"||e=="radio")&&!b.checked||(e=="submit"||e=="image")&&b.form&&b.form.clk!=b||f=="select"&&b.selectedIndex==-1))return null;if(f=="select"){var g=b.selectedIndex;if(g<0)return null;var h=[],i=b.options,j=e=="select-one",k=j?g+1:i.length;for(var l=j?g:0;l<k;l++){var m=i[l];if(m.selected){var n=m.value;n||(n=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value);if(j)return n;h.push(n)}}return h}return a(b).val()},a.fn.clearForm=function(){return this.each(function(){a("input,select,textarea",this).clearFields()})},a.fn.clearFields=a.fn.clearInputs=function(){return this.each(function(){var a=this.type,b=this.tagName.toLowerCase();a=="text"||a=="password"||b=="textarea"?this.value="":a=="checkbox"||a=="radio"?this.checked=!1:b=="select"&&(this.selectedIndex=-1)})},a.fn.resetForm=function(){return this.each(function(){(typeof this.reset=="function"||typeof this.reset=="object"&&!this.reset.nodeType)&&this.reset()})},a.fn.enable=function(a){a===undefined&&(a=!0);return this.each(function(){this.disabled=!a})},a.fn.selected=function(b){b===undefined&&(b=!0);return this.each(function(){var c=this.type;if(c=="checkbox"||c=="radio")this.checked=b;else if(this.tagName.toLowerCase()=="option"){var d=a(this).parent("select");b&&d[0]&&d[0].type=="select-one"&&d.find("option").selected(!1),this.selected=b}})}})(jQuery);
/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.jplayer.org
 *
 * Copyright (c) 2009 - 2013 Happyworm Ltd
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 * Author: Mark J Panaghiston
 * Version: 2.5.0
 * Date: 7th November 2013
 */

(function(b,f){"function"===typeof define&&define.amd?define(["jquery"],f):b.jQuery?f(b.jQuery):f(b.Zepto)})(this,function(b,f){b.fn.jPlayer=function(a){var c="string"===typeof a,d=Array.prototype.slice.call(arguments,1),e=this;a=!c&&d.length?b.extend.apply(null,[!0,a].concat(d)):a;if(c&&"_"===a.charAt(0))return e;c?this.each(function(){var c=b(this).data("jPlayer"),h=c&&b.isFunction(c[a])?c[a].apply(c,d):c;if(h!==c&&h!==f)return e=h,!1}):this.each(function(){var c=b(this).data("jPlayer");c?c.option(a||
{}):b(this).data("jPlayer",new b.jPlayer(a,this))});return e};b.jPlayer=function(a,c){if(arguments.length){this.element=b(c);this.options=b.extend(!0,{},this.options,a);var d=this;this.element.bind("remove.jPlayer",function(){d.destroy()});this._init()}};"function"!==typeof b.fn.stop&&(b.fn.stop=function(){});b.jPlayer.emulateMethods="load play pause";b.jPlayer.emulateStatus="src readyState networkState currentTime duration paused ended playbackRate";b.jPlayer.emulateOptions="muted volume";b.jPlayer.reservedEvent=
"ready flashreset resize repeat error warning";b.jPlayer.event={};b.each("ready flashreset resize repeat click error warning loadstart progress suspend abort emptied stalled play pause loadedmetadata loadeddata waiting playing canplay canplaythrough seeking seeked timeupdate ended ratechange durationchange volumechange".split(" "),function(){b.jPlayer.event[this]="jPlayer_"+this});b.jPlayer.htmlEvent="loadstart abort emptied stalled loadedmetadata loadeddata canplay canplaythrough".split(" ");b.jPlayer.pause=
function(){b.each(b.jPlayer.prototype.instances,function(a,c){c.data("jPlayer").status.srcSet&&c.jPlayer("pause")})};b.jPlayer.timeFormat={showHour:!1,showMin:!0,showSec:!0,padHour:!1,padMin:!0,padSec:!0,sepHour:":",sepMin:":",sepSec:""};var m=function(){this.init()};m.prototype={init:function(){this.options={timeFormat:b.jPlayer.timeFormat}},time:function(a){var c=new Date(1E3*(a&&"number"===typeof a?a:0)),b=c.getUTCHours();a=this.options.timeFormat.showHour?c.getUTCMinutes():c.getUTCMinutes()+60*
b;c=this.options.timeFormat.showMin?c.getUTCSeconds():c.getUTCSeconds()+60*a;b=this.options.timeFormat.padHour&&10>b?"0"+b:b;a=this.options.timeFormat.padMin&&10>a?"0"+a:a;c=this.options.timeFormat.padSec&&10>c?"0"+c:c;b=""+(this.options.timeFormat.showHour?b+this.options.timeFormat.sepHour:"");b+=this.options.timeFormat.showMin?a+this.options.timeFormat.sepMin:"";return b+=this.options.timeFormat.showSec?c+this.options.timeFormat.sepSec:""}};var n=new m;b.jPlayer.convertTime=function(a){return n.time(a)};
b.jPlayer.uaBrowser=function(a){a=a.toLowerCase();var c=/(opera)(?:.*version)?[ \/]([\w.]+)/,b=/(msie) ([\w.]+)/,e=/(mozilla)(?:.*? rv:([\w.]+))?/;a=/(webkit)[ \/]([\w.]+)/.exec(a)||c.exec(a)||b.exec(a)||0>a.indexOf("compatible")&&e.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}};b.jPlayer.uaPlatform=function(a){var c=a.toLowerCase(),b=/(android)/,e=/(mobile)/;a=/(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/.exec(c)||[];c=/(ipad|playbook)/.exec(c)||!e.exec(c)&&b.exec(c)||
[];a[1]&&(a[1]=a[1].replace(/\s/g,"_"));return{platform:a[1]||"",tablet:c[1]||""}};b.jPlayer.browser={};b.jPlayer.platform={};var k=b.jPlayer.uaBrowser(navigator.userAgent);k.browser&&(b.jPlayer.browser[k.browser]=!0,b.jPlayer.browser.version=k.version);k=b.jPlayer.uaPlatform(navigator.userAgent);k.platform&&(b.jPlayer.platform[k.platform]=!0,b.jPlayer.platform.mobile=!k.tablet,b.jPlayer.platform.tablet=!!k.tablet);b.jPlayer.getDocMode=function(){var a;b.jPlayer.browser.msie&&(document.documentMode?
a=document.documentMode:(a=5,document.compatMode&&"CSS1Compat"===document.compatMode&&(a=7)));return a};b.jPlayer.browser.documentMode=b.jPlayer.getDocMode();b.jPlayer.nativeFeatures={init:function(){var a=document,c=a.createElement("video"),b={w3c:"fullscreenEnabled fullscreenElement requestFullscreen exitFullscreen fullscreenchange fullscreenerror".split(" "),moz:"mozFullScreenEnabled mozFullScreenElement mozRequestFullScreen mozCancelFullScreen mozfullscreenchange mozfullscreenerror".split(" "),
webkit:" webkitCurrentFullScreenElement webkitRequestFullScreen webkitCancelFullScreen webkitfullscreenchange ".split(" "),webkitVideo:"webkitSupportsFullscreen webkitDisplayingFullscreen webkitEnterFullscreen webkitExitFullscreen  ".split(" ")},e=["w3c","moz","webkit","webkitVideo"],g,h;this.fullscreen=c={support:{w3c:!!a[b.w3c[0]],moz:!!a[b.moz[0]],webkit:"function"===typeof a[b.webkit[3]],webkitVideo:"function"===typeof c[b.webkitVideo[2]]},used:{}};g=0;for(h=e.length;g<h;g++){var f=e[g];if(c.support[f]){c.spec=
f;c.used[f]=!0;break}}if(c.spec){var l=b[c.spec];c.api={fullscreenEnabled:!0,fullscreenElement:function(c){c=c?c:a;return c[l[1]]},requestFullscreen:function(a){return a[l[2]]()},exitFullscreen:function(c){c=c?c:a;return c[l[3]]()}};c.event={fullscreenchange:l[4],fullscreenerror:l[5]}}else c.api={fullscreenEnabled:!1,fullscreenElement:function(){return null},requestFullscreen:function(){},exitFullscreen:function(){}},c.event={}}};b.jPlayer.nativeFeatures.init();b.jPlayer.focus=null;b.jPlayer.keyIgnoreElementNames=
"INPUT TEXTAREA";var p=function(a){var c=b.jPlayer.focus,d;c&&(b.each(b.jPlayer.keyIgnoreElementNames.split(/\s+/g),function(c,b){if(a.target.nodeName.toUpperCase()===b.toUpperCase())return d=!0,!1}),d||b.each(c.options.keyBindings,function(d,g){if(g&&a.which===g.key&&b.isFunction(g.fn))return a.preventDefault(),g.fn(c),!1}))};b.jPlayer.keys=function(a){b(document.documentElement).unbind("keydown.jPlayer");a&&b(document.documentElement).bind("keydown.jPlayer",p)};b.jPlayer.keys(!0);b.jPlayer.prototype=
{count:0,version:{script:"2.5.0",needFlash:"2.5.0",flash:"unknown"},options:{swfPath:"js",solution:"html, flash",supplied:"mp3",preload:"metadata",volume:0.8,muted:!1,playbackRate:1,defaultPlaybackRate:1,minPlaybackRate:0.5,maxPlaybackRate:4,wmode:"opaque",backgroundColor:"#000000",cssSelectorAncestor:"#jp_container_1",cssSelector:{videoPlay:".jp-video-play",play:".jp-play",pause:".jp-pause",stop:".jp-stop",seekBar:".jp-seek-bar",playBar:".jp-play-bar",mute:".jp-mute",unmute:".jp-unmute",volumeBar:".jp-volume-bar",
volumeBarValue:".jp-volume-bar-value",volumeMax:".jp-volume-max",playbackRateBar:".jp-playback-rate-bar",playbackRateBarValue:".jp-playback-rate-bar-value",currentTime:".jp-current-time",duration:".jp-duration",fullScreen:".jp-full-screen",restoreScreen:".jp-restore-screen",repeat:".jp-repeat",repeatOff:".jp-repeat-off",gui:".jp-gui",noSolution:".jp-no-solution"},smoothPlayBar:!1,fullScreen:!1,fullWindow:!1,autohide:{restored:!1,full:!0,fadeIn:200,fadeOut:600,hold:1E3},loop:!1,repeat:function(a){a.jPlayer.options.loop?
b(this).unbind(".jPlayerRepeat").bind(b.jPlayer.event.ended+".jPlayer.jPlayerRepeat",function(){b(this).jPlayer("play")}):b(this).unbind(".jPlayerRepeat")},nativeVideoControls:{},noFullWindow:{msie:/msie [0-6]\./,ipad:/ipad.*?os [0-4]\./,iphone:/iphone/,ipod:/ipod/,android_pad:/android [0-3]\.(?!.*?mobile)/,android_phone:/android.*?mobile/,blackberry:/blackberry/,windows_ce:/windows ce/,iemobile:/iemobile/,webos:/webos/},noVolume:{ipad:/ipad/,iphone:/iphone/,ipod:/ipod/,android_pad:/android(?!.*?mobile)/,
android_phone:/android.*?mobile/,blackberry:/blackberry/,windows_ce:/windows ce/,iemobile:/iemobile/,webos:/webos/,playbook:/playbook/},timeFormat:{},keyEnabled:!1,audioFullScreen:!1,keyBindings:{play:{key:32,fn:function(a){a.status.paused?a.play():a.pause()}},fullScreen:{key:13,fn:function(a){(a.status.video||a.options.audioFullScreen)&&a._setOption("fullScreen",!a.options.fullScreen)}},muted:{key:8,fn:function(a){a._muted(!a.options.muted)}},volumeUp:{key:38,fn:function(a){a.volume(a.options.volume+
0.1)}},volumeDown:{key:40,fn:function(a){a.volume(a.options.volume-0.1)}}},verticalVolume:!1,verticalPlaybackRate:!1,globalVolume:!1,idPrefix:"jp",noConflict:"jQuery",emulateHtml:!1,consoleAlerts:!0,errorAlerts:!1,warningAlerts:!1},optionsAudio:{size:{width:"0px",height:"0px",cssClass:""},sizeFull:{width:"0px",height:"0px",cssClass:""}},optionsVideo:{size:{width:"480px",height:"270px",cssClass:"jp-video-270p"},sizeFull:{width:"100%",height:"100%",cssClass:"jp-video-full"}},instances:{},status:{src:"",
media:{},paused:!0,format:{},formatType:"",waitForPlay:!0,waitForLoad:!0,srcSet:!1,video:!1,seekPercent:0,currentPercentRelative:0,currentPercentAbsolute:0,currentTime:0,duration:0,videoWidth:0,videoHeight:0,readyState:0,networkState:0,playbackRate:1,ended:0},internal:{ready:!1},solution:{html:!0,flash:!0},format:{mp3:{codec:'audio/mpeg;',flashCanPlay:!0,media:"audio"},m4a:{codec:'audio/mp4; codecs="mp4a.40.2"',flashCanPlay:!0,media:"audio"},m3u8a:{codec:'application/vnd.apple.mpegurl; codecs="mp4a.40.2"',
flashCanPlay:!1,media:"audio"},m3ua:{codec:"audio/mpegurl",flashCanPlay:!1,media:"audio"},oga:{codec:'audio/ogg; codecs="vorbis, opus"',flashCanPlay:!1,media:"audio"},flac:{codec:"audio/x-flac",flashCanPlay:!1,media:"audio"},wav:{codec:'audio/wav; codecs="1"',flashCanPlay:!1,media:"audio"},webma:{codec:'audio/webm; codecs="vorbis"',flashCanPlay:!1,media:"audio"},fla:{codec:"audio/x-flv",flashCanPlay:!0,media:"audio"},rtmpa:{codec:'audio/rtmp; codecs="rtmp"',flashCanPlay:!0,media:"audio"},m4v:{codec:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
flashCanPlay:!0,media:"video"},m3u8v:{codec:'application/vnd.apple.mpegurl; codecs="avc1.42E01E, mp4a.40.2"',flashCanPlay:!1,media:"video"},m3uv:{codec:"audio/mpegurl",flashCanPlay:!1,media:"video"},ogv:{codec:'video/ogg; codecs="theora, vorbis"',flashCanPlay:!1,media:"video"},webmv:{codec:'video/webm; codecs="vorbis, vp8"',flashCanPlay:!1,media:"video"},flv:{codec:"video/x-flv",flashCanPlay:!0,media:"video"},rtmpv:{codec:'video/rtmp; codecs="rtmp"',flashCanPlay:!0,media:"video"}},_init:function(){var a=
this;this.element.empty();this.status=b.extend({},this.status);this.internal=b.extend({},this.internal);this.options.timeFormat=b.extend({},b.jPlayer.timeFormat,this.options.timeFormat);this.internal.cmdsIgnored=b.jPlayer.platform.ipad||b.jPlayer.platform.iphone||b.jPlayer.platform.ipod;this.internal.domNode=this.element.get(0);this.options.keyEnabled&&!b.jPlayer.focus&&(b.jPlayer.focus=this);this.formats=[];this.solutions=[];this.require={};this.htmlElement={};this.html={};this.html.audio={};this.html.video=
{};this.flash={};this.css={};this.css.cs={};this.css.jq={};this.ancestorJq=[];this.options.volume=this._limitValue(this.options.volume,0,1);b.each(this.options.supplied.toLowerCase().split(","),function(c,d){var e=d.replace(/^\s+|\s+$/g,"");if(a.format[e]){var f=!1;b.each(a.formats,function(a,c){if(e===c)return f=!0,!1});f||a.formats.push(e)}});b.each(this.options.solution.toLowerCase().split(","),function(c,d){var e=d.replace(/^\s+|\s+$/g,"");if(a.solution[e]){var f=!1;b.each(a.solutions,function(a,
c){if(e===c)return f=!0,!1});f||a.solutions.push(e)}});this.internal.instance="jp_"+this.count;this.instances[this.internal.instance]=this.element;this.element.attr("id")||this.element.attr("id",this.options.idPrefix+"_jplayer_"+this.count);this.internal.self=b.extend({},{id:this.element.attr("id"),jq:this.element});this.internal.audio=b.extend({},{id:this.options.idPrefix+"_audio_"+this.count,jq:f});this.internal.video=b.extend({},{id:this.options.idPrefix+"_video_"+this.count,jq:f});this.internal.flash=
b.extend({},{id:this.options.idPrefix+"_flash_"+this.count,jq:f,swf:this.options.swfPath+(".swf"!==this.options.swfPath.toLowerCase().slice(-4)?(this.options.swfPath&&"/"!==this.options.swfPath.slice(-1)?"/":"")+"Jplayer.swf":"")});this.internal.poster=b.extend({},{id:this.options.idPrefix+"_poster_"+this.count,jq:f});b.each(b.jPlayer.event,function(c,b){a.options[c]!==f&&(a.element.bind(b+".jPlayer",a.options[c]),a.options[c]=f)});this.require.audio=!1;this.require.video=!1;b.each(this.formats,function(c,
b){a.require[a.format[b].media]=!0});this.options=this.require.video?b.extend(!0,{},this.optionsVideo,this.options):b.extend(!0,{},this.optionsAudio,this.options);this._setSize();this.status.nativeVideoControls=this._uaBlocklist(this.options.nativeVideoControls);this.status.noFullWindow=this._uaBlocklist(this.options.noFullWindow);this.status.noVolume=this._uaBlocklist(this.options.noVolume);b.jPlayer.nativeFeatures.fullscreen.api.fullscreenEnabled&&this._fullscreenAddEventListeners();this._restrictNativeVideoControls();
this.htmlElement.poster=document.createElement("img");this.htmlElement.poster.id=this.internal.poster.id;this.htmlElement.poster.onload=function(){a.status.video&&!a.status.waitForPlay||a.internal.poster.jq.show()};this.element.append(this.htmlElement.poster);this.internal.poster.jq=b("#"+this.internal.poster.id);this.internal.poster.jq.css({width:this.status.width,height:this.status.height});this.internal.poster.jq.hide();this.internal.poster.jq.bind("click.jPlayer",function(){a._trigger(b.jPlayer.event.click)});
this.html.audio.available=!1;this.require.audio&&(this.htmlElement.audio=document.createElement("audio"),this.htmlElement.audio.id=this.internal.audio.id,this.html.audio.available=!!this.htmlElement.audio.canPlayType&&this._testCanPlayType(this.htmlElement.audio));this.html.video.available=!1;this.require.video&&(this.htmlElement.video=document.createElement("video"),this.htmlElement.video.id=this.internal.video.id,this.html.video.available=!!this.htmlElement.video.canPlayType&&this._testCanPlayType(this.htmlElement.video));
this.flash.available=this._checkForFlash(10.1);this.html.canPlay={};this.flash.canPlay={};b.each(this.formats,function(c,b){a.html.canPlay[b]=a.html[a.format[b].media].available&&""!==a.htmlElement[a.format[b].media].canPlayType(a.format[b].codec);a.flash.canPlay[b]=a.format[b].flashCanPlay&&a.flash.available});this.html.desired=!1;this.flash.desired=!1;b.each(this.solutions,function(c,d){if(0===c)a[d].desired=!0;else{var e=!1,f=!1;b.each(a.formats,function(c,b){a[a.solutions[0]].canPlay[b]&&("video"===
a.format[b].media?f=!0:e=!0)});a[d].desired=a.require.audio&&!e||a.require.video&&!f}});this.html.support={};this.flash.support={};b.each(this.formats,function(c,b){a.html.support[b]=a.html.canPlay[b]&&a.html.desired;a.flash.support[b]=a.flash.canPlay[b]&&a.flash.desired});this.html.used=!1;this.flash.used=!1;b.each(this.solutions,function(c,d){b.each(a.formats,function(c,b){if(a[d].support[b])return a[d].used=!0,!1})});this._resetActive();this._resetGate();this._cssSelectorAncestor(this.options.cssSelectorAncestor);
this.html.used||this.flash.used?this.css.jq.noSolution.length&&this.css.jq.noSolution.hide():(this._error({type:b.jPlayer.error.NO_SOLUTION,context:"{solution:'"+this.options.solution+"', supplied:'"+this.options.supplied+"'}",message:b.jPlayer.errorMsg.NO_SOLUTION,hint:b.jPlayer.errorHint.NO_SOLUTION}),this.css.jq.noSolution.length&&this.css.jq.noSolution.show());if(this.flash.used){var c,d="jQuery="+encodeURI(this.options.noConflict)+"&id="+encodeURI(this.internal.self.id)+"&vol="+this.options.volume+
"&muted="+this.options.muted;if(b.jPlayer.browser.msie&&(9>Number(b.jPlayer.browser.version)||9>b.jPlayer.browser.documentMode)){d=['<param name="movie" value="'+this.internal.flash.swf+'" />','<param name="FlashVars" value="'+d+'" />','<param name="allowScriptAccess" value="always" />','<param name="bgcolor" value="'+this.options.backgroundColor+'" />','<param name="wmode" value="'+this.options.wmode+'" />'];c=document.createElement('<object id="'+this.internal.flash.id+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0" tabindex="-1"></object>');
for(var e=0;e<d.length;e++)c.appendChild(document.createElement(d[e]))}else e=function(a,c,b){var d=document.createElement("param");d.setAttribute("name",c);d.setAttribute("value",b);a.appendChild(d)},c=document.createElement("object"),c.setAttribute("id",this.internal.flash.id),c.setAttribute("name",this.internal.flash.id),c.setAttribute("data",this.internal.flash.swf),c.setAttribute("type","application/x-shockwave-flash"),c.setAttribute("width","1"),c.setAttribute("height","1"),c.setAttribute("tabindex",
"-1"),e(c,"flashvars",d),e(c,"allowscriptaccess","always"),e(c,"bgcolor",this.options.backgroundColor),e(c,"wmode",this.options.wmode);this.element.append(c);this.internal.flash.jq=b(c)}this.status.playbackRateEnabled=this.html.used&&!this.flash.used?this._testPlaybackRate("audio"):!1;this._updatePlaybackRate();this.html.used&&(this.html.audio.available&&(this._addHtmlEventListeners(this.htmlElement.audio,this.html.audio),this.element.append(this.htmlElement.audio),this.internal.audio.jq=b("#"+this.internal.audio.id)),
this.html.video.available&&(this._addHtmlEventListeners(this.htmlElement.video,this.html.video),this.element.append(this.htmlElement.video),this.internal.video.jq=b("#"+this.internal.video.id),this.status.nativeVideoControls?this.internal.video.jq.css({width:this.status.width,height:this.status.height}):this.internal.video.jq.css({width:"0px",height:"0px"}),this.internal.video.jq.bind("click.jPlayer",function(){a._trigger(b.jPlayer.event.click)})));this.options.emulateHtml&&this._emulateHtmlBridge();
this.html.used&&!this.flash.used&&setTimeout(function(){a.internal.ready=!0;a.version.flash="n/a";a._trigger(b.jPlayer.event.repeat);a._trigger(b.jPlayer.event.ready)},100);this._updateNativeVideoControls();this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide();b.jPlayer.prototype.count++},destroy:function(){this.clearMedia();this._removeUiClass();this.css.jq.currentTime.length&&this.css.jq.currentTime.text("");this.css.jq.duration.length&&this.css.jq.duration.text("");b.each(this.css.jq,function(a,
c){c.length&&c.unbind(".jPlayer")});this.internal.poster.jq.unbind(".jPlayer");this.internal.video.jq&&this.internal.video.jq.unbind(".jPlayer");this._fullscreenRemoveEventListeners();this===b.jPlayer.focus&&(b.jPlayer.focus=null);this.options.emulateHtml&&this._destroyHtmlBridge();this.element.removeData("jPlayer");this.element.unbind(".jPlayer");this.element.empty();delete this.instances[this.internal.instance]},enable:function(){},disable:function(){},_testCanPlayType:function(a){try{return a.canPlayType(this.format.mp3.codec),
!0}catch(c){return!1}},_testPlaybackRate:function(a){a=document.createElement("string"===typeof a?a:"audio");try{return"playbackRate"in a?(a.playbackRate=0.5,0.5===a.playbackRate):!1}catch(c){return!1}},_uaBlocklist:function(a){var c=navigator.userAgent.toLowerCase(),d=!1;b.each(a,function(a,b){if(b&&b.test(c))return d=!0,!1});return d},_restrictNativeVideoControls:function(){this.require.audio&&this.status.nativeVideoControls&&(this.status.nativeVideoControls=!1,this.status.noFullWindow=!0)},_updateNativeVideoControls:function(){this.html.video.available&&
this.html.used&&(this.htmlElement.video.controls=this.status.nativeVideoControls,this._updateAutohide(),this.status.nativeVideoControls&&this.require.video?(this.internal.poster.jq.hide(),this.internal.video.jq.css({width:this.status.width,height:this.status.height})):this.status.waitForPlay&&this.status.video&&(this.internal.poster.jq.show(),this.internal.video.jq.css({width:"0px",height:"0px"})))},_addHtmlEventListeners:function(a,c){var d=this;a.preload=this.options.preload;a.muted=this.options.muted;
a.volume=this.options.volume;this.status.playbackRateEnabled&&(a.defaultPlaybackRate=this.options.defaultPlaybackRate,a.playbackRate=this.options.playbackRate);a.addEventListener("progress",function(){c.gate&&(d.internal.cmdsIgnored&&0<this.readyState&&(d.internal.cmdsIgnored=!1),d._getHtmlStatus(a),d._updateInterface(),d._trigger(b.jPlayer.event.progress))},!1);a.addEventListener("timeupdate",function(){c.gate&&(d._getHtmlStatus(a),d._updateInterface(),d._trigger(b.jPlayer.event.timeupdate))},!1);
a.addEventListener("durationchange",function(){c.gate&&(d._getHtmlStatus(a),d._updateInterface(),d._trigger(b.jPlayer.event.durationchange))},!1);a.addEventListener("play",function(){c.gate&&(d._updateButtons(!0),d._html_checkWaitForPlay(),d._trigger(b.jPlayer.event.play))},!1);a.addEventListener("playing",function(){c.gate&&(d._updateButtons(!0),d._seeked(),d._trigger(b.jPlayer.event.playing))},!1);a.addEventListener("pause",function(){c.gate&&(d._updateButtons(!1),d._trigger(b.jPlayer.event.pause))},
!1);a.addEventListener("waiting",function(){c.gate&&(d._seeking(),d._trigger(b.jPlayer.event.waiting))},!1);a.addEventListener("seeking",function(){c.gate&&(d._seeking(),d._trigger(b.jPlayer.event.seeking))},!1);a.addEventListener("seeked",function(){c.gate&&(d._seeked(),d._trigger(b.jPlayer.event.seeked))},!1);a.addEventListener("volumechange",function(){c.gate&&(d.options.volume=a.volume,d.options.muted=a.muted,d._updateMute(),d._updateVolume(),d._trigger(b.jPlayer.event.volumechange))},!1);a.addEventListener("ratechange",
function(){c.gate&&(d.options.defaultPlaybackRate=a.defaultPlaybackRate,d.options.playbackRate=a.playbackRate,d._updatePlaybackRate(),d._trigger(b.jPlayer.event.ratechange))},!1);a.addEventListener("suspend",function(){c.gate&&(d._seeked(),d._trigger(b.jPlayer.event.suspend))},!1);a.addEventListener("ended",function(){c.gate&&(b.jPlayer.browser.webkit||(d.htmlElement.media.currentTime=0),d.htmlElement.media.pause(),d._updateButtons(!1),d._getHtmlStatus(a,!0),d._updateInterface(),d._trigger(b.jPlayer.event.ended))},
!1);a.addEventListener("error",function(){c.gate&&(d._updateButtons(!1),d._seeked(),d.status.srcSet&&(clearTimeout(d.internal.htmlDlyCmdId),d.status.waitForLoad=!0,d.status.waitForPlay=!0,d.status.video&&!d.status.nativeVideoControls&&d.internal.video.jq.css({width:"0px",height:"0px"}),d._validString(d.status.media.poster)&&!d.status.nativeVideoControls&&d.internal.poster.jq.show(),d.css.jq.videoPlay.length&&d.css.jq.videoPlay.show(),d._error({type:b.jPlayer.error.URL,context:d.status.src,message:b.jPlayer.errorMsg.URL,
hint:b.jPlayer.errorHint.URL})))},!1);b.each(b.jPlayer.htmlEvent,function(e,g){a.addEventListener(this,function(){c.gate&&d._trigger(b.jPlayer.event[g])},!1)})},_getHtmlStatus:function(a,c){var b=0,e=0,g=0,f=0;isFinite(a.duration)&&(this.status.duration=a.duration);b=a.currentTime;e=0<this.status.duration?100*b/this.status.duration:0;"object"===typeof a.seekable&&0<a.seekable.length?(g=0<this.status.duration?100*a.seekable.end(a.seekable.length-1)/this.status.duration:100,f=0<this.status.duration?
100*a.currentTime/a.seekable.end(a.seekable.length-1):0):(g=100,f=e);c&&(e=f=b=0);this.status.seekPercent=g;this.status.currentPercentRelative=f;this.status.currentPercentAbsolute=e;this.status.currentTime=b;this.status.videoWidth=a.videoWidth;this.status.videoHeight=a.videoHeight;this.status.readyState=a.readyState;this.status.networkState=a.networkState;this.status.playbackRate=a.playbackRate;this.status.ended=a.ended},_resetStatus:function(){this.status=b.extend({},this.status,b.jPlayer.prototype.status)},
_trigger:function(a,c,d){a=b.Event(a);a.jPlayer={};a.jPlayer.version=b.extend({},this.version);a.jPlayer.options=b.extend(!0,{},this.options);a.jPlayer.status=b.extend(!0,{},this.status);a.jPlayer.html=b.extend(!0,{},this.html);a.jPlayer.flash=b.extend(!0,{},this.flash);c&&(a.jPlayer.error=b.extend({},c));d&&(a.jPlayer.warning=b.extend({},d));this.element.trigger(a)},jPlayerFlashEvent:function(a,c){if(a===b.jPlayer.event.ready)if(!this.internal.ready)this.internal.ready=!0,this.internal.flash.jq.css({width:"0px",
height:"0px"}),this.version.flash=c.version,this.version.needFlash!==this.version.flash&&this._error({type:b.jPlayer.error.VERSION,context:this.version.flash,message:b.jPlayer.errorMsg.VERSION+this.version.flash,hint:b.jPlayer.errorHint.VERSION}),this._trigger(b.jPlayer.event.repeat),this._trigger(a);else if(this.flash.gate){if(this.status.srcSet){var d=this.status.currentTime,e=this.status.paused;this.setMedia(this.status.media);this.volumeWorker(this.options.volume);0<d&&(e?this.pause(d):this.play(d))}this._trigger(b.jPlayer.event.flashreset)}if(this.flash.gate)switch(a){case b.jPlayer.event.progress:this._getFlashStatus(c);
this._updateInterface();this._trigger(a);break;case b.jPlayer.event.timeupdate:this._getFlashStatus(c);this._updateInterface();this._trigger(a);break;case b.jPlayer.event.play:this._seeked();this._updateButtons(!0);this._trigger(a);break;case b.jPlayer.event.pause:this._updateButtons(!1);this._trigger(a);break;case b.jPlayer.event.ended:this._updateButtons(!1);this._trigger(a);break;case b.jPlayer.event.click:this._trigger(a);break;case b.jPlayer.event.error:this.status.waitForLoad=!0;this.status.waitForPlay=
!0;this.status.video&&this.internal.flash.jq.css({width:"0px",height:"0px"});this._validString(this.status.media.poster)&&this.internal.poster.jq.show();this.css.jq.videoPlay.length&&this.status.video&&this.css.jq.videoPlay.show();this.status.video?this._flash_setVideo(this.status.media):this._flash_setAudio(this.status.media);this._updateButtons(!1);this._error({type:b.jPlayer.error.URL,context:c.src,message:b.jPlayer.errorMsg.URL,hint:b.jPlayer.errorHint.URL});break;case b.jPlayer.event.seeking:this._seeking();
this._trigger(a);break;case b.jPlayer.event.seeked:this._seeked();this._trigger(a);break;case b.jPlayer.event.ready:break;default:this._trigger(a)}return!1},_getFlashStatus:function(a){this.status.seekPercent=a.seekPercent;this.status.currentPercentRelative=a.currentPercentRelative;this.status.currentPercentAbsolute=a.currentPercentAbsolute;this.status.currentTime=a.currentTime;this.status.duration=a.duration;this.status.videoWidth=a.videoWidth;this.status.videoHeight=a.videoHeight;this.status.readyState=
4;this.status.networkState=0;this.status.playbackRate=1;this.status.ended=!1},_updateButtons:function(a){a===f?a=!this.status.paused:this.status.paused=!a;this.css.jq.play.length&&this.css.jq.pause.length&&(a?(this.css.jq.play.hide(),this.css.jq.pause.show()):(this.css.jq.play.show(),this.css.jq.pause.hide()));this.css.jq.restoreScreen.length&&this.css.jq.fullScreen.length&&(this.status.noFullWindow?(this.css.jq.fullScreen.hide(),this.css.jq.restoreScreen.hide()):this.options.fullWindow?(this.css.jq.fullScreen.hide(),
this.css.jq.restoreScreen.show()):(this.css.jq.fullScreen.show(),this.css.jq.restoreScreen.hide()));this.css.jq.repeat.length&&this.css.jq.repeatOff.length&&(this.options.loop?(this.css.jq.repeat.hide(),this.css.jq.repeatOff.show()):(this.css.jq.repeat.show(),this.css.jq.repeatOff.hide()))},_updateInterface:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.width(this.status.seekPercent+"%");this.css.jq.playBar.length&&(this.options.smoothPlayBar?this.css.jq.playBar.stop().animate({width:this.status.currentPercentAbsolute+
"%"},250,"linear"):this.css.jq.playBar.width(this.status.currentPercentRelative+"%"));this.css.jq.currentTime.length&&this.css.jq.currentTime.text(this._convertTime(this.status.currentTime));this.css.jq.duration.length&&this.css.jq.duration.text(this._convertTime(this.status.duration))},_convertTime:m.prototype.time,_seeking:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.addClass("jp-seeking-bg")},_seeked:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.removeClass("jp-seeking-bg")},
_resetGate:function(){this.html.audio.gate=!1;this.html.video.gate=!1;this.flash.gate=!1},_resetActive:function(){this.html.active=!1;this.flash.active=!1},_escapeHtml:function(a){return a.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;")},_qualifyURL:function(a){var c=document.createElement("div");c.innerHTML='<a href="'+this._escapeHtml(a)+'">x</a>';return c.firstChild.href},_absoluteMediaUrls:function(a){var c=this;b.each(a,function(b,e){c.format[b]&&
(a[b]=c._qualifyURL(e))});return a},setMedia:function(a){var c=this,d=!1,e=this.status.media.poster!==a.poster;this._resetMedia();this._resetGate();this._resetActive();a=this._absoluteMediaUrls(a);b.each(this.formats,function(e,f){var k="video"===c.format[f].media;b.each(c.solutions,function(b,e){if(c[e].support[f]&&c._validString(a[f])){var g="html"===e;k?(g?(c.html.video.gate=!0,c._html_setVideo(a),c.html.active=!0):(c.flash.gate=!0,c._flash_setVideo(a),c.flash.active=!0),c.css.jq.videoPlay.length&&
c.css.jq.videoPlay.show(),c.status.video=!0):(g?(c.html.audio.gate=!0,c._html_setAudio(a),c.html.active=!0):(c.flash.gate=!0,c._flash_setAudio(a),c.flash.active=!0),c.css.jq.videoPlay.length&&c.css.jq.videoPlay.hide(),c.status.video=!1);d=!0;return!1}});if(d)return!1});d?(this.status.nativeVideoControls&&this.html.video.gate||!this._validString(a.poster)||(e?this.htmlElement.poster.src=a.poster:this.internal.poster.jq.show()),this.status.srcSet=!0,this.status.media=b.extend({},a),this._updateButtons(!1),
this._updateInterface()):this._error({type:b.jPlayer.error.NO_SUPPORT,context:"{supplied:'"+this.options.supplied+"'}",message:b.jPlayer.errorMsg.NO_SUPPORT,hint:b.jPlayer.errorHint.NO_SUPPORT})},_resetMedia:function(){this._resetStatus();this._updateButtons(!1);this._updateInterface();this._seeked();this.internal.poster.jq.hide();clearTimeout(this.internal.htmlDlyCmdId);this.html.active?this._html_resetMedia():this.flash.active&&this._flash_resetMedia()},clearMedia:function(){this._resetMedia();
this.html.active?this._html_clearMedia():this.flash.active&&this._flash_clearMedia();this._resetGate();this._resetActive()},load:function(){this.status.srcSet?this.html.active?this._html_load():this.flash.active&&this._flash_load():this._urlNotSetError("load")},focus:function(){this.options.keyEnabled&&(b.jPlayer.focus=this)},play:function(a){a="number"===typeof a?a:NaN;this.status.srcSet?(this.focus(),this.html.active?this._html_play(a):this.flash.active&&this._flash_play(a)):this._urlNotSetError("play")},
videoPlay:function(){this.play()},pause:function(a){a="number"===typeof a?a:NaN;this.status.srcSet?this.html.active?this._html_pause(a):this.flash.active&&this._flash_pause(a):this._urlNotSetError("pause")},tellOthers:function(a,c){var d=this,e="function"===typeof c,g=Array.prototype.slice.call(arguments);"string"===typeof a&&(e&&g.splice(1,1),b.each(this.instances,function(){d.element!==this&&(e&&!c.call(this.data("jPlayer"),d)||this.jPlayer.apply(this,g))}))},pauseOthers:function(a){this.tellOthers("pause",
function(){return this.status.srcSet},a)},stop:function(){this.status.srcSet?this.html.active?this._html_pause(0):this.flash.active&&this._flash_pause(0):this._urlNotSetError("stop")},playHead:function(a){a=this._limitValue(a,0,100);this.status.srcSet?this.html.active?this._html_playHead(a):this.flash.active&&this._flash_playHead(a):this._urlNotSetError("playHead")},_muted:function(a){this.mutedWorker(a);this.options.globalVolume&&this.tellOthers("mutedWorker",function(){return this.options.globalVolume},
a)},mutedWorker:function(a){this.options.muted=a;this.html.used&&this._html_setProperty("muted",a);this.flash.used&&this._flash_mute(a);this.html.video.gate||this.html.audio.gate||(this._updateMute(a),this._updateVolume(this.options.volume),this._trigger(b.jPlayer.event.volumechange))},mute:function(a){a=a===f?!0:!!a;this._muted(a)},unmute:function(a){a=a===f?!0:!!a;this._muted(!a)},_updateMute:function(a){a===f&&(a=this.options.muted);this.css.jq.mute.length&&this.css.jq.unmute.length&&(this.status.noVolume?
(this.css.jq.mute.hide(),this.css.jq.unmute.hide()):a?(this.css.jq.mute.hide(),this.css.jq.unmute.show()):(this.css.jq.mute.show(),this.css.jq.unmute.hide()))},volume:function(a){this.volumeWorker(a);this.options.globalVolume&&this.tellOthers("volumeWorker",function(){return this.options.globalVolume},a)},volumeWorker:function(a){a=this._limitValue(a,0,1);this.options.volume=a;this.html.used&&this._html_setProperty("volume",a);this.flash.used&&this._flash_volume(a);this.html.video.gate||this.html.audio.gate||
(this._updateVolume(a),this._trigger(b.jPlayer.event.volumechange))},volumeBar:function(a){if(this.css.jq.volumeBar.length){var c=b(a.currentTarget),d=c.offset(),e=a.pageX-d.left,g=c.width();a=c.height()-a.pageY+d.top;c=c.height();this.options.verticalVolume?this.volume(a/c):this.volume(e/g)}this.options.muted&&this._muted(!1)},volumeBarValue:function(){},_updateVolume:function(a){a===f&&(a=this.options.volume);a=this.options.muted?0:a;this.status.noVolume?(this.css.jq.volumeBar.length&&this.css.jq.volumeBar.hide(),
this.css.jq.volumeBarValue.length&&this.css.jq.volumeBarValue.hide(),this.css.jq.volumeMax.length&&this.css.jq.volumeMax.hide()):(this.css.jq.volumeBar.length&&this.css.jq.volumeBar.show(),this.css.jq.volumeBarValue.length&&(this.css.jq.volumeBarValue.show(),this.css.jq.volumeBarValue[this.options.verticalVolume?"height":"width"](100*a+"%")),this.css.jq.volumeMax.length&&this.css.jq.volumeMax.show())},volumeMax:function(){this.volume(1);this.options.muted&&this._muted(!1)},_cssSelectorAncestor:function(a){var c=
this;this.options.cssSelectorAncestor=a;this._removeUiClass();this.ancestorJq=a?b(a):[];a&&1!==this.ancestorJq.length&&this._warning({type:b.jPlayer.warning.CSS_SELECTOR_COUNT,context:a,message:b.jPlayer.warningMsg.CSS_SELECTOR_COUNT+this.ancestorJq.length+" found for cssSelectorAncestor.",hint:b.jPlayer.warningHint.CSS_SELECTOR_COUNT});this._addUiClass();b.each(this.options.cssSelector,function(a,b){c._cssSelector(a,b)});this._updateInterface();this._updateButtons();this._updateAutohide();this._updateVolume();
this._updateMute()},_cssSelector:function(a,c){var d=this;"string"===typeof c?b.jPlayer.prototype.options.cssSelector[a]?(this.css.jq[a]&&this.css.jq[a].length&&this.css.jq[a].unbind(".jPlayer"),this.options.cssSelector[a]=c,this.css.cs[a]=this.options.cssSelectorAncestor+" "+c,this.css.jq[a]=c?b(this.css.cs[a]):[],this.css.jq[a].length&&this.css.jq[a].bind("click.jPlayer",function(c){c.preventDefault();d[a](c);b(this).blur()}),c&&1!==this.css.jq[a].length&&this._warning({type:b.jPlayer.warning.CSS_SELECTOR_COUNT,
context:this.css.cs[a],message:b.jPlayer.warningMsg.CSS_SELECTOR_COUNT+this.css.jq[a].length+" found for "+a+" method.",hint:b.jPlayer.warningHint.CSS_SELECTOR_COUNT})):this._warning({type:b.jPlayer.warning.CSS_SELECTOR_METHOD,context:a,message:b.jPlayer.warningMsg.CSS_SELECTOR_METHOD,hint:b.jPlayer.warningHint.CSS_SELECTOR_METHOD}):this._warning({type:b.jPlayer.warning.CSS_SELECTOR_STRING,context:c,message:b.jPlayer.warningMsg.CSS_SELECTOR_STRING,hint:b.jPlayer.warningHint.CSS_SELECTOR_STRING})},
seekBar:function(a){if(this.css.jq.seekBar.length){var c=b(a.currentTarget),d=c.offset();a=a.pageX-d.left;c=c.width();this.playHead(100*a/c)}},playBar:function(){},playbackRate:function(a){this._setOption("playbackRate",a)},playbackRateBar:function(a){if(this.css.jq.playbackRateBar.length){var c=b(a.currentTarget),d=c.offset(),e=a.pageX-d.left,g=c.width();a=c.height()-a.pageY+d.top;c=c.height();this.playbackRate((this.options.verticalPlaybackRate?a/c:e/g)*(this.options.maxPlaybackRate-this.options.minPlaybackRate)+
this.options.minPlaybackRate)}},playbackRateBarValue:function(){},_updatePlaybackRate:function(){var a=(this.options.playbackRate-this.options.minPlaybackRate)/(this.options.maxPlaybackRate-this.options.minPlaybackRate);this.status.playbackRateEnabled?(this.css.jq.playbackRateBar.length&&this.css.jq.playbackRateBar.show(),this.css.jq.playbackRateBarValue.length&&(this.css.jq.playbackRateBarValue.show(),this.css.jq.playbackRateBarValue[this.options.verticalPlaybackRate?"height":"width"](100*a+"%"))):
(this.css.jq.playbackRateBar.length&&this.css.jq.playbackRateBar.hide(),this.css.jq.playbackRateBarValue.length&&this.css.jq.playbackRateBarValue.hide())},repeat:function(){this._loop(!0)},repeatOff:function(){this._loop(!1)},_loop:function(a){this.options.loop!==a&&(this.options.loop=a,this._updateButtons(),this._trigger(b.jPlayer.event.repeat))},currentTime:function(){},duration:function(){},gui:function(){},noSolution:function(){},option:function(a,c){var d=a;if(0===arguments.length)return b.extend(!0,
{},this.options);if("string"===typeof a){var e=a.split(".");if(c===f){for(var d=b.extend(!0,{},this.options),g=0;g<e.length;g++)if(d[e[g]]!==f)d=d[e[g]];else return this._warning({type:b.jPlayer.warning.OPTION_KEY,context:a,message:b.jPlayer.warningMsg.OPTION_KEY,hint:b.jPlayer.warningHint.OPTION_KEY}),f;return d}for(var g=d={},h=0;h<e.length;h++)h<e.length-1?(g[e[h]]={},g=g[e[h]]):g[e[h]]=c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(a,b){c._setOption(a,
b)});return this},_setOption:function(a,c){var d=this;switch(a){case "volume":this.volume(c);break;case "muted":this._muted(c);break;case "globalVolume":this.options[a]=c;break;case "cssSelectorAncestor":this._cssSelectorAncestor(c);break;case "cssSelector":b.each(c,function(a,c){d._cssSelector(a,c)});break;case "playbackRate":this.options[a]=c=this._limitValue(c,this.options.minPlaybackRate,this.options.maxPlaybackRate);this.html.used&&this._html_setProperty("playbackRate",c);this._updatePlaybackRate();
break;case "defaultPlaybackRate":this.options[a]=c=this._limitValue(c,this.options.minPlaybackRate,this.options.maxPlaybackRate);this.html.used&&this._html_setProperty("defaultPlaybackRate",c);this._updatePlaybackRate();break;case "minPlaybackRate":this.options[a]=c=this._limitValue(c,0.1,this.options.maxPlaybackRate-0.1);this._updatePlaybackRate();break;case "maxPlaybackRate":this.options[a]=c=this._limitValue(c,this.options.minPlaybackRate+0.1,16);this._updatePlaybackRate();break;case "fullScreen":if(this.options[a]!==
c){var e=b.jPlayer.nativeFeatures.fullscreen.used.webkitVideo;if(!e||e&&!this.status.waitForPlay)e||(this.options[a]=c),c?this._requestFullscreen():this._exitFullscreen(),e||this._setOption("fullWindow",c)}break;case "fullWindow":this.options[a]!==c&&(this._removeUiClass(),this.options[a]=c,this._refreshSize());break;case "size":this.options.fullWindow||this.options[a].cssClass===c.cssClass||this._removeUiClass();this.options[a]=b.extend({},this.options[a],c);this._refreshSize();break;case "sizeFull":this.options.fullWindow&&
this.options[a].cssClass!==c.cssClass&&this._removeUiClass();this.options[a]=b.extend({},this.options[a],c);this._refreshSize();break;case "autohide":this.options[a]=b.extend({},this.options[a],c);this._updateAutohide();break;case "loop":this._loop(c);break;case "nativeVideoControls":this.options[a]=b.extend({},this.options[a],c);this.status.nativeVideoControls=this._uaBlocklist(this.options.nativeVideoControls);this._restrictNativeVideoControls();this._updateNativeVideoControls();break;case "noFullWindow":this.options[a]=
b.extend({},this.options[a],c);this.status.nativeVideoControls=this._uaBlocklist(this.options.nativeVideoControls);this.status.noFullWindow=this._uaBlocklist(this.options.noFullWindow);this._restrictNativeVideoControls();this._updateButtons();break;case "noVolume":this.options[a]=b.extend({},this.options[a],c);this.status.noVolume=this._uaBlocklist(this.options.noVolume);this._updateVolume();this._updateMute();break;case "emulateHtml":this.options[a]!==c&&((this.options[a]=c)?this._emulateHtmlBridge():
this._destroyHtmlBridge());break;case "timeFormat":this.options[a]=b.extend({},this.options[a],c);break;case "keyEnabled":this.options[a]=c;c||this!==b.jPlayer.focus||(b.jPlayer.focus=null);break;case "keyBindings":this.options[a]=b.extend(!0,{},this.options[a],c);break;case "audioFullScreen":this.options[a]=c}return this},_refreshSize:function(){this._setSize();this._addUiClass();this._updateSize();this._updateButtons();this._updateAutohide();this._trigger(b.jPlayer.event.resize)},_setSize:function(){this.options.fullWindow?
(this.status.width=this.options.sizeFull.width,this.status.height=this.options.sizeFull.height,this.status.cssClass=this.options.sizeFull.cssClass):(this.status.width=this.options.size.width,this.status.height=this.options.size.height,this.status.cssClass=this.options.size.cssClass);this.element.css({width:this.status.width,height:this.status.height})},_addUiClass:function(){this.ancestorJq.length&&this.ancestorJq.addClass(this.status.cssClass)},_removeUiClass:function(){this.ancestorJq.length&&this.ancestorJq.removeClass(this.status.cssClass)},
_updateSize:function(){this.internal.poster.jq.css({width:this.status.width,height:this.status.height});!this.status.waitForPlay&&this.html.active&&this.status.video||this.html.video.available&&this.html.used&&this.status.nativeVideoControls?this.internal.video.jq.css({width:this.status.width,height:this.status.height}):!this.status.waitForPlay&&this.flash.active&&this.status.video&&this.internal.flash.jq.css({width:this.status.width,height:this.status.height})},_updateAutohide:function(){var a=this,
c=function(){a.css.jq.gui.fadeIn(a.options.autohide.fadeIn,function(){clearTimeout(a.internal.autohideId);a.internal.autohideId=setTimeout(function(){a.css.jq.gui.fadeOut(a.options.autohide.fadeOut)},a.options.autohide.hold)})};this.css.jq.gui.length&&(this.css.jq.gui.stop(!0,!0),clearTimeout(this.internal.autohideId),this.element.unbind(".jPlayerAutohide"),this.css.jq.gui.unbind(".jPlayerAutohide"),this.status.nativeVideoControls?this.css.jq.gui.hide():this.options.fullWindow&&this.options.autohide.full||
!this.options.fullWindow&&this.options.autohide.restored?(this.element.bind("mousemove.jPlayer.jPlayerAutohide",c),this.css.jq.gui.bind("mousemove.jPlayer.jPlayerAutohide",c),this.css.jq.gui.hide()):this.css.jq.gui.show())},fullScreen:function(){this._setOption("fullScreen",!0)},restoreScreen:function(){this._setOption("fullScreen",!1)},_fullscreenAddEventListeners:function(){var a=this,c=b.jPlayer.nativeFeatures.fullscreen;c.api.fullscreenEnabled&&c.event.fullscreenchange&&("function"!==typeof this.internal.fullscreenchangeHandler&&
(this.internal.fullscreenchangeHandler=function(){a._fullscreenchange()}),document.addEventListener(c.event.fullscreenchange,this.internal.fullscreenchangeHandler,!1))},_fullscreenRemoveEventListeners:function(){var a=b.jPlayer.nativeFeatures.fullscreen;this.internal.fullscreenchangeHandler&&document.addEventListener(a.event.fullscreenchange,this.internal.fullscreenchangeHandler,!1)},_fullscreenchange:function(){this.options.fullScreen&&!b.jPlayer.nativeFeatures.fullscreen.api.fullscreenElement()&&
this._setOption("fullScreen",!1)},_requestFullscreen:function(){var a=this.ancestorJq.length?this.ancestorJq[0]:this.element[0],c=b.jPlayer.nativeFeatures.fullscreen;c.used.webkitVideo&&(a=this.htmlElement.video);c.api.fullscreenEnabled&&c.api.requestFullscreen(a)},_exitFullscreen:function(){var a=b.jPlayer.nativeFeatures.fullscreen,c;a.used.webkitVideo&&(c=this.htmlElement.video);a.api.fullscreenEnabled&&a.api.exitFullscreen(c)},_html_initMedia:function(a){var c=b(this.htmlElement.media).empty();
b.each(a.track||[],function(a,b){var g=document.createElement("track");g.setAttribute("kind",b.kind?b.kind:"");g.setAttribute("src",b.src?b.src:"");g.setAttribute("srclang",b.srclang?b.srclang:"");g.setAttribute("label",b.label?b.label:"");b.def&&g.setAttribute("default",b.def);c.append(g)});this.htmlElement.media.src=this.status.src;"none"!==this.options.preload&&this._html_load();this._trigger(b.jPlayer.event.timeupdate)},_html_setFormat:function(a){var c=this;b.each(this.formats,function(b,e){if(c.html.support[e]&&
a[e])return c.status.src=a[e],c.status.format[e]=!0,c.status.formatType=e,!1})},_html_setAudio:function(a){this._html_setFormat(a);this.htmlElement.media=this.htmlElement.audio;this._html_initMedia(a)},_html_setVideo:function(a){this._html_setFormat(a);this.status.nativeVideoControls&&(this.htmlElement.video.poster=this._validString(a.poster)?a.poster:"");this.htmlElement.media=this.htmlElement.video;this._html_initMedia(a)},_html_resetMedia:function(){this.htmlElement.media&&(this.htmlElement.media.id!==
this.internal.video.id||this.status.nativeVideoControls||this.internal.video.jq.css({width:"0px",height:"0px"}),this.htmlElement.media.pause())},_html_clearMedia:function(){this.htmlElement.media&&(this.htmlElement.media.src="about:blank",this.htmlElement.media.load())},_html_load:function(){this.status.waitForLoad&&(this.status.waitForLoad=!1,this.htmlElement.media.load());clearTimeout(this.internal.htmlDlyCmdId)},_html_play:function(a){var b=this,d=this.htmlElement.media;this._html_load();if(isNaN(a))d.play();
else{this.internal.cmdsIgnored&&d.play();try{if(!d.seekable||"object"===typeof d.seekable&&0<d.seekable.length)d.currentTime=a,d.play();else throw 1;}catch(e){this.internal.htmlDlyCmdId=setTimeout(function(){b.play(a)},250);return}}this._html_checkWaitForPlay()},_html_pause:function(a){var b=this,d=this.htmlElement.media;0<a?this._html_load():clearTimeout(this.internal.htmlDlyCmdId);d.pause();if(!isNaN(a))try{if(!d.seekable||"object"===typeof d.seekable&&0<d.seekable.length)d.currentTime=a;else throw 1;
}catch(e){this.internal.htmlDlyCmdId=setTimeout(function(){b.pause(a)},250);return}0<a&&this._html_checkWaitForPlay()},_html_playHead:function(a){var b=this,d=this.htmlElement.media;this._html_load();try{if("object"===typeof d.seekable&&0<d.seekable.length)d.currentTime=a*d.seekable.end(d.seekable.length-1)/100;else if(0<d.duration&&!isNaN(d.duration))d.currentTime=a*d.duration/100;else throw"e";}catch(e){this.internal.htmlDlyCmdId=setTimeout(function(){b.playHead(a)},250);return}this.status.waitForLoad||
this._html_checkWaitForPlay()},_html_checkWaitForPlay:function(){this.status.waitForPlay&&(this.status.waitForPlay=!1,this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),this.status.video&&(this.internal.poster.jq.hide(),this.internal.video.jq.css({width:this.status.width,height:this.status.height})))},_html_setProperty:function(a,b){this.html.audio.available&&(this.htmlElement.audio[a]=b);this.html.video.available&&(this.htmlElement.video[a]=b)},_flash_setAudio:function(a){var c=this;try{b.each(this.formats,
function(b,d){if(c.flash.support[d]&&a[d]){switch(d){case "m4a":case "fla":c._getMovie().fl_setAudio_m4a(a[d]);break;case "mp3":c._getMovie().fl_setAudio_mp3(a[d]);break;case "rtmpa":c._getMovie().fl_setAudio_rtmp(a[d])}c.status.src=a[d];c.status.format[d]=!0;c.status.formatType=d;return!1}}),"auto"===this.options.preload&&(this._flash_load(),this.status.waitForLoad=!1)}catch(d){this._flashError(d)}},_flash_setVideo:function(a){var c=this;try{b.each(this.formats,function(b,d){if(c.flash.support[d]&&
a[d]){switch(d){case "m4v":case "flv":c._getMovie().fl_setVideo_m4v(a[d]);break;case "rtmpv":c._getMovie().fl_setVideo_rtmp(a[d])}c.status.src=a[d];c.status.format[d]=!0;c.status.formatType=d;return!1}}),"auto"===this.options.preload&&(this._flash_load(),this.status.waitForLoad=!1)}catch(d){this._flashError(d)}},_flash_resetMedia:function(){this.internal.flash.jq.css({width:"0px",height:"0px"});this._flash_pause(NaN)},_flash_clearMedia:function(){try{this._getMovie().fl_clearMedia()}catch(a){this._flashError(a)}},
_flash_load:function(){try{this._getMovie().fl_load()}catch(a){this._flashError(a)}this.status.waitForLoad=!1},_flash_play:function(a){try{this._getMovie().fl_play(a)}catch(b){this._flashError(b)}this.status.waitForLoad=!1;this._flash_checkWaitForPlay()},_flash_pause:function(a){try{this._getMovie().fl_pause(a)}catch(b){this._flashError(b)}0<a&&(this.status.waitForLoad=!1,this._flash_checkWaitForPlay())},_flash_playHead:function(a){try{this._getMovie().fl_play_head(a)}catch(b){this._flashError(b)}this.status.waitForLoad||
this._flash_checkWaitForPlay()},_flash_checkWaitForPlay:function(){this.status.waitForPlay&&(this.status.waitForPlay=!1,this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),this.status.video&&(this.internal.poster.jq.hide(),this.internal.flash.jq.css({width:this.status.width,height:this.status.height})))},_flash_volume:function(a){try{this._getMovie().fl_volume(a)}catch(b){this._flashError(b)}},_flash_mute:function(a){try{this._getMovie().fl_mute(a)}catch(b){this._flashError(b)}},_getMovie:function(){return document[this.internal.flash.id]},
_getFlashPluginVersion:function(){var a=0,b;if(window.ActiveXObject)try{if(b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")){var d=b.GetVariable("$version");d&&(d=d.split(" ")[1].split(","),a=parseInt(d[0],10)+"."+parseInt(d[1],10))}}catch(e){}else navigator.plugins&&0<navigator.mimeTypes.length&&(b=navigator.plugins["Shockwave Flash"])&&(a=navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/,"$1"));return 1*a},_checkForFlash:function(a){var b=!1;this._getFlashPluginVersion()>=
a&&(b=!0);return b},_validString:function(a){return a&&"string"===typeof a},_limitValue:function(a,b,d){return a<b?b:a>d?d:a},_urlNotSetError:function(a){this._error({type:b.jPlayer.error.URL_NOT_SET,context:a,message:b.jPlayer.errorMsg.URL_NOT_SET,hint:b.jPlayer.errorHint.URL_NOT_SET})},_flashError:function(a){var c;c=this.internal.ready?"FLASH_DISABLED":"FLASH";this._error({type:b.jPlayer.error[c],context:this.internal.flash.swf,message:b.jPlayer.errorMsg[c]+a.message,hint:b.jPlayer.errorHint[c]});
this.internal.flash.jq.css({width:"1px",height:"1px"})},_error:function(a){this._trigger(b.jPlayer.event.error,a);this.options.errorAlerts&&this._alert("Error!"+(a.message?"\n"+a.message:"")+(a.hint?"\n"+a.hint:"")+"\nContext: "+a.context)},_warning:function(a){this._trigger(b.jPlayer.event.warning,f,a);this.options.warningAlerts&&this._alert("Warning!"+(a.message?"\n"+a.message:"")+(a.hint?"\n"+a.hint:"")+"\nContext: "+a.context)},_alert:function(a){a="jPlayer "+this.version.script+" : id='"+this.internal.self.id+
"' : "+a;this.options.consoleAlerts?console&&console.log&&console.log(a):alert(a)},_emulateHtmlBridge:function(){var a=this;b.each(b.jPlayer.emulateMethods.split(/\s+/g),function(b,d){a.internal.domNode[d]=function(b){a[d](b)}});b.each(b.jPlayer.event,function(c,d){var e=!0;b.each(b.jPlayer.reservedEvent.split(/\s+/g),function(a,b){if(b===c)return e=!1});e&&a.element.bind(d+".jPlayer.jPlayerHtml",function(){a._emulateHtmlUpdate();var b=document.createEvent("Event");b.initEvent(c,!1,!0);a.internal.domNode.dispatchEvent(b)})})},
_emulateHtmlUpdate:function(){var a=this;b.each(b.jPlayer.emulateStatus.split(/\s+/g),function(b,d){a.internal.domNode[d]=a.status[d]});b.each(b.jPlayer.emulateOptions.split(/\s+/g),function(b,d){a.internal.domNode[d]=a.options[d]})},_destroyHtmlBridge:function(){var a=this;this.element.unbind(".jPlayerHtml");b.each((b.jPlayer.emulateMethods+" "+b.jPlayer.emulateStatus+" "+b.jPlayer.emulateOptions).split(/\s+/g),function(b,d){delete a.internal.domNode[d]})}};b.jPlayer.error={FLASH:"e_flash",FLASH_DISABLED:"e_flash_disabled",
NO_SOLUTION:"e_no_solution",NO_SUPPORT:"e_no_support",URL:"e_url",URL_NOT_SET:"e_url_not_set",VERSION:"e_version"};b.jPlayer.errorMsg={FLASH:"jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",FLASH_DISABLED:"jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ",NO_SOLUTION:"No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",NO_SUPPORT:"It is not possible to play any media format provided in setMedia() on this browser using your current options.",
URL:"Media URL could not be loaded.",URL_NOT_SET:"Attempt to issue media playback commands, while no media url is set.",VERSION:"jPlayer "+b.jPlayer.prototype.version.script+" needs Jplayer.swf version "+b.jPlayer.prototype.version.needFlash+" but found "};b.jPlayer.errorHint={FLASH:"Check your swfPath option and that Jplayer.swf is there.",FLASH_DISABLED:"Check that you have not display:none; the jPlayer entity or any ancestor.",NO_SOLUTION:"Review the jPlayer options: support and supplied.",NO_SUPPORT:"Video or audio formats defined in the supplied option are missing.",
URL:"Check media URL is valid.",URL_NOT_SET:"Use setMedia() to set the media URL.",VERSION:"Update jPlayer files."};b.jPlayer.warning={CSS_SELECTOR_COUNT:"e_css_selector_count",CSS_SELECTOR_METHOD:"e_css_selector_method",CSS_SELECTOR_STRING:"e_css_selector_string",OPTION_KEY:"e_option_key"};b.jPlayer.warningMsg={CSS_SELECTOR_COUNT:"The number of css selectors found did not equal one: ",CSS_SELECTOR_METHOD:"The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",CSS_SELECTOR_STRING:"The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
OPTION_KEY:"The option requested in jPlayer('option') is undefined."};b.jPlayer.warningHint={CSS_SELECTOR_COUNT:"Check your css selector and the ancestor.",CSS_SELECTOR_METHOD:"Check your method name.",CSS_SELECTOR_STRING:"Check your css selector is a string.",OPTION_KEY:"Check your option name."}});
;
(function ($) {

/**
 * Provides Ajax page updating via jQuery $.ajax (Asynchronous JavaScript and XML).
 *
 * Ajax is a method of making a request via JavaScript while viewing an HTML
 * page. The request returns an array of commands encoded in JSON, which is
 * then executed to make any changes that are necessary to the page.
 *
 * Drupal uses this file to enhance form elements with #ajax['path'] and
 * #ajax['wrapper'] properties. If set, this file will automatically be included
 * to provide Ajax capabilities.
 */

Drupal.ajax = Drupal.ajax || {};

Drupal.settings.urlIsAjaxTrusted = Drupal.settings.urlIsAjaxTrusted || {};

/**
 * Attaches the Ajax behavior to each Ajax form element.
 */
Drupal.behaviors.AJAX = {
  attach: function (context, settings) {
    // Load all Ajax behaviors specified in the settings.
    for (var base in settings.ajax) {
      if (!$('#' + base + '.ajax-processed').length) {
        var element_settings = settings.ajax[base];

        if (typeof element_settings.selector == 'undefined') {
          element_settings.selector = '#' + base;
        }
        $(element_settings.selector).each(function () {
          element_settings.element = this;
          Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
        });

        $('#' + base).addClass('ajax-processed');
      }
    }

    // Bind Ajax behaviors to all items showing the class.
    $('.use-ajax:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};
      // Clicked links look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      // For anchor tags, these will go to the target of the anchor rather
      // than the usual location.
      if ($(this).attr('href')) {
        element_settings.url = $(this).attr('href');
        element_settings.event = 'click';
      }
      var base = $(this).attr('id');
      Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
    });

    // This class means to submit the form to the action using Ajax.
    $('.use-ajax-submit:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};

      // Ajax submits specified in this manner automatically submit to the
      // normal form action.
      element_settings.url = $(this.form).attr('action');
      // Form submit button clicks need to tell the form what was clicked so
      // it gets passed in the POST request.
      element_settings.setClick = true;
      // Form buttons use the 'click' event rather than mousedown.
      element_settings.event = 'click';
      // Clicked form buttons look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      var base = $(this).attr('id');
      Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
    });
  }
};

/**
 * Ajax object.
 *
 * All Ajax objects on a page are accessible through the global Drupal.ajax
 * object and are keyed by the submit button's ID. You can access them from
 * your module's JavaScript file to override properties or functions.
 *
 * For example, if your Ajax enabled button has the ID 'edit-submit', you can
 * redefine the function that is called to insert the new content like this
 * (inside a Drupal.behaviors attach block):
 * @code
 *    Drupal.behaviors.myCustomAJAXStuff = {
 *      attach: function (context, settings) {
 *        Drupal.ajax['edit-submit'].commands.insert = function (ajax, response, status) {
 *          new_content = $(response.data);
 *          $('#my-wrapper').append(new_content);
 *          alert('New content was appended to #my-wrapper');
 *        }
 *      }
 *    };
 * @endcode
 */
Drupal.ajax = function (base, element, element_settings) {
  var defaults = {
    url: 'system/ajax',
    event: 'mousedown',
    keypress: true,
    selector: '#' + base,
    effect: 'none',
    speed: 'none',
    method: 'replaceWith',
    progress: {
      type: 'throbber',
      message: Drupal.t('Please wait...')
    },
    submit: {
      'js': true
    }
  };

  $.extend(this, defaults, element_settings);

  this.element = element;
  this.element_settings = element_settings;

  // Replacing 'nojs' with 'ajax' in the URL allows for an easy method to let
  // the server detect when it needs to degrade gracefully.
  // There are five scenarios to check for:
  // 1. /nojs/
  // 2. /nojs$ - The end of a URL string.
  // 3. /nojs? - Followed by a query (with clean URLs enabled).
  //      E.g.: path/nojs?destination=foobar
  // 4. /nojs& - Followed by a query (without clean URLs enabled).
  //      E.g.: ?q=path/nojs&destination=foobar
  // 5. /nojs# - Followed by a fragment.
  //      E.g.: path/nojs#myfragment
  this.url = element_settings.url.replace(/\/nojs(\/|$|\?|&|#)/g, '/ajax$1');
  // If the 'nojs' version of the URL is trusted, also trust the 'ajax' version.
  if (Drupal.settings.urlIsAjaxTrusted[element_settings.url]) {
    Drupal.settings.urlIsAjaxTrusted[this.url] = true;
  }

  this.wrapper = '#' + element_settings.wrapper;

  // If there isn't a form, jQuery.ajax() will be used instead, allowing us to
  // bind Ajax to links as well.
  if (this.element.form) {
    this.form = $(this.element.form);
  }

  // Set the options for the ajaxSubmit function.
  // The 'this' variable will not persist inside of the options object.
  var ajax = this;
  ajax.options = {
    url: Drupal.sanitizeAjaxUrl(ajax.url),
    data: ajax.submit,
    beforeSerialize: function (element_settings, options) {
      return ajax.beforeSerialize(element_settings, options);
    },
    beforeSubmit: function (form_values, element_settings, options) {
      ajax.ajaxing = true;
      return ajax.beforeSubmit(form_values, element_settings, options);
    },
    beforeSend: function (xmlhttprequest, options) {
      ajax.ajaxing = true;
      return ajax.beforeSend(xmlhttprequest, options);
    },
    success: function (response, status, xmlhttprequest) {
      // Sanity check for browser support (object expected).
      // When using iFrame uploads, responses must be returned as a string.
      if (typeof response == 'string') {
        response = $.parseJSON(response);
      }

      // Prior to invoking the response's commands, verify that they can be
      // trusted by checking for a response header. See
      // ajax_set_verification_header() for details.
      // - Empty responses are harmless so can bypass verification. This avoids
      //   an alert message for server-generated no-op responses that skip Ajax
      //   rendering.
      // - Ajax objects with trusted URLs (e.g., ones defined server-side via
      //   #ajax) can bypass header verification. This is especially useful for
      //   Ajax with multipart forms. Because IFRAME transport is used, the
      //   response headers cannot be accessed for verification.
      if (response !== null && !Drupal.settings.urlIsAjaxTrusted[ajax.url]) {
        if (xmlhttprequest.getResponseHeader('X-Drupal-Ajax-Token') !== '1') {
          var customMessage = Drupal.t("The response failed verification so will not be processed.");
          return ajax.error(xmlhttprequest, ajax.url, customMessage);
        }
      }

      return ajax.success(response, status);
    },
    complete: function (xmlhttprequest, status) {
      ajax.ajaxing = false;
      if (status == 'error' || status == 'parsererror') {
        return ajax.error(xmlhttprequest, ajax.url);
      }
    },
    dataType: 'json',
    jsonp: false,
    type: 'POST'
  };

  // For multipart forms (e.g., file uploads), jQuery Form targets the form
  // submission to an iframe instead of using an XHR object. The initial "src"
  // of the iframe, prior to the form submission, is set to options.iframeSrc.
  // "about:blank" is the semantically correct, standards-compliant, way to
  // initialize a blank iframe; however, some old IE versions (possibly only 6)
  // incorrectly report a mixed content warning when iframes with an
  // "about:blank" src are added to a parent document with an https:// origin.
  // jQuery Form works around this by defaulting to "javascript:false" instead,
  // but that breaks on Chrome 83, so here we force the semantically correct
  // behavior for all browsers except old IE.
  // @see https://www.drupal.org/project/drupal/issues/3143016
  // @see https://github.com/jquery-form/form/blob/df9cb101b9c9c085c8d75ad980c7ff1cf62063a1/jquery.form.js#L68
  // @see https://bugs.chromium.org/p/chromium/issues/detail?id=1084874
  // @see https://html.spec.whatwg.org/multipage/browsers.html#creating-browsing-contexts
  // @see https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
  if (navigator.userAgent.indexOf("MSIE") === -1) {
    ajax.options.iframeSrc = 'about:blank';
  }

  // Bind the ajaxSubmit function to the element event.
  $(ajax.element).bind(element_settings.event, function (event) {
    if (!Drupal.settings.urlIsAjaxTrusted[ajax.url] && !Drupal.urlIsLocal(ajax.url)) {
      throw new Error(Drupal.t('The callback URL is not local and not trusted: !url', {'!url': ajax.url}));
    }
    return ajax.eventResponse(this, event);
  });

  // If necessary, enable keyboard submission so that Ajax behaviors
  // can be triggered through keyboard input as well as e.g. a mousedown
  // action.
  if (element_settings.keypress) {
    $(ajax.element).keypress(function (event) {
      return ajax.keypressResponse(this, event);
    });
  }

  // If necessary, prevent the browser default action of an additional event.
  // For example, prevent the browser default action of a click, even if the
  // AJAX behavior binds to mousedown.
  if (element_settings.prevent) {
    $(ajax.element).bind(element_settings.prevent, false);
  }
};

/**
 * Handle a key press.
 *
 * The Ajax object will, if instructed, bind to a key press response. This
 * will test to see if the key press is valid to trigger this event and
 * if it is, trigger it for us and prevent other keypresses from triggering.
 * In this case we're handling RETURN and SPACEBAR keypresses (event codes 13
 * and 32. RETURN is often used to submit a form when in a textfield, and 
 * SPACE is often used to activate an element without submitting. 
 */
Drupal.ajax.prototype.keypressResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  // Detect enter key and space bar and allow the standard response for them,
  // except for form elements of type 'text' and 'textarea', where the 
  // spacebar activation causes inappropriate activation if #ajax['keypress'] is 
  // TRUE. On a text-type widget a space should always be a space.
  if (event.which == 13 || (event.which == 32 && element.type != 'text' && element.type != 'textarea')) {
    $(ajax.element_settings.element).trigger(ajax.element_settings.event);
    return false;
  }
};

/**
 * Handle an event that triggers an Ajax response.
 *
 * When an event that triggers an Ajax response happens, this method will
 * perform the actual Ajax call. It is bound to the event using
 * bind() in the constructor, and it uses the options specified on the
 * ajax object.
 */
Drupal.ajax.prototype.eventResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  // Do not perform another ajax command if one is already in progress.
  if (ajax.ajaxing) {
    return false;
  }

  try {
    if (ajax.form) {
      // If setClick is set, we must set this to ensure that the button's
      // value is passed.
      if (ajax.setClick) {
        // Mark the clicked button. 'form.clk' is a special variable for
        // ajaxSubmit that tells the system which element got clicked to
        // trigger the submit. Without it there would be no 'op' or
        // equivalent.
        element.form.clk = element;
      }

      ajax.form.ajaxSubmit(ajax.options);
    }
    else {
      ajax.beforeSerialize(ajax.element, ajax.options);
      $.ajax(ajax.options);
    }
  }
  catch (e) {
    // Unset the ajax.ajaxing flag here because it won't be unset during
    // the complete response.
    ajax.ajaxing = false;
    alert("An error occurred while attempting to process " + ajax.options.url + ": " + e.message);
  }

  // For radio/checkbox, allow the default event. On IE, this means letting
  // it actually check the box.
  if (typeof element.type != 'undefined' && (element.type == 'checkbox' || element.type == 'radio')) {
    return true;
  }
  else {
    return false;
  }

};

/**
 * Handler for the form serialization.
 *
 * Runs before the beforeSend() handler (see below), and unlike that one, runs
 * before field data is collected.
 */
Drupal.ajax.prototype.beforeSerialize = function (element, options) {
  // Allow detaching behaviors to update field values before collecting them.
  // This is only needed when field values are added to the POST data, so only
  // when there is a form such that this.form.ajaxSubmit() is used instead of
  // $.ajax(). When there is no form and $.ajax() is used, beforeSerialize()
  // isn't called, but don't rely on that: explicitly check this.form.
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.detachBehaviors(this.form, settings, 'serialize');
  }

  // Prevent duplicate HTML ids in the returned markup.
  // @see drupal_html_id()
  options.data['ajax_html_ids[]'] = [];
  $('[id]').each(function () {
    options.data['ajax_html_ids[]'].push(this.id);
  });

  // Allow Drupal to return new JavaScript and CSS files to load without
  // returning the ones already loaded.
  // @see ajax_base_page_theme()
  // @see drupal_get_css()
  // @see drupal_get_js()
  options.data['ajax_page_state[theme]'] = Drupal.settings.ajaxPageState.theme;
  options.data['ajax_page_state[theme_token]'] = Drupal.settings.ajaxPageState.theme_token;
  for (var key in Drupal.settings.ajaxPageState.css) {
    options.data['ajax_page_state[css][' + key + ']'] = 1;
  }
  for (var key in Drupal.settings.ajaxPageState.js) {
    options.data['ajax_page_state[js][' + key + ']'] = 1;
  }
};

/**
 * Modify form values prior to form submission.
 */
Drupal.ajax.prototype.beforeSubmit = function (form_values, element, options) {
  // This function is left empty to make it simple to override for modules
  // that wish to add functionality here.
};

/**
 * Prepare the Ajax request before it is sent.
 */
Drupal.ajax.prototype.beforeSend = function (xmlhttprequest, options) {
  // For forms without file inputs, the jQuery Form plugin serializes the form
  // values, and then calls jQuery's $.ajax() function, which invokes this
  // handler. In this circumstance, options.extraData is never used. For forms
  // with file inputs, the jQuery Form plugin uses the browser's normal form
  // submission mechanism, but captures the response in a hidden IFRAME. In this
  // circumstance, it calls this handler first, and then appends hidden fields
  // to the form to submit the values in options.extraData. There is no simple
  // way to know which submission mechanism will be used, so we add to extraData
  // regardless, and allow it to be ignored in the former case.
  if (this.form) {
    options.extraData = options.extraData || {};

    // Let the server know when the IFRAME submission mechanism is used. The
    // server can use this information to wrap the JSON response in a TEXTAREA,
    // as per http://jquery.malsup.com/form/#file-upload.
    options.extraData.ajax_iframe_upload = '1';

    // The triggering element is about to be disabled (see below), but if it
    // contains a value (e.g., a checkbox, textfield, select, etc.), ensure that
    // value is included in the submission. As per above, submissions that use
    // $.ajax() are already serialized prior to the element being disabled, so
    // this is only needed for IFRAME submissions.
    var v = $.fieldValue(this.element);
    if (v !== null) {
      options.extraData[this.element.name] = Drupal.checkPlain(v);
    }
  }

  // Disable the element that received the change to prevent user interface
  // interaction while the Ajax request is in progress. ajax.ajaxing prevents
  // the element from triggering a new request, but does not prevent the user
  // from changing its value.
  $(this.element).addClass('progress-disabled').attr('disabled', true);

  // Insert progressbar or throbber.
  if (this.progress.type == 'bar') {
    var progressBar = new Drupal.progressBar('ajax-progress-' + this.element.id, eval(this.progress.update_callback), this.progress.method, eval(this.progress.error_callback));
    if (this.progress.message) {
      progressBar.setProgress(-1, this.progress.message);
    }
    if (this.progress.url) {
      progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
    }
    this.progress.element = $(progressBar.element).addClass('ajax-progress ajax-progress-bar');
    this.progress.object = progressBar;
    $(this.element).after(this.progress.element);
  }
  else if (this.progress.type == 'throbber') {
    this.progress.element = $('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');
    if (this.progress.message) {
      $('.throbber', this.progress.element).after('<div class="message">' + this.progress.message + '</div>');
    }
    $(this.element).after(this.progress.element);
  }
};

/**
 * Handler for the form redirection completion.
 */
Drupal.ajax.prototype.success = function (response, status) {
  // Remove the progress element.
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
  }
  $(this.element).removeClass('progress-disabled').removeAttr('disabled');

  Drupal.freezeHeight();

  for (var i in response) {
    if (response.hasOwnProperty(i) && response[i]['command'] && this.commands[response[i]['command']]) {
      this.commands[response[i]['command']](this, response[i], status);
    }
  }

  // Reattach behaviors, if they were detached in beforeSerialize(). The
  // attachBehaviors() called on the new content from processing the response
  // commands is not sufficient, because behaviors from the entire form need
  // to be reattached.
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.attachBehaviors(this.form, settings);
  }

  Drupal.unfreezeHeight();

  // Remove any response-specific settings so they don't get used on the next
  // call by mistake.
  this.settings = null;
};

/**
 * Build an effect object which tells us how to apply the effect when adding new HTML.
 */
Drupal.ajax.prototype.getEffect = function (response) {
  var type = response.effect || this.effect;
  var speed = response.speed || this.speed;

  var effect = {};
  if (type == 'none') {
    effect.showEffect = 'show';
    effect.hideEffect = 'hide';
    effect.showSpeed = '';
  }
  else if (type == 'fade') {
    effect.showEffect = 'fadeIn';
    effect.hideEffect = 'fadeOut';
    effect.showSpeed = speed;
  }
  else {
    effect.showEffect = type + 'Toggle';
    effect.hideEffect = type + 'Toggle';
    effect.showSpeed = speed;
  }

  return effect;
};

/**
 * Handler for the form redirection error.
 */
Drupal.ajax.prototype.error = function (xmlhttprequest, uri, customMessage) {
  Drupal.displayAjaxError(Drupal.ajaxError(xmlhttprequest, uri, customMessage));
  // Remove the progress element.
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
  }
  // Undo hide.
  $(this.wrapper).show();
  // Re-enable the element.
  $(this.element).removeClass('progress-disabled').removeAttr('disabled');
  // Reattach behaviors, if they were detached in beforeSerialize().
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.attachBehaviors(this.form, settings);
  }
};

/**
 * Provide a series of commands that the server can request the client perform.
 */
Drupal.ajax.prototype.commands = {
  /**
   * Command to insert new content into the DOM.
   */
  insert: function (ajax, response, status) {
    // Get information from the response. If it is not there, default to
    // our presets.
    var wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
    var method = response.method || ajax.method;
    var effect = ajax.getEffect(response);

    // We don't know what response.data contains: it might be a string of text
    // without HTML, so don't rely on jQuery correctly iterpreting
    // $(response.data) as new HTML rather than a CSS selector. Also, if
    // response.data contains top-level text nodes, they get lost with either
    // $(response.data) or $('<div></div>').replaceWith(response.data).
    var new_content_wrapped = $('<div></div>').html(response.data);
    var new_content = new_content_wrapped.contents();

    // For legacy reasons, the effects processing code assumes that new_content
    // consists of a single top-level element. Also, it has not been
    // sufficiently tested whether attachBehaviors() can be successfully called
    // with a context object that includes top-level text nodes. However, to
    // give developers full control of the HTML appearing in the page, and to
    // enable Ajax content to be inserted in places where DIV elements are not
    // allowed (e.g., within TABLE, TR, and SPAN parents), we check if the new
    // content satisfies the requirement of a single top-level element, and
    // only use the container DIV created above when it doesn't. For more
    // information, please see http://drupal.org/node/736066.
    if (new_content.length != 1 || new_content.get(0).nodeType != 1) {
      new_content = new_content_wrapped;
    }

    // If removing content from the wrapper, detach behaviors first.
    switch (method) {
      case 'html':
      case 'replaceWith':
      case 'replaceAll':
      case 'empty':
      case 'remove':
        var settings = response.settings || ajax.settings || Drupal.settings;
        Drupal.detachBehaviors(wrapper, settings);
    }

    // Add the new content to the page.
    wrapper[method](new_content);

    // Immediately hide the new content if we're using any effects.
    if (effect.showEffect != 'show') {
      new_content.hide();
    }

    // Determine which effect to use and what content will receive the
    // effect, then show the new content.
    if ($('.ajax-new-content', new_content).length > 0) {
      $('.ajax-new-content', new_content).hide();
      new_content.show();
      $('.ajax-new-content', new_content)[effect.showEffect](effect.showSpeed);
    }
    else if (effect.showEffect != 'show') {
      new_content[effect.showEffect](effect.showSpeed);
    }

    // Attach all JavaScript behaviors to the new content, if it was successfully
    // added to the page, this if statement allows #ajax['wrapper'] to be
    // optional.
    if (new_content.parents('html').length > 0) {
      // Apply any settings from the returned JSON if available.
      var settings = response.settings || ajax.settings || Drupal.settings;
      Drupal.attachBehaviors(new_content, settings);
    }
  },

  /**
   * Command to remove a chunk from the page.
   */
  remove: function (ajax, response, status) {
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.detachBehaviors($(response.selector), settings);
    $(response.selector).remove();
  },

  /**
   * Command to mark a chunk changed.
   */
  changed: function (ajax, response, status) {
    if (!$(response.selector).hasClass('ajax-changed')) {
      $(response.selector).addClass('ajax-changed');
      if (response.asterisk) {
        $(response.selector).find(response.asterisk).append(' <span class="ajax-changed">*</span> ');
      }
    }
  },

  /**
   * Command to provide an alert.
   */
  alert: function (ajax, response, status) {
    alert(response.text, response.title);
  },

  /**
   * Command to provide the jQuery css() function.
   */
  css: function (ajax, response, status) {
    $(response.selector).css(response.argument);
  },

  /**
   * Command to set the settings that will be used for other commands in this response.
   */
  settings: function (ajax, response, status) {
    if (response.merge) {
      $.extend(true, Drupal.settings, response.settings);
    }
    else {
      ajax.settings = response.settings;
    }
  },

  /**
   * Command to attach data using jQuery's data API.
   */
  data: function (ajax, response, status) {
    $(response.selector).data(response.name, response.value);
  },

  /**
   * Command to apply a jQuery method.
   */
  invoke: function (ajax, response, status) {
    var $element = $(response.selector);
    $element[response.method].apply($element, response.arguments);
  },

  /**
   * Command to restripe a table.
   */
  restripe: function (ajax, response, status) {
    // :even and :odd are reversed because jQuery counts from 0 and
    // we count from 1, so we're out of sync.
    // Match immediate children of the parent element to allow nesting.
    $('> tbody > tr:visible, > tr:visible', $(response.selector))
      .removeClass('odd even')
      .filter(':even').addClass('odd').end()
      .filter(':odd').addClass('even');
  },

  /**
   * Command to add css.
   *
   * Uses the proprietary addImport method if available as browsers which
   * support that method ignore @import statements in dynamically added
   * stylesheets.
   */
  add_css: function (ajax, response, status) {
    // Add the styles in the normal way.
    $('head').prepend(response.data);
    // Add imports in the styles using the addImport method if available.
    var match, importMatch = /^@import url\("(.*)"\);$/igm;
    if (document.styleSheets[0].addImport && importMatch.test(response.data)) {
      importMatch.lastIndex = 0;
      while (match = importMatch.exec(response.data)) {
        document.styleSheets[0].addImport(match[1]);
      }
    }
  },

  /**
   * Command to update a form's build ID.
   */
  updateBuildId: function(ajax, response, status) {
    $('input[name="form_build_id"][value="' + response['old'] + '"]').val(response['new']);
  }
};

})(jQuery);
;
(function (D) {
  var beforeSerialize = D.ajax.prototype.beforeSerialize;
  D.ajax.prototype.beforeSerialize = function (element, options) {
    beforeSerialize.call(this, element, options);
    options.data['ajax_page_state[jquery_version]'] = D.settings.ajaxPageState.jquery_version;
  }
})(Drupal);
;
