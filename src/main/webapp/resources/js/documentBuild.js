/*
 *  Project: Jquery FullContent
 *  Description: Plugin which allows a full content browser navigation. Flexible and Extended.
 *  Author: Zeh Fernandes | zehfernandes.com

 *  This plugin needs jquery.ScrollTo http://demos.flesler.com/jquery/scrollTo/ to work.
 */

(function(a,b,c){function g(c,e){this.element=c,this.$window=a(b),this.options=a.extend({},f,e),this._defaults=f,this._name=d,this.init(),this.configStage()}var d="fullContent",e=b.document,f={stages:"div",idComplement:"page_",stageStart:1,speedTransition:800,mapPosition:""};g.prototype.configStage=function(){var c=this.$window.width(),d=this.$window.height(),e=this.options.stages,f=this.options.mapPosition,g=0;a(this.element).children(e).each(function(b){a(this).css({position:"absolute",width:c,height:d});if(f[b]){var e=f[b];a(this).css({top:d*(e.v-1),left:c*(e.h-1)})}else a(this).css({top:d*g});g++});if(b.location.hash){var h=b.location.hash.replace(/^#\/?/,"");a.scrollTo("#"+this.options.idComplement+h,0)}},g.prototype.init=function(){var c=this,d=this.options.stages,e=this.options.idComplement;a(this.element).children(d).each(function(d){var f=a(this).attr("id");a(this).attr("id",e+f),!b.location.hash&&c.options.stageStart==d+1&&(a.scrollTo(a(this),0),b.location.hash=a(this).attr("id").replace(e,""))}),this.bind()},g.prototype.bind=function(){var c=this,d=this.options.speedTransition,e=this.options.idComplement;this.$window.resize(function(){c.configStage()}),this.$window.bind("hashchange",function(e){var f=b.location.hash.replace(/^#\/?/,"");a.scrollTo("#"+c.options.idComplement+f,d)})},a.fn[d]=function(b){return this.each(function(){a.data(this,"plugin_"+d)||a.data(this,"plugin_"+d,new g(this,b))})}})(jQuery,window)

/* 
 * Animations for the clouds in Home screen
 */
if ( !window.requestAnimationFrame ) {
	window.requestAnimationFrame = ( function() {
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( callback, element ) {
			window.setTimeout( callback, 1000 / 60 );
		};
	} )();
}
		
function init() {
	container = document.createElement( 'div' );
	container.style.position = 'absolute';
	container.style.left = ( window.innerWidth / 2 ) + 'px';
	container.style.top = ( window.innerHeight / 2 ) + 'px';
	document.getElementById('page_home').appendChild( container );

	for ( var i = 0, il = 200; i < il; i ++ ) {

		image = document.createElement( 'img' );
		image.style.position = 'absolute';
		image.style.left = - 128 + 'px';
		image.style.top = - 128 + 'px';
		image.style.opacity = 1;
		image.style.opacity = 1;
		image.src = 'resources/img/cloud256.png';

		domElement = document.createElement( 'div' );
		domElement.style.position = 'absolute';
		domElement.appendChild( image );

		container.appendChild( domElement );
		particles.push( {
			x: Math.random() * 1500 - 750,
			y: Math.random() * 500 + 100,
			z: Math.random() * 20,
			rotation: Math.floor(Math.random() * 70),
			scale: Math.random() * 0.3 + 0.7,
			opacity: 0,
			domElement: domElement,
			image: image
		} );
	}
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {

//	if(isHome){
	for ( var i = 0, il = particles.length; i < il; i ++ ) {
		var particle = particles[ i ];
		particle.opacity = particle.z > 10 ? (particle.z - 20)/-10 : 1;
		particle.opacity = particle.z < 0.1 ? 0 : particle.opacity;
		particle.z = particle.z < 0.1 ? 20 : particle.z - 0.01;

		var ow = 5 / particle.z;
		particle.domElement.style.left = ( particle.x * ow ) + 'px';
		particle.domElement.style.top = ( particle.y * ow ) + 'px';
		particle.image.style['opacity'] = ( particle.opacity );
		particle.domElement.style['-webkit-transform'] = 'scale( ' + ow + ' ) rotate( ' + particle.rotation + 'deg )';
		particle.domElement.style['-ms-transform'] = 'scale( ' + ow + ' ) rotate( ' + particle.rotation + 'deg )';
		particle.domElement.style['transform'] = 'scale( ' + ow + ' ) rotate( ' + particle.rotation + 'deg )';
		particle.domElement.style.zIndex = Math.floor( 1000 - particle.z * 100 );

	}
//	}

}