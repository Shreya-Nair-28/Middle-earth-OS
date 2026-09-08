function updateTimer() {
    const now = new Date();

    document.getElementById("timer").textContent =
        now.toLocaleTimeString();
}

updateTimer();
setInterval(updateTimer, 1000);



function openWindow(id) {
    document.getElementById(id).style.display = "block";
}


function closeWindow(id) {
    document.getElementById(id).style.display = "none";
}


const windows = document.querySelectorAll(".window");

windows.forEach(function(win) {
    const bar = win.querySelector(".window-bar");

    bar.addEventListener("mousedown", function(event) {
    if (event.target.tagName === "BUTTON") {
        return;
    }

        // Don't start dragging if clicking a button
        if (event.target.tagName === "BUTTON") {
            return;
        }

        let offsetX = event.clientX - win.offsetLeft;
        let offsetY = event.clientY - win.offsetTop;

        function moveWindow(event) {
            win.style.left =
                (event.clientX - offsetX) + "px";

            win.style.top =
                (event.clientY - offsetY) + "px";
        }

        document.addEventListener("mousemove", moveWindow);

        document.addEventListener("mouseup", function() {
            document.removeEventListener("mousemove", moveWindow);
        }, { once: true });
    });
});

function saveNotes() {

    const title = document.getElementById("noteTitle").value;
    const text = document.getElementById("notes").value;

    if (title === "" || text === "") {

        document.getElementById("savedMessage").textContent =
            "Please add a title and a note.";

        return;
    }

    let notes =
        JSON.parse(localStorage.getItem("middleEarthNotes")) || [];

    notes.push({
        title: title,
        text: text
    });

    localStorage.setItem(
        "middleEarthNotes",
        JSON.stringify(notes)
    );

    document.getElementById("noteTitle").value = "";
    document.getElementById("notes").value = "";

    document.getElementById("savedMessage").textContent =
        "Note saved!";
}




function clearNotes() {

    localStorage.removeItem("middleEarthNotes");

    document.getElementById("noteTitle").value = "";
    document.getElementById("notes").value = "";

    document.getElementById("savedNotes").innerHTML = "";

    document.getElementById("savedMessage").textContent =
        "All notes cleared!";
}




function viewNotes() {

    const container =
        document.getElementById("savedNotes");

    container.innerHTML = "";

    let notes =
        JSON.parse(localStorage.getItem("middleEarthNotes")) || [];

    if (notes.length === 0) {

        container.innerHTML =
            "<p>No saved notes.</p>";

        return;
    }

    notes.forEach(function(note, index) {

        const noteDiv =
            document.createElement("div");

        noteDiv.className = "note";

        noteDiv.innerHTML = `
            <h4>${note.title}</h4>
            <p>${note.text}</p>
            <button onclick="deleteNote(${index})">
                Delete
            </button>
        `;

        container.appendChild(noteDiv);
    });
}



function deleteNote(index) {

    let notes =
        JSON.parse(localStorage.getItem("middleEarthNotes")) || [];

    notes.splice(index, 1);

    localStorage.setItem(
        "middleEarthNotes",
        JSON.stringify(notes)
    );

    viewNotes();
}

let timerSeconds=300;
let timerInterval=null;

function updateTimerDisplay(){

    const minutes=Math.floor(timerSeconds/60);
    const seconds=timerSeconds%60;

    document.getElementById("timerDisplay").textContent=String(minutes).padStart(2,"0")+":"+ String(seconds).padStart(2,"0");
}

function startTimer(){

    if(timerInterval!==null){
        return;
    }
    const minutesInput=document.getElementById("timerMinutes").value;
    const secondsInput=document.getElementById("timerSeconds").value;

    if(timerSeconds===300&&(minutesInput!==""||secondsInput!=="")){
        const minutes=Number(minutesInput)||0;
        const seconds=Number(secondsInput)||0;
        timerSeconds=minutes*60+seconds;
    }
    if(timerSeconds<=0){
        document.getElementById("timerMessage").textContent="Set a time first";
        return;
    }
    document.getElementById("timerMessage").textContent="Timer is running";

    timerInterval=setInterval(function(){
        timerSeconds--;
        updateTimerDisplay();

        if(timerSeconds<=0){
            clearInterval(timerInterval);
            timerInterval=null;
            document.getElementById("timerMessage").textContent="Time's up!";
        }
    },1000);
    
}
function pauseTimer() {

    if (timerInterval !== null) {

        clearInterval(timerInterval);
        timerInterval = null;

        document.getElementById("timerMessage").textContent =
            "Timer paused.";
    }
}

function resetTimer() {

    clearInterval(timerInterval);
    timerInterval = null;

    timerSeconds = 300;

    document.getElementById("timerMinutes").value = "";
    document.getElementById("timerSeconds").value = "";

    document.getElementById("timerMessage").textContent = "";

    updateTimerDisplay();
}

updateTimerDisplay();

//tobringawindowtothefront

let highestZIndex = 1;

windows.forEach(function(win) {

    win.addEventListener("mousedown", function() {

        highestZIndex++;

        win.style.zIndex = highestZIndex;

    });

});

const galleryImages=[
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg"
];

let currentImage=0;

function showImage(){
    document.getElementById("galleryImage").src=galleryImages[currentImage];
    document.getElementById("galleryCounter").textContent=(currentImage+1)+"/"+galleryImages.length;
}
function nextImage() {
    currentImage++;

    if (currentImage >= galleryImages.length) {
        currentImage = 0;
    }

    showImage();
}

function previousImage() {
    currentImage--;

    if (currentImage < 0) {
        currentImage = galleryImages.length - 1;
    }

    showImage();
}