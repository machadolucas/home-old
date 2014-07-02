/*
 *  Project: Jquery FullContent
 *  Description: Plugin which allows a full content browser navigation. Flexible and Extended.
 *  Author: Zeh Fernandes | zehfernandes.com

 *  This plugin needs jquery.ScrollTo http://demos.flesler.com/jquery/scrollTo/ to work.
 */

(function(a,b,c){function g(c,e){this.element=c,this.$window=a(b),this.options=a.extend({},f,e),this._defaults=f,this._name=d,this.init(),this.configStage()}var d="fullContent",e=b.document,f={stages:"div",idComplement:"page_",stageStart:1,speedTransition:800,mapPosition:""};g.prototype.configStage=function(){var c=this.$window.width(),d=this.$window.height(),e=this.options.stages,f=this.options.mapPosition,g=0;a(this.element).children(e).each(function(b){a(this).css({position:"absolute",width:c,height:d});if(f[b]){var e=f[b];a(this).css({top:d*(e.v-1),left:c*(e.h-1)})}else a(this).css({top:d*g});g++});if(b.location.hash){var h=b.location.hash.replace(/^#\/?/,"");a.scrollTo("#"+this.options.idComplement+h,0)}},g.prototype.init=function(){var c=this,d=this.options.stages,e=this.options.idComplement;a(this.element).children(d).each(function(d){var f=a(this).attr("id");a(this).attr("id",e+f),!b.location.hash&&c.options.stageStart==d+1&&(a.scrollTo(a(this),0),b.location.hash=a(this).attr("id").replace(e,""))}),this.bind()},g.prototype.bind=function(){var c=this,d=this.options.speedTransition,e=this.options.idComplement;this.$window.resize(function(){c.configStage()}),this.$window.bind("hashchange",function(e){var f=b.location.hash.replace(/^#\/?/,"");a.scrollTo("#"+c.options.idComplement+f,d)})},a.fn[d]=function(b){return this.each(function(){a.data(this,"plugin_"+d)||a.data(this,"plugin_"+d,new g(this,b))})}})(jQuery,window);

/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT / GPLv2 License.
*/
(function(w){
	
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	var ua = navigator.userAgent;
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
		return;
	}

    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }
	
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
				
		// If portrait orientation and in one of the danger zones
        if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){
				disableZoom();
			}        	
        }
		else if( !enabled ){
			restoreZoom();
        }
    }
	
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );

})( this );