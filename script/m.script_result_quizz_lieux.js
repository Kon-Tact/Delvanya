const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const maxLieu = urlParams.get('maxLieu');
const img = document.querySelector('.img');
const head = document.querySelector('.head');
const corps = document.querySelector('.corps');
console.log(maxLieu);

switch (maxLieu) {
    case 'draerg':
        img.src = 'images/image_lieu+cadre.png';
        head.textContent = "Il semble que les falaises de Sino'one soient le territoire qui vous correspondent le mieux !";
        corps.textContent = "Les falaises de Sinoone sont connues pour leur concentration electromagnetique elevee, ce qui provoque parfois le detachement de grands morceaux de terre qui planent majestueusement dans les cieux. Les Delvagens, habitants de cette region, ont domestique une espece capable de faire s'elever des iles en produisant de la chaleur, ils planent ensuite ou bon leur semble en utilisant de grandes capes.";
        break;
    case 'falaise_de_sinoone':
        img.src = 'images/image_lieu+cadre.png';
        head.textContent = "Il semble que les falaises de Sino'one soient le territoire qui vous correspondent le mieux !";
        corps.textContent = "Les falaises de Sinoone sont connues pour leur concentration electromagnetique elevee, ce qui provoque parfois le detachement de grands morceaux de terre qui planent majestueusement dans les cieux. Les Delvagens, habitants de cette region, ont domestique une espece capable de faire s'elever des iles en produisant de la chaleur, ils planent ensuite ou bon leur semble en utilisant de grandes capes.";
        break;
    case 'village_dorighanh':
        img.src = 'images/image_lieu+cadre.png';
        head.textContent = "Il semble que les falaises de Sino'one soient le territoire qui vous correspondent le mieux !";
        corps.textContent = "Les falaises de Sinoone sont connues pour leur concentration electromagnetique elevee, ce qui provoque parfois le detachement de grands morceaux de terre qui planent majestueusement dans les cieux. Les Delvagens, habitants de cette region, ont domestique une espece capable de faire s'elever des iles en produisant de la chaleur, ils planent ensuite ou bon leur semble en utilisant de grandes capes.";
        break;
    case 'village_de_spaenha':
        img.src = 'images/image_lieu+cadre.png';
        head.textContent = "Il semble que les falaises de Sino'one soient le territoire qui vous correspondent le mieux !";
        corps.textContent = "Les falaises de Sinoone sont connues pour leur concentration electromagnetique elevee, ce qui provoque parfois le detachement de grands morceaux de terre qui planent majestueusement dans les cieux. Les Delvagens, habitants de cette region, ont domestique une espece capable de faire s'elever des iles en produisant de la chaleur, ils planent ensuite ou bon leur semble en utilisant de grandes capes.";
        break;
    case 'continent_des_origines':
        img.src = 'images/image_lieu+cadre.png';
        head.textContent = "Il semble que les falaises de Sino'one soient le territoire qui vous correspondent le mieux !";
        corps.textContent = "Les falaises de Sinoone sont connues pour leur concentration electromagnetique elevee, ce qui provoque parfois le detachement de grands morceaux de terre qui planent majestueusement dans les cieux. Les Delvagens, habitants de cette region, ont domestique une espece capable de faire s'elever des iles en produisant de la chaleur, ils planent ensuite ou bon leur semble en utilisant de grandes capes.";
        break;
    case 'forêt_de_tryshia':
        img.src = 'images/image_lieu+cadre.png';
        head.textContent = "Il semble que les falaises de Sino'one soient le territoire qui vous correspondent le mieux !";
        corps.textContent = "Les falaises de Sinoone sont connues pour leur concentration electromagnetique elevee, ce qui provoque parfois le detachement de grands morceaux de terre qui planent majestueusement dans les cieux. Les Delvagens, habitants de cette region, ont domestique une espece capable de faire s'elever des iles en produisant de la chaleur, ils planent ensuite ou bon leur semble en utilisant de grandes capes.";
        break;
    case 'archipel_des_ymhzah':
        img.src = 'images/image_lieu+cadre.png';
        head.textContent = "Il semble que les falaises de Sino'one soient le territoire qui vous correspondent le mieux !";
        corps.textContent = "Les falaises de Sinoone sont connues pour leur concentration electromagnetique elevee, ce qui provoque parfois le detachement de grands morceaux de terre qui planent majestueusement dans les cieux. Les Delvagens, habitants de cette region, ont domestique une espece capable de faire s'elever des iles en produisant de la chaleur, ils planent ensuite ou bon leur semble en utilisant de grandes capes.";
        break;
    default:
        img.src = 'images/image_lieu+cadre.png';
        head.textContent = "Il semble que les falaises de Sino'one soient le territoire qui vous correspondent le mieux !";
        corps.textContent = "Les falaises de Sinoone sont connues pour leur concentration electromagnetique elevee, ce qui provoque parfois le detachement de grands morceaux de terre qui planent majestueusement dans les cieux. Les Delvagens, habitants de cette region, ont domestique une espece capable de faire s'elever des iles en produisant de la chaleur, ils planent ensuite ou bon leur semble en utilisant de grandes capes.";
        break;
}

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const image = new Image();
var visibility = true;

// Listener sur le bouton pour afficher la zone de texte pour entrer le pseudo
const downloadButton = document.querySelector('.download_btn');
downloadButton.addEventListener('click', () => {
    if (visibility) {
        const askpseudo = document.querySelector('.ask_pseudo');
        askpseudo.classList.remove('hidden_ask');
        const noBtn = document.querySelector('.no_btn');
        const yesBtn = document.querySelector('.yes_btn');
        noBtn.addEventListener('click', () => {
            const pseudo = '';
            drawModifiedImage(pseudo);
            askpseudo.classList.add('hidden_ask');
        });
        yesBtn.addEventListener('click', () => {
            askpseudo.classList.add('hidden_ask');
            showPseudoContainer();
            visibility = false;
        });
    } else {
        return;
    }

});

// Fonction pour afficher la zone de texte pour entrer le pseudo
function showPseudoContainer() {
    const pseudoContainer = document.querySelector('.pseudo_container');
    pseudoContainer.classList.remove('hidden');
    const input = document.querySelector('.pseudo_holder');
    input.addEventListener('focus', () => {
        input.placeholder = '';
    });
    input.addEventListener('blur', () => {
        input.placeholder = 'Entrez votre pseudo';
    });
};

// Fonction pour cacher la zone de texte pour entrer le pseudo
function hidePseudoContainer() {
    const pseudoContainer = document.querySelector('.pseudo_container');
    pseudoContainer.classList.add('hidden');
};

function drawModifiedImage(pseudo) {
    visibility = true;
    canvas.width = image.width;
    canvas.height = image.height;

    context.drawImage(image, 0, 0);

    context.font = 'bold 40px sketched_font';
    context.fillStyle = 'black';
    const text = pseudo;
    const textWidth = context.measureText(text).width;
    const textX = 50; // 10 pixels de marge
    const textY = canvas.height - 50; // 10 pixels de marge
    context.fillText(text, textX, textY);

    const downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.download = 'resultat_quizz_provenance.png';
    downloadLink.click();
};

image.src = 'images/falaise.png';

// Listener sur le bouton de validation du pseudo
const submitPseudoButton = document.querySelector('.submit_pseudo_btn');
submitPseudoButton.addEventListener('click', () => {
    const pseudoInput = document.querySelector('input[type="text"]');
    const pseudo = pseudoInput.value.trim();

    if (pseudo) {
        hidePseudoContainer();
        drawModifiedImage(pseudo);
    } else {
        alert('Veuillez entrer un pseudo valide.');
    }
});


