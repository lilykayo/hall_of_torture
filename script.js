document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('content');
    const textContainer = document.getElementById('textContainer');
    const equationContainer = document.getElementById('equationContainer');
    const equation = document.getElementById('equation');
    const answerInput = document.getElementById('answerInput');
    const submitAnswer = document.getElementById('submitAnswer');
    const numberInputContainer = document.getElementById('numberInputContainer');
    const numberInput = document.getElementById('numberInput');
    const submitNumber = document.getElementById('submitNumber');
    const randomGifContainer = document.getElementById('randomGifContainer');
    const backgroundAudio = document.getElementById('background-audio');
	const kayoText = document.getElementById('kayoText');
	const kayoGif = document.getElementById('kayoGifPlay');
	
	window.randomGif = 0;
	window.answer = null;
	
	const texts = [
		"...",
		"Hullo hullo?",
		"If you read these messages...",
		"You forgot when my bday is",
		"Or you're here to make fun of<br>these ppl",
		"Yes, yes, they are laughable",
		"Anyhow no worries pal dude bud",
		"Kayo got this",
		"Just solve a <span class='small-text'>tiny</span> equation",
		"And you'll be prompted for<br>a guess!",
		"Kayo's nice, she'll help you<br>by saying higher or lower",
		"AND SET SOUND ON<br>I LOVE THAT MUSIC",
		"Welcome to hall of torture!"
	];
		
    const gifs = ["gif1.gif", "gif2.gif", "gif3.gif", "gif4.gif", "gif5.gif", "gif6.gif"]; // Add paths to your GIFs
    let currentTextIndex = 0;

    playButton.addEventListener('click', () => {
        playSoundEffect("intro");
        setTimeout(() => {
            backgroundAudio.play();
		});

        overlay.style.display = 'none';
        content.style.display = 'block';
        textContainer.innerHTML = texts[currentTextIndex];
        setTimeout(() => {
			document.body.addEventListener('click', handleTextClick);
        }, 100);
    });

    function handleTextClick() {
        currentTextIndex++;
		if (currentTextIndex == 1) playSoundEffect("hullo");
        if (currentTextIndex < texts.length) {
            textContainer.innerHTML = texts[currentTextIndex];
        } else {
            document.body.removeEventListener('click', handleTextClick);
            textContainer.style.display = 'none';
            equationContainer.style.display = 'block';
            showEquation();
        }
    }

    function playSoundEffect(audio) {
        const sound = new Audio('audio/' + audio + '.mp3');
        sound.play();
    }

	function showEquation() {
		equationContainer.style.display = 'block';
		numberInputContainer.style.display = 'none';

		let x = Math.floor(Math.random() * 6) + 4; // Random x value between 4 and 9
		let a = Math.floor(Math.random() * 10) + 1;
		let b = Math.floor(Math.random() * 10) + 1;
		equation.textContent = `${a}x + ${b} = ${a * x + b}`;

		// Remove previous event listener before adding a new one
		submitAnswer.onclick = null;
		window.answer = x;
		submitAnswer.onclick = () => checkAnswer(); // Pass the correct x value

		// Remove previous keydown event listener before adding a new one
		answerInput.removeEventListener('keydown', handleEnterKey);
		answerInput.addEventListener('keydown', handleEnterKey); // Do not pass x here

		function handleEnterKey(event) {
			if (event.key === 'Enter') {
				checkAnswer();
			}
		}
	}



	function checkAnswer() {
		const answer = parseInt(answerInput.value);
		if (Number.isNaN(answer)) return;
		answerInput.value = "";

		console.log("Check", answer, window.answer);
		if (answer === window.answer) {
			playSoundEffect("answer_box");
			equationContainer.style.display = 'none';
			numberInputContainer.style.display = 'block';
		} else {
			playSoundEffect("wrong");
			answerInput.classList.add('shake');
			setTimeout(() => {
				answerInput.classList.remove('shake');
			}, 500);
		}
	}


	function showRandomGif() {
		randomGifContainer.innerHTML = `<img src="gif/${gifs[parseInt(window.randomGif)]}" alt="Random GIF" class="random-gif">`;
		console.log(`<img src="gif/${gifs[parseInt(window.randomGif)]}" alt="Random GIF" class="random-gif">`);
		window.randomGif += 1;
		if (randomGif === gifs.length) randomGif = 0;
	}
	
	function animateText(textToShow) {
		kayoText.innerText = textToShow;
		kayoText.classList.add('animate');
		kayoText.style.display = "block";

		kayoText.addEventListener('animationend', () => {
			kayoText.classList.remove('animate');
			kayoText.style.display = "none";
			// Reset position after animation
			kayoText.style.transform = 'translate(0, 0)';
			kayoText.style.opacity = 1;
		}, { once: true });
		
		playSoundEffect("wrong");
		showEquation();
		showRandomGif();
	}

    submitNumber.addEventListener('click', checkNumber);
	numberInput.addEventListener('keydown', (event) => handleEnterKey(event)); // Pass the correct x value

    function checkNumber() {
        const number = parseInt(numberInput.value);
		console.log(number);
        if (number === 21) {
			kayoGif.src = `pictures/kayo_shocked.jpg`;
			kayoGif.style.width = "100px";
			playSoundEffect("success");
			backgroundAudio.pause();
            numberInputContainer.innerHTML = '<h1>July 21th!!</h1>';
        }
        else if (number === 420) {
			animateText("Ah, a man of culture.");
        }
        else if (number === 69) {
			animateText("Gross.");
        }
        else if (!(number > 0 && number < 32)){
			animateText("Idiot.");
		}
		else if (number < 21) {
			animateText("It's higher...");
        }
		else {
			animateText("It's lower...");
        }
    }
});
