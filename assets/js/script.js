const apiKeyNews = "";

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
