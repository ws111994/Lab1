function goToIndex() {
    window.location.href = 'index.html';
}


function retrieveNotes() {
    const notesContainer = document.getElementById('notesContainer');
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

    notesContainer.innerHTML = '';

    savedNotes.forEach(note => {
        const div = document.createElement('div');
        div.className = "reader";
        div.textContent = note.text;
        notesContainer.appendChild(div);
    });

    const lastRetrieved = new Date().toLocaleTimeString();
    document.getElementById('lastRetrieved').textContent = 'Last retrieved: ' + lastRetrieved;
}

// Load and periodically retrieve notes every 2 seconds
window.onload = function() {
    retrieveNotes();
    setInterval(retrieveNotes, 2000);
};
