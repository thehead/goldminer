window.__require=function e(t,n,o){function c(i,s){if(!n[i]){if(!t[i]){var a=i.split("/");if(a=a[a.length-1],!t[a]){var u="function"==typeof __require&&__require;if(!s&&u)return u(a,!0);if(r)return r(a,!0);throw new Error("Cannot find module '"+i+"'")}}var l=n[i]={exports:{}};t[i][0].call(l.exports,function(e){return c(t[i][1][e]||e)},l,l.exports,e,t,n,o)}return n[i].exports}for(var r="function"==typeof __require&&__require,i=0;i<o.length;i++)c(o[i]);return c}({common:[function(e,t,n){"use strict";cc._RF.push(t,"eed47SyfmhOqrWhHsHMq5kg","common");var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c=e("md5");function r(e,t){var n="",o=e;o.timePoint=Math.ceil((new Date).getTime()/1e3);var r=new Array;for(var i in o)r.push(i);for(var s=(r=r.sort()).length,a=0;a<s;a++){var u=encodeURIComponent(o[r[a]]).replace(/(!)|(')|(\()|(\))|(\~)/gi,function(e){return"%"+e.charCodeAt(0).toString(16).toLocaleUpperCase()});n+=r[a]+'="'+(t?u:o[r[a]])+'"&'}return n=n.substring(0,n.lastIndexOf("&")),n=c(n+="acc76ba52cb04732a682928540fd2945")}function i(e,t,n){if(null==e)return"";var c="",r=void 0===e?"undefined":o(e);if("string"==r||"number"==r||"boolean"==r)c+="&"+t+"="+(null==n||n?encodeURIComponent(e):e);else for(var s in e){var a=null==t?s:t+(e instanceof Array?"["+s+"]":"."+s);c+=i(e[s],a,n)}return c}var s={getQueryVariable:function(e){for(var t=window.location.search.substring(1).split("&"),n=0;n<t.length;n++){var o=t[n].split("=");if(o[0]==e)return o[1]}return!1},Encrypt:function(e){return e.hasOwnProperty("sign")&&delete e.sign,e.sign=r(e,!0),e},reqUrl:function(e,t){var n=i(t);return e+(n="?"+n.substr(1))}};t.exports={common:s},cc._RF.pop()},{md5:"md5"}],config:[function(e,t,n){"use strict";cc._RF.push(t,"cb919DaqiZHF6SNIe0VJNQx","config");t.exports={itemObj:{default:{speed:3},gold1:{speed:.5,score:50},gold3:{speed:.8,score:30},stone:{speed:.3,score:5},diamond:{speed:4,score:100},bage:{speed:2,score:0},segment:{speed:2,score:0},mouse:{speed:3,score:10},awards:{speed:3,score:0},wall:{speed:3,score:0}}},cc._RF.pop()},{}],front:[function(e,t,n){"use strict";cc._RF.push(t,"fc2681Ab5tLCJvOxymL5ldr","front"),cc.Class({extends:cc.Component,properties:{startBtn:{default:null,type:cc.Node},ruleBtn:{default:null,type:cc.Node},gameRules:{default:null,type:cc.Node},closeRules:{default:null,type:cc.Node}},onLoad:function(){cc.director.preloadScene("gamePage",function(e,t,n,o){cc.log("Next scene preloaded")})},start:function(){},startBtnFun:function(){cc.director.loadScene("gamePage")},ruleBtnFun:function(){cc.log("ruleBtnFun"),this.gameRules.active=!0},returnGame:function(){this.gameRules.active=!1}}),cc._RF.pop()},{}],game:[function(e,t,n){"use strict";cc._RF.push(t,"ec61bzSpIpC/41DO83LoHzF","game");var o=e("config"),c=e("common"),r=o.itemObj,i=c.common;cc.Class({extends:cc.Component,properties:{score:{default:null,type:cc.Label},timerLabel:{default:null,type:cc.Label},resumeBtn:{default:null,type:cc.Node},hockBox:{type:cc.Node,default:null},rope:{type:cc.Node,default:null},hook:{type:cc.Node,default:null},gold1:{default:null,type:cc.Node},gold1Hock:{default:null,type:cc.Node},gold3:{default:null,type:cc.Node},gold3Hock:{default:null,type:cc.Node},stone:{default:null,type:cc.Node},stoneHock:{default:null,type:cc.Node},diamond:{default:null,type:cc.Node},diamondHock:{default:null,type:cc.Node},bage:{default:null,type:cc.Node},bageHock:{default:null,type:cc.Node},mouse:{default:null,type:cc.Node},mouseHock:{default:null,type:cc.Node},gameOver:{default:null,type:cc.Node},resume:{default:null,type:cc.Node},gameOverText:{default:null,type:cc.Label},gameOverRewardText:{default:null,type:cc.Label}},ctor:function(){this.reqParam={userId:"",gameType:2,timePoint:"",sign:""},this.url={before:"http://www.yanyule.com/easy_yanyu_web/playgame/playgameBefore",after:"http://www.yanyule.com/easy_yanyu_web/playgame/playgameAfter"},this.level=1,this.goodsList=[],this.getreward={getted:!1,name:"",id:""},this.rope={speed:1},this.hock={state:0,moving:!1,canCatch:!0,touchWall:!1},this.gameState={score:0,pause:!1,ropeTime:1.5,timer:null,timeTimer:null,defaultHook:null}},onLoad:function(){var e=i.getQueryVariable("userId");if(e){var t=this;this.reqParam.userId=e,this.reqParam=i.Encrypt(this.reqParam);var n=i.reqUrl(this.url.before,this.reqParam);ajax.Get(n,function(e){"00000"===e.code?(t.level=e.data.level,t.goodsList=e.data.goodsList,t.initGood(),t.initSence()):alert(e.info)})}else alert("\u83b7\u53d6\u8eab\u4efd\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u8fdb\u5165\u6e38\u620f")},initSence:function(){this.setCollision(),this.initTimer(),null!=this.hook&&(this.defaultHook=this.hook.getComponent(cc.Sprite).spriteFrame),this.initRope()},initGood:function(){var e=this;this.level;this.goodsList.length&&this.goodsList.forEach(function(t,n){if(1==t.goodsType){r.bage.score=t.goodsReward-0;var o=t.goodsImage,c=t.goodsImageTick;cc.loader.load({url:o,type:"png"},function(t,n){var o=new cc.SpriteFrame(n),c="Canvas/level"+e.level+"/bage";(c=cc.find(c)).getComponent(cc.Sprite).spriteFrame=o,c.active=!0}),cc.loader.load({url:c,type:"png"},function(t,n){var o=new cc.SpriteFrame(n),c="Canvas/level"+e.level+"/bage/bageHock";(c=cc.find(c)).getComponent(cc.Sprite).spriteFrame=o})}if(2==t.goodsType){var i=t.goodsImage,s=t.goodsImageTick;cc.loader.load({url:i,type:"png"},function(t,n){var o=new cc.SpriteFrame(n),c="Canvas/level"+e.level+"/segment";(c=cc.find(c)).getComponent(cc.Sprite).spriteFrame=o,c.active=!0}),cc.loader.load({url:s,type:"png"},function(t,n){var o=new cc.SpriteFrame(n),c="Canvas/level"+e.level+"/segment/segmentHock";(c=cc.find(c)).getComponent(cc.Sprite).spriteFrame=o})}})},setCollision:function(){cc.director.getCollisionManager().enabled=!0},initTimer:function(){this.timeTimer=function(){0==this.timerLabel.string?(this.gameOver.active=!0,this.gameOverText.string="\u606d\u559c\u83b7\u5f97\u91d1\u5e01:"+this.score.string,this.getreward.getted&&(this.gameOverRewardText.node.active=!0,this.gameOverRewardText.string="\u83b7\u5f97"+this.getreward.name),this.updateScore(),cc.director.pause()):this.timerLabel.string-=1},this.schedule(this.timeTimer,1)},initRope:function(){var e=this;this.startPos=this.hockBox.position,this.shakeActionFun(),this.node.on("touchstart",function(){this.hock.moving||e.down()},this)},shakeActionFun:function(e){var t=this,n=this.gameState.ropeTime,o=cc.callFunc(function(){if(e){t.hockBox.stopAllActions(),e=null;var o=cc.callFunc(function(){t.shakeActionFun()});t.hockBox.runAction(cc.sequence(cc.rotateTo(n,0),o))}});e&&(e*=n);var c=cc.sequence(cc.rotateTo(e||n,-180),o),r=cc.rotateTo(e||n,0);this.shakeAction=cc.repeatForever(cc.sequence(c,r)),this.hockBox.runAction(this.shakeAction)},down:function(){this.hockBox.stopAllActions(),this.hock.moving=!0,this.timer=function(){this.rope.height+=r.default.speed,this.hook.y-=r.default.speed},this.schedule(this.timer,.01)},up:function(e,t){this.hock.moving||(this.hock.moving=!0,this.timer=function(){var n=e.node.name,o=r[n];if(this.rope.height<40){3==e.tag&&this.reward(),console.log(this.getreward),this.stopLengthFun(),t.node.getComponent(cc.Sprite).spriteFrame=this.defaultHook;var c=((180-this.hockBox.angle)/180).toFixed(2)||.01;c=c-0+.1,this.shakeActionFun(c),this.rope.height=30,this.hook.y=-37;var i=r[n].score;this.addMoney(i),this.canCatch(),this.hock.touchWall=!1}else{if(this.rope.height-=o.speed,this.hook.y+=o.speed,e.tag||(this.hock.touchWall=!0),this.hock.touchWall)return;if(!this.hock.canCatch)return;this.cannotCatch(),e.node.active=!1;var s=n+"Hock";if(2==e.tag){var a="Canvas/level"+this.level+"/bage/bageHock";a=cc.find(a),t.node.getComponent(cc.Sprite).spriteFrame=a.getComponent(cc.Sprite).spriteFrame}else if(3==e.tag){var u="Canvas/level"+this.level+"/segment/segmentHock";u=cc.find(u),t.node.getComponent(cc.Sprite).spriteFrame=u.getComponent(cc.Sprite).spriteFrame}else t.node.getComponent(cc.Sprite).spriteFrame=this[s].getComponent(cc.Sprite).spriteFrame}},this.schedule(this.timer,.01))},stopLengthFun:function(){this.unschedule(this.timer),this.hock.moving=!1},resumeBtnFun:function(){this.resume.active=!0,cc.director.pause()},addMoney:function(e){e&&(this.score.string=this.score.string-0+e)},reward:function(){var e=this;this.goodsList.forEach(function(t,n){2==t.goodsType&&(e.getreward.getted=!0,e.getreward.name=t.goodsName,e.getreward.id=t.goodsId)})},cannotCatch:function(){this.hock.canCatch=!1},canCatch:function(){this.hock.canCatch=!0},getCatchState:function(){return this.hock.canCatch},returnGame:function(){this.resume.active=!1,cc.director.resume()},returnHome:function(){cc.director.loadScene("frontPage"),cc.director.resume()},updateScore:function(){var e=this,t={goodsId:this.getreward.id,userId:this.reqParam.userId,score:this.score.string,gameType:2};t=i.Encrypt(t);var n=i.reqUrl(this.url.after,t);ajax.Get(n,function(t){"00000"===t.code?(e.level=t.data.level,e.goodsList=t.data.goodsList,e.initGood(),e.initSence()):alert(t.info)})}}),cc._RF.pop()},{common:"common",config:"config"}],hockBox:[function(e,t,n){"use strict";cc._RF.push(t,"12cb6VAJVNEJau/QR6Loodt","hockBox"),cc.Class({extends:cc.Component,properties:{myCanvas:{default:null,type:cc.Node}},onLoad:function(){this.init()},init:function(){null!=this.myCanvas&&(this.myCanvas=this.myCanvas.getComponent("game"))},onCollisionEnter:function(e,t){this.myCanvas.getCatchState()&&(this.myCanvas.stopLengthFun(),this.myCanvas.up(e,t))}}),cc._RF.pop()},{}],initData:[function(e,t,n){"use strict";cc._RF.push(t,"b6ea4rRnA1ADqBk9Bu7FjyK","initData"),cc.Class({extends:cc.Component,properties:{},start:function(){}}),cc._RF.pop()},{}],md5:[function(e,t,n){"use strict";cc._RF.push(t,"7a5639dCnpF9ZnCNIDUtrwX","md5");var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){function n(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function c(e,t){return e<<t|e>>>32-t}function r(e,t,o,r,i,s){return n(c(n(n(t,e),n(r,s)),i),o)}function i(e,t,n,o,c,i,s){return r(t&n|~t&o,e,t,c,i,s)}function s(e,t,n,o,c,i,s){return r(t&o|n&~o,e,t,c,i,s)}function a(e,t,n,o,c,i,s){return r(t^n^o,e,t,c,i,s)}function u(e,t,n,o,c,i,s){return r(n^(t|~o),e,t,c,i,s)}function l(e,t){e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;var o,c,r,l,d,p=1732584193,h=-271733879,f=-1732584194,m=271733878;for(o=0;o<e.length;o+=16)c=p,r=h,l=f,d=m,h=u(h=u(h=u(h=u(h=a(h=a(h=a(h=a(h=s(h=s(h=s(h=s(h=i(h=i(h=i(h=i(h,f=i(f,m=i(m,p=i(p,h,f,m,e[o],7,-680876936),h,f,e[o+1],12,-389564586),p,h,e[o+2],17,606105819),m,p,e[o+3],22,-1044525330),f=i(f,m=i(m,p=i(p,h,f,m,e[o+4],7,-176418897),h,f,e[o+5],12,1200080426),p,h,e[o+6],17,-1473231341),m,p,e[o+7],22,-45705983),f=i(f,m=i(m,p=i(p,h,f,m,e[o+8],7,1770035416),h,f,e[o+9],12,-1958414417),p,h,e[o+10],17,-42063),m,p,e[o+11],22,-1990404162),f=i(f,m=i(m,p=i(p,h,f,m,e[o+12],7,1804603682),h,f,e[o+13],12,-40341101),p,h,e[o+14],17,-1502002290),m,p,e[o+15],22,1236535329),f=s(f,m=s(m,p=s(p,h,f,m,e[o+1],5,-165796510),h,f,e[o+6],9,-1069501632),p,h,e[o+11],14,643717713),m,p,e[o],20,-373897302),f=s(f,m=s(m,p=s(p,h,f,m,e[o+5],5,-701558691),h,f,e[o+10],9,38016083),p,h,e[o+15],14,-660478335),m,p,e[o+4],20,-405537848),f=s(f,m=s(m,p=s(p,h,f,m,e[o+9],5,568446438),h,f,e[o+14],9,-1019803690),p,h,e[o+3],14,-187363961),m,p,e[o+8],20,1163531501),f=s(f,m=s(m,p=s(p,h,f,m,e[o+13],5,-1444681467),h,f,e[o+2],9,-51403784),p,h,e[o+7],14,1735328473),m,p,e[o+12],20,-1926607734),f=a(f,m=a(m,p=a(p,h,f,m,e[o+5],4,-378558),h,f,e[o+8],11,-2022574463),p,h,e[o+11],16,1839030562),m,p,e[o+14],23,-35309556),f=a(f,m=a(m,p=a(p,h,f,m,e[o+1],4,-1530992060),h,f,e[o+4],11,1272893353),p,h,e[o+7],16,-155497632),m,p,e[o+10],23,-1094730640),f=a(f,m=a(m,p=a(p,h,f,m,e[o+13],4,681279174),h,f,e[o],11,-358537222),p,h,e[o+3],16,-722521979),m,p,e[o+6],23,76029189),f=a(f,m=a(m,p=a(p,h,f,m,e[o+9],4,-640364487),h,f,e[o+12],11,-421815835),p,h,e[o+15],16,530742520),m,p,e[o+2],23,-995338651),f=u(f,m=u(m,p=u(p,h,f,m,e[o],6,-198630844),h,f,e[o+7],10,1126891415),p,h,e[o+14],15,-1416354905),m,p,e[o+5],21,-57434055),f=u(f,m=u(m,p=u(p,h,f,m,e[o+12],6,1700485571),h,f,e[o+3],10,-1894986606),p,h,e[o+10],15,-1051523),m,p,e[o+1],21,-2054922799),f=u(f,m=u(m,p=u(p,h,f,m,e[o+8],6,1873313359),h,f,e[o+15],10,-30611744),p,h,e[o+6],15,-1560198380),m,p,e[o+13],21,1309151649),f=u(f,m=u(m,p=u(p,h,f,m,e[o+4],6,-145523070),h,f,e[o+11],10,-1120210379),p,h,e[o+2],15,718787259),m,p,e[o+9],21,-343485551),p=n(p,c),h=n(h,r),f=n(f,l),m=n(m,d);return[p,h,f,m]}function d(e){var t,n="",o=32*e.length;for(t=0;t<o;t+=8)n+=String.fromCharCode(e[t>>5]>>>t%32&255);return n}function p(e){var t,n=[];for(n[(e.length>>2)-1]=void 0,t=0;t<n.length;t+=1)n[t]=0;var o=8*e.length;for(t=0;t<o;t+=8)n[t>>5]|=(255&e.charCodeAt(t/8))<<t%32;return n}function h(e){return d(l(p(e),8*e.length))}function f(e,t){var n,o,c=p(e),r=[],i=[];for(r[15]=i[15]=void 0,c.length>16&&(c=l(c,8*e.length)),n=0;n<16;n+=1)r[n]=909522486^c[n],i[n]=1549556828^c[n];return o=l(r.concat(p(t)),512+8*t.length),d(l(i.concat(o),640))}function m(e){var t,n,o="0123456789abcdef",c="";for(n=0;n<e.length;n+=1)t=e.charCodeAt(n),c+=o.charAt(t>>>4&15)+o.charAt(15&t);return c}function g(e){return unescape(encodeURIComponent(e))}function y(e){return h(g(e))}function v(e){return m(y(e))}function C(e,t){return f(g(e),g(t))}function b(e,t){return m(C(e,t))}function k(e,t,n){return t?n?C(t,e):b(t,e):n?y(e):v(e)}"function"==typeof define&&define.amd?define(function(){return k}):"object"==(void 0===t?"undefined":o(t))&&t.exports?t.exports=k:e.md5=k}(void 0),cc._RF.pop()},{}],mouse:[function(e,t,n){"use strict";cc._RF.push(t,"19262y3LFNNYqf5xbMNBpO/","mouse"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.node.scaleX>0?this.turnUp():this.turnDown()},start:function(){},update:function(e){this.node.y>410&&this.turnDown(),this.node.y<-430&&this.turnUp(),this.node.y+=this.speed*e},turnUp:function(){this.speed=150,this.node.scaleX=1},turnDown:function(){this.speed=-150,this.node.scaleX=-1}}),cc._RF.pop()},{}],request:[function(e,t,n){"use strict";cc._RF.push(t,"1b43bP+bUdOtJ985crF4tBY","request");var o=cc.Class({extends:cc.Component,statics:{},properties:{},Get:function(e,t){var n=cc.loader.getXMLHttpRequest();n.onreadystatechange=function(){if(4===n.readyState&&200==n.status){var e=n.responseText,o=JSON.parse(e);t(o)}else 4===n.readyState&&401==n.status&&(cc.myGame.gameUi.onHideLockScreen(),t({status:401}))},n.withCredentials=!1,n.open("GET",e,!0),n.timeout=8e3,n.send()},Post:function(e,t,n){cc.myGame.gameUi.onShowLockScreen();var o=cc.loader.getXMLHttpRequest();o.onreadystatechange=function(){if(4===o.readyState&&200==o.status){var e=o.responseText,t=JSON.parse(e);cc.myGame.gameUi.onHideLockScreen(),n(t)}else n(-1)},o.open("POST",e,!0),o.setRequestHeader("Access-Control-Allow-Origin","*"),o.setRequestHeader("Access-Control-Allow-Methods","GET, POST"),o.setRequestHeader("Access-Control-Allow-Headers","x-requested-with,content-type"),o.setRequestHeader("Content-Type","application/json"),o.timeout=8e3,o.send(JSON.stringify(t))}});window.ajax=new o,cc._RF.pop()},{}]},{},["config","initData","front","game","common","hockBox","mouse","md5","request"]);