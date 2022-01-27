const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

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
characters : '/▒/ ▒██/▓ <▒█░▓ ░▒< ▓▒<▓< ▒██▒ ▓█▓ ███/ ▓▓░▒',
speed:150
});
text.start();
text.reveal(4000);