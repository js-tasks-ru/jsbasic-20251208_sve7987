function toggleText() {
  let button = document.querySelector('.toggle-text-button');
   button.onclick = function(event) {
    let elem = document.querySelector('#text');
    elem.hidden = !elem.hidden;
};
}



