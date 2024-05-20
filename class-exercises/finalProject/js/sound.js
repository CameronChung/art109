let song = document.querySelector("#song");
let playBTn = document.querySelector("#play-button");
playBTn.addEventListener('click', function(){
    song.play();
})

let fx = document.querySelector("#fx");
let playBTn1 = document.querySelector("#play-button2");
playBTn1.addEventListener('click', function(){
    fx.play();
})