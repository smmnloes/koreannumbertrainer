import {getNumberWrittenKorean} from "../src/trainer.js";
import {describe, it} from "node:test";
import assert from "node:assert";

const simple = [
    {1: "하나"},
    {2: "둘"},
    {12: "열둘"},
    {30: "서른"}
];

describe('Test korean korean numbers', () => {
        it('Numbers < 10k', () => {
            simple.forEach(function (run) {
                assert.equal(getNumberWrittenKorean(Object.keys(run)[0]), Object.values(run)[0]);
            });
        })
    }
);