import {describe, it} from 'node:test'
import {getTimeWritten} from "../src/trainer.js";
import assert from "node:assert";


const simple = [
    {hours: 1, minutes: 0, expected: "한시"},
    {hours: 2, minutes: 5, expected: "두시 오분"},
    {hours: 12, minutes: 25, expected: "열두시 이십오분"},

];

describe('Test korean time', () => {
        it('Simple stuff', () => {
            simple.forEach(function (run) {
                assert.equal(getTimeWritten(run.hours, run.minutes), run.expected);
            });
        })
    }
);