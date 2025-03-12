const apiKey = '';
const apiKeyNews = "";



// Animation et effets visuels basés sur les conditions météorologiques
const weatherAnimations = {
    // Définition des backgrounds en fonction des conditions
    backgrounds: {
        "clear sky": "linear-gradient(135deg, #1e90ff, #87ceeb)", // Ciel bleu
        "few clouds": "linear-gradient(135deg, #64b5f6, #bbdefb)", // Bleu clair avec nuages
        "scattered clouds": "linear-gradient(135deg, #78909c, #b0bec5)", // Gris-bleu
        "broken clouds": "linear-gradient(135deg, #607d8b, #90a4ae)", // Gris plus foncé
        "shower rain": "linear-gradient(135deg, #546e7a, #78909c)", // Gris foncé
        "rain": "linear-gradient(135deg, #455a64, #607d8b)", // Gris très foncé
        "thunderstorm": "linear-gradient(135deg, #263238, #455a64)", // Presque noir
        "snow": "linear-gradient(135deg, #e0e0e0, #f5f5f5)", // Blanc-gris
        "mist": "linear-gradient(135deg, #b0bec5, #cfd8dc)", // Gris brumeux
        "overcast clouds": "linear-gradient(135deg, #78909c, #90a4ae)", // Gris moyen
        "light rain": "linear-gradient(135deg, #546e7a, #78909c)", // Gris-bleu
        "moderate rain": "linear-gradient(135deg, #455a64, #607d8b)", // Plus foncé
        "heavy intensity rain": "linear-gradient(135deg, #37474f, #546e7a)", // Très foncé
        "fog": "linear-gradient(135deg, #9e9e9e, #bdbdbd)" // Gris brouillard
    },
    
    // Fonction pour définir la couleur du texte en fonction de la luminosité du fond
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
    return weatherTranslations[description] || description; // Si pas dans la liste, garde l'original
}

// Fonction pour convertir un timestamp en heure locale
function convertTimestampToTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convertit en millisecondes
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

// Fonction pour créer l'animation appropriée en fonction des conditions météo
function createWeatherAnimation(conditions) {
    const animationContainer = document.getElementById('weather-animation');
    if (!animationContainer) return;
    
    animationContainer.innerHTML = ''; // Efface les animations précédentes
    
    // Crée différentes animations selon les conditions
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
    
    // Si c'est "few clouds", ajouter aussi un soleil derrière les nuages
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
    // D'abord les nuages
    createCloudAnimation(container, "broken clouds");
    
    // Puis les gouttes de pluie
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

// Animation orage
function createThunderstormAnimation(container) {
    // D'abord les nuages et la pluie
    createRainAnimation(container, "heavy intensity rain");
    
    // Puis les éclairs
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
    
    // Quelques nuages légers
    createCloudAnimation(container, "few clouds");
    
    // Flocons de neige
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

// Fonction pour mettre à jour l'interface avec l'animation et les styles appropriés
function updateWeatherUI(data) {
    const weatherSection = document.getElementById('meteo');
    const meteoContent = document.getElementById('meteo-content');
    const conditions = data.weather[0].description;
    
    // Met à jour le style en fonction des conditions météo
    const background = weatherAnimations.backgrounds[conditions] || 
                      weatherAnimations.backgrounds["clear sky"]; // Par défaut
    
    weatherSection.style.background = background;
    
    // Ajuste la couleur du texte
    const textColor = weatherAnimations.getTextColor(conditions);
    meteoContent.style.color = textColor;
    
    // Crée l'animation appropriée
    createWeatherAnimation(conditions);
    
    // Affiche un message selon la température
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
    
    // Ajoute ou met à jour le message de température
    let tempMessageElement = document.getElementById('temp-message');
    if (!tempMessageElement) {
        tempMessageElement = document.createElement('p');
        tempMessageElement.id = 'temp-message';
        meteoContent.appendChild(tempMessageElement);
    }
    tempMessageElement.innerText = tempMessage;
    
    // Ajoute l'icône météo OpenWeatherMap si elle n'existe pas déjà
    let weatherIcon = document.getElementById('weather-icon');
    if (!weatherIcon) {
        weatherIcon = document.createElement('img');
        weatherIcon.id = 'weather-icon';
        weatherIcon.style.width = '64px';
        weatherIcon.style.height = '64px';
        meteoContent.insertBefore(weatherIcon, meteoContent.firstChild);
    }
    
    // Met à jour l'icône météo
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = translateWeather(conditions);
}

// Au chargement de la page, ajouter le conteneur d'animation
document.addEventListener('DOMContentLoaded', () => {
    const meteoSection = document.getElementById('meteo');
    
    // Crée le conteneur pour les animations météo s'il n'existe pas déjà
    if (!document.getElementById('weather-animation')) {
        const animationContainer = document.createElement('div');
        animationContainer.id = 'weather-animation';
        animationContainer.className = 'weather-animation';
        meteoSection.insertBefore(animationContainer, meteoSection.firstChild);
    }
    
    // Par défaut, montre une animation de ciel dégagé
    createWeatherAnimation('clear sky');
});

document.getElementById('searchbtn').addEventListener('click', () => {
    const city = document.getElementById('search').value; // Récupère la ville saisie
    if (!city.trim()) return; // Ne fait rien si le champ est vide
    
    // Ajoute une classe pour l'animation de chargement
    document.getElementById('meteo').classList.add('loading');
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de réseau');
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp; // Température actuelle
            const feelsLike = data.main.feels_like; // Température ressentie
            const conditions = data.weather[0].description; // Conditions météo
            const translatedConditions = translateWeather(conditions);
            const sunrise = convertTimestampToTime(data.sys.sunrise); // Lever du soleil
            const sunset = convertTimestampToTime(data.sys.sunset); // Coucher du soleil
            const humidity = data.main.humidity; // Humidité
            const windSpeed = data.wind.speed; // Vitesse du vent

            document.getElementById('temperature').innerText = `Température : ${temperature.toFixed(1)} °C`;
            document.getElementById('feelsLike').innerText = `Température ressentie : ${feelsLike.toFixed(1)} °C`;
            document.getElementById('conditions').innerText = `Conditions : ${translatedConditions}`;
            document.getElementById('sunrise').innerText = `Lever du soleil : ${sunrise}`;
            document.getElementById('sunset').innerText = `Coucher du soleil : ${sunset}`;
            
            // Ajoute des informations supplémentaires si elles n'existent pas déjà
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
            
            // Met à jour l'interface avec les styles et animations appropriés
            updateWeatherUI(data);
            
            // Supprime la classe de chargement
            document.getElementById('meteo').classList.remove('loading');
        })
        .catch(error => {
            console.error('Erreur :', error);
            // Affiche un message d'erreur
            let errorElement = document.getElementById('error-message');
            if (!errorElement) {
                errorElement = document.createElement('p');
                errorElement.id = 'error-message';
                errorElement.style.color = '#ff5252';
                document.getElementById('meteo-content').prepend(errorElement);
            }
            errorElement.innerText = `Ville non trouvée. Vérifiez l'orthographe et réessayez.`;
            
            // Supprime la classe de chargement
            document.getElementById('meteo').classList.remove('loading');
            
            // Faire disparaître le message d'erreur après 4 secondes
            setTimeout(() => {
                errorElement.style.opacity = '0';
                setTimeout(() => {
                    errorElement.remove();
                }, 500);
            }, 4000);
        });
});

const searchInput = document.getElementById('search');
const suggestionBox = document.getElementById('suggestions'); // Crée un élément pour les suggestions

searchInput.addEventListener('input', function() {
    const query = searchInput.value;

    if (query.length > 2) { // Rechercher seulement si la saisie est assez longue
        fetch(`https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                suggestionBox.innerHTML = ''; // Vider les anciennes suggestions
                const uniqueCities = new Set(); // Utiliser un Set pour éviter les doublons

                if (data.list && data.list.length > 0) {
                    data.list.forEach(city => {
                        if (city.sys && city.sys.country) {
                            const cityName = `${city.name}, ${city.sys.country}`;
                            if (!uniqueCities.has(cityName)) { // Vérifier si la ville a déjà été ajoutée
                                uniqueCities.add(cityName); // Ajouter la ville au Set
                                const option = document.createElement('div');
                                option.textContent = cityName; // Afficher le nom de la ville et le pays
                                option.onclick = () => {
                                    searchInput.value = option.textContent; // Remplir le champ de recherche avec la ville sélectionnée
                                    suggestionBox.innerHTML = ''; // Effacer les suggestions
                                    // Déclencher la recherche automatiquement
                                    document.getElementById('searchbtn').click();
                                };
                                suggestionBox.appendChild(option); // Ajouter l'option à la boîte de suggestions
                            }
                        }
                    });
                } else {
                    // Aucun résultat trouvé
                    const noResult = document.createElement('div');
                    noResult.textContent = "Aucun résultat trouvé";
                    noResult.className = "no-result";
                    suggestionBox.appendChild(noResult);
                }
            })
            .catch(error => console.error('Erreur :', error));
    } else {
        suggestionBox.innerHTML = ''; // Effacer les suggestions si la saisie est vide
    }
});

// Masquer les suggestions si l'utilisateur clique en dehors de l'input
document.addEventListener('click', function(event) {
    const isClickInside = searchInput.contains(event.target) || suggestionBox.contains(event.target);
    if (!isClickInside) {
        suggestionBox.innerHTML = ''; // Effacer les suggestions
    }
});

// Gérer la touche Entrée pour déclencher la recherche
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('searchbtn').click();
    }
});

// Ajouter une fonction pour la géolocalisation
function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // Afficher un message de chargement
                document.getElementById('meteo').classList.add('loading');
                
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                    .then(response => response.json())
                    .then(data => {
                        // Mettre à jour le champ de recherche avec le nom de la ville trouvée
                        document.getElementById('search').value = `${data.name}, ${data.sys.country}`;
                        
                        // Mettre à jour les informations météo
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
                        
                        // Ajoute des informations supplémentaires si elles n'existent pas déjà
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
                        
                        // Met à jour l'interface avec les styles et animations appropriés
                        updateWeatherUI(data);
                        
                        // Supprime la classe de chargement
                        document.getElementById('meteo').classList.remove('loading');
                    })
                    .catch(error => {
                        console.error('Erreur :', error);
                        document.getElementById('meteo').classList.remove('loading');
                    });
            },
            error => {
                console.error("Erreur de géolocalisation :", error);
                // Afficher un message d'erreur à l'utilisateur
                alert("Impossible d'obtenir votre position. Veuillez autoriser l'accès à la géolocalisation ou rechercher manuellement.");
            }
        );
    } else {
        alert("La géolocalisation n'est pas prise en charge par votre navigateur.");
    }
}

// Ajouter un bouton de géolocalisation après le chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const searchContainer = document.querySelector("#meteo div:first-of-type");
    
    // Crée le bouton de géolocalisation s'il n'existe pas déjà
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

// Fonction de distance de Levenshtein pour comparer les mots
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
                dp[i - 1][j] + 1,    // Suppression
                dp[i][j - 1] + 1,    // Insertion
                dp[i - 1][j - 1] + cost // Substitution
            );
        }
    }
    return dp[len1][len2];
}

// Fonction pour obtenir la réponse la plus proche
function getBotResponse(userInput) {
    let bestMatch = '';
    let bestScore = Infinity; // Plus c'est petit, plus c'est proche

    // Normaliser l'entrée de l'utilisateur
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

    // Si la meilleure correspondance est trop éloignée, renvoyer une réponse par défaut
    if (bestScore > 3) {
        bestMatch = "Désolé, je n'ai pas compris votre demande.";
    }

    appendMessage(bestMatch, 'bot');  // Ajouter la réponse du chatbot au chat
}

// Fonction pour ajouter un message au chat
function appendMessage(message, sender) {
    const chatLog = document.getElementById('chat-log');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender);
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Fonction pour envoyer le message
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

// Attendre que la page soit load avant d'exécuter updateClock()
document.addEventListener('DOMContentLoaded', updateClock);




// Correction de la fonction d'affichage plein écran
document.addEventListener("DOMContentLoaded", () => {
    // Sélectionne toutes les sections avec la classe preview
    const sections = document.querySelectorAll(".preview");
    
    sections.forEach(section => {
      section.addEventListener("click", function(e) {
        // Vérifie que le clic n'est pas sur un élément interactif comme un bouton ou un input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
          return;
        }
        
        console.log("Section cliquée:", this.id);
        
        // Vérifie si une section est déjà en plein écran
        const fullscreenElement = document.querySelector(".fullscreen");
        if (fullscreenElement) {
          console.log("Une section est déjà en plein écran");
          return;
        }
        
        // Ajout de l'effet de transition pour le corps
        document.body.style.overflow = 'hidden';
        
        // Enlève la classe preview et ajoute la classe fullscreen
        this.classList.remove("preview");
        this.classList.add("fullscreen");
        
        document.getElementById('suggestions').style.display = 'none';

        // Enregistre la position de défilement
        this.dataset.scrollPos = window.scrollY;
        
        // Crée le bouton de fermeture
        const closeBtn = document.createElement("button");
        closeBtn.textContent = "Fermer";
        closeBtn.classList.add("close-btn");
        
        // Ajoute un petit délai pour que l'animation d'entrée soit visible
        setTimeout(() => {
          this.appendChild(closeBtn);
        }, 200);
        
        // Ajoute l'événement de clic au bouton de fermeture
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation(); // Empêche la propagation du clic
          closeFullscreen(this);
        });
        
        // Ajouter un gestionnaire pour la touche Escape
        document.addEventListener("keydown", handleEscapeKey);
      });
    });
    
    // Fonction pour fermer le mode plein écran
    function closeFullscreen(element) {
      // Ajoute la classe de sortie pour l'animation
      element.classList.add("fullscreen-exit");
      
      // Supprime les classes après l'animation
      setTimeout(() => {
        element.classList.remove("fullscreen");
        element.classList.remove("fullscreen-exit");
        element.classList.add("preview");
        
        // Restaure le défilement du corps
        document.body.style.overflow = '';
        
        // Restaure la position de défilement
        if (element.dataset.scrollPos) {
          window.scrollTo(0, parseInt(element.dataset.scrollPos));
        }
        
        // Supprime le bouton de fermeture
        const closeBtn = element.querySelector(".close-btn");
        if (closeBtn) closeBtn.remove();
        
        // Supprime le gestionnaire de touche Escape
        document.removeEventListener("keydown", handleEscapeKey);
      }, 300); // Correspond à la durée de l'animation de sortie
    }
    
    // Fonction pour gérer la touche Escape
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
    
    // Si le champ de recherche n'est pas vide, on affiche la boîte de suggestions
    if (searchBox.value.trim() !== '') {
        suggestionsBox.style.display = 'block';
    } else {
        // Sinon on cache la boîte de suggestions
        suggestionsBox.style.display = 'none';
    }
});

document.getElementById('search').addEventListener('blur', function() {
    setTimeout(() => {
        document.getElementById('suggestions').style.display = 'none';
    }, 300); // Attendre 300ms avant de cacher
});
