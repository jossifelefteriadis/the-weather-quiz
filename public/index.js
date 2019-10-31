
// const randomCity = document.querySelector('.btn__generate');
const question = document.querySelector('.question');
const fourAnswers = document.querySelector('.answer_buttons');
let shuffledCity;
let shuffledAnswers;
const counter = document.querySelector('.counter');
let count = 0;

function generateCity() {
    shuffledCity = cities[Math.floor(Math.random() * cities.length)];
    getCityWeather(shuffledCity);
    console.log(count);
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
    console.log('before shuffle', answers);
    shuffleAnswers(answers, correctCity);
}

function shuffleAnswers(answers, correctCity) {

    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    // shuffledAnswers = answers[Math.floor(Math.random() * answers.length)];
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
            console.log(count);
            count += 1;
            counter.innerHTML = `Your count is: ${count}`;
            console.log('Dude, good job!')
        } if (!selected.classList.contains('right'))  {
            selected.classList.add('selectedWrong');
            console.log('Hah, you suck! The right answer was', correctCity);
        }
        const rightA = document.querySelector('.right');
        rightA.classList.add('selectedRight');
        selected.classList.remove('right');
        fourAnswers.map(disable => {
            disable = document.querySelector('.btn').disabled = true
        })
        //map through för att disable alla
        // document.querySelector('.btn').disabled = true;
        // fourAnswers.removeEventListener('click', showAnswers, false);
    })
    
    // const buttons = document.querySelector('button');
    // buttons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         if (button === correctCity) {
    //         }
    //     })
    // })
    // buttons.addEventListener('click', () => {
    //     if (button === correctCity) {
    //         console.log('Dude, good job!')
    //     }
    //     console.log('Hah, you suck! The right answer was', correctCity);
    // })
    // selectAnswer(correctCity);
}

// function selectAnswer(correctCity) {
// }

// randomCity.addEventListener('click', generateCity)


const cities = [
    'Barcelona', 'Athens', 'Stockholm', 'Uppsala', 'Kiev', 'Berlin', 'Rome', 'London', 'Paris', 'Amsterdam',
    'Prague', 'Madrid', 'Lisbon', 'Vienna', 'Copenhagen', 'Budapest', 'Dublin', 'Munich', 'Venice', 'Milan',
    'Istanbul', 'Hamburg', 'Porto', 'Helsinki', 'Oslo', 'Zagreb', 'Riga', 'Lyon', 'Nice', 'Belgrade'
]

window.addEventListener('DOMContentLoaded', generateCity)
