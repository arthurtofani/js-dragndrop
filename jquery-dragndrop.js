/**  	js-dragndrop - copyleft (2013)

working on a copy of the code presented on
http://www.bennadel.com/blog/1871-Translating-Global-jQuery-Event-Coordinates-To-A-Local-Context.htm

this code is not used yet.

*/


$.DragnDrop = function(context, elements){	
	var d = new DragnDrop(this);
	if(elements){
		d.addDraggableElements(elements)
	}
	return d;	
}


$.getDimensions = function(context){
	var c = $(context);
	var bnd = c[0].getBoundingClientRect();
	var container_dim = c.position()
	container_dim.width = bnd.width
	container_dim.height = bnd.height
	container_dim.realwidth = c.width();
	container_dim.realheight = c.height();
	container_dim.xfactor = container_dim.realwidth/container_dim.width
	container_dim.yfactor = container_dim.realheight/container_dim.height
	return container_dim;
}
$.fn.getDimensions = function(){
	return($.getDimensions(this.first()));
};
$.globalToLocal = function( context, globalX, globalY ){
var position = context.offset();
return({
	x: Math.floor( globalX - position.left ),
	y: Math.floor( globalY - position.top )
	});
};
 
 
jQuery.localToGlobal = function( context, localX, localY ){
var position = context.offset();
return({
	x: Math.floor( localX + position.left ),
	y: Math.floor( localY + position.top )
	});
};
 
$.fn.globalToLocal = function( globalX, globalY ){
	return(
	$.globalToLocal(
	this.first(),
	globalX,
	globalY
	)
	);
	};
 
 
$.fn.localToGlobal = function( localX, localY ){
	return($.localToGlobal(this.first(), localX, localY));
	};
 
jQuery(function( $ ){
	var targetLocal = $( "#target-local" );
	var targetGlobal = $( "#target-global" );
	var local = $( "#local" );
	var global = $( "#global" );
	targetLocal.append( local );
	targetLocal.click(function( event ){
		var localCoordinates = targetLocal.globalToLocal(
			event.pageX,
			event.pageY
		);
	local.text(localCoordinates.x + " / " + localCoordinates.y).css({
		left: (localCoordinates.x - 20 + "px"),
		top: (localCoordinates.y - 20 + "px")
	}).show();
 

	var globalCoordinates = targetGlobal.localToGlobal(
		localCoordinates.x,
		localCoordinates.y
	);
	 
	global.text(globalCoordinates.x + " / " + globalCoordinates.y).css({
		left: (globalCoordinates.x + "px"),
		top: (globalCoordinates.y + "px")
	}).show();
});
 
});
