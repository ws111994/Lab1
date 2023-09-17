function goToIndex() {
    window.location.href = 'index.html';
}
function Note(text, optionalId) {
    this.text = text;
    this.generateUniqueID = function() {
        let lastID = parseInt(localStorage.getItem('lastID')) || 0;
        lastID++;
        localStorage.setItem('lastID', lastID.toString());
        return lastID;
    };
    this.id = optionalId || this.generateUniqueID();
    this.textarea = document.createElement('textarea');
    this.textarea.value = text;
    this.textarea.addEventListener('input', ()=> {
        notes = notes.filter(obj => obj.id !== this.id);
        this.text = this.textarea.value;
        notes.push(this);
        saveNotes();
        console.log("text property changed to: " + this.text);
    })
    this.removeButton = document.createElement('button');
    this.removeButton.textContent = 'Remove';
    this.removeButton.className = 'remove-button';
    this.removeButton.addEventListener('click', ()=> {
        notesContainer.removeChild(this.textarea);
        notesContainer.removeChild(this.removeButton);
        notes = notes.filter(obj => obj.id !== this.id);
        saveNotes();
    });
    this.addToDOM = function(container) {
        container.appendChild(this.textarea);
        container.appendChild(this.removeButton);
        console.log("adding to DOM");
    };
    this.addToNotes = function(localNotes) {
        localNotes.push(this);
    };
    this.addOnlyText = function(container) {
        container.appendChild(this.textarea);
    }
}

function retrieveNotes() {
    const notesContainer = document.getElementById('notesContainer');
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

    notesContainer.innerHTML = '';

    savedNotes.forEach(note => {
        let newNote = new Note(note.text, note.id);
        newNote.addOnlyText(notesContainer);
        // const div = document.createElement('div');
        // div.className = "reader";
        // div.textContent = note.text;
        // notesContainer.appendChild(div);
    });

    const lastRetrieved = new Date().toLocaleTimeString();
    document.getElementById('lastRetrieved').textContent = 'Last retrieved: ' + lastRetrieved;
}

// Load and periodically retrieve notes every 2 seconds
window.onload = function() {
    retrieveNotes();
    setInterval(retrieveNotes, 2000);
};
