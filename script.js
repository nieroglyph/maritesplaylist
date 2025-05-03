let track_list = [
    {
        name: "ASAP",
        artist: "NewJeans",
        image: "../img/newjeans-2ndep.jpeg",
        path: "/audio/asap.mp3",
    },
    {
        name: "Ditto",
        artist: "NewJeans",
        image: "../img/ditto.jpeg",
        path: "../audio/ditto.mp3",
    },
    {
        name: "OMG",
        artist: "NewJeans",
        image: "../img/omg.jpeg",
        path: "../audio/omg.mp3",
    },
    {
        name: "ETA",
        artist: "NewJeans",
        image: "../img/newjeans-2ndep.jpeg",
        path: "../audio/eta.mp3",
    },
    {
        name: "Hype Boy",
        artist: "NewJeans",
        image: "../img/hypeboy.jpeg",
        path: "../audio/hypeboy.mp3",
    },
  ];

let hidden_track_list = [
    {
        name: "Perfect Night",
        artist: "Lesserafim",
        image: "../img/perfect-night.jpeg",
        path: "../audio/perfect-night.mp3",
    },
];

console.log(hidden_track_list[0].image)

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let playpause_btn = document.querySelectorAll(".playpause-track");
let next_btn = document.getElementById('now-playing-next');
let prev_btn = document.getElementById("noe-playing-previous");

let now_playing = document.querySelector(".now-playing");
let track_art = document.getElementById('now-playing-icon');
let track_name = document.getElementById('now-playing-title');
let track_artist = document.getElementById('now-playing-artist');

let trackButtons = document.querySelectorAll('.trackbutton');
let activeTrack = document.querySelectorAll('.activeTrack')

let see_more = document.querySelector('.seemore')

let followButton = document.getElementById('outbutton-follow');
let shuffleButton = document.getElementById('outbutton-shuffle');
let shuffleButton2 = document.getElementById('now-playing-shuffle')

let curr_track = document.createElement('audio');

let hiddenContainer = document.querySelectorAll('.trackcontainer.hidden')

let track_index = 0;
let isPlaying = false;
let shuffled = false;
let updateTimer;

function seeMore(){
  console.log(see_more)
  if (see_more.innerHTML === 'See more...') {
    track_list = track_list.concat(hidden_track_list);

    hiddenContainer.forEach((item) => {
      item.style.display = 'flex';
    })

    see_more.innerHTML = 'See less...';

  } else {
    // remove hidden_track_list elements from track_list
    track_list = track_list.filter(track => !hidden_track_list.some(hidden => hidden.name === track.name));

    hiddenContainer.forEach((item) => {
      item.style.display = 'none';
    })

    see_more.innerHTML = 'See more...';
  }
} 

// for each buttons, if clicked, play track with the button index
trackButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      console.log(track_list)
        if (curr_track.name !== track_list[index].name){
            pauseTrack();
            // set all icons to play after pausing
            trackButtons.forEach((item) => {
                item.name = 'play';
            });
            activeTrack.forEach((item) => {
              item.style.color = 'white';
            })

            curr_track.src = track_list[index].path;
            curr_track.load();
            curr_track.name = track_list[index].name; // assign name to curr_track for comparison

            playpauseTrack();

            if (!isPlaying) trackButtons[index].name = 'play';
            else trackButtons[index].name = 'pause';
        } else {
            playpauseTrack();

            if (!isPlaying) trackButtons[index].name = 'play';
            else trackButtons[index].name = 'pause';
        }
        updateMedia(index);
        activeTrack[index].style.color = '#d32a87';
    });
});

function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
  
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    updateMedia(track_index);
  
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
  
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
  }
  
  // update track details
  function updateMedia(track_index){
    track_art.src = track_list[track_index].image;
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
  }

  // Function to reset all values to their default
  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }

  function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
  }
  
  function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
  
    // Replace icon with the pause icon
    playpause_btn[0].innerHTML = '<ion-icon name="pause">';
    playpause_btn[1].innerHTML = '<ion-icon name="pause">';
  }
  
  function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
  
    // Replace icon with the play icon
    playpause_btn[0].innerHTML = '<ion-icon name="play">';
    playpause_btn[1].innerHTML = '<ion-icon name="play">';
  }
  
  function nextTrack() {
    if (shuffled === true) {
      let shuffledSong = Math.floor(Math.random() * track_list.length); // if shuffled, get random from array
      track_index = shuffledSong;
      console.log(track_list[shuffledSong]);
    } else {
      // Go back to the first track if the
      // current one is the last in the track list
      if (track_index < track_list.length - 1)
        track_index += 1;
      else track_index = 0;
    }

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }
  
  function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0)
      track_index -= 1;
    else track_index = track_list.length - 1;
    
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }

  function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider 
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);
  
    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
  }
  
  function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
  }
  
  function seekUpdate() {
    let seekPosition = 0;
  
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;
  
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
  
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
  
      // Display the updated duration
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }

  // follow button
  function followed() {
    if (followButton.innerHTML == "Follow") {
        followButton.innerHTML = "Following";
    } else {
        followButton.innerHTML = "Follow"
    }
  }

  // shuffle button, change styles
  function shuffle() {
      if (shuffled == false) {
          if (shuffleButton == null) shuffleButton2.style.color = "#c61f7a"; // error handling for other pages
          else {
            shuffleButton.style.color = "#c61f7a"
            shuffleButton2.style.color = "#c61f7a";
          }

          shuffled = true;
      } else {
          if (shuffleButton == null) shuffleButton2.style.color = "rgba(255, 255, 255, 0.66)";
          else {
            shuffleButton.style.color = "rgba(255, 255, 255, 0.66)"
            shuffleButton2.style.color = "rgba(255, 255, 255, 0.66)";
          }
          shuffled = false;
      }
  }
  // Load the first track in the tracklist
loadTrack(track_index);
