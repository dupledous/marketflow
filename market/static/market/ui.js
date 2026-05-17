function applyFlash(element,difference){
    const classname = difference > 0 ? 'up-flash' : 'down-flash';
    element.classList.remove('up-flash', 'down-flash');
    void element.offsetWidth;
    element.classList.add(classname)
}