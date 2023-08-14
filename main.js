// colors arrays
let mainBackground = ["hsl(222, 26%, 31%)", "hsl(0, 0%, 90%)", "hsl(268, 75%, 9%)"];
let toggleBackground = ["hsl(223, 31%, 20%)", "hsl(0, 5%, 81%)", "hsl(268, 71%, 12%)"]; //keypad
let screenBackground = ["hsl(224, 36%, 15%)", "hsl(0, 0%, 93%)", "hsl(268, 71%, 12%)"];
let blueKeyBackground = ["hsl(225, 21%, 49%)", "hsl(185, 42%, 37%)", "hsl(281, 89%, 26%)"];
let blueKeyShadow = ["hsl(224, 28%, 35%)", "hsl(185, 58%, 25%)", "hsl(285, 91%, 52%)"];
let redKeyBackground = ["hsl(6, 63%, 50%)", "hsl(25, 98%, 40%)", "hsl(176, 100%, 44%)"];
let redKeyShadow = ["hsl(6, 70%, 34%)", "hsl(25, 99%, 27%)", "hsl(177, 92%, 70%)"];
let orangeKeyBackground = ["hsl(30, 25%, 89%)", "hsl(45, 7%, 89%)", "hsl(268, 47%, 21%)"];
let orangeKeyShadow = ["hsl(28, 16%, 65%)", "hsl(35, 11%, 61%)", "hsl(290, 70%, 36%)"];
let textColor = ["hsl(221, 14%, 31%)", "hsl(60, 10%, 19%)", "hsl(52, 100%, 62%)"];
// set varibles

// for just stylling
let body = document.querySelector("body");
let h1 = document.querySelector("h1");
let themeBox = document.querySelector(".buttons");
let themeSpan = document.querySelector(".theme span");
let numberUp = Array.from(document.querySelectorAll(".buttons > div"));
let screens = document.querySelector(".output");
let screenSpan = document.querySelector(".output span");
let btnsBox = document.querySelector(".btns-box");
let orangeKeys = document.querySelectorAll(".num , .operator , .point");
let blueKeys = document.querySelectorAll(".del , .reset");
let redKeys = document.querySelector(".equal");


// changing themes

numberUp.forEach(function (ele, index) {
    ele.onclick = function () {
        numberUp.forEach(function (ele) {
            ele.classList.remove("choosen");
            if (!ele.classList.contains("not")) {
                ele.classList.add("not");
            }
        })
        ele.classList.remove("not");
        ele.classList.add("choosen");
        if (index !== 0) {
            h1.style.color = textColor[index];
            screenSpan.style.color = textColor[index];
            themeSpan.style.color = textColor[index];
        } else {
            h1.style.color = "white";
            themeSpan.style.color = "white";
            screenSpan.style.color = "white";
        }

        themeBox.style.backgroundColor = toggleBackground[index];
        body.style.backgroundColor = mainBackground[index];
        numberUp.forEach(function (ele) {
            if (index !== 0) {
                ele.style.color = textColor[index];
            }
            else {
                ele.style.color = "white";
            }
            ele.style.backgroundColor = redKeyBackground[index];
        })
        screens.style.backgroundColor = screenBackground[index];
        btnsBox.style.backgroundColor = toggleBackground[index];
        orangeKeys.forEach(function (ele) {
            ele.style.backgroundColor = orangeKeyBackground[index];
            ele.style.boxShadow = `inset -2px -6px 0 0 ${orangeKeyShadow[index]}`;
            ele.style.color = textColor[index];
        })
        blueKeys.forEach(function (ele) {
            ele.style.backgroundColor = blueKeyBackground[index];
            ele.style.boxShadow = `inset -2px -6px 0 0 ${blueKeyShadow[index]}`;

        })
        redKeys.style.backgroundColor = redKeyBackground[index];
        redKeys.style.boxShadow = `inset -2px -6px 0 0 ${redKeyShadow[index]}`;
        if (index === 2) {
            redKeys.style.color = "black";
        } else {
            redKeys.style.color = "white";
        }

    }
})

// setting variables for real work

let output = document.querySelector(".output span");
let writingBtns = document.querySelectorAll(".num  span, .point span, .operator span");
let result = document.querySelector(".equal span");
let deletes = document.querySelector(".del span");
let reset = document.querySelector(".reset span");
let str = "";
let calculated = false;

function clicked(ele) {
    ele.parentNode.style.transform = "scale(0.9)";
    let no = setInterval(function () {
        ele.parentNode.style.transform = "scale(1)";
        clearInterval(no);
    }, 100)
}

writingBtns.forEach(function (ele) {
    ele.parentNode.addEventListener("click", function () {
        clicked(ele);
        if (calculated) {
            output.innerHTML = "";
            str = "";
            calculated = false;
        }
        if (output.innerHTML.length < 13) {
            if (ele.innerHTML === "x") {
                str += "*";
                output.innerHTML += "x";
            } else {
                output.innerHTML += ele.innerHTML;
                str += ele.innerHTML;
            }
        }
    })
})


deletes.parentNode.onclick = function () {
    clicked(deletes);
    output.innerHTML = output.innerHTML.slice(0, output.innerHTML.length - 1);
    str = str.slice(0, str.length - 1)
}
reset.parentNode.onclick = function () {
    clicked(reset);
    output.innerHTML = "";
}
result.parentNode.onclick = function () {
    clicked(result);
    if (check(str)) {
        output.innerHTML = eval(str);
    } else {
        output.innerHTML = "error";
    }
    calculated = true;
}
function check(str) {
    if (+str[0] != str[0] || +str[str.length - 1] != str[str.length -1 ]) {
        return false;
    }
    for (let i = 1 ; i < str.length - 1; i++) {
        if ( +str[i] != str[i] && +str[i+1] != str[i+1]){
            return false 
        }
        if ( str[i] === "." && +str[i-1] != str[i-1]){
            return false 
        }
    }
    return true
}