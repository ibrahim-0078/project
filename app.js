let songindex = 0;
let currentSong = new Audio("songs/1.mp3");
let pausePlay = document.getElementById("pausePlay");
let masterSongName = document.getElementById("masterSongName");
// let gif = document.getElementById("gif");
let songs = [
    {songname: "Hamari_Aduri_Kahani", filepath: "songs/1.mp3"},
    {songname: "Biba_Sada_Dil_Mordy", filepath: "songs/2.mp3"},
    {songname: "Main_Wo_Chand", filepath: "songs/3.mp3"}, 
    {songname: "Falak_Ijazat", filepath: "songs/4.mp3"},
    {songname: "Aseer_e_Muhabbat", filepath: "songs/5.mp3"},
    {songname: "Tujhe_Main_Payar_Karu", filepath: "songs/6.mp3"},
    {songname: "Yaadein_Teri", filepath: "songs/7.mp3"},
    {songname: "Azal_Sy_Muhabbat_ki", filepath: "songs/8.mp3"},
    {songname: "Dil_Ibadat", filepath: "songs/9.mp3"},
    {songname: "Haal_Kya_Krdia_Tery_Payar_Ny", filepath: "songs/10.mp3"}
];

// play/pause click
pausePlay.addEventListener('click', ()=>{
    if(currentSong.paused || currentSong.currentTime<=0){ 
        currentSong.play();
        pausePlay.classList.remove('fa-circle-play');
        pausePlay.classList.add('fa-circle-pause');
        // gif.style.opacity = 1;
    }
    else{
            currentSong.pause();
            pausePlay.classList.add('fa-circle-play');
            pausePlay.classList.remove('fa-circle-pause');
            // gif.style.opacity = 0;
    }
})


// timeUpdate

const secondsToMinutesSeconds = (seconds)=>{
    if (isNaN(seconds) || seconds < 0 ) {
        return "00:00"
    }

    const min = Math.floor(seconds / 60 );
    const sec = Math.floor(seconds % 60);
    const formattedMin = String(min).padStart(2, "0");
    const formattedSec = String(sec).padStart(2, "0"); 

    return `${formattedMin}:${formattedSec}`;
}

currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} /
    ${secondsToMinutesSeconds(currentSong.duration)}`;

   

    // update seekBar

    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%" ;

    if(currentSong.currentTime === currentSong.duration){
        pausePlay.classList.remove('fa-circle-pause');
        pausePlay.classList.add('fa-circle-play');
        document.querySelector(".circle").style.left = 0 ;
        document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
        
        // autoPlay Next Song

        if(songindex>=9){
            songindex=0;
        }
        else{
            songindex+=1;
        }
        currentSong.src = `songs/${songindex+1}.mp3`;
        masterSongName.innerText = songs[songindex].songname;
        currentSong.currentTime=0;
        currentSong.play();
        pausePlay.classList.remove('fa-circle-play');
        pausePlay.classList.add('fa-circle-pause');
        }
    
});

// add an eventlistener to seekBar 

document.querySelector(".seekBar").addEventListener("click" , (e)=>{
    let per = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = per + "%";
    currentSong.currentTime = ((currentSong.duration) * per) / 100;
});

//in songitemplay=> All plays or pause

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })

};

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        currentSong.src = `songs/${songindex+1}.mp3`;
        masterSongName.innerText = songs[songindex].songname;   
        currentSong.currentTime=0;
        currentSong.play();
        // gif.style.opacity = 1;
        pausePlay.classList.remove('fa-circle-play');
        pausePlay.classList.add('fa-circle-pause');

    })
});

//Forward btn

document.getElementById('forward').addEventListener('click', ()=>{
    if(songindex>=9){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    currentSong.src = `songs/${songindex+1}.mp3`;
    masterSongName.innerText = songs[songindex].songname;
    currentSong.currentTime=0;
    currentSong.play();
    pausePlay.classList.remove('fa-circle-play');
    pausePlay.classList.add('fa-circle-pause');
});

//backword btn

document.getElementById('backword').addEventListener('click', ()=>{
    if(songindex<=0){
        songindex=0;
    }
    else{
        songindex-=1;
    }
    currentSong.src = `songs/${songindex+1}.mp3`;
    masterSongName.innerText = songs[songindex].songname;
    currentSong.currentTime=0;
    currentSong.play();
    pausePlay.classList.remove('fa-circle-play');
    pausePlay.classList.add('fa-circle-pause');
});