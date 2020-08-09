DEFAULT_FROM = 0;
DEFAULT_TO = 100;


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
    let numberFrom = isNaN(numberFromUserInput) ? DEFAULT_FROM : numberFromUserInput;
    let numberToUserInput = Number.parseInt(numberToInput.value);
    let numberTo = isNaN(numberToUserInput) ? DEFAULT_TO : numberToUserInput;
    let randomNumber = getRandomBetweenInclusive(numberFrom, numberTo);
    displaySpan.innerHTML = randomNumber;
    let isKoreanNumber = document.querySelector('#koreanNumber').checked;
    try {
        answerDisplay.innerHTML = isKoreanNumber ? getNumberWrittenKorean(randomNumber) : getNumberWrittenChinese(randomNumber);
        //hideAnswer();
    } catch (e) {
        answerDisplay.innerHTML = e.message;
        showAnswer();
    }
}

function newTime() {
    let displaySpan = getDisplaySpan();
    let answerDisplay = getanswerDisplay();

    let hours = getRandomBetweenInclusive(1, 12);
    let minutes = getRandomBetweenInclusive(0, 59);

    displaySpan.innerHTML = hours.pad(2) + " : " + minutes.pad(2);
    hideAnswer();
    answerDisplay.innerHTML = getNumberWrittenKorean(hours, true) + "시 " + getNumberWrittenChinese(minutes) + "분";
}

function getRandomBetweenInclusive(from, to) {
    return Math.floor(from + (Math.random() * (to - from + 1)));
}

const numbersWrittenKorean = {
    0: {
        "normal": {
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
        "abbreviated": {
            "0": "",
            "1": "한",
            "2": "두",
            "3": "세",
            "4": "네",
            "5": "다섯",
            "6": "여섯",
            "7": "일곱",
            "8": "여덟",
            "9": "아홉",
        }
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


function getNumberWrittenKorean(number, useAbbreviated = false) {
    if (number > 99) {
        throw new Error("Fehler! Nur Zahlen < 99 im Koreanischen System.");
    }
    const numberAsStringReversed = reverseString(number.toString());

    var output = "";
    output = numbersWrittenKorean[0][useAbbreviated ? "abbreviated" : "normal"][numberAsStringReversed.charAt(0)] + output;
    if (numberAsStringReversed.charAt(1)) {
        output = numbersWrittenKorean[1][numberAsStringReversed.charAt(1)] + output;
    }
    return output;

}


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
    3: "천",
    4: "만",
    5: "십",
    6: "백",
    7: "천",
    8: "억",
    9: "십",
    10: "백",
    11: "천",
    12: "조",
    13: "십",
    14: "백",
    15: "천",
    16: "경"
};


function getNumberWrittenChinese(number) {
    let numberAsString = number.toString();
    const numberAsStringReversed = reverseString(numberAsString);

    let output = "";

    let currentChar = numberAsStringReversed.charAt(0);
    output = (currentChar > 0 ? numbersWrittenChinese[0][currentChar] : "") + output;

    for (i = 1; i < numberAsStringReversed.length; i++) {
        let currentChar = numberAsStringReversed.charAt(i);

        output = ((currentChar > 0 ||
            ([4, 8, 12, 16].includes(i) &&
                (!nextFourDigitsAreZero(i, numberAsStringReversed)))) ? numbersWrittenChinese[i] : "") + output;


        output = ((currentChar > 1 || i === 8 || (i >= 4 && (i !== numberAsStringReversed.length - 1) && numberAsStringReversed.charAt(i + 1) !== "0")) ? numbersWrittenChinese[0][currentChar] : "") + output;
    }
    return output;
}

function nextFourDigitsAreZero(index, inputString) {
    for (j = index + 1; j <= index + 3; j++) {
        if (j < inputString.length && inputString.charAt(j) !== "0") {
            return false;
        }
    }
    return true;
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

let lastWeekdayRandom;

function newWeekDay() {
    let answerDisplay = getanswerDisplay();
    let displaySpan = getDisplaySpan();
    let weekdays = getWeekDays();

    let random;
    do {
        random = getRandomBetweenInclusive(0, 6);
    }
    while (random === lastWeekdayRandom);

    lastWeekdayRandom = random;

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

Number.prototype.pad = function (size) {
    let s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
};