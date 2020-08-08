STANDARD_FROM = 0
STANDARD_TO = 100


function getDisplaySpan() {
    return document.querySelector('#display span');
}

function getanswerDisplay() {
    return document.querySelector('#answerDisplay span');
}

function newNumber() {
    let displaySpan = getDisplaySpan();
    let numberFromInput = document.querySelector('#numberFromInput');
    let numberToInput = document.querySelector('#numberToInput');
    let answerDisplay = getanswerDisplay();

    let numberFromUserInput = Number.parseInt(numberFromInput.value);
    let numberFrom = isNaN(numberFromUserInput) ? STANDARD_FROM : numberFromUserInput;
    let numberToUserInput = Number.parseInt(numberToInput.value);
    let numberTo = isNaN(numberToUserInput) ? STANDARD_TO : numberToUserInput;
    let randomNumber = Math.floor(numberFrom + (Math.random() * (numberTo - numberFrom + 1)));
    displaySpan.innerHTML = randomNumber;
    let isKoreanNumber = document.querySelector('#koreanNumber').checked;
    try {
        answerDisplay.innerHTML = isKoreanNumber ? getNumberWrittenKorean(randomNumber) : getNumberWrittenChinese(randomNumber);
        hideAnswer();
    } catch (e) {
        answerDisplay.innerHTML = e.message;
    }
}

const numbersWrittenKorean = {
    0: {
        "0": "",
        "1": "하나",
        "2": "둘",
        "3": "셋",
        "4": "넷",
        "5": "다섯",
        "6": "여섯",
        "7": "일곱",
        "8": "여덟",
        "9": "아홉",
    },
    1: {
        "1": "열",
        "2": "스물",
        "3": "서른",
        "4": "마흔",
        "5": "쉰",
        "6": "예순",
        "7": "일흔",
        "8": "여든",
        "9": "아흔"
    }

};


const numbersWrittenChinese = {
    0: {
        "0": "",
        "1": "일",
        "2": "이",
        "3": "삼",
        "4": "사",
        "5": "오",
        "6": "육",
        "7": "칠",
        "8": "팔",
        "9": "구"
    },
    1: "십",
    2: "백",
    3: "천"
};


function getNumberWrittenKorean(number) {
    if (number > 99) {
        throw new Error("Fehler! Nur Zahlen < 99 im Koreanischen System.");
    }
    const numberAsStringReversed = reverseString(number.toString());

    var output = "";
    for (i = 0; i < numberAsStringReversed.length; i++) {
        output = numbersWrittenKorean[i][numberAsStringReversed.charAt(i)] + output;
    }

    return output;

}

function getNumberWrittenChinese(number) {
    const numberAsStringReversed = reverseString(number.toString());

    var output = "";

    let currentChar = numberAsStringReversed.charAt(0);
    output = (currentChar > 0 ? numbersWrittenChinese[0][currentChar] : "") + output;

    for (i = 1; i < numberAsStringReversed.length; i++) {
        let currentChar = numberAsStringReversed.charAt(i);
        output = (currentChar > 0 ? numbersWrittenChinese[i] : "") + output;
        output = (currentChar > 1 ? numbersWrittenChinese[0][currentChar] : "") + output;
    }
    return output;
}


function reverseString(str) {
    return str.split("").reverse().join("");
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
    let answerDisplay = getanswerDisplay();
    let displaySpan = getDisplaySpan();
    let weekdays = getWeekDays();
    let random = Math.floor(Math.random() * 7);
    let randomWeekDayGerman = Object.keys(weekdays)[random];
    displaySpan.innerHTML = randomWeekDayGerman;
    answerDisplay.innerHTML = weekdays[randomWeekDayGerman];
    hideAnswer();
}

function hideAnswer() {
    getanswerDisplay().setAttribute('style', 'background-color: black')
}

function showAnswer() {
    getanswerDisplay().setAttribute('style', 'background-color: white')
}