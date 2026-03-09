const DISPLAY = document.getElementById("display");

const ALL_CLEAR = document.getElementById("allClear");
const ENTRY_CLEAR = document.getElementById("entryClear");

const PLUS = document.getElementById("plus");
const MINUS = document.getElementById("minus");
const MULTIPLY = document.getElementById("multiply");
const DIVIDE = document.getElementById("divide");
const RESULT = document.getElementById("result");

const ZERO = document.getElementById("zero");
const ONE = document.getElementById("one");
const TWO = document.getElementById("two");
const THREE = document.getElementById("three");
const FOUR = document.getElementById("four");
const FIVE = document.getElementById("five");
const SIX = document.getElementById("six");
const SEVEN = document.getElementById("seven");
const EIGHT = document.getElementById("eight");
const NINE = document.getElementById("nine");

const NEGATIVE = document.getElementById("negative");
const POINT = document.getElementById("point");

const RECIPROCAL = document.getElementById("reciprocal");
const SQUARED = document.getElementById("squared");
const SQRT = document.getElementById("sqrt");

const OPERATOR_AREA = document.querySelectorAll(".operatorArea button");
const NUMBER_AREA = document.querySelectorAll(".numberArea button");
const CLEAR_AREA = document.querySelectorAll(".clearArea button");
const EXTRA_OPERATOR_AREA = document.querySelectorAll(".extra_operatorArea button");

let operator = "";
let result = 0;
let resultIndex = false;
let readonly = false;
let block_operator = false;

ALL_CLEAR.addEventListener("click", function() {
    operator = "";
    result = 0;
    resultIndex = false;
    readonly = false;
    DISPLAY.textContent = "";
})

ENTRY_CLEAR.addEventListener("click", function() {
    if (!resultIndex && !readonly) {
        DISPLAY.textContent = "";
    }
})

OPERATOR_AREA.forEach(btn => {
    btn.onclick = () => {
        if (DISPLAY.textContent !== "" && !block_operator) {
            if (btn.value !== RESULT.value) {
                if (operator == "") {
                    operator = btn.value;
                    result = Number(DISPLAY.textContent);
                    DISPLAY.textContent = "";
                }
                else {
                    calculation();
                    DISPLAY.textContent = String(result);
                    operator = btn.value;
                    resultIndex = true;
                    block_operator = true;
                }
            }
            else if (operator !== "") {
                calculation();
                DISPLAY.textContent = String(result);
                operator = "";
                resultIndex = true; 
                readonly = true; 
            }
        }
    }
});

NUMBER_AREA.forEach(btn => {
    if (Number(btn.value) >= Number(ONE.value) && Number(btn.value) <= Number(NINE.value)) {
        btn.onclick = () => {
            if (readonly && DISPLAY.textContent !== "") {
                return;
            }
            if (readonly) {
                readonly = false;
            }
            if (block_operator) {
                block_operator = false;
            }
            if (resultIndex) {
                DISPLAY.textContent = "";
                resultIndex = false;
            }
            DISPLAY.textContent += btn.value;
        }
    }
});

ZERO.addEventListener("click", function() {
    if (!resultIndex) {
        if (DISPLAY.textContent !== "") {
            DISPLAY.textContent += ZERO.value;
        }
    };
});

NEGATIVE.addEventListener("click", function() {
    if (DISPLAY.textContent !== "" && !resultIndex) {
        if (DISPLAY.textContent.startsWith(NEGATIVE.value)) {
            DISPLAY.textContent = DISPLAY.textContent.slice(1);
        }   
        else {
        DISPLAY.textContent = NEGATIVE.value + DISPLAY.textContent;
        }
    };   
});

POINT.addEventListener("click", function() {
    if (readonly && DISPLAY.textContent !== "") {
        return;
    }
    if (readonly) {
        readonly = false;
    }
    if (block_operator) {
        block_operator = false;
    }
    if (resultIndex) {
        DISPLAY.textContent = "";
        resultIndex = false;
    }
    if (!DISPLAY.textContent.includes(POINT.value)) {
        if (DISPLAY.textContent !== "") {
            DISPLAY.textContent += POINT.value;
        }
        else {
            DISPLAY.textContent += ZERO.value + POINT.value;
            block_operator = true;
        }
    }
});

EXTRA_OPERATOR_AREA.forEach(btn => {
    btn.onclick = () => {
        if (DISPLAY.textContent !== "") {
            operator = btn.value;
            calculation();
            DISPLAY.textContent = String(result);
            operator = "";
            resultIndex = true;
            readonly = true;
        }
    }
})

function calculation() {
    if (operator == PLUS.value) {result += Number(DISPLAY.textContent)};
    if (operator == MINUS.value) {result -= Number(DISPLAY.textContent)};
    if (operator == MULTIPLY.value) {result *= Number(DISPLAY.textContent)};
    if (operator == DIVIDE.value) {result /= Number(DISPLAY.textContent)}; 
    if (operator == RECIPROCAL.value) {result = (1 / Number(DISPLAY.textContent))}; 
    if (operator == SQUARED.value) {result = (Number(DISPLAY.textContent) ** 2)};
    if (operator == SQRT.value) {result = Math.sqrt(Number(DISPLAY.textContent))};
}

