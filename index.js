// Creating necessary const

const start = document.querySelector("#start");
const colorsbtn = document.querySelectorAll("#colors td");
const table = document.querySelector("#game-part tbody");
const tryButton = document.querySelector(".btn-try");
const loadingMessage = document.querySelector(".loaded");
const resetBtn = document.querySelector(".btn-reset");
const chrono = document.querySelector("#chronotime");
const resultPart = document.querySelector("#leader-board ul");
const winMessage = document.querySelector("#game .win");
const loseMessage = document.querySelector("#game .lose");
const playAgainBtnWin = document.querySelector(".play-again-win");
const playAgainBtnLose = document.querySelector(".play-again-lose");
const goToScoresBtn = document.querySelector(".go-to-scores");
const difficultySlider = document.querySelector(".difficulty");
const arrowLeft = document.querySelector("#difficulty .left");
const arrowRight = document.querySelector("#difficulty .right");
const colors = [
	"blue",
	"green",
	"yellow",
	"purple",
	"red",
	"orange",
	"pink",
	"dark-blue",
];

// STEP 1 --> Loading a random secret code when clicking on the button start

tryButton.disabled = true;
let begin = "No";
let secretCode = [];
function loadSecretCode() {
	secretCode = [...colors];
	for (var i = 4; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = secretCode[i];
		secretCode[i] = secretCode[j];
		secretCode[j] = temp;
	}
	begin = "Yes";
	secretCode.splice(1, colors.length-difficultyLength);
	console.log(secretCode);
	loadingMessage.innerText = "Let's play, the secret code has been loaded!";
	start.disabled = true;
	tryButton.disabled = false;
	start.classList.remove("heartbeat");
	return secretCode;
}

start.addEventListener("click", loadSecretCode);

// STEP 2 --> Loading the basic of the game

// Incremental Try Btn which will determine where to look at in the table

var tryBtn = 1;
function increTry() {
	tryBtn = 1;
	lines.forEach(function (line) {
		if (line.classList.contains("full")) {
			tryBtn++;
			losePopup();
			return tryBtn;
		} else;
	});
}

// EventListener resulting from the tryButton

tryButton.addEventListener("click", addFull);
tryButton.addEventListener("click", increTry);
tryButton.addEventListener("click", checkResult);
tryButton.addEventListener("click", hint);

// Function which will check if the result has been found
let result = { name: "", trials: "", time: "" };
let results = [];

function checkResult() {
	let roundArrayString = roundArray.toString();
	let secretCodeString = secretCode.toString();
	if (roundArrayString == secretCodeString) {
		result.name = "Patrick";
		result.trials = tryBtn - 1;
		result.time = `${hours}:${minutes}:${secondes}`;
		results.push({ ...result });
		results.sort(compare);
		winMessage.classList.toggle("show");
		return result;
	} else {
		arr.push(roundArray);
		roundArray = [];
	}
}

function compare(a, b) {
	const trialA = a.trials;
	const trialB = b.trials;

	let comparison = 0;
	if (trialA > trialB) {
		comparison = 1;
	} else if (trialA < trialB) {
		comparison = -1;
	}
	return comparison;
}

// Modifying the colors and the class of the lines when colors are clicked on

var arr = [];
let roundArray = [];
function addColor(evt) {
	if (begin == "Yes") {
		for (let i = 1; i < difficultyLength + 1; i++) {
			if (lines[lines.length - tryBtn].children[i].classList.contains("full")) {
				continue;
			} else {
				let word = evt.target.classList.value;
				let index = word.indexOf(" ");
				var wordModified = word.substring(0, index);
				lines[lines.length - tryBtn].children[i].classList.add(
					wordModified,
					"full"
				);
			}
			roundArray.push(wordModified);
			break;
		}
	}
	return roundArray;
}

// Checking if the all the cells have a "full" class and if it's the case adding it to the line itself and targeting the previous line by removing the "to-be-done" classe

function addFull() {
	let counting = 0;
	for (let i = 1; i < difficultyLength + 1; i++) {
		if (lines[lines.length - tryBtn].children[i].classList.contains("full")) {
			counting++;
		}
		if (counting == difficultyLength) {
			lines[lines.length - tryBtn].classList.add("full");
			lines[lines.length - tryBtn - 1].classList.remove("to-be-done");
		}
	}
}

// EventListener calling the addColor when clicking on one of the colors at the bottom

colorsbtn.forEach((colorBtn) => colorBtn.addEventListener("click", addColor));

// Function which will reset the HTML text of the table

function resetTable() {
	lines.forEach(function (line) {
		line.classList.remove("full");
		line.classList.add("to-be-done");
		for (let i = 1; i < difficultyLength + 1; i++) {
			line.children[i].classList.remove(
				"full",
				"blue",
				"green",
				"yellow",
				"purple",
				"dark-blue",
				"red",
				"pink",
				"orange"
			);
		}
	});
	hintPart.forEach((Text) => (Text.innerHTML = ""));
	lines[lines.length - 1].classList.remove("to-be-done");
	roundArray = [];
	arr = [];
	tryBtn = 1;
}

// EventListener of the reset button

resetBtn.addEventListener("click", loadSecretCode);
resetBtn.addEventListener("click", resetTable);

// Hint

function hint() {
	hintPart.forEach((Text) => (Text.innerHTML = ""));
	for (let i = 0; i < arr.length; i++) {
		console.log(i);
		console.log(hintPart.length);
		for (let j = 0; j < arr[i].length; j++) {
			if (arr[i][j] == secretCode[j]) {
				hintPart[
					hintPart.length - i - 1
				].innerHTML += `<img src="./sources/whiteround.png" alt="">`;
				continue;
			} else if (secretCode.includes(arr[i][j])) {
				hintPart[
					hintPart.length - i - 1
				].innerHTML += `<img class="black" src="./sources/blackround.png" alt="">`;
				continue;
			}
		} 
	}
}

let size = 35;
let columns = Array.from(document.getElementsByClassName("column"));
let d, c;
let classList = ["visible", "close", "far", "far", "distant", "distant"];
let use24HourClock = true;

function padClock(p, n) {
	return p + ("0" + n).slice(-2);
}

function getClock() {
	d = new Date();
	return [
		use24HourClock ? d.getHours() : d.getHours() % 12 || 12,
		d.getMinutes(),
		d.getSeconds(),
	].reduce(padClock, "");
}

function getClass(n, i2) {
	return (
		classList.find((class_, classIndex) => Math.abs(n - i2) === classIndex) ||
		""
	);
}

let hours = 0;
let minutes = 0;
let secondes = 0;
let timeFull = "";
var timeCounting = 0;
let intervalId = 0;
function timeCountingFunction() {
	intervalId = setInterval(() => {
		timeCounting++;
		timeCounting !== 0
			? (hours = Math.floor(timeCounting / 3600))
			: (minutes = 0);
		timeCounting !== 0
			? (minutes = Math.floor((timeCounting % 3600) / 60))
			: (minutes = 0);
		timeCounting !== 0
			? (secondes = Math.floor(timeCounting % 60))
			: (secondes = 0);
		hours >= 10 ? (hours = hours.toString()) : (hours = "0" + hours.toString());
		minutes >= 10
			? (minutes = minutes.toString())
			: (minutes = "0" + minutes.toString());
		secondes >= 10
			? (secondes = secondes.toString())
			: (secondes = "0" + secondes.toString());
		timeFull = hours + minutes + secondes;
		return timeFull;
	}, 1000);
}

let intervalIdTwo = 0;
function letsGo() {
	intervalIdTwo = setInterval(() => {
		c = timeFull.toString();
		columns.forEach((ele, i) => {
			let n = +c[i];
			let offset = -n * size;
			ele.style.transform = `translateY(calc(50vh + ${offset}px - ${
				size / 2
			}px))`;
			Array.from(ele.children).forEach((ele2, i2) => {
				ele2.className = "num " + getClass(n, i2);
			});
		});
	}, 1000 + Math.E * 10);
}

function resetTime() {
	timeCounting = 0;
	c = getClock() - getClock();
}

start.addEventListener("click", letsGo);
start.addEventListener("click", timeCountingFunction);
resetBtn.addEventListener("click", resetTime);

function loadScores() {
	resultPart.innerHTML = "";
	for (let i = 0; i < results.length; i++) {
		resultPart.innerHTML += `<li> #${i + 1}  ==>   ${results[i].name} with ${
			results[i].trials
		} trials in ${results[i].time} </li>`;
	}
}

tryButton.addEventListener("click", loadScores);

const popup = document.querySelector("#myPopup");
const questionMark = document.querySelector(".popup img");
function showHelp() {
	popup.classList.toggle("show");
}

questionMark.addEventListener("click", showHelp);

function restartGameWin() {
	winMessage.classList.toggle("show");
	resetTime();
	loadSecretCode();
	resetTable();
}

function restartGameLose() {
	loseMessage.classList.toggle("show");
	resetTime();
	loadSecretCode();
	resetTable();
}

playAgainBtnWin.addEventListener("click", restartGameWin);
playAgainBtnLose.addEventListener("click", restartGameLose);

function losePopup() {
	if (tryBtn == 11) {
		loseMessage.classList.toggle("show");
	}
}

// Difficulty function

const difficulty = ["Easy", "Medium", "Hard"];
var difficultyLength = 4;

function higherDifficulty() {
	if (difficultySlider.innerText == `${difficulty[0]}`) {
		difficultySlider.innerText = `${difficulty[1]}`;
		difficultyLength = 5;
	} else if (difficultySlider.innerText == `${difficulty[1]}`) {
		difficultySlider.innerText = `${difficulty[2]}`;
		difficultyLength = 6;
	}
}

function lowerDifficulty() {
	if (difficultySlider.innerText == `${difficulty[1]}`) {
		difficultySlider.innerText = `${difficulty[0]}`;
		difficultyLength = 4;
	} else if (difficultySlider.innerText == `${difficulty[2]}`) {
		difficultySlider.innerText = `${difficulty[1]}`;
		difficultyLength = 5;
	}
}

function addEasy() {
	difficultySlider.innerText = `${difficulty[0]}`;
}

window.addEventListener("load", addEasy);
arrowLeft.addEventListener("click", lowerDifficulty);
arrowRight.addEventListener("click", higherDifficulty);

var lines = "";
var hintPart = "";
function tableDifficulty() {
	table.innerHTML = "";
	if (difficultySlider.innerText == `${difficulty[0]}`) {
		for (let i = 10; i > 1; i--) {
			table.innerHTML += `<tr class="to-be-done">
			<td class="line">${i}</td>
			<td class="color"></td>
			<td class="color"></td>
			<td class="color"></td>
			<td class="color"></td>
			<td class="hint"></td>
		</tr>`;
		}
		table.innerHTML += `<tr>
		<td class="line">1</td>
		<td class="color"></td>
		<td class="color"></td>
		<td class="color"></td>
		<td class="color"></td>
		<td class="hint"></td>
	</tr>`;
	} else if (difficultySlider.innerText == `${difficulty[1]}`) {
		for (let i = 10; i > 1; i--) {
			table.innerHTML += `<tr class="to-be-done">
			<td class="line">${i}</td>
			<td class="color"></td>
			<td class="color"></td>
			<td class="color"></td>
			<td class="color"></td>
			<td class="color"></td>
			<td class="hint"></td>
		</tr>`;
		}
		table.innerHTML += `<tr>
		<td class="line">1</td>
		<td class="color"></td>
		<td class="color"></td>
		<td class="color"></td>
		<td class="color"></td>
		<td class="color"></td>
		<td class="hint"></td>
	</tr>`;
	} else if (difficultySlider.innerText == `${difficulty[2]}`) {
		for (let i = 10; i > 1; i--) {
			table.innerHTML += `<tr class="to-be-done">
			<td class="line">${i}</td>
			<td class="color"></td>
			<td class="color"></td>
			<td class="color"></td>
			<td class="color"></td>
			<td class="color"></td>
			<td class="color"></td>
			<td class="hint"></td>
		</tr>`;
		}
		table.innerHTML += `<tr>
		<td class="line">1</td>
		<td class="color"></td>
		<td class="color"></td>
		<td class="color"></td>
		<td class="color"></td>
		<td class="color"></td>
		<td class="color"></td>
		<td class="hint"></td>
	</tr>`;
	}
lines = document.querySelectorAll("#table-game tr");
hintPart = document.querySelectorAll(".hint");
return (lines, hintPart);
}

window.addEventListener("load", tableDifficulty);
arrowLeft.addEventListener("click", tableDifficulty);
arrowRight.addEventListener("click", tableDifficulty);

