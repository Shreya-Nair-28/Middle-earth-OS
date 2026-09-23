
//introvideo function
const introcover=document.getElementById("introcover");
const introVideo=document.getElementById("introVideo");
const startIntro=document.getElementById("startIntro");
const skipIntro=document.getElementById("skipIntro");
function finishIntro(){
    introVideo.style.display="block";
    introVideo.pause();
    introcover.style.display="none";
}
startIntro.addEventListener("click",function(){
    document.querySelector(".introwarning").style.display="none";
    introVideo.style.display="block";

    introVideo.play();
});
skipIntro.addEventListener("click",function(){
    finishIntro();
})
introVideo.addEventListener("ended",function(){
    introcover.style.display="none";
})
//this function is for dark mode that changes wallpaper, colours, music and easter eggs too
function darkmode(){
    const settingsButton=document.getElementById("settingsDarkMode");
    document.body.classList.toggle("dark-mode");
    const label=document.getElementById("modeLabel");
    if(document.body.classList.contains("dark-mode")){
        label.textContent="🌙Dark Mode";
        settingsButton.textContent="☀️Light Mode";
        document.getElementById("gollum").style.display="block";
        showMoth();
        stars();
    }else{
        label.textContent="☀️Light Mode";
        settingsButton.textContent="🌙Dark Mode";
        document.getElementById("gollum").style.display="none";
        moth.style.display="none";
        document.getElementById("star").innerHTML="";
    }
    updateBackgroundMusic();
    backgroundMusic.play().catch(function(){console.log("Music waiting");});
}

//this function changes bg music depending on light or dark mode
const backgroundMusic=document.getElementById("backgroundMusic");
updateBackgroundMusic();
function updateBackgroundMusic(){
    if(document.body.classList.contains("dark-mode")){
        backgroundMusic.src="audio/darkmusic.mp3";
    }else{
        backgroundMusic.src="audio/lightmusic.mp3";
    }
    backgroundMusic.loop=true;

}
document.getElementById("startIntro").addEventListener("click",function(){
    backgroundMusic.play().catch(function(){
        console.log("Music didnt play");
    });
});
document.getElementById("skipIntro").addEventListener("click",function(){
    backgroundMusic.play().catch(function(){
        console.log("music didnt play");
    });
});

//to mute bg music
const musicmute=document.getElementById("musicmute");
if(musicmute){
    musicmute.addEventListener("change",function(){
        if(this.checked){
            backgroundMusic.muted=true;
        }
        else{
            backgroundMusic.muted=false;
            backgroundMusic.play().catch(function(){
                console.log("Music not played yet");
            });
        }
    });
}
//to change wallpaper
function changeWallpaper(){
    const wallpaper=document.getElementById("wallpaperSelect");
    if(wallpaper.value==="dark"){
        document.querySelector(".desktop").style.backgroundImage='url("images/darkbg.gif")';
    }else{
        document.querySelector(".desktop").style.backgroundImage= 'url("images/background.jpg")';
    }
}
//to choose wallpaper from options
function chooseWallpaper(type){
    const desktop=document.querySelector(".desktop");

    if(type==="dark"){
        desktop.style.backgroundImage='url("images/darkbg.gif")';
    }
    else{
        desktop.style.backgroundImage='url("images/background.jpg")';
    }
}


//to update timer

function updateTimer() {
    const now = new Date();

    document.getElementById("taskbarTime").textContent= now.toLocaleTimeString();
}

updateTimer();
setInterval(updateTimer, 1000);
const windowStates = {};
let highestZIndex = 20000;
function minimizeWindow(id){
    const windowElement = document.getElementById(id);

    if(!windowElement) return;

    windowElement.classList.add("minimized");
    windowElement.classList.remove("active");

    activeappsbar(null);
}

function maximizeWindow(id) {
    const windowElement = document.getElementById(id);

    if (!windowElement) return;
    if(windowElement.classList.contains("maximized")){
        restoreWindow(id);
    }

    else{
        const rect = windowElement.getBoundingClientRect();

        windowStates[id] = {
            width: rect.width,
            height: rect.height,
            left: rect.left,
            top: rect.top
        };
    }

    windowElement.classList.remove("minimized");
    windowElement.classList.add("maximized");
    windowElement.classList.add("active");

    activeappsbar(id);
}

function restoreWindow(id) {
    const windowElement = document.getElementById(id);

    if (!windowElement) return;

    windowElement.classList.remove("maximized");
    windowElement.classList.remove("minimized")

    const state = windowStates[id];

    if (state) {
        windowElement.style.width = state.width + "px";
        windowElement.style.height = state.height + "px";
        windowElement.style.left = state.left + "px";
        windowElement.style.top = state.top + "px";

    }

    windowElement.classList.add("active");

    activeappsbar(id);
}


const opensound=new Audio("audio/window.mp3");
const closesound=new Audio("audio/close.mp3");

function openWindow(id) {
    const windowElement = document.getElementById(id);

    if (!windowElement) return;

    windowElement.classList.remove("closing");
    windowElement.classList.remove("minimized");

    windowElement.style.display = "block";
    opensound.currentTime=0;
    openSound.play();

    document.querySelectorAll(".window, .palantir-app").forEach(function(otherWindow) {
        otherWindow.classList.remove("active");
    });

    highestZIndex++;

    windowElement.style.zIndex=highestZIndex;

    windowElement.classList.add("active");

    forTaskbar(id, true);
    activeappsbar(id);
}


function closeWindow(id) {
    const window=document.getElementById(id);

    window.classList.add("closing");
    closesound.currentTime=0;
    closesound.play();
    forTaskbar(id,false);
    activeappsbar(null);
    setTimeout(function(){
        window.style.display="none";
        window.classList.remove("closing");
    },350);

}

const windows = document.querySelectorAll(".window");

windows.forEach(function(win) {
    const bar = win.querySelector(".window-bar");

    bar.addEventListener("mousedown", function(event) {
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
//to add notes to local storage. it can be retrievd later
function saveNotes() {
    const title = document.getElementById("noteTitle").value;
    const text = document.getElementById("notes").value;
    if (title === "" || text === "") {
        document.getElementById("savedMessage").textContent =
            "Please add a title and a note.";
        return;
    }

    let notes =JSON.parse(localStorage.getItem("middleEarthNotes")) || [];
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
    document.getElementById("savedMessage").textContent ="All notes cleared";
}


//to see saved notes
function viewNotes() {

    const container =document.getElementById("savedNotes");
    container.innerHTML = "";

    let notes =JSON.parse(localStorage.getItem("middleEarthNotes")) || [];

    if (notes.length === 0) {
        container.innerHTML =
            "<p>No saved notes.</p>";

        return;
    }

    notes.forEach(function(note, index) {

        const noteDiv =document.createElement("div");
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

    let notes =JSON.parse(localStorage.getItem("middleEarthNotes")) || [];
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

    document.getElementById("timer").textContent=String(minutes).padStart(2,"0")+":"+ String(seconds).padStart(2,"0");
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
    document.getElementById("timerMessage").innerHTML='<img src="images/timer.gif" class="timer-gif" alt="Timer running">';

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



windows.forEach(function(win) {

    win.addEventListener("mousedown", function() {

        highestZIndex++;

        win.style.zIndex = highestZIndex;
        activeappsbar(win.id);

    });

});

//brought images from gallery to put as wallpapers also. you can click through the images

const galleryImages=[
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg"
];
const wallpapers=[ 
    "images/background.jpg",
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg"

];
let currentWallpaper=0;
function updateWallpaperThumbnail(){
    const thumbnail=document.getElementById("wallpaperThumbnail");
    const name=document.getElementById("wallpaperName");
    thumbnail.src=wallpapers[currentWallpaper];
    name.textContent="Wallpaper"+(currentWallpaper+1);
}
function nextWallpaper(){
    currentWallpaper++;
    if(currentWallpaper>=wallpapers.length){
        currentWallpaper=0;
    }
    updateWallpaperThumbnail();
}
function previousWallpaper(){
    currentWallpaper--;
    if(currentWallpaper<0){
        currentWallpaper=wallpapers.length-1;
    }
    updateWallpaperThumbnail();
}
function chooseCurrentWallpaper(){
    document.querySelector(".desktop").style.backgroundImage= `url("${wallpapers[currentWallpaper]}")`;
}

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
//separate func to drag palantir window as it is separate and diff from the rest
function startPalantirDrag(event) {

    if (
        event.target.closest(".palantir-controls")||event.target.closest(".palantir-close")
    ) {
        return;
    }

    const palantir = document.getElementById("oracleWindow");

    let offsetX = event.clientX - palantir.offsetLeft;
    let offsetY = event.clientY - palantir.offsetTop;

    function movePalantir(event) {
        palantir.style.left =(event.clientX - offsetX) + "px";

        palantir.style.top =(event.clientY - offsetY) + "px";
    }

    document.addEventListener("mousemove", movePalantir);
    document.addEventListener("mouseup", function() {
        document.removeEventListener("mousemove", movePalantir);
    }, { once: true });
}

document.querySelectorAll(".window-bar").forEach(function(bar) {
    bar.addEventListener("dblclick", function() {
        const windowElement = bar.closest(".window");

        if (!windowElement) return;

        maximizeWindow(windowElement.id);
    });
});


async function showWeather() {
    const locationInput = document.getElementById("weatherLocation");
    const location = locationInput.value.trim();
    const crystal = document.querySelector(".crystal-ball");
    const weatherInside = document.getElementById("weatherInside");
    const message = document.getElementById("weatherMessage");

    if (location === "") {
        crystal.classList.add("clear");
        weatherInside.innerHTML=`
            <span class="weather-searching">
                Enter a location first.
            </span>`;
        return;
    }

    crystal.classList.remove("clear");
    const smoke=document.getElementById("palantirSmoke");
    smoke.src="images/smoke.gif?time="+Date.now();
    smoke.style.display="block";
    weatherInside.innerHTML = `
    <span class="weather-searching">
        The Palantír is searching far and wide...
    </span>
`;
    crystal.classList.add("clear");
   try {
        // Find the location
        const locationResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(location) +
            "&count=1&language=en&format=json"
        );
        const locationData = await locationResponse.json();
        if (!locationResponse.ok) {
            throw new Error("Location search failed");
        }

        if (!locationData.results || locationData.results.length === 0) {
            throw new Error("Location not found");
        }

        
        const place = locationData.results[0];

        if (!place) {
            throw new Error("Location not found");}
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code&temperature_unit=celsius`
        );

        if (!weatherResponse.ok) {
            throw new Error("Weather search failed");
        }

        const weatherData = await weatherResponse.json();
        const temperature = weatherData.current.temperature_2m;
        const weatherCode = weatherData.current.weather_code;
        const weather = showWeatherDesc(weatherCode);
        
        
        setTimeout(function () {
            weatherInside.innerHTML = `
                <span class="weather-location">
                    ${place.name}
                </span>

                <span class="weather-status">
                    ${weather.icon} ${weather.description}
                </span>

                <span class="weather-temperature">
                    ${temperature}°C
                </span>
            `;

            smoke.style.display="none";
            crystal.classList.add("clear");
            
        }, 1800);

    } catch (error) {
        smoke.style.display="none";
        crystal.classList.add("clear");
        weatherInside.innerHTML = `
        <span class="weather-searching">
            The Palantír could not find that place.
        </span>`;
        
    }
}
document.getElementById("weatherLocation").addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        showWeather();
    }
});

async function widgetweather() {
    const desktopWeather = document.getElementById("desktopWeather");
    if (!desktopWeather) return;
    desktopWeather.textContent="Searching...";
    try{
        const response=await fetch( "https://geocoding-api.open-meteo.com/v1/search?name=Bengaluru&count=1&language=en&format=json"
        );
        const data=await response.json();
        const place=data.results?.[0];
        if(!place){
        throw new Error("Location not found");
    }
        const weatherResponse=await fetch( `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code&temperature_unit=celsius`
        );
        const weatherData=await weatherResponse.json();
        const temperature=Math.round(weatherData.current.temperature_2m);
        const weather=showWeatherDesc(weatherData.current.weather_code);
        updateDesktopWeather(place.name,temperature,weather);

}catch(error){
    desktopWeather.textContent="Weather unavailable";
    console.error(error);
}
}
function updateDesktopWeather(location, temperature, weather) {
    const desktopWeather = 
    document.getElementById("desktopWeather");

    if (!desktopWeather) return;


    desktopWeather.innerHTML = `
        <div>${location}</div>
        <div>${temperature}°C</div>
        <div>${weather.icon} ${weather.description}</div>
    `;
}
const weatherWidgetToggle =
    document.getElementById("weatherWidgetToggle");

if (weatherWidgetToggle) {

    weatherWidgetToggle.addEventListener("change", function () {

        const weatherWidget = 
        document.getElementById("weatherWidget");

        if (this.checked) {
            weatherWidget.style.display = "block";
            widgetweather();
        } 
        else {
            weatherWidget.style.display = "none";
        }
    });

    if (weatherWidgetToggle.checked) {
        widgetweather();
    }
}
async function editweatherlocation(location){
    const desktopWeather=document.getElementById("desktopWeather");
    if(!desktopWeather) return;
    desktopWeather.textContent="Searching....";
    try{
        const locationResponse=await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(location) +
            "&count=1&language=en&format=json");
        const locationData=await locationResponse.json();
        if(!locationData.results||locationData.results.length===0){
            throw new Error("Location not found");
        }
        const place=locationData.results[0];
        const weatherResponse=await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code&temperature_unit=celsius`
        );
        const weatherData=await weatherResponse.json();
        const temperature=Math.round(weatherData.current.temperature_2m);
        const weather=showWeatherDesc(weatherData.current.weather_code);
        updateDesktopWeather(
            place.name,temperature,weather
        );


    }
    catch(error){
        desktopWeather.textContent="Weather unavailable";
        console.error(error);

    }
}



const weatherWidget = document.getElementById("weatherWidget");

if (weatherWidget) {
    weatherWidget.addEventListener("contextmenu", function(event) {
        event.preventDefault();

        const newLocation = prompt(
            "Enter a location for your weather widget:",
            "Bengaluru"
        );

        if (!newLocation || newLocation.trim() === "") {
            return;
        }

      editweatherlocation(newLocation.trim());
    });
}



function showWeatherDesc(code) {
    if (code === 0) {
        return {
            description: "Clear skies",
            icon: "☀️"
        };
    }
    if (code === 1 || code === 2) {
        return {
            description: "Partly cloudy",
            icon: "🌤️"
        };
    }
    if (code === 3) {
        return {
            description: "Cloudy",
            icon: "☁️"
        };
    }
    if (code >= 45 && code <= 48) {
        return {
            description: "Foggy",
            icon: "🌫️"
        };
    }
    if (code >= 51 && code <= 67) {
        return {
            description: "Rain",
            icon: "🌧️"
        };
    }
    if (code >= 71 && code <= 77) {
        return {
            description: "Snow",
            icon: "❄️"
        };
    }
    if (code >= 80 && code <= 82) {
        return {
            description: "Rain showers",
            icon: "🌦️"
        };
    }
    if (code >= 95) {
        return {
            description: "Thunderstorm",
            icon: "⛈️"
        };
    }

    return {
        description: "Unknown conditions",
        icon: "🔮"
    };
}

function forTaskbar(windowId,isOpen){
    const taskbarButtons={
        notesWindow:"task-notes",
        galleryWindow:"task-gallery",
        oracleWindow:"task-oracle",
        mapWindow:"task-map",
        timerWindow:"task-timer",
        calendarWindow:"task-calendar",
        settingsWindow:"task-settings"
    };
    const buttonId=taskbarButtons[windowId];
    if(!buttonId){
        return;
    }
    const button=document.getElementById(buttonId);
    if(isOpen){
        button.classList.add("open");
    }else{
        button.classList.remove("open")
    }
}
function activeappsbar(windowId){
    const taskbarButtons={
        notesWindow:"task-notes",
        galleryWindow:"task-gallery",
        oracleWindow:"task-oracle",
        mapWindow:"task-map",
        timerWindow:"task-timer",
        calendarWindow:"task-calendar",
        settingsWindow:"task-settings"
    };
    document.querySelectorAll(".taskbar button").forEach(function(button){
        button.classList.remove("active-app");
    });
    const buttonId=taskbarButtons[windowId];
    if(buttonId){
        document.getElementById(buttonId).classList.add("active-app")
    }
}
let calendarDate=new Date();
let selectedCalendarDate=null;
function showcalendar(){
    const monthElement=document.getElementById("calendarMonth");
    const grid=document.getElementById("calendarGrid");
    if(!monthElement||!grid) return;
    const year=calendarDate.getFullYear();
    const month=calendarDate.getMonth();
    const monthNames=["January", "February", "March", "April","May","June", "July", "August","September","October", "November", "December"];

    monthElement.textContent = `${monthNames[month]} ${year}`;

    grid.innerHTML = "";

    const firstDay = new Date (year, month, 1).getDay();
    const daysInMonth = new Date(year, month +1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("calendar-day", "empty");
        grid.appendChild(emptyDay);
    }
    for (let day=1; day <=daysInMonth; day++) {
        const dayElement  = document.createElement("button");
        dayElement.classList.add("calendar-day");
        dayElement.textContent=day;
        const today=new Date();
        if(
            day===today.getDate()&&month===today.getMonth()&&year===today.getFullYear()

        ){
            dayElement.classList.add("today");
        }
        dayElement.onclick=function(){
            chooseCalendarDate(year,month,day,dayElement);
        };
        grid.appendChild(dayElement);
    
    }
}
function chooseCalendarDate(year,month,day,dayElement){
    const selectedDate=document.getElementById("selectedDate");
    const eventDateText=document.getElementById("eventSelectedDate");
    const date=new Date(year,month,day);
    document.querySelectorAll("#calendarGrid .calendar-day").forEach(function(element){
        element.classList.remove("selected");
    });
    dayElement.classList.add("selected");
    selectedCalendarDate=`${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    selectedDate.textContent=`Selected:${date.toLocaleDateString()}`;
    eventDateText.textContent=`Adding event for ${date.toLocaleDateString()}`;
    showCalendarEvent(selectedCalendarDate);
}
function toggleManualEventDate(){
    const dateBox=document.getElementById("manualEventDate");
    if(dateBox.style.display==="none"){
        dateBox.style.display="block";
    }
    else{
        dateBox.style.display="none";
    }
}
const defcalendarevents={
    
    "12-25":[{
        title:"Christmas",
        description:""
    }],
    "12-18":[{
        title:"Doomsday",
        description:""
    }]

}

function getSavedCalendarEvents(){
    return JSON.parse(localStorage.getItem("calendarEvents"))||{};
}

function showCalendarEvent(dateKey){
    const eventDisplay =document.getElementById("calendarEventDisplay");
    if(!eventDisplay) return;

    const savedEvents =JSON.parse(localStorage.getItem("calendarEvents")) || {};
    const defKey=dateKey.slice(5);
    const events = (defcalendarevents[defKey]||[]).concat(savedEvents[dateKey] || []);

    if(events.length === 0){

        eventDisplay.innerHTML = `
            <h3>Events</h3>
            <p>No events recorded for this day.</p>
        `;
        return;
    }

    eventDisplay.innerHTML = `
        <h3>Events</h3>

        ${events.map(function(event){

            return `
                <div class="calendar-event">
                    <strong>${event.title}</strong>
                    ${
                        event.description
                        ? `<span>${event.description}</span>`
                        : ""
                    }
                </div>
            `;

        }).join("")}
    `;
}
function previousMonth(){
    calendarDate.setMonth(calendarDate.getMonth()-1);
    showcalendar();

}
function nextMonth(){
    calendarDate.setMonth(calendarDate.getMonth()+1);
    showcalendar();
}
function goToToday(){
    calendarDate=new Date();
    showcalendar();
    const selectedDate=document.getElementById("selectedDate");
    selectedDate.textContent="Today";
}
showcalendar();

const doodleCanvas = document.getElementById("doodleCanvas");
const doodleCtx = doodleCanvas.getContext("2d");

let doodleDrawing = false;

function canvas() {
    doodleCanvas.width = 650;
    doodleCanvas.height = 450;

    doodleCtx.lineCap = "round";
    doodleCtx.lineJoin = "round";
}

function addCalendarEvent() {

    const title =document.getElementById("eventTitle").value.trim();
    const description =document.getElementById("eventDescription").value.trim();
    const message =document.getElementById("eventMessage");

    if (title === "") {

        message.textContent = "Enter an event name first.";
        return;
    }

    const manualDate =document.getElementById("eventDate").value;

    let date;

    if (manualDate !== "") {
        date = manualDate;
    }

    else if (selectedCalendarDate) {
        date = selectedCalendarDate;
    }

    else {
        message.textContent ="Select a date first.";
        return;
    }


    const events=getSavedCalendarEvents();

    if (!events[date]) {
        events[date] = [];
    }

    events[date].push({
        title: title,
        description: description

    });

    localStorage.setItem(
        "calendarEvents",
        JSON.stringify(events)
    );

    selectedCalendarDate = date;

    message.textContent =
        "Event has been added!";

    document.getElementById("eventTitle").value = "";

    document.getElementById("eventDescription").value = "";

    document.getElementById("eventDate").value = "";

    document.getElementById(
        "manualEventDate"
    ).style.display = "none";

    const newDate =
        new Date(date + "T00:00:00");
    calendarDate = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        1
    );
    showcalendar();
    showCalendarEvent(date);

    document.getElementById(
        "eventSelectedDate"
    ).textContent =
        `Adding event for ${newDate.toLocaleDateString()}`;
}

canvas();

function getDoodlePosition(e) {
    const rect = doodleCanvas.getBoundingClientRect();

    return {
        x: (e.clientX - rect.left) * (doodleCanvas.width / rect.width),
        y: (e.clientY - rect.top) * (doodleCanvas.height / rect.height)
    };
}

function startDoodle(e) {
    doodleDrawing = true;

    const position = getDoodlePosition(e);

    doodleCtx.beginPath();
    doodleCtx.moveTo(position.x, position.y);
}

function drawDoodle(e) {
    if (!doodleDrawing) return;

    const position = getDoodlePosition(e);

    doodleCtx.lineTo(position.x, position.y);

    doodleCtx.strokeStyle =
        document.getElementById("doodleColor").value;

    doodleCtx.lineWidth =
        Number(document.getElementById("doodleSize").value);

    doodleCtx.stroke();
}

function stopDoodle() {
    doodleDrawing = false;
    doodleCtx.closePath();
}

doodleCanvas.addEventListener("mousedown", startDoodle);
doodleCanvas.addEventListener("mousemove", drawDoodle);
doodleCanvas.addEventListener("mouseup", stopDoodle);
doodleCanvas.addEventListener("mouseleave", stopDoodle);

function clearDoodle() {
    doodleCtx.clearRect(
        0,
        0,
        doodleCanvas.width,
        doodleCanvas.height
    );
}

function eraser() {
    if (doodleCtx.globalCompositeOperation === "destination-out") {
        doodleCtx.globalCompositeOperation = "source-over";
        document.getElementById("eraserButton").textContent = "🧽 Eraser";
        doodleCanvas.style.cursor='url("images/feather-cursor.png") 4 4,auto';
    
    } else {
        doodleCtx.globalCompositeOperation = "destination-out";
        document.getElementById("eraserButton").textContent = "✒️ Pen";
        doodleCanvas.style.cursor='url("images/potion-cursor.png") 0 0,auto';
    }
}
let currentExcerpt="";
function openBook(book){
    const readerTitle=document.getElementById("readerTitle");
    const readerHeading=document.getElementById("readerHeading");
    const readerText=document.getElementById("readerText");
    const books={
        hobbit:{
            title:"The Hobbit",
            text:"Bilbo Baggins joins a wizard and a group of dwarves on a dangerous quest to reclaim stolen treasure from a fierce dragon.",
            pdf:"books/hobbit.pdf"
        },
        lotr:{
            title:"The Lord of the Rings",
            text:"A hobbit named Frodo Baggins and a fellowship journey across Middle-earth to destroy the corrupt One Ring in the fires of Mount Doom and defeat the Dark Lord Sauron.",
            pdf:"books/lotr.pdf"
        },
        silmarillion:{
            title:"The Silmarillion",
            text:"The Silmarillion is an account of the Elder Days, or the First Age of the World. It details the history and creation of Middle-earth.",
            pdf:"books/silmarillion.pdf"    
        },
        unfinished:{
            title:"Unfinished Tales of Numenor and Middle-Earth",
            text:"A collection of stories and writings by J.R.R. Tolkien the GOAT",
            pdf:"unfinished.pdf"
        }
    };
    const selectedBook=books[book];
    currentExcerpt=selectedBook.pdf;
    readerTitle.textContent=selectedBook.title;
    readerHeading.textContent=selectedBook.title;
    readerText.textContent=selectedBook.text;

    openWindow("readerWindow");
}


function openExcerpt(){
    const viewer = document.getElementById("excerptViewer");
    viewer.src = currentExcerpt;
    viewer.style.display = "block";
}
const pdfCanvas=document.getElementById("pdfCanvas");
const pdfCtx=pdfCanvas.getContext("2d");
let pdfDocument=null;
let currentPdfPage=1;

async function loadPdfExcerpt(){
    alert("loading"+currentExcerpt);
    try{
        pdfDocument=await pdfjsLib.getDocument(currentExcerpt).promise;
        alert("pdf loaded");
    }
    catch(error){
        alert("PDF error"+error.message);
    }
    
}

async function renderPdfPage(pageNumber){
    if(!pdfDocument) return;
    const page=await pdfDocument.getPage(pageNumber);
    const viewport=page.getViewport({scale:1.2});
    pdfCanvas.width=viewport.width;
    pdfCanvas.height=viewport.height;
    await page.render({
        canvasContext:pdfCtx,
        viewport:viewport
    }).promise;
    pdfCanvas.style.display="block";
}

document.querySelectorAll(".window").forEach(function(win) {
    win.addEventListener("mousedown", function() {

        document.querySelectorAll(".window").forEach(function(otherWindow) {
            otherWindow.classList.remove("active");
        });

        win.classList.add("active");

        activeappsbar(win.id);
    });
});

const desktopIcons = document.querySelectorAll(".icons .icon");

desktopIcons.forEach(function(icon) {

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    icon.addEventListener("mousedown", function(event) {

        if (event.button !== 0) return;

        startX = event.clientX;
        startY = event.clientY;
        isDragging = false;

        function moveIcon(event) {

            const distanceX = event.clientX - startX;
            const distanceY = event.clientY - startY;

            if (Math.abs(distanceX) > 5 || Math.abs(distanceY) > 5) {
                isDragging = true;
            }

            if (!isDragging) return;

            icon.style.transform =
                `translate(${distanceX}px, ${distanceY}px)`;
        }

        function stopDragging(event) {

            document.removeEventListener("mousemove", moveIcon);
            document.removeEventListener("mouseup", stopDragging);

            icon.style.transform = "";

            if (!isDragging) return;

            const iconsArea = document.querySelector(".icons");
            const otherIcons = [...iconsArea.querySelectorAll(".icon")]
                .filter(function(otherIcon) {
                    return otherIcon !== icon;
                });

            let closestIcon = null;
            let closestDistance = Infinity;

            otherIcons.forEach(function(otherIcon) {

                const rect = otherIcon.getBoundingClientRect();

                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const distance = Math.hypot(
                    event.clientX - centerX,
                    event.clientY - centerY
                );

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIcon = otherIcon;
                }
            });

            if (closestIcon && closestDistance < 80) {

                const rect = closestIcon.getBoundingClientRect();

                if (event.clientX < rect.left + rect.width / 2) {
                    iconsArea.insertBefore(icon, closestIcon);
                } else {
                    iconsArea.insertBefore(
                        icon,
                        closestIcon.nextSibling
                    );
                }
            }

            icon.dataset.dragged = "true";

            setTimeout(function() {
                icon.dataset.dragged = "false";
            }, 100);
        }

        document.addEventListener("mousemove", moveIcon);
        document.addEventListener("mouseup", stopDragging);
    });

    icon.addEventListener("click", function(event) {

        if (icon.dataset.dragged === "true") {
            event.preventDefault();
            event.stopPropagation();
        }
    });

});


function showMapLocation(location){
    const mapInfo=document.getElementById("mapInfo");

    const locations={
        shire:{
            name:"The Shire",
            description:"Home of the Hobbits: The Hobbits all live in peace and quiet. The main five hobbit characters: Frodo,Sam, Merry, Pippin and Bilbo are from the Shire."
        },
        rivendell:{
            name:"Rivendell",
            description:"Land of the Elves"
        },
        moria:{
            name:"Moria",
            description:"Beneath the Misty Mountains"
        },
        minastirith:{
            name:"Minas Tirith",
            description:"The White City of Gondor is its capital"
        },
        rohan:{
            name:"Rohan",
            description:"The land of the Rohirrim"
        },
        gondor:{
            name:"Gondor",
            description:"Kingdom of Men"
        },
        mordor:{
            name:"Mordor",
            description:"The dark lands"
        },
        isengard:{
            name:"Isengard",
            description:"Fortified circular valley and fortress"
        }

    };
    const selected=locations[location];
    if(!selected) return;
    mapInfo.innerHTML=`<h3>${selected.name}</h3> <p>${selected.description}<p>`;
}

document.addEventListener("mousemove", function(event) {

    if(document.getElementById("doodleWindow").contains(event.target)){
        return;
    }
    const sparkle = document.createElement("span");
    sparkle.className = "magic-sparkle";
    sparkle.textContent = "⚔️";
    sparkle.style.left = event.clientX + "px";
    sparkle.style.top = event.clientY + "px";
    document.body.appendChild(sparkle);

setTimeout(function() {
    sparkle.remove();
}, 700);
});


function updateClockWidget(){
    const now=new Date();
    const hours=now.getHours();
    const minutes=now.getMinutes();
    const minuteAngle=minutes*6;
    const hourAngle=(hours%12)*30+minutes*0.5;
    document.getElementById("minuteHand").style.transform=`translateX(-50%)rotate(${minuteAngle}deg)`;
    document.getElementById("hourHand").style.transform=`translate(-50%)rotate(${hourAngle}deg)`;
}
updateClockWidget();
setInterval(updateClockWidget,1000);

const clockWidgetToggle=document.getElementById("clockWidgetToggle");

if (clockWidgetToggle) {
    clockWidgetToggle.addEventListener("change", function(){

        const clockWidget = document.getElementById("clockWidget");

        if (this.checked) {
            clockWidget.style.display = "block";
        } else {
            clockWidget.style.display = "none"
        }
    });
}


function updateDesktopEvents() {
    const eventsList = document.getElementById("desktopEventsList");

    if (!eventsList) return;

    const events =getSavedCalendarEvents();
    Object.keys(defcalendarevents).forEach(function(monthDay){
        const dateKey=new Date().getFullYear()+"-"+monthDay;
        if(!events[dateKey]){
            events[dateKey]=defcalendarevents[monthDay];
        }
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = Object.entries(events)
        .filter(([dateKey]) => {
            const eventDate = new Date(dateKey + "T00:00:00");
            return eventDate >= today;
        })
        .sort(([dateA], [dateB]) => {
            return new Date(dateA) - new Date(dateB);
        })
        .slice(0, 4);

    if (upcomingEvents.length === 0) {
        eventsList.innerHTML = "<p>No upcoming events</p>";
        return;
    }

    eventsList.innerHTML = upcomingEvents.map(([dateKey, eventData]) => {
        const date = new Date(dateKey + "T00:00:00");

        const formattedDate = date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short"
        });

        const eventName = Array.isArray(eventData)
    ? eventData.map(event => event.title).join(", ")
    : eventData.title;
        return `
            <div class="desktop-event">
                <div class="desktop-event-date">${formattedDate}</div>
                <div class="desktop-event-name">${eventName}</div>
            </div>
        `;
    }).join("");
}
updateDesktopEvents();

const eventWidgetToggle = document.getElementById("eventsWidgetToggle");
if (eventWidgetToggle)  {
    eventWidgetToggle.addEventListener("change", function() {

        const eventWidget = document.getElementById("eventsWidget");

        if (this.checked) {
            eventWidget.style.display = "block";
        } else {
            eventWidget.style.display = "none";
        }
    });

    if (eventWidgetToggle.checked) {
        updateDesktopEvents();
    }
}

const desktopWidgets = document.querySelectorAll(".desktop-widget");

desktopWidgets.forEach(function(widget) {

    widget.addEventListener("mousedown",function(event) {

        if (event.button !== 0) return;

        let offsetX=event.clientX-widget.offsetLeft;
        let offsetY=event.clientY-widget.offsetTop;

        function moveWidget(event) {
            widget.style.left = (event.clientX - offsetX) + "px";
            widget.style.top = (event.clientY - offsetY) + "px";
        }

        function stopDragging() {
            document.removeEventListener("mousemove", moveWidget);
            document.removeEventListener("mouseup", stopDragging);
        }

        document.addEventListener("mousemove", moveWidget);
        document.addEventListener("mouseup", stopDragging);
    });

});

console.log("SCRIPT RUNNING");
console.log("openWindow:", typeof openWindow);
console.log("doodleWindow:", document.getElementById("doodleWindow"));

function showRing(){
    const ringGif=document.getElementById("ringGif");
ringGif.style.display="block";
setTimeout(function(){
 ringGif.style.display="none"
},3000);
}
function hideGollum(){
    const gollum=document.getElementById("gollum");
    gollum.style.transition="transform 0.8s ease, opacity 0.8s ease";
    gollum.style.transform="translateY(100px)";
    gollum.style.opacity="0";
    setTimeout(function(){
        gollum.style.display="none";
        gollum.style.transform="";
        gollum.style.opacity="";

    },800);
}
const treasure=document.getElementById("treasure");
const treasureImage=document.getElementById("treasureImage");
function showTreasure(){
    treasureImage.src="images/treasure.png";
    treasure.classList.add("treasure-show");
}
function opentreasure(){
    
    treasureImage.src="images/treasure.gif?time="+Date.now();
    setTimeout(function(){
        treasureImage.src="images/treasurefinal.png";
    },2000);
    setTimeout(function(){
        treasure.classList.remove("treasure-show");
    },5000);
}
setTimeout(function(){
    showTreasure();

},20000);
function showLegolas(){
    const legolas=document.querySelector(".legolas");
    legolas.classList.remove("legolas-fly");
    void legolas.offsetWidth;
    legolas.classList.add("legolas-fly");
    void legolas.offsetWidth;
    legolas.classList.add("legolas-fly");
    setTimeout(function(){
        legolas.classList.remove("legolas-fly");
    },2000);
}

function showDragon(){
    const dragon = document.querySelector(".dragon");
    dragon.classList.remove("dragon-fly");
    void dragon.offsetWidth;
    dragon.classList.add("dragon-fly");
    setTimeout(function(){
        dragon.classList.remove("dragon-fly");
    }, 4000);
}



setInterval(function(){
    const random=Math.floor(Math.random()*3);
    if(random===0){
        showGandalf();
    }

    if(random===1){
        showLegolas();
    }

    if(random===2){
        showDragon();
    }
},10000);

function growPlant(){
    const plantImage=document.getElementById("plantImage");
    plantImage.src="images/plant.gif";
    setTimeout(function(){
        plantImage.src="images/plantfinal.png";
    },1800);
}
function growLily(){
    const lilyImage=document.getElementById("lilyImage");
    lilyImage.src="images/lily.gif";
    setTimeout(function(){
        lilyImage.src="images/lilyfinal.png";
    },7000);
}
function growFlower(){
    const flowerImage=document.getElementById("flowerImage");
    flowerImage.src="images/flower.gif";
    setTimeout(function(){
        flowerImage.src="images/flowerfinal.png";
    },4000);
}

const butterfly=document.getElementById("butterfly");
const butterflyImage=document.getElementById("butterflyImage");
setTimeout(function(){
    butterfly.style.display="block";
},7000);

function flyButterfly(){
    butterflyImage.src="images/butterfly.gif";
    butterfly.classList.add("butterfly-fly");
}

const moth=document.getElementById("moth");
const mothImage=document.getElementById("mothImage");

function showMoth(){
    moth.style.display="block";
}
function flyMoth(){
    mothImage.src="images/moth.gif";
    moth.classList.add("moth-fly");
}
let starList=[];
function stars(){
    const starArea=document.getElementById("star");
    starArea.innerHTML="";
    starList=[];
    for(let i=0;i<25;i++){
        const star=document.createElement("img");
        star.className="star";
        star.src="images/star.png";
        const size=Math.random()*13+18;
        star.style.width=size+"px";
        star.style.height=size+"px";
        star.style.left=Math.random()*100+"%";
        star.style.top=Math.random()*100+"%";
        starArea.appendChild(star);
        starList.push(star);
    }
}

document.addEventListener("mousemove",function(event){
    starList.forEach(function(star){
        const rect=star.getBoundingClientRect();
        const starX=rect.left+rect.width/2;
        const starY=rect.top+rect.height/2;
        const distanceX=starX-event.clientX;
        const distanceY=starY-event.clientY;
        const distance=Math.sqrt(distanceX**2+distanceY**2);
        if(distance<170){
            const strength=(170-distance)/170;
            star.style.transform=`translate(${distanceX*strength}px,${distanceY*strength}px)`;
          
        }
        else{
            star.style.transform="translate(0,0)";
        }
    });
});
