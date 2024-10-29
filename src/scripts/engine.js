const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"), // Certifique-se de adicionar isso no HTML também
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
    },
    actions: {
        timerId: null,
        countDownTimerId: null,
    },
};

const paySound = (audioName) => {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
};

const countDown = () => {
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
};

const randomSquare = () => {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    const randomNumber = Math.floor(Math.random() * state.view.squares.length);
    const randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
};

const moveEnemy = () => {
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
};

const addListenerHitbox = () => {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                paySound("hit");
            } else {
                state.values.lives--;
                state.view.lives.textContent = `x${state.values.lives}`;
                if (state.values.lives <= 0) {
                    alert("Game Over! Você perdeu todas as vidas!");
                    clearInterval(state.actions.timerId);
                    clearInterval(state.actions.countDownTimerId);
                }
            }
        });
    });
};

const initialize = () => {
    addListenerHitbox();
    moveEnemy();
    state.actions.countDownTimerId = setInterval(countDown, 1000); // Inicia a contagem regressiva
};

initialize();
