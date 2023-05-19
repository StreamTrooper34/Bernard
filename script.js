// Fonction pour ajouter un nom et un point
function ajouterNom() {
  var nameInput = document.getElementById('nameInput');
  var name = nameInput.value;

  if (name) {
    var existingNames = JSON.parse(localStorage.getItem('names')) || [];
    existingNames.push({ name: name, points: 0 });
    localStorage.setItem('names', JSON.stringify(existingNames));

    nameInput.value = '';
    afficherNoms();
  }
}

// Fonction pour récupérer les noms et les points du localStorage et les afficher
function afficherNoms() {
  var namesList = document.getElementById('namesList');
  namesList.innerHTML = '';

  var existingNames = JSON.parse(localStorage.getItem('names')) || [];
  existingNames.forEach(function (item) {
    var listItem = document.createElement('div');
    listItem.classList.add('name');

    var nameSpan = document.createElement('span');
    nameSpan.textContent = item.name;
    listItem.appendChild(nameSpan);

    var pointsSpan = document.createElement('span');
    pointsSpan.textContent = item.points;
    listItem.appendChild(pointsSpan);

    var addButton = document.createElement('button');
    addButton.textContent = '+1';
    addButton.addEventListener('click', function () {
      item.points++;
      afficherNoms();
    });
    listItem.appendChild(addButton);

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.addEventListener('click', function () {
      existingNames = existingNames.filter(function (i) {
        return i.name !== item.name;
      });
      localStorage.setItem('names', JSON.stringify(existingNames));
      afficherNoms();
    });
    listItem.appendChild(deleteButton);

    namesList.appendChild(listItem);
  });
}

// Charger les noms et les points lors du chargement de la page
window.addEventListener('load', function () {
  afficherNoms();
});

// Sauvegarder les données dans le localStorage avant de quitter la page
window.addEventListener('beforeunload', function (event) {
  var existingNames = JSON.parse(localStorage.getItem('names')) || [];
  localStorage.setItem('names', JSON.stringify(existingNames));
});