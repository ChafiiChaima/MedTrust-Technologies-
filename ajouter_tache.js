function enregistrerTache() {

    let projet = document.getElementById("projet").value;
    let client = document.getElementById("client").value;
    let tache = document.getElementById("tache").value;
    let date = document.getElementById("date").value;
    let charge = document.getElementById("charge").value;
    let debut = document.getElementById("debut").value;
    let fin = document.getElementById("fin").value;

    // ❌ Vérification des champs vides
    if (
        projet === "" ||
        client === "" ||
        tache === "" ||
        date === "" ||
        charge === "" ||
        debut === "" ||
        fin === ""
    ) {
        alert("Veuillez remplir tous les champs !");
        return; // stop la fonction
    }

    let nouvelleTache = {
        projet: projet,
        client: client,
        tache: tache,
        date: date,
        charge: charge,
        debut: debut,
        fin: fin
    };

    let liste =
    JSON.parse(localStorage.getItem("taches")) || [];

    liste.push(nouvelleTache);

    localStorage.setItem(
        "taches",
        JSON.stringify(liste)
    );

    window.location.href = "tableau_bord.html";
}


function startVoice() {

    const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Ton navigateur ne supporte pas la reconnaissance vocale");
        return;
    }

    const recognition =
    new SpeechRecognition();

    recognition.lang = "fr-FR";

    recognition.start();

    recognition.onresult = function(event) {

        const text =
        event.results[0][0].transcript;

        document.getElementById("tache").value =
        text;
    };

    recognition.onerror = function() {

        alert("Erreur de reconnaissance vocale");
    };
}