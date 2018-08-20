window.onscroll = function() {myFunction()}; 

function myFunction(){
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 100){
         document.getElementById("navbar").className = "roll-down";
    } else {
        document.getElementById("navbar").className = "roll-up";
      }
}

{
window.sr = ScrollReveal();

sr.reveal('.koko', { duration: 5000 });
sr.reveal('.kan3', { duration: 2000 });
sr.reveal('.kan4', { duration: 2400 });
sr.reveal('.aboutMe', { duration: 500 });
sr.reveal('.my-photo', { duration: 1000});
}
                             