const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

const glitch  = '/▒/ ▒██/▓ <▒█░▓ ░▒< ▓▒<▓< ▒██▒ ▓█▓ ███/ ▓▓░▒';

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  showcase.classList.toggle('active');
})


const splash = document.querySelector('.loading');

document.addEventListener('DOMContentLoaded', (e)=>{
setTimeout(()=>{
    splash.classList.add('display-none');
}, 3000);
})

const text = baffle(".Name");
text.set({
characters : glitch,
speed:150
});
text.start();
text.reveal(4000);


const textH2 = baffle("#glitchH2");
const textH3 = baffle("#glitchH3");
const textP = baffle("#glitchP");
const textLink = baffle("#glitchLink");

textH2.set({
  characters: glitch,
  speed: 150,
});
textH3.set({
  characters: glitch,
  speed: 150,
});
textP.set({
  characters: glitch,
  speed: 150,
});
textLink.set({
  characters: glitch,
  speed: 200,
});



textH2.start();
textH3.start();
textP.start();

textH2.reveal(5000);
textH3.reveal(3000);
textP.reveal(2200);
textLink.reveal(8000);





