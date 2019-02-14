"use strict";window.onload=function(){document.onkeydown=function(){var e=window.event||arguments[0];if(e.keyCode==123){return false}else{if(e.ctrlKey&&e.shiftKey&&e.keyCode==73){return false}else{if(e.ctrlKey&&e.keyCode==85){return false}}}};document.oncontextmenu=function(){return false}};var map=new BMap.Map("map");map.centerAndZoom("温州",13);map.enableScrollWheelZoom();map.enableKeyboard();map.enableInertialDragging();map.disableDoubleClickZoom();map.addControl(new BMap.CityListControl({anchor:BMAP_ANCHOR_TOP_LEFT}));var cr=new BMap.CopyrightControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT,offset:new BMap.Size(472,2)});map.addControl(cr);cr.addCopyright({id:1,content:"&copy;温州公交吧 | 中华全知道"});var readyAdd=[];var inputLine;var enableEditing=false;var stationIcon=new BMap.Icon("station_icon.png",new BMap.Size(12,12));var getPolylineOptions=function getPolylineOptions(){return{strokeColor:$("#strokeColor").val(),strokeWeight:$("#strokeWeight").val(),strokeOpacity:$("#strokeOpacity").val(),strokeStyle:$("#strokeStyle").val(),enableEditing:enableEditing}};var bus=new BMap.BusLineSearch(map,{onGetBusListComplete:function onGetBusListComplete(result){var busListItem=$("#busListItem").val();var fstLine=result.getBusListItem(busListItem);bus.getBusLine(fstLine)},onGetBusLineComplete:function onGetBusLineComplete(busline){var polyline=new BMap.Polyline(busline.getPath(),getPolylineOptions());var lineName=busline.name.substr(0,busline.name.indexOf("路")+1);map.addOverlay(polyline);for(var i=0;i<busline.getNumBusStations();i++){var busStation=busline.getBusStation(i);var marker=new BMap.Marker(busStation.position,{icon:stationIcon});map.addOverlay(marker);marker.setTitle(lineName+":"+busStation.name);marker.addEventListener("click",function(e){var opts={width:250,height:80,title:e.target.getTitle().substr(e.target.getTitle().indexOf(":")+1)};var content=busline.name;var infoWindow=new BMap.InfoWindow(content,opts);var point=new BMap.Point(e.target.getPosition().lng,e.target.getPosition().lat);map.openInfoWindow(infoWindow,point)})}polyline.addEventListener("dblclick",function(e){var lineName=busline.name.substr(0,busline.name.indexOf("路"));var allOverlay=map.getOverlays();for(var i=0;i<allOverlay.length;i++){if(allOverlay[i].toString()=="[object Marker]"){if(allOverlay[i].getTitle().substr(0,allOverlay[i].getTitle().indexOf("路"))==lineName){allOverlay[i].enableMassClear()}else{allOverlay[i].disableMassClear()}}else{allOverlay[i].disableMassClear()}}e.target.enableMassClear();map.clearOverlays();readyAdd.pop(lineName)})}});$("#busList").bind("input propertychange",function(){inputLine=$("#busList").val()});$("#busList").focus(function(){inputLine=$("#busList").val();$(this).val("")});$("#busList").blur(function(){$(this).val(inputLine)});$("#addBtn").click(function(){var line=$("#busList").val().replace("路","");if($.inArray(line,readyAdd)==-1){bus.getBusList(line);readyAdd.push(line)}else{alert("该路线已添加")}});$("#brtBtn").click(function(){var brtlist=["B1","B2","B3","B4","B101","B102","B103","B104","B105","B106","B107","B108","B109","B111","B112","B113"];readyAdd.push(brtlist);for(var i=0;i<brtlist.length;i++){bus.getBusList(brtlist[i])}$(this).attr("disabled",true).css("background","#999")});$("#clearBtn").click(function(){map.clearOverlays();readyAdd=[];$("#brtBtn").attr("disabled",false).css("background","#5298FF")});$(".set").click(function(){if($(this).next().is(":hidden")){$(this).find(".icon").text("-");$(this).siblings(".set").find(".icon").text("+")}else{$(this).find(".icon").text("+")}$(this).siblings(".set").next().hide();$(this).next().slideToggle()});