STANDARD_FROM = 0
STANDARD_TO = 100


function getDisplaySpan() {
    return document.querySelector('#display span');
}

function getAdditionalDisplay() {
    return document.querySelector('#additionalDisplay span');
}

function newNumber() {
    let displaySpan = getDisplaySpan();
    let numberFromInput = document.querySelector('#numberFromInput');
    let numberToInput = document.querySelector('#numberToInput');
    let additionaldisplay = getAdditionalDisplay();

    let numberFromUserInput = Number.parseInt(numberFromInput.value);
    let numberFrom = isNaN(numberFromUserInput) ? STANDARD_FROM : numberFromUserInput;
    let numberToUserInput = Number.parseInt(numberToInput.value);
    let numberTo = isNaN(numberToUserInput) ? STANDARD_TO : numberToUserInput;
    displaySpan.innerHTML = Math.floor(numberFrom + (Math.random() * (numberTo - numberFrom + 1)));
    additionaldisplay.innerHTML = Math.random() > 0.5 ? "Chinesisch!" : "Koreanisch!";
}

function getWeekDays() {
    return {
        "Montag": "월요일",
        "Dienstag": "화요일",
        "Mittwoch": "수요일",
        "Donnerstag": "목요일",
        "Freitag": "금요일",
        "Samstag": "토요일",
        "Sonntag": "일요일"
    };
}

function newWeekDay() {
    let additionaldisplay = getAdditionalDisplay();
    let displaySpan = getDisplaySpan();
    let weekdays = getWeekDays();
    let random = Math.floor(Math.random() * 7);
    let randomWeekDayGerman = Object.keys(weekdays)[random];
    displaySpan.innerHTML = randomWeekDayGerman;
    additionaldisplay.innerHTML = weekdays[randomWeekDayGerman];
    hideWeekDayAnswer();
}

function hideWeekDayAnswer() {
    getAdditionalDisplay().setAttribute('style', 'background-color: black')
}

function showWeekDayAnswer() {
    getAdditionalDisplay().setAttribute('style', 'background-color: white')
}