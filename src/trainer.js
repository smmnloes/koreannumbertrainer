const DEFAULT_FROM = 1n
const DEFAULT_TO = 99n

const MIN_VALUE = 1n
const MAX_VALUE_CHINESE_SYSTEM = 9999999999999999999n
const MAX_VALUE_KOREAN_SYSTEM = 99n

function getVisibleDisplay () {
  return document.querySelector('#visibleDisplay span')
}

function getHiddenDisplay () {
  return document.querySelector('#hiddenDisplay span')
}

function hideAnswer () {
  getHiddenDisplay().setAttribute('style', 'background-color: black')
}

function showAnswer () {
  getHiddenDisplay().setAttribute('style', 'background-color: white')
}

function setDisplays (visibleValue, hiddenValue) {
  getVisibleDisplay().innerHTML = visibleValue
  getHiddenDisplay().innerHTML = hiddenValue
  hideAnswer()
}

function getShowNumberWrittenOption () {
  return document.querySelector('#showWritten').checked
}

function getShowWeekdayEnglishOption () {
  return document.querySelector('#showWeekdayEnglish').checked
}

function getShowTimeWrittenOption () {
  return document.querySelector('#showTimeWritten').checked
}

const getBigintFromString = (stringValue) => {
  if (!stringValue) {
    return null
  }
  try {
    return BigInt(stringValue)
  } catch (e) {
    console.error(e, `Error during BigInt parsing of value ${stringValue}`)
    return null
  }
}

function getNumberFrom () {
  const numberFromInput = document.querySelector('#numberFromInput')
  const numberFromUserInput = getBigintFromString(numberFromInput.value)
  return numberFromUserInput === null ? DEFAULT_FROM : numberFromUserInput
}

function getNumberTo () {
  const numberToInput = document.querySelector('#numberToInput')
  const numberToUserInput = getBigintFromString(numberToInput.value)
  return numberToUserInput === null ? DEFAULT_TO : numberToUserInput
}

function newNumber () {
  const numberFrom = getNumberFrom()
  const numberTo = getNumberTo()
  const randomNumber = getRandomBetweenInclusive(numberFrom, numberTo)
  const koreanNumberSystem = document.querySelector('#koreanNumber').checked
  const showWritten = getShowNumberWrittenOption()
  try {
    const writtenNumber = koreanNumberSystem ? getNumberWrittenKorean(randomNumber) : getNumberWrittenChinese(randomNumber)
    showWritten ? setDisplays(writtenNumber, randomNumber) : setDisplays(randomNumber, writtenNumber)
  } catch (e) {
    setDisplays(e.message, '')
  }
}

function newTime () {
  const hours = getRandomBetweenInclusive(1n, 12n)
  const minutes = getRandomBetweenInclusive(0n, 59n)
  const written = getTimeWritten(hours, minutes)
  const digits = padNumber(hours, 2) + ':' + padNumber(minutes, 2)
  getShowTimeWrittenOption() ? setDisplays(written, digits) : setDisplays(digits, written)
}

export function getTimeWritten (hours, minutes) {
  let output = ''

  output += getNumberWrittenKorean(hours, true) + '시'

  if (minutes > 0) {
    output += ' ' + getNumberWrittenChinese(minutes) + '분'
  }
  return output
}

/**
 *
 * @param from (BigInt)
 * @param to (BigInt)
 * @returns random number
 */
function getRandomBetweenInclusive (from, to) {
  const range = to - from + 1n
  const bitsNeeded = range.toString(2).length
  let random

  do {
    random = BigInt('0b' + Array.from(
      window.crypto.getRandomValues(new Uint8Array(Math.ceil(bitsNeeded / 8)))
    ).map(b => b.toString(2).padStart(8, '0')).join('').slice(0, bitsNeeded))
  } while (random >= range)

  return from + random
}

const numbersWrittenKorean = {
  0: {
    normal: {
      0: '',
      1: '하나',
      2: '둘',
      3: '셋',
      4: '넷',
      5: '다섯',
      6: '여섯',
      7: '일곱',
      8: '여덟',
      9: '아홉'
    },
    abbreviated: {
      0: '',
      1: '한',
      2: '두',
      3: '세',
      4: '네',
      5: '다섯',
      6: '여섯',
      7: '일곱',
      8: '여덟',
      9: '아홉'
    }
  },
  1: {
    1: '열',
    2: '스물',
    3: '서른',
    4: '마흔',
    5: '쉰',
    6: '예순',
    7: '일흔',
    8: '여든',
    9: '아흔'
  }

}

export function getNumberWrittenKorean (number, useAbbreviated = false) {
  if (number > MAX_VALUE_KOREAN_SYSTEM || number < MIN_VALUE) {
    throw new Error('Error! Only numbers between 1 and 99 exist in the Korean system.')
  }
  const numberAsStringReversed = reverseString(number.toString())

  let output = ''
  output = numbersWrittenKorean[0][useAbbreviated ? 'abbreviated' : 'normal'][numberAsStringReversed.charAt(0)] + output
  if (numberAsStringReversed.charAt(1)) {
    output = numbersWrittenKorean[1][numberAsStringReversed.charAt(1)] + output
  }
  return output
}

const numbersWrittenChinese = {
  0: {
    0: '',
    1: '일',
    2: '이',
    3: '삼',
    4: '사',
    5: '오',
    6: '육',
    7: '칠',
    8: '팔',
    9: '구'
  },
  1: '십',
  2: '백',
  3: '천',
  4: '만',
  5: '십',
  6: '백',
  7: '천',
  8: '억',
  9: '십',
  10: '백',
  11: '천',
  12: '조',
  13: '십',
  14: '백',
  15: '천',
  16: '경',
  17: '십',
  18: '백',
  19: '천'
}

export function getNumberWrittenChinese (number) {
  if (number > MAX_VALUE_CHINESE_SYSTEM || number < MIN_VALUE) {
    throw new Error('Only numbers between 1 and 9999999999999999999 are supported.')
  }
  const numberAsStringReversed = reverseString(number.toString())

  let output = ''

  const currentChar = numberAsStringReversed.charAt(0)
  output = (currentChar > 0 ? numbersWrittenChinese[0][currentChar] : '') + output

  for (let i = 1; i < numberAsStringReversed.length; i++) {
    const currentChar = numberAsStringReversed.charAt(i)
    const isBreakPoint = [4, 8, 12, 16].includes(i)
    if (isBreakPoint) {
      output = ' ' + output
    }
    /// / 10^X-part, e.g. the 백 in 이백삼
    const new10XPart =
      (
        // If we are 0, then we don't want the 10^X part. (e.g. second digit in 100)
        currentChar > 0 ||
        // But if we have a break-point (e.g. 만 or 억), we need it even if it is zero: 10 0000 is 십만
        (isBreakPoint &&
          // But only if we did not also reach the next bigger break point and we have only zeros in the next
          // four digits:
          // 1 0000 0000 is 일억, no 만 here, but:  1 0010 0000 is 일억백만, here we need the 만
          nextFourDigitsHaveNonZero(i, numberAsStringReversed)))
        ? numbersWrittenChinese[i]
        : ''

    // Prepend new part
    output = new10XPart + output

    /// / Multiplier for the 10^X-part, e.g. the 이 in 이백십
    const new10XMultiplierPart = (currentChar > 1 ||
      // If we are at a special breakpoint and there are
      // non-zero values in the next 4 digits to the left, or
      // we are at the terminal digit and we are at a bigger breakpoint than 만,
      // we need the multiplier even if it is 1:
      //
      ([8, 12, 16].includes(i) && (numberAsStringReversed.length - 1 === i)) ||
      (isBreakPoint && nextFourDigitsHaveNonZero(i, numberAsStringReversed)))
      ? numbersWrittenChinese[0][currentChar]
      : ''

    output = new10XMultiplierPart + output
  }
  return output.trim()
}

/**
 * Checks if at least one of the next four digits adjacent left to index has a value other than 0
 * @param index
 * @param inputString
 * @returns {boolean}
 */
function nextFourDigitsHaveNonZero (index, inputString) {
  for (let j = index + 1; j <= index + 3; j++) {
    if (j < inputString.length && inputString.charAt(j) !== '0') {
      return true
    }
  }
  return false
}

function reverseString (str) {
  return str.split('').reverse().join('')
}

const weekDays = {
  Monday: '월요일',
  Tuesday: '화요일',
  Wednesday: '수요일',
  Thursday: '목요일',
  Friday: '금요일',
  Saturday: '토요일',
  Sunday: '일요일'
}

let lastWeekdayRandom

function newWeekDay () {
  let random
  do {
    random = getRandomBetweenInclusive(0n, 6n)
  }
  while (random === lastWeekdayRandom)

  lastWeekdayRandom = random
  const randomWeekDayEnglish = Object.keys(weekDays)[random]
  getShowWeekdayEnglishOption() ? setDisplays(randomWeekDayEnglish, weekDays[randomWeekDayEnglish]) : setDisplays(weekDays[randomWeekDayEnglish], randomWeekDayEnglish)
}

function padNumber (inputNumber, size) {
  let s = String(inputNumber)
  while (s.length < (size || 2)) {
    s = '0' + s
  }
  return s
}

document.getElementById('newNumberButton').addEventListener('click', newNumber)
document.getElementById('newTimeButton').addEventListener('click', newTime)
document.getElementById('newWeekDayButton').addEventListener('click', newWeekDay)
document.getElementById('hiddenDisplay').addEventListener('click', showAnswer)

const tabsAndControls = [
  [document.getElementById('numbersTab'), document.getElementById('numberControls')],
  [document.getElementById('weekdaysTab'), document.getElementById('weekdayControls')],
  [document.getElementById('timeTab'), document.getElementById('timeControls')]
]
const selectTab = (index) => {
  // reset classes
  tabsAndControls.forEach((tandc) => tandc.forEach(element => element.classList.remove('selected', 'left-neighbour-selected', 'right-neighbour-selected')))

  // reset display
  setDisplays('&nbsp;', '&nbsp;')
  showAnswer()

  const [tab, control] = tabsAndControls[index]
  tab.classList.add('selected')
  control.classList.add('selected')

  const leftNeighbour = tabsAndControls[index - 1]
  if (leftNeighbour) {
    leftNeighbour[0].classList.add('right-neighbour-selected')
  }
  const rightNeighbour = tabsAndControls[index + 1]
  if (rightNeighbour) {
    rightNeighbour[0].classList.add('left-neighbour-selected')
  }
}

tabsAndControls.forEach(([tab, control], index) => tab.addEventListener('click', () => selectTab(index)))
