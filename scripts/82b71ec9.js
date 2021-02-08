let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next");
let prev_btn = document.querySelector(".prev");

let seek_slider = document.querySelector(".seek-slider");
let current_time = document.querySelector(".current-time");
let duration = document.querySelector(".duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let current_track = document.createElement("audio");

let track_list = [{
        name: "Shut Up And Dance",
        artist: "Walk The Moon",
        image: "Image URL", //
        path: "music/Shut Up And Dance.mp3"
    },
    {
        name: "I'm into You",
        artist: "J-Lo",
        image: "Image URL",
        path: "music/J-Lo - I'm Into You.mp3"

    },
    {
        name: "Drago din stei",
        artist: "Ozone",
        image: "Image URL",
        path: "music/Ozone - Drago din stei.mp3"
    }
];

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    current_track.src = track_list[track_index].path;
    current_track.load(
        track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")");
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + (track_list.length);
    updateTimer = setInterval(seekUpdate, 1000);
    current_track.addEventListener("ended", nextTrack);

    random_bg_color();
}

function random_bg_color() {
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

    document.body.style.background = bgColor;
}

function resetValues() {
    current_time.textContent = "00:00";
    duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpause() {
    if (isPlaying)
        pauseTrack();
    else
        playTrack();
}

function playTrack() {
    current_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<img class="fa-play-circle" src="images/pause-circle.svg"></img>';

}

function pauseTrack() {
    current_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<img class="fa-pause-circle" src="images/play-circle.svg"></img>';

}

function nextTrack() {
    if (track_index >= track_list.length)
        track_index = 0;
    else
        track_index += 1;

    loadTrack(track_index);
    playTrack();

}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else
        track_index = track_list.length;

    loadTrack(track_index);
    playTrack()
}

function seekTo() {
    seek_to = current_track.duration * (seek_slider.value / 100);
    current_track.currentTime = seek_to;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(current_track.duration)) {
        seekPosition = current_track.currentTime * (100 / current_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(current_track.currentTime / 60);
        let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(current_track.duration / 60);
        let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }

        current_time.textContent = currentMinutes + " : " + currentSeconds;
        duration.textContent = durationMinutes + " : " + durationSeconds;
    }
}

/*function playAll() {
    if (pathList.length > 0) {
        var audio = new Audio(pathList[0]);
        if (pathList.length > 1) {
            var count = 1;
        }
        $(audio).on('ended', function() {
            audio.src = pathList[count];
            audio.play();
            count++;
        })
    }
    audio.play();
};
*/
loadTrack(track_index);
