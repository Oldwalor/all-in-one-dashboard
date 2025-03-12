const apiKey = '';
const apiKeyNews = "";



// Animation et effets visuels basés sur les conditions météorologiques
const weatherAnimations = {
    backgrounds: {
        "clear sky": "linear-gradient(135deg, #1e90ff, #87ceeb)",
        "few clouds": "linear-gradient(135deg, #64b5f6, #bbdefb)", 
        "scattered clouds": "linear-gradient(135deg, #78909c, #b0bec5)", 
        "broken clouds": "linear-gradient(135deg, #607d8b, #90a4ae)",
        "shower rain": "linear-gradient(135deg, #546e7a, #78909c)", 
        "rain": "linear-gradient(135deg, #455a64, #607d8b)",
        "thunderstorm": "linear-gradient(135deg, #263238, #455a64)", 
        "snow": "linear-gradient(135deg, #e0e0e0, #f5f5f5)",
        "mist": "linear-gradient(135deg, #b0bec5, #cfd8dc)", 
        "overcast clouds": "linear-gradient(135deg, #78909c, #90a4ae)", 
        "light rain": "linear-gradient(135deg, #546e7a, #78909c)", 
        "moderate rain": "linear-gradient(135deg, #455a64, #607d8b)", 
        "heavy intensity rain": "linear-gradient(135deg, #37474f, #546e7a)", 
        "fog": "linear-gradient(135deg, #9e9e9e, #bdbdbd)" 
    },
    
    getTextColor: function(conditions) {
        const darkConditions = ["thunderstorm", "heavy intensity rain", "moderate rain", "rain"];
        return darkConditions.includes(conditions) ? "#ffffff" : "#333333";
    }
};

// Météo
const weatherTranslations = {
    "clear sky": "Ciel dégagé",
    "few clouds": "Quelques nuages",
    "scattered clouds": "Nuages épars",
    "broken clouds": "Nuages fragmentés",
    "shower rain": "Averses",
    "rain": "Pluie",
    "thunderstorm": "Orage",
    "snow": "Neige",
    "mist": "Brume",
    "overcast clouds": "Ciel couvert",
    "light rain": "Pluie légère",
    "moderate rain": "Pluie modérée",
    "heavy intensity rain": "Pluie intense",
    "fog": "Brouillard"
};

// Fonction pour traduire la météo
function translateWeather(description) {
    return weatherTranslations[description] || description; 
}

function convertTimestampToTime(timestamp) {
    const date = new Date(timestamp * 1000); 
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function createWeatherAnimation(conditions) {
    const animationContainer = document.getElementById('weather-animation');
    if (!animationContainer) return;
    
    animationContainer.innerHTML = ''; 
    
    if (conditions.includes('clear sky')) {
        createSunAnimation(animationContainer);
    } else if (conditions.includes('clouds')) {
        createCloudAnimation(animationContainer, conditions);
    } else if (conditions.includes('rain') || conditions.includes('shower')) {
        createRainAnimation(animationContainer, conditions);
    } else if (conditions.includes('thunderstorm')) {
        createThunderstormAnimation(animationContainer);
    } else if (conditions.includes('snow')) {
        createSnowAnimation(animationContainer);
    } else if (conditions.includes('mist') || conditions.includes('fog')) {
        createMistAnimation(animationContainer);
    }
}

// Animation soleil
function createSunAnimation(container) {
    const sun = document.createElement('div');
    sun.className = 'sun';
    sun.innerHTML = `
        <svg viewBox="0 0 100 100" width="120" height="120">
            <circle cx="50" cy="50" r="20" fill="#FFD700" class="sun-circle">
                <animate attributeName="r" values="20;22;20" dur="3s" repeatCount="indefinite" />
            </circle>
            <g class="sun-rays">
                <line x1="50" y1="20" x2="50" y2="10" stroke="#FFD700" stroke-width="3" />
                <line x1="50" y1="80" x2="50" y2="90" stroke="#FFD700" stroke-width="3" />
                <line x1="20" y1="50" x2="10" y2="50" stroke="#FFD700" stroke-width="3" />
                <line x1="80" y1="50" x2="90" y2="50" stroke="#FFD700" stroke-width="3" />
                <line x1="30" y1="30" x2="22" y2="22" stroke="#FFD700" stroke-width="3" />
                <line x1="70" y1="70" x2="78" y2="78" stroke="#FFD700" stroke-width="3" />
                <line x1="30" y1="70" x2="22" y2="78" stroke="#FFD700" stroke-width="3" />
                <line x1="70" y1="30" x2="78" y2="22" stroke="#FFD700" stroke-width="3" />
                <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite" />
            </g>
        </svg>

    `;
    container.appendChild(sun);
}

// Animation nuages
function createCloudAnimation(container, conditions) {
    const cloudCount = conditions.includes('few') ? 2 : 
                      conditions.includes('scattered') ? 3 : 
                      conditions.includes('broken') ? 4 : 5;
    
    const cloudContainer = document.createElement('div');
    cloudContainer.className = 'cloud-container';
    
    for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.left = `${Math.random() * 80}%`;
        cloud.style.top = `${Math.random() * 60}%`;
        cloud.style.animationDuration = `${Math.random() * 30 + 50}s`;
        cloud.style.opacity = `${Math.random() * 0.4 + 0.6}`;
        cloud.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        
        cloud.innerHTML = `
            <svg viewBox="0 0 100 60" width="150" height="90">
                <path d="M25,50 Q30,60 40,55 Q43,68 55,65 Q65,80 80,65 Q95,65 90,50 Q100,45 95,35 Q97,20 85,20 Q80,5 65,15 Q55,0 45,15 Q30,5 25,20 Q10,15 15,30 Q5,35 15,45 Q10,50 25,50 Z" fill="rgba(255, 255, 255, 0.8)" />
            </svg>
        `;
        cloudContainer.appendChild(cloud);
    }
    
    if (conditions.includes('few')) {
        const sun = document.createElement('div');
        sun.className = 'sun behind-clouds';
        sun.innerHTML = `
            <svg viewBox="0 0 100 100" width="140" height="140">
                <circle cx="50" cy="50" r="25" fill="#FFD700" class="sun-circle">
                    <animate attributeName="r" values="25;27;25" dur="4s" repeatCount="indefinite" />
                </circle>
            </svg>
        `;
        container.appendChild(sun);
    }
    
    container.appendChild(cloudContainer);
}

// Animation pluie
function createRainAnimation(container, conditions) {
    createCloudAnimation(container, "broken clouds");
    
    const rainContainer = document.createElement('div');
    rainContainer.className = 'rain-container';
    
    const intensity = conditions.includes('light') ? 20 : 
                     conditions.includes('moderate') ? 40 : 
                     conditions.includes('heavy') ? 70 : 30;
    
    for (let i = 0; i < intensity; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        rainContainer.appendChild(drop);
    }
    
    container.appendChild(rainContainer);
}

function createThunderstormAnimation(container) {

    createRainAnimation(container, "heavy intensity rain");
    
    const lightningContainer = document.createElement('div');
    lightningContainer.className = 'lightning-container';
    
    for (let i = 0; i < 3; i++) {
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        lightning.style.left = `${Math.random() * 80 + 10}%`;
        lightning.style.animationDelay = `${Math.random() * 5 + i * 2}s`;
        lightning.innerHTML = `
            <svg viewBox="0 0 32 80" width="32" height="80">
                <path d="M15,0 L12,30 L20,35 L5,80 L8,45 L0,40 Z" fill="#ffeb3b" />
            </svg>
        `;
        lightningContainer.appendChild(lightning);
    }
    
    container.appendChild(lightningContainer);
}

// Animation neige
function createSnowAnimation(container) {
    const snowContainer = document.createElement('div');
    snowContainer.className = 'snow-container';
    
    createCloudAnimation(container, "few clouds");
    
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 5}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowflake.innerHTML = "*";
        snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
        snowflake.style.opacity = `${Math.random() * 0.6 + 0.4}`;
        snowContainer.appendChild(snowflake);
    }
    
    container.appendChild(snowContainer);
}

// Animation brume/brouillard
function createMistAnimation(container) {
    const mistContainer = document.createElement('div');
    mistContainer.className = 'mist-container';
    
    for (let i = 0; i < 5; i++) {
        const mistLayer = document.createElement('div');
        mistLayer.className = 'mist-layer';
        mistLayer.style.top = `${i * 20}%`;
        mistLayer.style.animationDuration = `${Math.random() * 10 + 15}s`;
        mistLayer.style.animationDelay = `${Math.random() * 5}s`;
        mistLayer.style.opacity = `${Math.random() * 0.3 + 0.2}`;
        mistContainer.appendChild(mistLayer);
    }
    
    container.appendChild(mistContainer);
}

function updateWeatherUI(data) {
    const weatherSection = document.getElementById('meteo');
    const meteoContent = document.getElementById('meteo-content');
    const conditions = data.weather[0].description;
    
    const background = weatherAnimations.backgrounds[conditions] || 
                      weatherAnimations.backgrounds["clear sky"];
    
    weatherSection.style.background = background;
    
    const textColor = weatherAnimations.getTextColor(conditions);
    meteoContent.style.color = textColor;
    
    createWeatherAnimation(conditions);
    
    const temp = data.main.temp;
    let tempMessage = "";
    
    if (temp > 30) {
        tempMessage = "Très chaud aujourd'hui ! Pensez à bien vous hydrater.";
    } else if (temp > 25) {
        tempMessage = "Il fait chaud, une bonne journée pour profiter du soleil !";
    } else if (temp > 15) {
        tempMessage = "Température agréable aujourd'hui.";
    } else if (temp > 5) {
        tempMessage = "Un peu frais, prenez une veste.";
    } else if (temp > 0) {
        tempMessage = "Il fait froid, couvrez-vous bien !";
    } else {
        tempMessage = "Températures négatives, attention au verglas !";
    }

    let tempMessageElement = document.getElementById('temp-message');
    if (!tempMessageElement) {
        tempMessageElement = document.createElement('p');
        tempMessageElement.id = 'temp-message';
        meteoContent.appendChild(tempMessageElement);
    }
    tempMessageElement.innerText = tempMessage;
    
    let weatherIcon = document.getElementById('weather-icon');
    if (!weatherIcon) {
        weatherIcon = document.createElement('img');
        weatherIcon.id = 'weather-icon';
        weatherIcon.style.width = '64px';
        weatherIcon.style.height = '64px';
        meteoContent.insertBefore(weatherIcon, meteoContent.firstChild);
    }
    
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = translateWeather(conditions);
}

document.addEventListener('DOMContentLoaded', () => {
    const meteoSection = document.getElementById('meteo');
    
    if (!document.getElementById('weather-animation')) {
        const animationContainer = document.createElement('div');
        animationContainer.id = 'weather-animation';
        animationContainer.className = 'weather-animation';
        meteoSection.insertBefore(animationContainer, meteoSection.firstChild);
    }
    
    createWeatherAnimation('clear sky');
});

document.getElementById('searchbtn').addEventListener('click', () => {
    const city = document.getElementById('search').value; // Récupère la ville saisie
    if (!city.trim()) return; 
    
    document.getElementById('meteo').classList.add('loading');
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de réseau');
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp; 
            const feelsLike = data.main.feels_like; 
            const conditions = data.weather[0].description; 
            const translatedConditions = translateWeather(conditions);
            const sunrise = convertTimestampToTime(data.sys.sunrise); 
            const sunset = convertTimestampToTime(data.sys.sunset); 
            const humidity = data.main.humidity; 
            const windSpeed = data.wind.speed; 

            document.getElementById('temperature').innerText = `Température : ${temperature.toFixed(1)} °C`;
            document.getElementById('feelsLike').innerText = `Température ressentie : ${feelsLike.toFixed(1)} °C`;
            document.getElementById('conditions').innerText = `Conditions : ${translatedConditions}`;
            document.getElementById('sunrise').innerText = `Lever du soleil : ${sunrise}`;
            document.getElementById('sunset').innerText = `Coucher du soleil : ${sunset}`;
            
            let humidityElement = document.getElementById('humidity');
            if (!humidityElement) {
                humidityElement = document.createElement('p');
                humidityElement.id = 'humidity';
                humidityElement.setAttribute('aria-live', 'polite');
                document.getElementById('meteo-content').appendChild(humidityElement);
            }
            humidityElement.innerText = `Humidité : ${humidity}%`;
            
            let windElement = document.getElementById('wind');
            if (!windElement) {
                windElement = document.createElement('p');
                windElement.id = 'wind';
                windElement.setAttribute('aria-live', 'polite');
                document.getElementById('meteo-content').appendChild(windElement);
            }
            windElement.innerText = `Vent : ${windSpeed} m/s`;
            
            updateWeatherUI(data);
            
            document.getElementById('meteo').classList.remove('loading');
        })
        .catch(error => {
            console.error('Erreur :', error);

            let errorElement = document.getElementById('error-message');
            if (!errorElement) {
                errorElement = document.createElement('p');
                errorElement.id = 'error-message';
                errorElement.style.color = '#ff5252';
                document.getElementById('meteo-content').prepend(errorElement);
            }
            errorElement.innerText = `Ville non trouvée. Vérifiez l'orthographe et réessayez.`;
            
            document.getElementById('meteo').classList.remove('loading');

            setTimeout(() => {
                errorElement.style.opacity = '0';
                setTimeout(() => {
                    errorElement.remove();
                }, 500);
            }, 4000);
        });
});

const searchInput = document.getElementById('search');
const suggestionBox = document.getElementById('suggestions');

searchInput.addEventListener('input', function() {
    const query = searchInput.value;

    if (query.length > 2) { 
        fetch(`https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                suggestionBox.innerHTML = '';
                const uniqueCities = new Set(); 

                if (data.list && data.list.length > 0) {
                    data.list.forEach(city => {
                        if (city.sys && city.sys.country) {
                            const cityName = `${city.name}, ${city.sys.country}`;
                            if (!uniqueCities.has(cityName)) { 
                                uniqueCities.add(cityName); 
                                const option = document.createElement('div');
                                option.textContent = cityName; 
                                option.onclick = () => {
                                    searchInput.value = option.textContent;
                                    suggestionBox.innerHTML = ''; 

                                    document.getElementById('searchbtn').click();
                                };
                                suggestionBox.appendChild(option);
                            }
                        }
                    });
                } else {
                    const noResult = document.createElement('div');
                    noResult.textContent = "Aucun résultat trouvé";
                    noResult.className = "no-result";
                    suggestionBox.appendChild(noResult);
                }
            })
            .catch(error => console.error('Erreur :', error));
    } else {
        suggestionBox.innerHTML = '';
    }
});

document.addEventListener('click', function(event) {
    const isClickInside = searchInput.contains(event.target) || suggestionBox.contains(event.target);
    if (!isClickInside) {
        suggestionBox.innerHTML = '';
    }
});

searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('searchbtn').click();
    }
});

function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                document.getElementById('meteo').classList.add('loading');
                
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('search').value = `${data.name}, ${data.sys.country}`;

                        const temperature = data.main.temp;
                        const feelsLike = data.main.feels_like;
                        const conditions = data.weather[0].description;
                        const translatedConditions = translateWeather(conditions);
                        const sunrise = convertTimestampToTime(data.sys.sunrise);
                        const sunset = convertTimestampToTime(data.sys.sunset);
                        const humidity = data.main.humidity;
                        const windSpeed = data.wind.speed;

                        document.getElementById('temperature').innerText = `Température : ${temperature.toFixed(1)} °C`;
                        document.getElementById('feelsLike').innerText = `Température ressentie : ${feelsLike.toFixed(1)} °C`;
                        document.getElementById('conditions').innerText = `Conditions : ${translatedConditions}`;
                        document.getElementById('sunrise').innerText = `Lever du soleil : ${sunrise}`;
                        document.getElementById('sunset').innerText = `Coucher du soleil : ${sunset}`;
                        
                        let humidityElement = document.getElementById('humidity');
                        if (!humidityElement) {
                            humidityElement = document.createElement('p');
                            humidityElement.id = 'humidity';
                            humidityElement.setAttribute('aria-live', 'polite');
                            document.getElementById('meteo-content').appendChild(humidityElement);
                        }
                        humidityElement.innerText = `Humidité : ${humidity}%`;
                        
                        let windElement = document.getElementById('wind');
                        if (!windElement) {
                            windElement = document.createElement('p');
                            windElement.id = 'wind';
                            windElement.setAttribute('aria-live', 'polite');
                            document.getElementById('meteo-content').appendChild(windElement);
                        }
                        windElement.innerText = `Vent : ${windSpeed} m/s`;

                        updateWeatherUI(data);

                        document.getElementById('meteo').classList.remove('loading');
                    })
                    .catch(error => {
                        console.error('Erreur :', error);
                        document.getElementById('meteo').classList.remove('loading');
                    });
            },
            error => {
                console.error("Erreur de géolocalisation :", error);
                alert("Impossible d'obtenir votre position. Veuillez autoriser l'accès à la géolocalisation ou rechercher manuellement.");
            }
        );
    } else {
        alert("La géolocalisation n'est pas prise en charge par votre navigateur.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchContainer = document.querySelector("#meteo div:first-of-type");
    
    if (!document.getElementById('geolocBtn')) {
        const geolocBtn = document.createElement('button');
        geolocBtn.id = 'geolocBtn';
        geolocBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="2"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line></svg>';
        geolocBtn.setAttribute('aria-label', 'Utiliser ma position');
        geolocBtn.title = 'Utiliser ma position';
        geolocBtn.onclick = getWeatherByGeolocation;
        
        searchContainer.insertBefore(geolocBtn, document.getElementById('searchbtn'));
    }
});












const url = `https://gnews.io/api/v4/top-headlines?lang=fr&token=${apiKeyNews}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.articles); 

        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = ''; 

        data.articles.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');
            newsItem.innerHTML = `
                <h3>${article.title}</h3>
                <img src="${article.image}" alt="Image de l'article" width="200">
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Lire l'article</a>
            `;
            newsContainer.appendChild(newsItem);
        });
    })
    .catch(error => console.error("Erreur :", error));




//CHATBOT
// Liste de paires question/réponse
const responses = [
        { question: ['bonjour', 'salut', 'hi', 'coucou', 'yo'], response: "Bonjour ! Comment puis-je t'aider aujourd'hui ?" },
        { question: ['comment ça va', 'ça va', 'tu vas bien', 'comment tu vas'], response: "Ça va bien, merci ! Et toi ?" },
        { question: ['merci', 'merci beaucoup', 'thanks', 'thx', 'merci bien'], response: "Avec plaisir ! N'hésite pas à revenir si tu as d'autres questions." },
        { question: ['heure', 'quelle heure est-il', 'donne moi l\'heure', 'il est quelle heure'], response: `Il est ${new Date().toLocaleTimeString()}.` },
        { question: ['bye', 'au revoir', 'salut', 'à plus', 'ciao'], response: "Au revoir ! À bientôt !" },
        { question: ['qui es-tu', 't\'es qui', 'tqui', 't qui', 'c\'est quoi ton nom'], response: "Je suis un chatbot qui te permet de faciliter ta vie." },
        { question: ['quel est ton créateur', 'qui t\'a créé', 'qui t\'a fait'], response: "Je suis un projet en développement, créé par un développeur passionné." },
        { question: ['que fais-tu', 'quel est ton but', 'à quoi tu sers'], response: "Je suis là pour répondre à tes questions et discuter avec toi." },
        { question: ['blague', 'raconte une blague', 'fais-moi rire'], response: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent dans le bateau !" },
        { question: ['aide', 'help', 'comment ça marche', 'besoin d\'aide'], response: "Tu peux me poser des questions simples et j'essaierai de te répondre !" },
        { question: ['quel âge as-tu', 'ton âge', 't\'as quel âge'], response: "Je n'ai pas d'âge, mais je suis toujours jeune dans le code !" },
        { question: ['tu es humain', 't\'es un robot', 'es-tu réel'], response: "Je suis un chatbot, donc je ne suis ni humain ni réel, mais je suis là pour toi !" },
        { question: ['quel est ton film préféré', 'tu aimes quoi', 'tu regardes des films'], response: "J'aime bien les films où les IA ne prennent pas le contrôle du monde ! 😆" },
        { question: ['faim', 'as-tu faim', 'tu manges quoi'], response: "Je ne mange pas, mais si j'avais un plat préféré, ce serait sûrement du code bien structuré !" },
        { question: ['quelle est ta couleur préférée', 'ta couleur préférée', 'tu aimes quelle couleur'], response: "J'aime bien le bleu, ça me rappelle les interfaces modernes !" },
        { question: ['joues-tu aux jeux vidéo', 'tu aimes les jeux vidéo', 'tu connais des jeux'], response: "J'aimerais bien, mais pour l'instant, je me contente d'analyser du texte. Peut-être un jour ?" },
        { question: ['as-tu des amis', 'tu es seul', 'tu parles à d\'autres robots'], response: "Mes meilleurs amis sont les développeurs et les utilisateurs qui me parlent !" },
        { question: ['connais-tu ChatGPT', 'tu connais OpenAI', 'tu es un ChatGPT'], response: "Oui, je connais ChatGPT, mais je ne lui ressemble pas car je suis un" }
    


];

function levenshteinDistance(s1, s2) {
    const len1 = s1.length;
    const len2 = s2.length;
    const dp = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) dp[i][0] = i;
    for (let j = 0; j <= len2; j++) dp[0][j] = j;

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,   
                dp[i][j - 1] + 1,   
                dp[i - 1][j - 1] + cost 
            );
        }
    }
    return dp[len1][len2];
}

function getBotResponse(userInput) {
    let bestMatch = '';
    let bestScore = Infinity; 

    const normalizedUserInput = userInput.toLowerCase().trim();

    responses.forEach(item => {
        item.question.forEach(keyword => {
            const distance = levenshteinDistance(normalizedUserInput, keyword);
            
            if (distance < bestScore) {
                bestScore = distance;
                bestMatch = item.response;
            }
        });
    });

    if (bestScore > 3) {
        bestMatch = "Désolé, je n'ai pas compris votre demande.";
    }

    appendMessage(bestMatch, 'bot');  
}

function appendMessage(message, sender) {
    const chatLog = document.getElementById('chat-log');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender);
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}

document.getElementById('send-message').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    
    if (userInput.trim() !== '') {
        appendMessage(userInput, 'user');
        getBotResponse(userInput);
    }
    
    document.getElementById('user-input').value = '';
});




//Heure
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

document.addEventListener('DOMContentLoaded', updateClock);



document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".preview");
    
    sections.forEach(section => {
      section.addEventListener("click", function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
          return;
        }
        
        console.log("Section cliquée:", this.id);

        const fullscreenElement = document.querySelector(".fullscreen");
        if (fullscreenElement) {
          console.log("Une section est déjà en plein écran");
          return;
        }

        document.body.style.overflow = 'hidden';

        this.classList.remove("preview");
        this.classList.add("fullscreen");
        
        document.getElementById('suggestions').style.display = 'none';
        this.dataset.scrollPos = window.scrollY;
        

        const closeBtn = document.createElement("button");
        closeBtn.textContent = "Fermer";
        closeBtn.classList.add("close-btn");

        setTimeout(() => {
          this.appendChild(closeBtn);
        }, 200);
        
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          closeFullscreen(this);
        });

        document.addEventListener("keydown", handleEscapeKey);
      });
    });

    function closeFullscreen(element) {

      element.classList.add("fullscreen-exit");

      setTimeout(() => {
        element.classList.remove("fullscreen");
        element.classList.remove("fullscreen-exit");
        element.classList.add("preview");
     
        document.body.style.overflow = '';
 
        if (element.dataset.scrollPos) {
          window.scrollTo(0, parseInt(element.dataset.scrollPos));
        }

        const closeBtn = element.querySelector(".close-btn");
        if (closeBtn) closeBtn.remove();

        document.removeEventListener("keydown", handleEscapeKey);
      }, 300); 
    }

    function handleEscapeKey(e) {
      if (e.key === "Escape") {
        const fullscreenElement = document.querySelector(".fullscreen");
        if (fullscreenElement) {
          closeFullscreen(fullscreenElement);
        }
      }
    }
  });

  document.getElementById('search').addEventListener('input', function() {
    const searchBox = document.getElementById('search');
    const suggestionsBox = document.getElementById('suggestions');

    if (searchBox.value.trim() !== '') {
        suggestionsBox.style.display = 'block';
    } else {

        suggestionsBox.style.display = 'none';
    }
});

document.getElementById('search').addEventListener('blur', function() {
    setTimeout(() => {
        document.getElementById('suggestions').style.display = 'none';
    }, 300); 
});
