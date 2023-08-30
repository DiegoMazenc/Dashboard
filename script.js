// =====API METEO=====
document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=fr&units=metric&appid=f573bb3812395e235002dc462cfc807e`;

            window.fetch(api)
                .then(res => res.json())
                .then(resJson => {
                    console.log(resJson);
                    const iconUrl = `http://openweathermap.org/img/w/${resJson.weather[0].icon}.png`;

                    const weatherDetailDiv = document.querySelector('.weather-details');
                    const weatherLocationDiv = document.querySelector('.weather-location');
                    const iconImg = document.createElement('img');
                    iconImg.src = iconUrl;

                    const temperature = resJson.main.temp;
                    const location = resJson.name;

                    const temperatureDiv = document.createElement('div');
                    temperatureDiv.textContent = `${temperature} °C`;
                    temperatureDiv.style.fontSize = '2rem';

                    const locationDiv = document.createElement('div');
                    locationDiv.textContent = `${location}`;
                    locationDiv.style.marginTop = '15px';
                    locationDiv.style.fontSize = '1.2rem';

                    weatherDetailDiv.appendChild(iconImg);
                    weatherDetailDiv.appendChild(temperatureDiv);
                    weatherLocationDiv.appendChild(locationDiv);

                })
                .catch(error => {
                    console.error('Une erreur s\'est produite :', error);
                });
        });
    } else {
        console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
    }
});

// =====API HEURE=====

function voirHeure() {
    let horloge = new Date();
    let hours = horloge.getHours().toString().padStart(2, '0');;
    let minutes = horloge.getMinutes().toString().padStart(2, '0');;



    let time = document.querySelector(".time");
    time.innerHTML = hours + ":" + minutes;
}

setInterval(voirHeure, 1000);


// ====MESSAGE====

function message() {
    let horloge = new Date();
    let hours = horloge.getHours();
    let greeting = document.querySelector(".greeting")
    if (hours <= 11) {
        greeting.innerHTML = "Coucou petite perruche";
    }
    else if (hours >= 12 && hours < 17) {
        greeting.innerHTML = "Bientot l'apéro !";
    }
    else if (hours >= 17 && hours < 22) {
        greeting.innerHTML = "It's Beer Time !";
    }
    else {
        greeting.innerHTML = "It's Dodo Time";
    }
};

setInterval(message, 1000);

// =====API BACKGROUND=====

fetch('https://api.unsplash.com/photos/random/?client_id=D2vdd6zUmLRsnt0q8cPY1exhdZJglkVwBPuzbc74AGA&query=mountains,iceland')
    .then(res => res.json())
    .then(resJson => {
        console.log(resJson)

        const imgUrl = resJson.urls.full;
        document.body.style.backgroundImage = `url(${imgUrl})`;
    })
    .catch(error => console.log(error));


// =====API QUOTE=====

fetch(`https://api.gameofthronesquotes.xyz/v1/random`)
    .then(res => res.json())
    .then(resJson => {
        console.log(resJson)

        const sentenceUrl = resJson.sentence
        const caraUrl = resJson.character.name
        const quoteDiv = document.querySelector('.quote');

        const sentenceDiv = document.createElement('div');
        sentenceDiv.textContent = sentenceUrl;

        const caraDiv = document.createElement('div');
        caraDiv.textContent = "- " + caraUrl + " -";
        caraDiv.style.marginTop = '15px';
        caraDiv.style.fontSize = '15px';
        

        quoteDiv.appendChild(sentenceDiv);
        quoteDiv.appendChild(caraDiv);
        
    })
    .catch(error => console.log(error));
