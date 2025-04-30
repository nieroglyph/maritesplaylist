let isPlaying = false;
let shuffled = false;

let curr_track = document.createElement('audio');

let track_list = [
    {
        name: "ASAP",
        artist: "NewJaans",
        image: "./img/newjeans-2ndep.jpeg",
        path: "./audio/asap.mp3",
    },
    {
        name: "Ditto",
        artist: "NewJaans",
        image: "./img/ditto.jpeg",
        path: "./audio/ditto.mp3",
    },
    {
        name: "OMG",
        artist: "NewJaans",
        image: "./img/omg.jpeg",
        path: "./audio/omg.mp3",
    },
    {
        name: "ETA",
        artist: "NewJaans",
        image: "./img/newjeans-2ndep.jpeg",
        path: "./audio/eta.mp3",
    },
    {
        name: "Hype Boy",
        artist: "NewJaans",
        image: "./img/hypeboy.jpeg",
        path: "./audio/hypeboy.mp3",
    },
  ];

const trackButtons = document.querySelectorAll(".trackbutton");
const nowPlayingIcon = document.getElementById('now-playing-icon');
const nowPlayingTitle = document.getElementById('now-playing-title');

const outPlayButton = document.getElementById('outbutton-play');
const followButton = document.getElementById("outbutton-follow");
const shuffleButton = document.getElementById("outbutton-shuffle");

let trackId;
let trackName;
let trackImg;
trackButtons.forEach(button => {
    button.addEventListener('click', function() {
      const buttonId = this.id;

      for (let x in track_list) {
        if (buttonId == track_list[x].name) {
          trackId = track_list[x].path;
          trackName = track_list[x].name;
          trackImg = track_list[x].image;
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

    nowPlayingIcon.src = trackImg;      // change bottom left icon
    nowPlayingTitle.innerHTML = trackName;      // change bottom left icon
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
}

// out buttons
function followed() {
    if (followButton.innerHTML == "Follow") {
        followButton.innerHTML = "Following";
    } else {
        followButton.innerHTML = "Follow"
    }
}
function shuffle() {
    if (shuffled == false) {
        shuffleButton.style.color = "#c61f7a";
        shuffled = true;
    } else {
        shuffleButton.style.color = "rgba(255, 255, 255, 0.66)";
        shuffled = false;
    }
}
function playRandom() {
    const randomIndex = Math.floor(Math.random() * track_list.length);

    let randomTrack = track_list[randomIndex];

    if (isPlaying == false) {
        outPlayButton.name = 'pause';
        curr_track.src = randomTrack.path;
        playTrack()
    } else {
        outPlayButton.name = 'play';
        pauseTrack()
    }
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