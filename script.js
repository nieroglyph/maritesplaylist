let isPlaying = false;

let curr_track = document.createElement('audio');

let track_list = [
    {
        name: "ASAP",
        artist: "NewJaans",
        image: "Image URL",
        path: "./audio/asap.mp3",
    },
    {
        name: "Ditto",
        artist: "NewJaans",
        image: "Image URL",
        path: "./audio/ditto.mp3",
    },
    {
        name: "OMG",
        artist: "NewJaans",
        image: "Image URL",
        path: "./audio/omg.mp3",
    },
    {
        name: "ETA",
        artist: "NewJaans",
        image: "Image URL",
        path: "./audio/eta.mp3",
    },
    {
        name: "Hype Boy",
        artist: "NewJaans",
        image: "Image URL",
        path: "./audio/hypeboy.mp3",
    },
  ];

const trackbuttons = document.querySelectorAll(".trackbutton")

trackbuttons.forEach(button => {
    button.addEventListener('click', function() {
      const buttonId = this.id;

      for (let x in track_list) {
        if (buttonId == track_list[x].name) {
          var trackId = track_list[x].path;
          var trackName = track_list[x].name;
        }
      }

      if (curr_track.name != trackName) {       // assign attributes if new track is clicked
          curr_track.src = trackId;     // assign path to audio src
          curr_track.name = trackName;      // assign track name for checks
      }
      
      if (isPlaying == false) {
          playTrack();
          this.innerHTML = '<ion-icon name="pause"></ion-icon>';
      }
      else {
          pauseTrack();
          this.innerHTML = '<ion-icon name="play"></ion-icon>';
      }

    });
  });

function playTrack() {
    curr_track.play();
    isPlaying = true;
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
}

// function playpauseTrack() {
//     // Switch between playing and pausing
//     // depending on the current state
//     if (!isPlaying) playTrack();
//     else pauseTrack();
//   }

// function playTrack() {
//     // Play the loaded track
//     curr_track.play();
//     isPlaying = true;

//     // Replace icon with the pause icon
//     playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
//     }

// function pauseTrack() {
//     // Pause the loaded track
//     curr_track.pause();
//     isPlaying = false;

//     // Replace icon with the play icon
//     playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
//     }