const timeline = document.getElementById("timeline");

/* aller à droite */
function scrollRightTimeline() {
    timeline.scrollBy({
        left: 400,
        behavior: "smooth"
    });
}

/* revenir à gauche */
function scrollLeftTimeline() {
    timeline.scrollBy({
        left: -400,
        behavior: "smooth"
    });
}

/* scroll automatique avec la molette */
function scrollTimeline(event) {
    event.preventDefault();

    timeline.scrollLeft += event.deltaY;
}

timeline.addEventListener("wheel", scrollTimeline);