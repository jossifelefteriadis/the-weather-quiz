
const randomCity = document.querySelector('.btn__generate');
const question = document.querySelector('.question');
let shuffledCity;
let shuffledAnswers;

function generateCity() {
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
    console.log(answers);
}

randomCity.addEventListener('click', generateCity)


const cities = [
    'Barcelona', 'Athens', 'Stockholm', 'Uppsala', 'Kiev', 'Berlin', 'Rome', 'London', 'Paris', 'Amsterdam',
    'Prague', 'Madrid', 'Lisbon', 'Vienna', 'Copenhagen', 'Budapest', 'Dublin', 'Munich', 'Venice', 'Milan',
    'Istanbul', 'Hamburg', 'Porto', 'Helsinki', 'Oslo', 'Zagreb', 'Riga', 'Lyon', 'Nice', 'Belgrade'
]