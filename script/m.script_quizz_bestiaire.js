//List de bestioles
const bestioles = {
    bestiole1: 0,
    bestiole2: 0,
    bestiole3: 0,
    bestiole4: 0,
    bestiole5: 0,
    bestiole6: 0,
    bestiole7: 0,
    bestiole8: 0,
    bestiole9: 0,
    bestiole10: 0,
    bestiole11: 0,
    bestiole12: 0,
    bestiole13: 0,
    bestiole14: 0,
    bestiole15: 0
}

//Liste d'images de fond d'écran
const backgroundImages = [
    'url("images/carnet_cafe_resized_1.png")',
    'url("images/carnet_cafe_resized_2.png")',
    'url("images/carnet_cafe_resized_3.png")',
    'url("images/carnet_cafe_resized_4.png")',
    'url("images/carnet_cafe_resized_5.png")',
    'url("images/carnet_cafe_resized_6.png")'
];

// Créer un tableau avec les noms des fichiers d'images "a.png"
let aImages = [];
for (let i = 1; i <= 6; i++) {
    aImages.push(i + "a.png");
}

// Mélanger les images "a.png" dans le tableau
aImages.sort(() => Math.random() - 0.5);

// Ajouter les images "b.png" pour chaque élément "a.png" dans le tableau
let images = [];
for (let i = 0; i < aImages.length; i++) {
    images.push("url('images/half_notebook_cafe_resized_" + aImages[i] + "')");
    images.push("url('images/half_notebook_cafe_resized_" + aImages[i].replace("a.png", "b.png") + "')");
}

// Afficher le tableau d'images dans la console
console.log(images);

//Counter
var counter = 0;

//Variable du background actuel
let currentBackground = '';

// Stocker une référence au canvas actuel
let currentCanvas = null;
let selectedCanvas = null;

// Sélectionnez tous les éléments de liste li pour les rendre clickable et déclencher l'animation
let listItems = null;

const questionText = document.getElementById('question-text');

const imgAlert = document.getElementById('clem_hm');
const bulleAlert = document.getElementById('bulle_alert');

if (imgAlert.style.opacity === '1') {
    imgAlert.style.opacity = '0'
    bulleAlert.style.opacity = '0'
} else {
    imgAlert.style.opacity = '0';
    bulleAlert.style.opacity = '0'
}

// Charger les données du fichier JSON
fetch('data/questions_bank.json')
    .then(response => response.json())
    .then(data => {
        // Stocker les questions dans une variable
        const questions = data.bestiaire;
        console.log(questions);

        //Initialiser l'indice de la question actuelle
        let currentQuestionIndex = 0;

        //Variable de la question actuelle a créé avant la fonction pour pouvoir y faire appel lors de la vérification de la checkbox
        let currentQuestion;

        let buttonDesactived = false;

        function displayNextQuestion() {

            // réinitialiser le canvas actuel
            currentCanvas = null;

            //On réccupère la fonction dans notre variable créée précedemment et on la stock dans une variable
            currentQuestion = questions[currentQuestionIndex];

            if (currentQuestion.text === ""){
                const image = document.createElement('img');
                image.classList.add('quizz_infos');
                image.src = "images/unfinished_quizz.png";
                document.body.appendChild(image);

                const returnButton = document.createElement('img');
                returnButton.classList.add('return_button');
                returnButton.src = "images/arrow_2.png";
                document.body.appendChild(returnButton);

                returnButton.addEventListener('click', () => {
                    history.back();
                });


                const nextButton = document.querySelector('#next-button');
                nextButton.classList.add('hidden');
            }

            //Afficher le test de la question (en le stockant également dans une variable)
            //const questionText = document.getElementById('question-text');
            questionText.textContent = currentQuestion.text;

            // Supprime la classe d'animation
            questionText.classList.remove('text-focus-in-animation');

            // Force le navigateur à redessiner l'élément
            void questionText.offsetWidth;

            // Ajoute de nouveau la classe d'animation
            questionText.classList.add('text-focus-in-animation');


            //Afficher les possibiliter (toujours stockées dans des valeurs)
            const optionsList = document.getElementById('options-list');
            optionsList.innerHTML = '';
            currentQuestion.options.forEach(option => {

                const optionItem = document.createElement('li');

                // Créer un canvas et l'insérer avant l'input
                const canvas = document.createElement('canvas');
                canvas.width = 70;
                canvas.height = 50;
                optionItem.insertBefore(canvas, optionItem.firstChild);

                const optionInput = document.createElement('input');
                optionInput.type = 'radio';
                optionInput.name = currentQuestion.id;
                optionInput.value = option.value;
                optionInput.weight = option.weight;
                optionItem.appendChild(optionInput);

                const optionText = document.createElement('span');
                optionText.textContent = option.text;
                optionItem.appendChild(optionText);

                optionsList.appendChild(optionItem);

                // Ajouter un écouteur d'événement "click" sur chaque élément <li>
                optionItem.addEventListener('click', () => {

                    // Sélectionner l'élément input correspondant
                    const input = optionItem.querySelector('input[type="radio"]');

                    // Vérifier si le canvas actuel est différent du canvas correspondant à l'élément li cliqué
                    const canvas = optionItem.querySelector('canvas');
                    if (currentCanvas !== canvas) {
                        // Vider le canvas actuel si nécessaire
                        clearCanvas();

                        // Stocker la référence au nouveau canvas
                        currentCanvas = canvas;

                        //Lancer l'animation sur le nouveau canvas
                        startAnim(currentCanvas);
                    }

                    // Cocher l'élément input
                    input.checked = true;
                });

            });

            //On incrémente l'indice pour que lors de l'appui du bouton ce soit la bonne question qui soit chargé
            currentQuestionIndex++;

            if (currentQuestionIndex == questions.length) {
                buttonDesactived = true;
            }

            //Changement du fond d'écran
            currentBackground = images[counter];
            document.body.classList.add('random-background');
            document.body.style.backgroundImage = currentBackground;
            console.log(currentBackground);
            console.log('Je suis dans la fonction display');

            // Incrémenter le compteur pour afficher la prochaine image du tableau la prochaine fois que l'utilisateur clique sur le bouton
            counter++;

            // Si le compteur atteint la fin du tableau, remettre le compteur à zéro
            if (counter === images.length) {
                counter = 0;
            }

            // Mettre à jour la liste des éléments <li>
            listItems = document.querySelectorAll('li');

        }

        //Fais appel une première fois a la fonction créée plus haut pour afficher la première question
        displayNextQuestion();



        //Ajouter un listener sur le bouton suivant s'il n'y a plus de questions
        const nextButton = document.getElementById('next-button');
        nextButton.addEventListener('click', () => {

            //Vérifie si une question a été sélectionnée
            const selectedOption = document.querySelector(`input[name="${currentQuestion.id}"]:checked`);
            if (!selectedOption) {
                if (imgAlert.style.opacity === '0') {
                    imgAlert.style.opacity = '1';
                    bulleAlert.style.opacity = '1'
                }

                return;
            }

            if (imgAlert.style.opacity === '1') {
                imgAlert.style.opacity = '0';
                bulleAlert.style.opacity = '0'
            }

            document.body.classList.remove('random-background');

            const points = parseInt(selectedOption.weight);
            bestioles[selectedOption.value] += points;
            console.log(points);
            console.log(lieux);

            console.log('Je suis dans le bouton');
            console.log(buttonDesactived);

            if (!buttonDesactived) {
                displayNextQuestion();
            } else {
                nextButton.style.display = 'none';
                const resultButton = document.createElement('button');
                resultButton.id = 'resultButton';
                resultButton.textContent = 'Calcul du résultat';
                console.log('Je suis après la création du bouton');

                currentBackground = images[counter];
                document.body.classList.add('random-background');
                document.body.style.backgroundImage = currentBackground;
                console.log('le bouton est désactivé et un background a été tiré au sort : ' + currentBackground);

                resultButton.addEventListener('click', () => {
                    let maxPoints = 0;
                    let maxBestiole = '';

                    for (let bestiole in bestioles) {
                        if (bestioles[bestiole] > maxPoints) {
                            maxPoints = bestioles[bestiole];
                            maxBestiole = bestiole;
                        }
                    }

                    const url = `m.result_quizz_lieux.html?maxBestiole=${encodeURIComponent(maxBestiole)}`;

                    window.location.href = url;
                    /*const displayResult = document.getElementById('resultat');
                    displayResult.textContent = 'Votre lieu préféré est : ' + maxLieu;*/


                });
                const buttonContainer = document.getElementById('button-container');
                buttonContainer.appendChild(resultButton);
            }
        });

        // Fonction pour vider le canvas actuel
        function clearCanvas() {
            if (currentCanvas) {
                const context = currentCanvas.getContext('2d');
                context.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
            }
        }

    })
    .catch(error => console.error(error));