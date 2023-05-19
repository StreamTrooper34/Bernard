document.addEventListener('DOMContentLoaded', function() {
  var ajouterForm = document.getElementById('ajouter-form');
  ajouterForm.addEventListener('submit', ajouterNom);
  
  afficherNoms();
});

function ajouterNom(e) {
  e.preventDefault();
  
  var nomInput = document.getElementById('nom-input');
  var nom = nomInput.value.trim();
  
  if (nom !== '') {
    var existingNoms = JSON.parse(localStorage.getItem('noms')) || [];
    existingNoms.push({ nom: nom, points: 0 });
    localStorage.setItem('noms', JSON.stringify(existingNoms));
  
    nomInput.value = '';
    afficherNoms();
  }
}

function afficherNoms() {
  var nomsListe = document.getElementById('noms-liste');
  nomsListe.innerHTML = '';

  var existingNoms = JSON.parse(localStorage.getItem('noms')) || [];

  existingNoms.forEach(function(nomObj) {
    var nomItem = document.createElement('div');
    nomItem.classList.add('nom-item');

    var nomSpan = document.createElement('span');
    nomSpan.classList.add('nom');
    nomSpan.textContent = nomObj.nom;

    var pointsSpan = document.createElement('span');
    pointsSpan.classList.add('points');
    pointsSpan.textContent = nomObj.points;

    var incrementBtn = document.createElement('button');
    incrementBtn.classList.add('btn');
    incrementBtn.textContent = '+1';
    incrementBtn.addEventListener('click', function() {
      incrementerPoints(nomObj);
    });

    var supprimerBtn = document.createElement('button');
    supprimerBtn.classList.add('btn');
    supprimerBtn.textContent = 'Supprimer';
    supprimerBtn.addEventListener('click', function() {
      supprimerNom(nomObj);
    });

    nomItem.appendChild(nomSpan);
    nomItem.appendChild(pointsSpan);
    nomItem.appendChild(incrementBtn);
    nomItem.appendChild(supprimerBtn);

    nomsListe.appendChild(nomItem);
  });
}

function incrementerPoints(nomObj) {
  nomObj.points++;
  var existingNoms = JSON.parse(localStorage.getItem('noms')) || [];
  localStorage.setItem('noms', JSON.stringify(existingNoms));
  afficherNoms();
}

function supprimerNom(nomObj) {
  var existingNoms = JSON.parse(localStorage.getItem('noms')) || [];
  var index = existingNoms.findIndex(function(nom) {
    return nom.nom === nomObj.nom;
  });

  if (index !== -1) {
    existingNoms.splice(index, 1);
    localStorage.setItem('noms', JSON.stringify(existingNoms));
    afficherNoms();
  }
}
