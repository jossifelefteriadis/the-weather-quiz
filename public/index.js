const cities = [
    'Barcelona', 'Athens', 'Stockholm', 'Uppsala', 'Kiev', 'Berlin', 'Rome', 'London', 'Paris', 'Amsterdam',
    'Prague', 'Madrid', 'Lisbon', 'Vienna', 'Copenhagen', 'Budapest', 'Dublin', 'Munich', 'Venice', 'Milan',
    'Istanbul', 'Hamburg', 'Porto', 'Helsinki', 'Oslo', 'Zagreb', 'Riga', 'Lyon', 'Nice', 'Belgrade'
]

const randomCity = document.querySelector('.container__btn__generate');
const question = document.querySelector('.container__question');
const fourAnswers = document.querySelector('.answer_buttons');
let shuffledCity;
let shuffledAnswers;

function generateCity() {
    randomCity.innerText = 'NEXT';
    shuffledCity = cities[Math.floor(Math.random() * cities.length)];
    getCityWeather(shuffledCity);
};

const getCityWeather = function (shuffledCity) {
    event.preventDefault();
    fetch(`http://127.0.0.1:3000/${shuffledCity}`)
        .then(response => response.json())
        .then(data => generateQuestion(data));
}

function generateQuestion(data) {
    while (fourAnswers.firstChild) {
        fourAnswers.removeChild(fourAnswers.firstChild);
    }
    question.innerText = `In which European city, is the weather ${data.temperature} degrees, at this very second?`;
    generateCities(data.city);
}

function generateCities(correctCity) {
    const answers = [];
    answers.push(correctCity);
    while (answers.length !== 4) {
        const city = cities[Math.floor(Math.random() * cities.length)];
        if (!answers.includes(city)) {
            answers.push(city);
        }
    }
    shuffleAnswers(answers, correctCity);
}

function shuffleAnswers(answers, correctCity) {

    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    showAnswers(answers, correctCity);
}

function showAnswers(answers, correctCity) {
    answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        if (answer === correctCity) {
            button.classList.add('right');
        }
        button.classList.add('btn');
        fourAnswers.appendChild(button);
        fourAnswers.classList.remove('hide');
    })
    fourAnswers.addEventListener('click', (event) => {
        const selected = event.target;
        if (selected.classList.contains('right')) {
            selected.classList.add('selectedRight')
        } if (!selected.classList.contains('right'))  {
            selected.classList.add('selectedWrong');
        }
        const rightA = document.querySelector('.right');
        rightA.classList.add('selectedRight');
    })
}

randomCity.addEventListener('click', generateCity);