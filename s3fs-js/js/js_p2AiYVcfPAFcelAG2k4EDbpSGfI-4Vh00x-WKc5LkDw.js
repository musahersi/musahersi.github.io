/**
 * @file
 * Drupal behaviors for jPlayer.
 */

(function ($) {
  
  Drupal.jPlayer = Drupal.jPlayer || {};
  
  Drupal.behaviors.jPlayer = {
    attach: function(context, settings) {
      // Set time format settings
      $.jPlayer.timeFormat.showHour = Drupal.settings.jPlayer.showHour;
      $.jPlayer.timeFormat.showMin = Drupal.settings.jPlayer.showMin;
      $.jPlayer.timeFormat.showSec = Drupal.settings.jPlayer.showSec;
      
      $.jPlayer.timeFormat.padHour = Drupal.settings.jPlayer.padHour;
      $.jPlayer.timeFormat.padMin = Drupal.settings.jPlayer.padMin;
      $.jPlayer.timeFormat.padSec = Drupal.settings.jPlayer.padSec;
      
      $.jPlayer.timeFormat.sepHour = Drupal.settings.jPlayer.sepHour;
      $.jPlayer.timeFormat.sepMin = Drupal.settings.jPlayer.sepMin;
      $.jPlayer.timeFormat.sepSec = Drupal.settings.jPlayer.sepSec;
      
      // INITIALISE
      
      $('.jp-jplayer:not(.jp-jplayer-processed)', context).each(function() {
        $(this).addClass('jp-jplayer-processed');
        var wrapper = this.parentNode;
        var player = this;
        var playerId = $(this).attr('id');
        var playerSettings = Drupal.settings.jplayerInstances[playerId];
        var type = $(this).parent().attr('class');
        player.playerType = $(this).parent().attr('class');
        
        if (type == 'jp-type-single') {
          // Initialise single player
          $(player).jPlayer({
            ready: function() {
              $(this).jPlayer("setMedia", playerSettings.files);
              
              // Make sure we pause other players on play
              $(player).bind($.jPlayer.event.play, function() {
                $(this).jPlayer("pauseOthers");
              });

              Drupal.attachBehaviors(wrapper);

              // Repeat?
              if (playerSettings.repeat != 'none') {
                $(player).bind($.jPlayer.event.ended, function() {
                  $(this).jPlayer("play");
                });
              }
              
              // Autoplay?
              if (playerSettings.autoplay == true) {
                $(this).jPlayer("play");
              }
            },
            swfPath: Drupal.settings.jPlayer.swfPath,
            cssSelectorAncestor: '#'+playerId+'_interface',
            solution: playerSettings.solution,
            supplied: playerSettings.supplied,
            preload: playerSettings.preload,
            volume: playerSettings.volume,
            muted: playerSettings.muted,
            play:function(){ $.cookie('play_music','');},
            pause:function(){  $.cookie('play_music','1');},
            timeupdate: function(event) {
				var status = event.jPlayer.status,
				remaining = status.duration - status.currentTime;
				$('.jp-remain').text('-'+$.jPlayer.convertTime(remaining));
			}
          });
        }
        else {
          // Initialise playlist player
          $(player).jPlayer({
            ready: function() {
              Drupal.jPlayer.setFiles(wrapper, player, 0, playerSettings.autoplay);
              
              // Pause other players on play
              $(player).bind($.jPlayer.event.play, function() {
                $(this).jPlayer("pauseOthers");
              });

              // Add playlist selection
              $('#'+playerId+'_playlist').find('a').click(function(){
                var index = $(this).attr('id').split('_')[2];
                Drupal.jPlayer.setFiles(wrapper, player, index, true);
                $(this).blur();
                return false;
              });

              Drupal.attachBehaviors(wrapper);

              // Repeat?
              if (playerSettings.repeat != 'none') {
                $(player).bind($.jPlayer.event.ended, function() {
                  if (playerSettings.repeat == 'single') {
                    $(this).jPlayer("play");
                  }
                  else {
                    Drupal.jPlayer.next(wrapper, player);
                  }
                });
              }
              
            },
            swfPath: Drupal.settings.jPlayer.swfPath,
            cssSelectorAncestor: '#'+playerId+'_interface',
            solution: playerSettings.solution,
            supplied: playerSettings.supplied,
            preload: playerSettings.preload,
            volume: playerSettings.volume,
            muted: playerSettings.muted,
            play:function(){ $.cookie('play_music','');},
            pause:function(){  $.cookie('play_music','1');},
            timeupdate: function(event) {
				var status = event.jPlayer.status,
			  remaining = status.duration - status.currentTime;
			  $('.jp-remain').text('-'+$.jPlayer.convertTime(remaining));
			} 
          });
          
          // Next
          $(wrapper).find('.jp-next').click(function() {
			  //code by illuminz
			 var wrap =  $('#block-system-main').find('table tbody tr td a.play_music');
			 if(wrap.length >0) {
				 var current_song = $('#block-system-main table tbody tr.active').index();
				 if(parseInt(current_song+1) < parseInt(wrap.length)){
					 $('#block-system-main table tbody tr:eq('+parseInt(current_song+1)+') a.play_music').trigger('click');
				 } else {
					  $('#block-system-main table tbody tr:eq(0) a.play_music').trigger('click'); 
				 }
			} else {
				$(this).blur();
				Drupal.jPlayer.next(wrapper, player);
			}
            return false;
          });
          
          // Previous
          $(wrapper).find('.jp-previous').click(function() {
				 //code by illuminz
			   var wrap =  $('#block-system-main').find('table tbody tr td a.play_music');
			  if(wrap.length >0) {
				var current_song = $('#block-system-main table tbody tr.active').index();
				 if(parseInt(current_song-1)<0){
					 $('#block-system-main table tbody tr:eq('+parseInt(wrap.length-1)+') a.play_music').trigger('click');
				 } else {
					  $('#block-system-main table tbody tr:eq('+parseInt(current_song-1)+') a.play_music').trigger('click'); 
				 }
			  } else {
				$(this).blur();
				Drupal.jPlayer.previous(wrapper, player);
			  }
			return false;
          });
          //playlist out of the player
          $(".play_music").live( 'click', function(){
				var m_file = $(this).attr('data');
				var song_name = $(this).attr('data-t');
				var artist =  $(this).attr('data-s');
				$.cookie('src_file', m_file,{path:'/'});
				$.cookie('song_name', song_name,{path:'/'});
				$.cookie('artist', artist,{path:'/'});
				
				
				Drupal.jPlayer.setFiles(wrapper, player, 0, true,m_file,null,song_name,artist);
				 
				$(this).parents('table').find('tr').removeClass('active');
				$(this).parents('tr:eq(0)').addClass('active'); 

				$(this).parents('table').find('a.pause_music').hide();
				$(this).parents('table').find('a.play_music').show();
				$(this).parent('td').find('a.pause_music').show();
				$(this).parent('td').find('a.play_music').hide()
				
			return false;
		  });
		  $(".pause_music").click( function(){
			var jplayerId  = $(player).attr('id')+"_interface";
			$('#'+jplayerId+' .jp-control a.jp-pause').trigger('click');
			$(this).hide();
			 $(this).parent('td').find('a.play_music').show();
			 return false;
		  });
		  
		var cookie_check = function(){
			if(typeof $.cookie('src_file') !='undefined' && $.cookie('src_file') != null){ 
				//alert($.cookie('current_time'));
				var m_file  = $.cookie('src_file');
				var song_name = $.cookie('song_name');
				var artist =  $.cookie('artist');;
				
				//check if it is android device
				var ua = navigator.userAgent.toLowerCase();
				
				//check if song was paused in last attempt
				var play_music = $.cookie('play_music')
				
				if(play_music !='undefined' && play_music!= null && play_music == "1" ){
					play = false;
				} else{
					play=true;
				}
				
				if(navigator.platform.indexOf("iPhone")!='-1'||navigator.platform.indexOf("iPad")!='-1' || ua.indexOf("android")!='-1'){
					Drupal.jPlayer.setFiles(wrapper, player, 0, play,m_file,null,song_name,artist);
				} else {
					if(typeof $.cookie('current_time') !='undefined' && $.cookie('current_time') != null){
						var play_from = $.cookie('current_time');
						Drupal.jPlayer.setFiles(wrapper, player, 0, play,m_file,play_from,song_name,artist);	
					} else {
						Drupal.jPlayer.setFiles(wrapper, player, 0, play,m_file,null,song_name,artist);	
					}
				}
			}
		} 
		//setTimeout(cookie_check, 3000);
		setTimeout(cookie_check, 300);
			  
		}
      });
    }
  };
  
	// Cookie for duration 
	window.onbeforeunload=before;
	function before(evnt){
	  var current_time = $('.jp-current-time').html();
	  if(current_time != null || current_time != 'undefined'){
			$.cookie('current_time', current_time,{path:'/'});
		}
	}
	
  
  
  Drupal.jPlayer.setFiles = function(wrapper, player, index,play, m_file,play_from,song_name,artist) {
	  if(!m_file)
		 m_file = null;
	  if(!song_name)
		  song_name= null;
	  if(!artist)
		artist= null;
	  if(!play_from)
		play_from = null; 
    var playerId = $(player).attr('id');
    var playerSettings = Drupal.settings.jplayerInstances[playerId];
    var type = $(wrapper).parent().attr('class');
    
    //console.log('Src'+$.cookie('src_file')+'== name'+$.cookie('song_name'));
    
    $(wrapper).find('.jp-playlist-current').removeClass('jp-playlist-current');
    $('#'+playerId+'_item_'+index).parent().addClass('jp-playlist-current');
    $('#'+playerId+'_item_'+index).addClass('jp-playlist-current');
   
   //code by illuminz
   if(m_file != null) {
	    var title = "";
	    if(song_name !=null){
			title=song_name;
		} if(artist != null){
			title += '  -  '+artist;
		}
		$(document).find('span.jp-title').text(title);
		var obj_file = {mp3:m_file} //,title:title
		$(player).jPlayer("setMedia", obj_file); // file not in  jplayer playlist
	}
    else {
		$(player).jPlayer("setMedia", playerSettings.files[index]);  // file in jplayer list
	}
	
	for (key in playerSettings.files[index]) {
      if (key != 'poster') {
        type = key;
      }
    }
    
    if (type in {'m4v':'', 'mp4':'','ogv':'','webmv':''}) {
		var kind = 'video jp-video-360p';
    }
    else if (type in {'mp3':'', 'm4a':'','oga':'','webmv':'','wav':''}) {
		var kind = 'audio';
    }
    
    if (kind == 'audio') {
      $(wrapper).find('img').remove();
    }
    
    //$(wrapper).parent().attr('class', 'jp-'+kind);
    
    if (play == true) {
		if(play_from != null){
			var arr =  play_from.split(':');
			play_from = parseInt(arr[0]*60)+parseInt(arr[1]);
			$(player).jPlayer('play',play_from);
		} else {
			$(player).jPlayer('play');
		}
    }
  };
  
  Drupal.jPlayer.next = function(wrapper, player) {
    var playerId = $(player).attr('id');
    var playerSettings = Drupal.settings.jplayerInstances[playerId];
    
    var current = Number($(wrapper).find('a.jp-playlist-current').attr('id').split('_')[2]);
    var index = (current + 1 < playerSettings.files.length) ? current + 1 : 0;
    
    Drupal.jPlayer.setFiles(wrapper, player, index, true);
  }
  
  Drupal.jPlayer.previous = function(wrapper, player) {
    var playerId = $(player).attr('id');
    var playerSettings = Drupal.settings.jplayerInstances[playerId];
    
    var current = Number($(wrapper).find('a.jp-playlist-current').attr('id').split('_')[2]);
    var index = (current - 1 >= 0) ? current - 1 : playerSettings.files.length - 1;
    
    Drupal.jPlayer.setFiles(wrapper, player, index, true);
  }
  
  
})(jQuery);

;
