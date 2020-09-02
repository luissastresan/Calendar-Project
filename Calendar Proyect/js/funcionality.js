var btnNewEvent = document.getElementById("btnnewevent");
var btnCloseEvent = document.getElementById("btnhide");
var btnBody = document.querySelector("body");

var btnCreate = document.getElementById("create");
var btnCancel = document.getElementById("cancel");

var checked = false;

// Functions to display and close modal event
btnNewEvent.addEventListener("click", displayCardEvent);
function displayCardEvent() {
    var carEvent = document.getElementById("cardevent");
    var changeBody = document.querySelector("body");
    changeBody.style.background = "#A5A5A5"
    carEvent.classList.remove("hidden");
};

btnCloseEvent.addEventListener("click", closeCardEvent);
function closeCardEvent () {
    var carEvent = document.getElementById("cardevent");
    var changeBody = document.querySelector("body");
    changeBody.style.background = "white"
    carEvent.classList.add("hidden");
    var ptitle = document.getElementById("titlerequired");
    ptitle.classList.add("hidden");
    var pdate = document.getElementById("daterequired");
    pdate.classList.add("hidden");
    document.getElementById("formevent").reset();
};

document.addEventListener('keyup', function(e) {
    if (e.keyCode == 27) {
        closeCardEvent ();
    }
});

function closeModal () {
    var carEvent = document.getElementById("cardevent");
    var changeBody = document.querySelector("body");
    changeBody.style.background = "white";
    carEvent.classList.add("hidden");
};

var modal = document.querySelector("main");
modal.addEventListener('click', closeModal, false);





btnCancel.addEventListener("click", cancelEvent);
function cancelEvent () {
    document.getElementById("formevent").reset();
    var carEvent = document.getElementById("cardevent");
    var changeBody = document.querySelector("body");
    changeBody.style.background = "white"
    carEvent.classList.add("hidden");
    var ptitle = document.getElementById("titlerequired");
    ptitle.classList.add("hidden");
    var pdate = document.getElementById("daterequired");
    pdate.classList.add("hidden");
};

// Fix currently date

const date = new Date();
document.getElementById("day").textContent = " " + date.getDate();

const Months = ["January",
"February",
"March",
"April",
"May",
"Juny",
"July",
"August",
"September",
"October",
"November",
"December"
];

const renderCalendar = () => {
    date.setDate(1);

    const monthDays = document.querySelector(".days");

    document.getElementById("month").textContent = Months[date.getMonth()];
    document.getElementById("year").textContent = ", " + date.getFullYear()

    // Variables
    const lastday = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayIndex = date.getDay() - 1;
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const lastDayindex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayindex;



    // Funcionality calander
    let days = "";

    // Previous month
    const securePreviousMonth = date.getMonth() - 1 >= 0 ? date.getMonth() - 1 : 11;
    if (firstDayIndex === -1) {
        for (let x = 6; x > 0; x--) {
            days += `<div class="prev-date" id="${prevLastDay - x + 1}-${Months[securePreviousMonth]}-${date.getFullYear() - 1}">
                ${prevLastDay - x + 1}<i class="far fa-calendar-plus"></i>
            </div>`;
        }
    } else {
        for (let x = firstDayIndex; x > 0; x--) {
            days += `<div class="prev-date" id="${prevLastDay - x + 1}-${Months[securePreviousMonth]}-${date.getFullYear() - 1}">
                ${prevLastDay - x + 1}<i class="far fa-calendar-plus"></i>
            </div>`;
        }
    };

    //Currently month
    for (let i = 1; i <= lastday; i++) {
        let x = 1;
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
            days += `<div class="today" id="${i}-${Months[date.getMonth()]}-${date.getFullYear()}">${i}<i class="far fa-calendar-plus"></i>
            </div>`;
        } else {
            days += `<div id="${i}-${Months[date.getMonth()]}-${date.getFullYear()}">${i}<i class="far fa-calendar-plus"></i>
            </div>`;
        }
        x++;
    };

    // Next month
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date" id="${j}-${Months[date.getMonth() + 1]}-${date.getFullYear()}">${j}<i class="far fa-calendar-plus"></i>
        </div>`;
        monthDays.innerHTML = days;
    };
};


// To move the currently month
let previousbtn = document.querySelector(".fa-caret-left");
let nextbtn = document.querySelector(".fa-caret-right");

previousbtn.addEventListener("click", previousCalendar);
nextbtn.addEventListener("click", nextCalendar);

function previousCalendar () {
    date.setMonth(date.getMonth() - 1)
    renderCalendar();
    renderEvents();
}

function nextCalendar () {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
    renderEvents();
}

renderCalendar();

/*unction createIcon () {
    let div = get
    let x = document.createElement("i");
    x.setAttribute("class", "far fa-calendar-plus");
    x.addEventListener("click", function () {
        displayCardEvent();
    })

}*/


// Events
let eventsCalendar = [];

let eventsCalendarCurrent = [];
let eventsCalendarExpire = [];

function getExpireEvents () {
    let events = getStorage();
    eventsCalendarExpire = events.filter(event => (event.enddate !== undefined && new Date(event.enddate) < new Date()) || (event.enddate === undefined && event.initialdate < new Date()));
};



function expireInLastThanAndHour (event) {
    if (event.enddate === "") {
        var oneDayAfter = new Date(event.initialdate).setDate(new Date(event.initialdate).getDate() + 1);
        console.log(oneDayAfter)
        var diff = Math.abs(oneDayAfter - new Date());
        console.log(diff);
        var minutes = Math.floor((diff/1000)/60);
    } else {
        var endDate = new Date(event.enddate);
        var initialDate = new Date(event.initialdate);
        var diff = Math.abs(endDate - initialDate);
        var minutes = Math.floor((diff/1000)/60);
    }
    return minutes <= 60;
}

function setExpiredEvents () {
    for (event of eventsCalendarExpire) {
        p = document.getElementById(event.id);
        p.style.background = "red";
    }
}

function getEventsPendentToExpire () {
    let events = getStorage();
    eventsCalendarCurrent = events.filter(event => (event.time !== undefined) || (eventsCalendarExpire.includes(event)) || (expireInLastThanAndHour(event)));
}

function initEvent(title, initialDate, endDate = undefined, time = undefined, description = undefined, type = undefined) {
    return {
        id: eventsCalendar.length,
        title: title,
        initialdate: initialDate,
        enddate: endDate,
        time: time,
        description: description,
        type: type
    };
};

btnCreate.addEventListener("click", saveEvent);
function saveEvent () {
    var title = document.forms["formevent"]["title"].value;
    var initialdate = document.forms["formevent"]["date"].value;
    var finaldate = document.forms["formevent"]["finaldate"].value;
    var time = document.forms["formevent"]["time"].value;
    var description = document.forms["formevent"]["description"].value;
    var type = document.forms["formevent"]["type"].value;

    var ptitle = document.getElementById("titlerequired");
    var pdate = document.getElementById("daterequired");

    if (!validateTitle() && !validateInitialDate()) {
        ptitle.classList.remove("hidden");
        pdate.classList.remove("hidden");

    } else if (!validateInitialDate()) {
        pdate.classList.remove("hidden");
        ptitle.classList.add("hidden")

    } else if (!validateTitle()) {
        ptitle.classList.remove("hidden");
        pdate.classList.add("hidden");
    } else {
        checked = true;
    }

    if (checked == true) {
        const event = initEvent(title, initialdate, finaldate, time, description, type);
        event.time = validateCheckboxReminder() ? parseInt(document.forms["formevent"]["time"].value.split(" ")[0]) : undefined;
        eventsCalendar.push(event);
        setStorage(eventsCalendar);
        addEventCard(event);
        expireInLastThanAndHour(event)
        cancelEvent();
    }
};

function setStorage (x) {
    localStorage.setItem('events', JSON.stringify(x));
};

function getStorage () {
    return JSON.parse(localStorage.getItem('events'));
};

function renderEvents () {
    let events = getStorage() || []; // If localStorage is undefined, then return empty array.
    for (event of events) {
        addEventCard(event);
    }
};

function addEventCard (event) {
    let title = event.title;
    let initialdate = new Date(event.initialdate);
    initialdate = `${initialdate.getDate()}-${Months[initialdate.getMonth()]}-${initialdate.getFullYear()}`;
    let w = document.getElementById(initialdate);
    p = document.createElement('p');
    w.appendChild(p).setAttribute("id", event.id)
    p.addEventListener("click", displayModalEventDitails);
    p.textContent = title;
}

renderEvents();

setInterval(() => {
    setExpiredEvents();
    getExpireEvents();
}, 10000);


function validateTitle () {
    var title = document.forms["formevent"]["title"].value;
    return !(title === "" || title === undefined);
};

function validateInitialDate () {
    var initialdate = document.forms["formevent"]["date"].value;
    var initialdate = new Date (initialdate);
    return initialdate > new Date();
};

function validateCheckboxReminder () {
    return document.getElementById("remind").checked;
}

function displayModalEventDitails (clickEvent) {
    const eventCalendarId = clickEvent.target.id;
    const calendarEvents = getStorage();
    const matchedEvent = calendarEvents.find(event => event.id === +eventCalendarId);
    let div = document.querySelector(".minieventcard");
    let keyss = Object.keys(matchedEvent);
    let size = Object.keys(matchedEvent).length;
    let cont = Object.values(matchedEvent);
    for (i = 0; i < size; i++) {
        var p = document.createElement("p");
        div.appendChild(p);
        p.textContent = `${keyss[i]} : ${cont[i]}`;
    }
    let div2 = document.createElement("div");
    var btnClear = document.createElement("button");
    var btnNoClear = document.createElement("button");
    div2.appendChild(btnClear).setAttribute("id", "clear");
    div2.appendChild(btnNoClear).setAttribute("id", "noclear");
    div.appendChild(div2).setAttribute("id", "containerbuttons");
    btnClear.textContent = "Remove Event";
    btnNoClear.textContent = "Close";
    btnClear.addEventListener("click", function() {
        removeModalDitails(matchedEvent.id)
    });
    btnNoClear.addEventListener("click", closeModalDitails);
    div.classList.remove("hidden");
}

function removeModalDitails (eventId) {
    let events = getStorage();
    eventsCalendar = events.filter(event => event.id !== eventId)
    setStorage(eventsCalendar);
    renderCalendar();
    renderEvents();
    let div = document.querySelector(".minieventcard");
    div.innerHTML = "";
    div.classList.add("hidden");
}

function closeModalDitails () {
    let div = document.querySelector(".minieventcard");
    document.querySelector(".minieventcard").innerHTML = "";
}

// Functions to display options to end date and remind time
var checkboxEndDate = document.getElementById("endate")
var count = 0;
checkboxEndDate.addEventListener("click", displayEndDate);
function displayEndDate () {
    var divcontainerenddate = document.getElementById("divcontainerenddate");
    if (count % 2 == 0) {
        divcontainerenddate.classList.remove("hidden");
        count++
    } else {
        divcontainerenddate.classList.add("hidden");
        count++
    };
};

var checkboxRemind = document.getElementById("remind");
var index = 0;
checkboxRemind.addEventListener("click", displayRemind);
function displayRemind () {
    var divcontainerremind = document.getElementById("divcontainerremind");
    if (index % 2 == 0) {
        divcontainerremind.classList.remove("hidden");
        index++
    } else {
        divcontainerremind.classList.add("hidden");
        index++
    };
};

getEventsPendentToExpire();

