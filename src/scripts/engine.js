const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        welcomeMessage: document.querySelector("#welcome-message"),
        startGameButton: document.querySelector("#start-game"),
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
        restartGame(); // Chama a função para reiniciar o jogo
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
                    restartGame(); // Chama a função para reiniciar o jogo
                }
            }
        });
    });
};

const restartGame = () => {
    // Reinicia os valores do estado
    state.values.result = 0;
    state.values.currentTime = 60;
    state.values.lives = 3;
    state.view.score.textContent = state.values.result;
    state.view.timeleft.textContent = state.values.currentTime;
    state.view.lives.textContent = `x${state.values.lives}`;
    // Reinicia os timers
    moveEnemy();
    state.actions.countDownTimerId = setInterval(countDown, 1000);
};

const initialize = () => {
    addListenerHitbox();
    state.view.startGameButton.addEventListener("click", () => {
        state.view.welcomeMessage.style.display = "none"; // Esconde a mensagem de boas-vindas
        moveEnemy();
        state.actions.countDownTimerId = setInterval(countDown, 1000); // Inicia a contagem regressiva
    });
};

document.addEventListener("DOMContentLoaded", () => {
    initialize();
});
