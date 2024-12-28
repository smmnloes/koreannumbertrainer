import {getNumberWrittenChinese} from "../src/trainer.js";
import {describe, it} from "node:test";
import assert from "node:assert";


const smallerThan10k = [
    {1: "일"},
    {5: "오"},
    {10: "십"},
    {11: "십일"},
    {20: "이십"},
    {100: "백"},
    {101: "백일"},
    {300: "삼백"},
    {311: "삼백십일"}
];

const tenKAndAbove = [
    {10000: "만"},
    {20000: "이만"},
    {11000: "만 천"},
    {110000: "십일만"},
    {110001: "십일만 일"},
    {1000000: "백만"},
    {10000000: "천만"}
];

const oneMillionAndAbove = [
    {100000000: "일억"},
    {100010000: "일억 만"},
    {200000000: "이억"},
    {1100000000: "십일억"},
    {1101100000: "십일억 백십만"},
];

const oneBillionAndAbove = [
    {1000000000000: "일조"},
    {11000000000000: "십일조"},
    {11001000100000: "십일조 십억 십만"},
    {9000000000000: "구조"},

];

const oneTrillionAndAbove = [
    {10000000000000000: "일경"},
    {110000000000000000: "십일경"},
    {110010001000000000: "십일경 십조 십억"},
    {90000000000000000: "구경"},

];
describe('Test chinese korean numbers', () => {
        it('Numbers < 10k', () => {
            smallerThan10k.forEach(function (run) {
                assert.equal(getNumberWrittenChinese(Object.keys(run)[0]), Object.values(run)[0])
            });
        });
        it('Numbers >= 10k', () => {
            tenKAndAbove.forEach(function (run) {
                assert.equal(getNumberWrittenChinese(Object.keys(run)[0]), Object.values(run)[0])
            });
        });

        it('Numbers >= 1Mio', () => {
            oneMillionAndAbove.forEach(function (run) {
                assert.equal(getNumberWrittenChinese(Object.keys(run)[0]), Object.values(run)[0]);
            });
        });

        it('Numbers >= 1Bill', () => {
            oneBillionAndAbove.forEach(function (run) {
                assert.equal(getNumberWrittenChinese(Object.keys(run)[0]), Object.values(run)[0]);
            });
        });

        it('Numbers >= 1Trill', () => {
            oneTrillionAndAbove.forEach(function (run) {
                assert.equal(getNumberWrittenChinese(Object.keys(run)[0]), Object.values(run)[0]);
            });
        })
    }
);