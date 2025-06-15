/**
 * @type {HTMLElement}
 */
let headerElement;

window.addEventListener("load", () => {
    headerElement = document.querySelector("body>header");
});

window.addEventListener("resize", (e) => {
    if(window.innerWidth > 750) {
        // this view will be closed by css so might aswell close it in js
        // otherwise the menu might randomly open when the user resizes again
        closeMobileViewMenu();
    }
});

function openMobileViewMenu() {
    headerElement.classList.add("mobile-view-open");
}

function closeMobileViewMenu() {
    headerElement.classList.remove("mobile-view-open");
}

function toggleMobileViewMenu() {
    if(headerElement.classList.contains("mobile-view-open")) {
        closeMobileViewMenu();
    } else {
        openMobileViewMenu();
    }
}

/**
 * @param {HTMLButtonElement} button
 */
function toggleMenuSection(button) {
    let currentElement = button.parentElement;

    let callback;

    callback = (e) => {
        if(currentElement === e.target) {
            document.removeEventListener("click", callback);
            return;
        }
        if(currentElement.contains(e.target)) {
            return;
        }

        currentElement.classList.remove("open");
        document.removeEventListener("click", callback);
    }

    // this needs to happen after this event is over
    setTimeout(() => {
        eventListener = document.addEventListener("click", callback);
    }, 0);

    let openElements = headerElement.getElementsByClassName("open");

    // NOTE: close others
    for(let element of openElements) {
        if(element !== currentElement) {
            element.classList.remove("open");
        }
    }

    currentElement.classList.toggle("open");
}
