//$( document ).ready(function(){

  class Song {
    constructor(name, band, source){
      this.name = name;
      this.band = band;
      this.source = new Audio(source);
    };
  };

  /*
  A list of songs with their names, artists, and sound URLs
  (the URLs will not be displayed, but are necessary for
  audio playback).
  */
  const red = new Song("Bob Marley", "Redemption Song", "music/red.mp3");
  const birds = new Song("Bob Marley", "3 Little Birds", "music/birds.mp3");
  const lion = new Song("Of Monsters and Men", "Lionheart", "music/lion.mp3")

  var songs = [red, birds, lion];

  //populates list with songs
  var slot = 0;
  songs.forEach(function(x){
    x.slot = slot;
    let $list = $('li[value="' + x.slot + '"]')
    let name = $list.find('span.song-title');
    let band = $list.find('span.song-band');
    //let source = $list.find('audio');
    name.text(x.name);
    band.text(x.band);
    //source.attr('src', x.source);
    slot++;
  })



  $(".song-icon").on("click", function(){
    let li = this.parentElement;
    let track = li.getAttribute("value");
    let song = songs[track];
    nowPlayingIcon = this; //icon to get targeted by bottom controls
    controlsText(li); //populate bottom control text
    stopSong(); // stops all songs
    playPauseSong(song);
  })

  var x = true;
  var playPauseSong = function(song){
    if(x){
      changeIconPause();
      playSong(song);
      x = false;
    } else{
      changeIconPlay();
      pauseSong(song);
      x = true;
    }
  }

  var playSong = function(song){
    song.source.play();
  };
  var pauseSong = function(song){
    song.source.pause();
  };

  var stopSong = function(){
    songs.forEach(function(x){
      x.source.pause();
    })
  };

  var loadSongs = function(){
    songs.forEach(function(x){
      x.source.load();
    })
  }


  var changeIconPause = function(){
    nowPlayingIcon.src = "images/icons8-Pause-50.png";
    $('#status-play').attr('src', 'images/icons8-Pause Filled-50.png');
  }
  var changeIconPlay = function(){
    $('.song-icon').attr('src', "images/icons8-Start-50.png");
    $('#status-play').attr('src', "images/icons8-Circled-Play-50.png");
  };

  //clicking on botom play/pause button
  $('#status-play').on('click', function(evt){
    event.stopPropagation();
    let $img = $(nowPlayingIcon);
    $($img).trigger("click");
  });

  //populates bottom control text with selected song
  var controlsText = function(img){
    let $text = $(img).children('div');
    let $title = $text.children('.song-title').text();
    let $band = $text.children('.song-band').text();
    $('.status-name').text($title);
    $('.status-band').text($band);
  };

  //moves around tracklist
  $('#previous').on("click", function(){
    let li = nowPlayingIcon.parentElement;
    let tracks = li.getAttribute("value");
    let prevSong = parseInt(tracks) - 1;
    let prevImg = $("li[value=" + String(prevSong) + "] img");
    console.log(prevSong);
    if(tracks == 0){
      return;
    }else{
      $(prevImg).trigger("click");
      loadSongs();
      playSong(songs[prevSong]);
      changeIconPlay();
      changeIconPause();
    }
  })
  $('#next').on("click", function(){
    let li = nowPlayingIcon.parentElement;
    let tracks = li.getAttribute("value");
    let nextSong = parseInt(tracks) + 1;
    let nextImg = $("li[value=" + String(nextSong) + "] img");
    if(tracks == songs.length - 1){
      return;
    }else{
      $(nextImg).trigger("click");
      loadSongs();
      playSong(songs[nextSong]);
      changeIconPlay();
      changeIconPause();
    }
  })


//})
