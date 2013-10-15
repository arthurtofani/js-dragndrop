/**  	js-dragndrop - copyleft (2013)
*  Arthur Tofani (gramofone @t gmail dotcom)

*  This software is distributed under GLP2 license
*	js-dragndrop is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
*	without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
*	See the GNU General Public License for more details.
*	(http://www.gnu.org/licenses/gpl2.txt)
*
*/



var DragnDrop = function(container) {
	this.version = "1.1b"
	this.interv = -1
	this.container = container;
	this.draggingElement = null;
	this.draggingElementOffset = [0, 0];
	this.screenOffset = [0, 0];
	this.draggableElements = [];
	this.matchElements =  [];
	this.dragBehavior = "move"; // ghost
	this.dropBehavior =  "leave"; // match_nearest
	this.touch = 'ontouchstart' in document.documentElement;
	var dd = this;
		$(document).mousemove(function(ev){
			dd.move(ev);
		})
		$(document).mouseup(function(){
			dd.stopDrag();
		});


		document.addEventListener('touchmove',function(ev){
			dd.move(ev);
		});

		document.addEventListener('touchend',function(){
			dd.stopDrag();
		});
}

DragnDrop.prototype.addDraggableElements = function(el){
	e = $(el)
	e.addClass("for-drag")
	dd = this;
	var element = null;
	for(var i=0; i<e.length;i++) {
		element = $(e[i]);
		if(!element) continue;
		this.draggableElements.push(element);


		 if(this.touch){
			e[i].addEventListener('touchstart',function(ev){
				dd.onDragElementMouseDown(ev.currentTarget, ev);
				ev.preventDefault();
			});
		 }else{
 			$(element).mousedown(function(ev){
				dd.onDragElementMouseDown(ev.currentTarget, ev)
				ev.preventDefault();
			});
		 }
	}
}

DragnDrop.prototype.addMatchElement = function(el){
	this.matchElements.push(el);
}

DragnDrop.prototype.onDragElementMouseDown = function(el, ev){
	if(this.touch) ev = ev.touches[0];
	var offsetX = ev.pageX - $(el).offset().left;
	var offsetY = ev.pageY - $(el).offset().top;
	this.draggingElementOffset = [offsetX, offsetY];
	this.screenOffset = [ev.screenX, ev.screenY];
	this.startDrag($(el));
}

DragnDrop.prototype.startDrag = function(el){
	this.draggingElement = el;
	var dd = this;
}

DragnDrop.prototype.getDimensions = function(context){
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

DragnDrop.prototype.move = function(ev){
	if(!this.draggingElement) return;
	if(this.touch) ev = ev.touches[0];
	// tamanho REAL do container
	var container_dim = this.getDimensions(this.container);
	cont_left = ev.pageX - container_dim.left;
	cont_top = ev.pageY - container_dim.top;
	
	if(cont_left>container_dim.width || cont_left<0) return; // fora da área
	if(cont_top>container_dim.height || cont_top<0) return; // fora da área
	var left = (cont_left * (container_dim.realwidth/container_dim.width)) - this.draggingElementOffset[0]; // - container_dim.left
	var top = (cont_top * (container_dim.realheight/container_dim.height)) - this.draggingElementOffset[1];

	this.draggingElement.css('position', 'absolute');	
	this.draggingElement.css('left', left + 'px');
	this.draggingElement.css('top', top + 'px');
}


DragnDrop.prototype.stopDrag = function(e){	
	this.draggingElement = null;
}

