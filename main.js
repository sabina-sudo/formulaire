let inscription = document.querySelector("button");
// console.log(inscription);
let person;
let personModif;

let index;
let panier = document.getElementById("etudiant");
let changerBtn = document.getElementById("changer");
let supprimerBtn=document.getElementById("supprimer")
/********remplissage du tableau*************** */
let listStudent = retourDonnees("personnes");

function formulaire(e) {
  e.preventDefault();
  // Get the value of the input field with id="case1"
  let fname = document.getElementById("case1").value;
  let lname = document.getElementById("case2").value;
  let email = document.getElementById("case3").value;
  let numero = document.getElementById("case4").value;
  let gender = document.getElementById("gender").value;
  // Create an Object
  person = {
    firstName: fname,
    lastName: lname,
    email: email,
    phone: numero,
    gender: gender,
  };

  // console.log(person);

  listStudent.push(person);

  stockage("personnes", listStudent);

  afficher();
  // console.log(listStudent);

  document.getElementById("case1").value = "";
  document.getElementById("case2").value = "";
  document.getElementById("case3").value = "";
  document.getElementById("case4").value = "";
  document.getElementById("gender").value = "";
}

afficher();

function formulaireModifier(e) {
  e.preventDefault();
  // Get the value of the input field with id="case1"
  let fnamemodif = document.getElementById("fnamemodif").value;
  let lnamemodif = document.getElementById("lnamemodif").value;
  let mailmodif = document.getElementById("mailmodif").value;
  let phonemodif = document.getElementById("phonemodif").value;
  let gendermodif = document.getElementById("gendermodif").value;
  // Create an Object
  personModif = {
    firstName: fnamemodif,
    lastName: lnamemodif,
    email: mailmodif,
    phone: phonemodif,
    gender: gendermodif,
  };

  index = changerBtn.dataset["index"]
  modifier("personnes", personModif, index)

  // console.log(person);

  // listStudent.push(personModif);

  // stockage("personnes", listStudent);

  // afficher();
  // console.log(listStudent);
  modal.style.display = "none";
  location.reload(); 
}

afficher();


/************afficher les elements************** */

function afficher() {
  panier.innerHTML = "";
  for (let i = 0; i < listStudent.length; i++) {
    const element = document.createElement("li");
    element.dataset.number = i;
    element.style.margin = "2%";
    element.style.padding = "2%";
    element.innerText =
      listStudent[i].firstName + " " + listStudent[i].lastName;

    // When the user clicks on the button, open the modal
    // element.onclick = function () {
    //   modal.style.display = "block";
    // };
    element.addEventListener("click", function () {
      modal.style.display = "block";

      changerBtn.dataset.index = this.dataset["number"]
      supprimerBtn.dataset.index = this.dataset["number"]

      console.log(this.dataset["number"]);
      console.log(listStudent[this.dataset["number"]]);

      let objtModif = listStudent[this.dataset["number"]];

      document.getElementById("fnamemodif").value = objtModif.firstName;
      document.getElementById("lnamemodif").value = objtModif.lastName;
      document.getElementById("mailmodif").value = objtModif.email;
      document.getElementById("phonemodif").value = objtModif.phone;
      document.getElementById("gendermodif").value = objtModif.gender;
    });

    panier.appendChild(element);
    // console.log(element);
  }
}

/************debut stockage de données********** */

function stockage(key, value) {
  // ajout dans le localstorage
  let myJSON = JSON.stringify(value);
  localStorage.setItem(key, myJSON);
}

function retourDonnees(key) {
  // verif si localstorage contient des données retourn ses données sinon elle retourne un tableau vide
  return JSON.parse(localStorage.getItem(key)) || [];
}

function modifier(key, objetModifier, index) {
  // modif un objet dans le localstorage
  let donnees = retourDonnees(key);
  donnees[index] = objetModifier;
  stockage(key, donnees);
}
/**********supprimer un élément**************** */
function supprimer(e){
  e.preventDefault();
  let donnees = retourDonnees("personnes");
  index =supprimerBtn.dataset["index"];
  console.log(index);
  donnees.splice(index,1)
  stockage("personnes", donnees)
  modal.style.display = "none";
  location.reload(); 
}

// let obj = {"firstName":"mariem","lastName":"mariem","email":"","phone":"","gender":"Male"}
// modifier("personnes",obj, 2)
// afficher()

/************fin stockage de données********** */

/************* debut Modal**************** */

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

/************* fin Modal**************** */

inscription.addEventListener("click", formulaire);
changerBtn.addEventListener("click", formulaireModifier);
supprimerBtn.addEventListener("click",supprimer);

