/* Gestionnaire de Contact */

//Variables, contacts et tableau les contenant
// Options du programme
let choix = document.getElementById('selection');
let btnChoix = document.getElementById('valider');
// Formulaire d'ajout de contact
let formulaire = document.getElementById('ajoutContact');
let formPrenom = document.getElementById('firstName');
let formNom = document.getElementById('lastName');
let formBtn = document.getElementById('tdButton');
// Liste de suppression
let listeSuppresion = document.getElementById('suppresionContact');
let Supprbtn = document.getElementById('supprimer');
// Affichage de contact
let affichageDesContacts = document.querySelector('#contacts');

//Instanciation des objets Contact
const contact1 = new Contact('Lévisse', 'Carole');
const contact2 = new Contact('Nelsonne', 'Mélodie');
const contact3 = new Contact('Vallot', 'Christophe');
// tableau d'objets Contact
const contacts = [contact1, contact2];
contacts.push(contact3);

// Ajout d'un écouteur sur le bouton de choix
btnChoix.addEventListener('click', executerChoix);

function executerChoix() {
  let valeur = choix.value; // Je récupère la valeur de l'option active sur le select
  console.log(choix);

  switch (valeur) {
    case '0': // Quitter la page
      if (window.confirm('Êtes-vous sûr de vouloir quitter ?')) {
        window.close()
      }
      break
    case '1': // Affichage des contacts
      affichageDesContacts.innerHTML =
        '<h2>Voici la liste de tous les contacts :</h2>'
      // boucle d'affichage des contacts
      contacts.forEach(function (contact) {
        // Appel de la méthode d'affichage du contact pour chaque objet Contact
        affichageDesContacts.innerHTML += contact.afficheContact()
      })
      afficher(affichageDesContacts);
      masquer(formulaire);
      masquer(listeSuppresion);
      masquer(Supprbtn);
      break
    case '2': // Formulaire d'ajout de contacts 
      afficher(formulaire);
      masquer(affichageDesContacts);
      masquer(listeSuppresion);
      masquer(Supprbtn);
      formBtn.addEventListener('click', ajouterContact);
      break
    case '3': // Liste de supression
      afficher(listeSuppresion);
      afficher(Supprbtn);
      masquer(affichageDesContacts);
      masquer(formulaire);
      // Boucle d'affichage dans le select (options html)
      listerContact();
      Supprbtn.addEventListener('click', supprimerContact);
      break
  }
};

formBtn.addEventListener('click', ajouterContact);

/* Fonctions créer du pour la page */
// Masquer un élément
function masquer(e) {
  e.style.display = 'none';
};

// Afficher un élément
function afficher(e) {
  e.style.display = 'block';
};

// Ajouter un contact dans le tableau contacts
function ajouterContact() {
  let nom = formNom.value;
  let prenom = formPrenom.value;
  if (nom === "" || prenom === "") { //Triple égale check la valeur et le type de l'élément
    alert("Veuiller insérer un nom et prénom valide.");
  } else {

    const nouveauContact = new Contact(nom, prenom);
    nouveauContact.ajouteContact(contacts);
    alert('le contact ' + prenom + ' ' + nom + ' a été ajouté');
  };
};

// Affiche la liste des contacts existant dans le select de suppresion
function listerContact() {
  listeSuppresion.innerHTML = ""; // réinitilise la liste des contact dans la suppression
  for (let i = 0; i < contacts.length; i++) {
    listeSuppresion.innerHTML += '<option value=' + i + '>' + contacts[i].afficheContact() + '</option>';
  };
};

// Supprime un contact dans le tableau contacts
function supprimerContact() {
  let indexContact = listeSuppresion.value
  contacts.splice(indexContact, 1);
  alert('Le contact à bien était supprimé');
};