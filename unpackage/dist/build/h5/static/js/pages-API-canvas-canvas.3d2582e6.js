(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-API-canvas-canvas"],{"5ea1":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".canvas-element-wrapper[data-v-ca5bd1ac]{display:block;margin-bottom:%?100?%}.canvas-element[data-v-ca5bd1ac]{width:100%;height:%?500?%;background-color:#fff}.canvas-buttons[data-v-ca5bd1ac]{padding:%?30?% %?50?% %?10?%;width:100%;height:%?360?%;-webkit-box-sizing:border-box;box-sizing:border-box}.canvas-button[data-v-ca5bd1ac]{float:left;line-height:2;width:%?300?%;margin:%?15?% %?12?%}",""])},acf0:function(t,e,n){var a=n("5ea1");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=n("4f06").default;o("e6deb3a8",a,!0,{sourceMap:!1,shadowMode:!1})},af06:function(t,e,n){"use strict";n.r(e);var a=n("f520"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=o.a},d3e3:function(t,e,n){"use strict";n.r(e);var a=n("f404"),o=n("af06");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("f26b");var r=n("2877"),s=Object(r["a"])(o["default"],a["a"],a["b"],!1,null,"ca5bd1ac",null);e["default"]=s.exports},f26b:function(t,e,n){"use strict";var a=n("acf0"),o=n.n(a);o.a},f404:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("page-head",{attrs:{title:t.title}}),n("v-uni-view",{staticClass:"uni-common-mt"},[n("v-uni-canvas",{staticClass:"canvas-element",attrs:{"canvas-id":"canvas",id:"canvas"}}),n("v-uni-scroll-view",{staticClass:"canvas-buttons",attrs:{"scroll-y":"true"}},[t._l(t.names,function(e,a){return[n("v-uni-button",{key:a+"_0",staticClass:"canvas-button",on:{click:function(n){n=t.$handleEvent(n),t.handleCanvasButton(e)}}},[t._v(t._s(e))])]}),n("v-uni-button",{staticClass:"canvas-button",attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.toTempFilePath(e)}}},[t._v("toTempFilePath")])],2)],1)],1)},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},f520:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=null,o={data:function(){return{title:"createContext",names:["rotate","scale","reset","translate","save","restore","drawImage","fillText","fill","stroke","clearRect","beginPath","closePath","moveTo","lineTo","rect","arc","quadraticCurveTo","bezierCurveTo","setFillStyle","setStrokeStyle","setGlobalAlpha","setShadow","setFontSize","setLineCap","setLineJoin","setLineWidth","setMiterLimit"]}},onReady:function(){a=uni.createCanvasContext("canvas",this)},methods:{toTempFilePath:function(){uni.canvasToTempFilePath({canvasId:"canvas",success:function(t){console.log(t.tempFilePath)},fail:function(t){console.error(JSON.stringify(t))}})},handleCanvasButton:function(t){this[t]&&this[t]()},rotate:function(){a.beginPath(),a.rotate(10*Math.PI/180),a.rect(225,75,20,10),a.fill(),a.draw()},scale:function(){a.beginPath(),a.rect(25,25,50,50),a.stroke(),a.scale(2,2),a.beginPath(),a.rect(25,25,50,50),a.stroke(),a.draw()},reset:function(){a.beginPath(),a.setFillStyle("#000000"),a.setStrokeStyle("#000000"),a.setFontSize(10),a.setGlobalAlpha(1),a.setShadow(0,0,0,"rgba(0, 0, 0, 0)"),a.setLineCap("butt"),a.setLineJoin("miter"),a.setLineWidth(1),a.setMiterLimit(10),a.draw()},translate:function(){a.beginPath(),a.rect(10,10,100,50),a.fill(),a.translate(70,70),a.beginPath(),a.fill(),a.draw()},save:function(){a.beginPath(),a.setStrokeStyle("#00ff00"),a.save(),a.scale(2,2),a.setStrokeStyle("#ff0000"),a.rect(0,0,100,100),a.stroke(),a.restore(),a.rect(0,0,50,50),a.stroke(),a.draw()},restore:function(){[3,2,1].forEach(function(t){a.beginPath(),a.save(),a.scale(t,t),a.rect(10,10,100,100),a.stroke(),a.restore()}),a.draw()},drawImage:function(){a.drawImage("../../../static/uni.png",0,0),a.draw()},fillText:function(){a.setStrokeStyle("#ff0000"),a.beginPath(),a.moveTo(0,10),a.lineTo(300,10),a.stroke(),a.setFontSize(10),a.fillText("Hello World",0,30),a.setFontSize(20),a.fillText("Hello World",100,30),a.beginPath(),a.moveTo(0,30),a.lineTo(300,30),a.stroke(),a.draw()},fill:function(){a.beginPath(),a.rect(20,20,150,100),a.setStrokeStyle("#00ff00"),a.fill(),a.draw()},stroke:function(){a.beginPath(),a.moveTo(20,20),a.lineTo(20,100),a.lineTo(70,100),a.setStrokeStyle("#00ff00"),a.stroke(),a.draw()},clearRect:function(){a.setFillStyle("#ff0000"),a.beginPath(),a.rect(0,0,300,150),a.fill(),a.clearRect(20,20,100,50),a.draw()},beginPath:function(){a.beginPath(),a.setLineWidth(5),a.setStrokeStyle("#ff0000"),a.moveTo(0,75),a.lineTo(250,75),a.stroke(),a.beginPath(),a.setStrokeStyle("#0000ff"),a.moveTo(50,0),a.lineTo(150,130),a.stroke(),a.draw()},closePath:function(){a.beginPath(),a.setLineWidth(1),a.moveTo(20,20),a.lineTo(20,100),a.lineTo(70,100),a.closePath(),a.stroke(),a.draw()},moveTo:function(){a.beginPath(),a.moveTo(0,0),a.lineTo(300,150),a.stroke(),a.draw()},lineTo:function(){a.beginPath(),a.moveTo(20,20),a.lineTo(20,100),a.lineTo(70,100),a.stroke(),a.draw()},rect:function(){a.beginPath(),a.rect(20,20,150,100),a.stroke(),a.draw()},arc:function(){a.beginPath(),a.setLineWidth(2),a.arc(75,75,50,0,2*Math.PI,!0),a.moveTo(110,75),a.arc(75,75,35,0,Math.PI,!1),a.moveTo(65,65),a.arc(60,65,5,0,2*Math.PI,!0),a.moveTo(95,65),a.arc(90,65,5,0,2*Math.PI,!0),a.stroke(),a.draw()},quadraticCurveTo:function(){a.beginPath(),a.moveTo(20,20),a.quadraticCurveTo(20,100,200,20),a.stroke(),a.draw()},bezierCurveTo:function(){a.beginPath(),a.moveTo(20,20),a.bezierCurveTo(20,100,200,100,200,20),a.stroke(),a.draw()},setFillStyle:function(){["#fef957","rgb(242,159,63)","rgb(242,117,63)","#e87e51"].forEach(function(t,e){a.setFillStyle(t),a.beginPath(),a.rect(0+75*e,0,50,50),a.fill()}),a.draw()},setStrokeStyle:function(){["#fef957","rgb(242,159,63)","rgb(242,117,63)","#e87e51"].forEach(function(t,e){a.setStrokeStyle(t),a.beginPath(),a.rect(0+75*e,0,50,50),a.stroke()}),a.draw()},setGlobalAlpha:function(){a.setFillStyle("#000000"),[1,.5,.1].forEach(function(t,e){a.setGlobalAlpha(t),a.beginPath(),a.rect(0+75*e,0,50,50),a.fill()}),a.draw(),a.setGlobalAlpha(1)},setShadow:function(){a.beginPath(),a.setShadow(10,10,10,"rgba(0, 0, 0, 199)"),a.rect(10,10,100,100),a.fill(),a.draw()},setFontSize:function(){[10,20,30,40].forEach(function(t,e){a.setFontSize(t),a.fillText("Hello, world",20,20+40*e)}),a.draw()},setLineCap:function(){a.setLineWidth(10),["butt","round","square"].forEach(function(t,e){a.beginPath(),a.setLineCap(t),a.moveTo(20,20+20*e),a.lineTo(100,20+20*e),a.stroke()}),a.draw()},setLineJoin:function(){a.setLineWidth(10),["bevel","round","miter"].forEach(function(t,e){a.beginPath(),a.setLineJoin(t),a.moveTo(20+80*e,20),a.lineTo(100+80*e,50),a.lineTo(20+80*e,100),a.stroke()}),a.draw()},setLineWidth:function(){[2,4,6,8,10].forEach(function(t,e){a.beginPath(),a.setLineWidth(t),a.moveTo(20,20+20*e),a.lineTo(100,20+20*e),a.stroke()}),a.draw()},setMiterLimit:function(){a.setLineWidth(4),[2,4,6,8,10].forEach(function(t,e){a.beginPath(),a.setMiterLimit(t),a.moveTo(20+80*e,20),a.lineTo(100+80*e,50),a.lineTo(20+80*e,100),a.stroke()}),a.draw()}}};e.default=o}}]);