// Initializing all elements constants
const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");
let target = "patna"
const fetchData = async(target) => {

    try {
        const url = `http://api.weatherapi.com/v1/current.json?key=a425b770fdd74dd7a6283854230506&q=${target}&aqi=no
    `
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const {
            current: {
                temp_c,
                condition: { text, icon },
            },
            location: { name, localtime },
        } = data;
        updateDom(temp_c, name, localtime, icon, text);
    } catch (error) {
        alert("Location not found");
    }
};

function updateDom(temp, city, time, emoji, text) {
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDay());
    temperateField.innerText = temp;
    cityField.innerText = city;
    emojiField.src = emoji;
    weatherField.innerText = text;
    dateField.innerText = `${exactTime} - ${exactDay}   ${exactDate}`;

}

fetchData(target);
form.addEventListener("submit", search);

function search(e) {
    e.preventDefault();
    target = searchField.value;

    fetchData(target);
}

function getDayFullName(num) {
    switch (num) {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";

        case 2:
            return "Tuesday";

        case 3:
            return "Wednesday";

        case 4:
            return "Thursday";

        case 5:
            return "Friday";

        case 6:
            return "Saturdat";

        default:
            return "Don't Know";
    }
}