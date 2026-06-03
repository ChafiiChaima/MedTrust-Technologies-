const recherche = document.getElementById("projetRecherche");

recherche.addEventListener("change", function(){

    const texte = this.value.toLowerCase();

    const lignes =
    document.querySelectorAll("#listeTaches tr");

    lignes.forEach(function(ligne){

        const projet =
        ligne.cells[0].textContent.toLowerCase();

        if(texte === "" || projet === texte){
            ligne.style.display = "";
        }
        else{
            ligne.style.display = "none";
        }

    });

});
function chargerListeProjets() {

    let liste =
    JSON.parse(localStorage.getItem("taches")) || [];

    let select =
    document.getElementById("projetRecherche");

    select.innerHTML =
    '<option value="">-- Choisir un projet --</option>';

    let projetsUniques = [];

    liste.forEach(function(t){

        if(!projetsUniques.includes(t.projet)){

            projetsUniques.push(t.projet);

            let option =
            document.createElement("option");

            option.value = t.projet;
            option.textContent = t.projet;

            select.appendChild(option);
        }
    });
}

window.onload = function(){
    chargerListeProjets();
    afficherTaches();
};
function calculerDuree(debut, fin){

    let h1 = debut.split(":");
    let h2 = fin.split(":");

    let debutMinutes =
        parseInt(h1[0])*60 +
        parseInt(h1[1]);

    let finMinutes =
        parseInt(h2[0])*60 +
        parseInt(h2[1]);

    let duree = finMinutes - debutMinutes;

    let heures = Math.floor(duree/60);
    let minutes = duree%60;

    return heures + "h " + minutes + "min";
}

function afficherTaches(){

    let liste =
        JSON.parse(localStorage.getItem("taches")) || [];

    let html = "";

    liste.forEach(function(t,i){

        let duree =
            calculerDuree(t.debut,t.fin);

        html += `
        <tr>
            <td>${t.projet}</td>
            <td>${t.client}</td>
            <td>${t.tache}</td>
            <td>${t.date}</td>
            <td>${t.charge}</td>
            <td>${t.debut}</td>
            <td>${t.fin}</td>
            <td>${duree}</td>

            <td>
                <button onclick="supprimerTache(${i})">
                    Supprimer
                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById("listeTaches").innerHTML =
        html;
}

function supprimerTache(index){

    if(confirm("Voulez-vous supprimer cette tâche ?")){

        let liste =
            JSON.parse(localStorage.getItem("taches")) || [];

        liste.splice(index,1);

        localStorage.setItem(
            "taches",
            JSON.stringify(liste)
        );

        afficherTaches();
    }
}

afficherTaches();