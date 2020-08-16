const trainer = require("../src/trainer");


const simple = [
    {1: "하나"},
    {2: "둘"},
    {12: "열둘"},
    {30: "서른"}
];

describe('Test korean korean numbers', () => {
        it('Numbers < 10k', () => {
            simple.forEach(function (run) {
                expect(trainer.getNumberWrittenKorean(Object.keys(run)[0])).toEqual(Object.values(run)[0]);
            });
        })
    }
);