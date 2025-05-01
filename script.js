let curr_track = document.createElement('audio');

let track_list = [
    {
        name: "ASAP",
        artist: "NewJaans",
        image: "/img/newjeans-2ndep.jpeg",
        path: "/audio/asap.mp3",
    },
    {
        name: "Ditto",
        artist: "NewJaans",
        image: "/img/ditto.jpeg",
        path: "/audio/ditto.mp3",
    },
    {
        name: "OMG",
        artist: "NewJaans",
        image: "/img/omg.jpeg",
        path: "/audio/omg.mp3",
    },
    {
        name: "ETA",
        artist: "NewJaans",
        image: "/img/newjeans-2ndep.jpeg",
        path: "/audio/eta.mp3",
    },
    {
        name: "Hype Boy",
        artist: "NewJaans",
        image: "/img/hypeboy.jpeg",
        path: "/audio/hypeboy.mp3",
    },
  ];

let isPlaying = false;
let shuffled = false;
let test = null;

const trackButtons = document.querySelectorAll(".trackbutton");
const nowPlayingIcon = document.getElementById('now-playing-icon');
const nowPlayingTitle = document.getElementById('now-playing-title');

const outPlayButton = document.getElementById('outbutton-play');
const followButton = document.getElementById("outbutton-follow");
const shuffleButton = document.getElementById("outbutton-shuffle");

// strips the file path
function getRelativePath(absolutePath) {
    const basePath = window.location.origin; 
    return absolutePath.replace(basePath, ''); 
  }

// check if the same track is playing, for pause/play
function checkTrack(track) {
    if (getRelativePath(curr_track.src) === track.path) {
        console.log('success')
        if (!isPlaying) playTrack();
        else pauseTrack();

    } else {
        pauseTrack();

        curr_track.src = track.path;
        if (!isPlaying) playTrack();
    }
    updateMedia(track);
}
// load the five tracks
function loadTrack (index, button) {
    const track = track_list[index];
    checkTrack(track);
    updateButtons(button);;
}
function playTrack() {
    curr_track.play();
    isPlaying = true;
}
function pauseTrack() {
    curr_track.pause()
    isPlaying = false;
}

function updateMedia(track) {
    nowPlayingIcon.src = track.image;      // change bottom left icon
    nowPlayingTitle.innerHTML = track.name;      // change artist name
}
function updateButtons(button) {
    if (isPlaying) {
        button.name = 'pause';
    } else {
        button.name = 'play';
    }
}

// for each buttons, if clicked, play track with the button index
trackButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        test = index;
        loadTrack(index, button);
    });
});

function playRand() {
    const randomTrack = track_list[Math.floor(Math.random() * track_list.length)];

    if (!curr_track.paused) pauseTrack();
    else checkTrack(randomTrack);

    updateButtons(outPlayButton);
}
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








// function playTrack() {
//     curr_track.play();
//     isPlaying = true;

//     nowPlayingIcon.src = trackImg;      // change bottom left icon
//     nowPlayingTitle.innerHTML = trackName;      // change bottom left icon
// }

// function pauseTrack() {
//     curr_track.pause();
//     isPlaying = false;
// }

// out buttons


// function playRandom() {
//     const randomIndex = Math.floor(Math.random() * track_list.length);

//     let randomTrack = track_list[randomIndex];

//     if (isPlaying == false) {
//         outPlayButton.name = 'pause';
//         curr_track.src = randomTrack.path;
//         playTrack()
//     } else {
//         outPlayButton.name = 'play';
//         pauseTrack()
//     }
// }

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