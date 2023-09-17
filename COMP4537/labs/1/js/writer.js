const lastSavedString = 'Last saved: ';
const notesContainer = document.getElementById('notesContainer');
let notes = JSON.parse(localStorage.getItem('notes')) || [];
function addNote() {
    
    // saveNotes();
    let newNote = new Note(null);
    //notes.push(newNote)
    newNote.addToDOM(notesContainer);
    newNote.addToNotes(notes);
    console.log(notes);
}

function Note(text, optionalId) {
    this.text = text;
    this.generateUniqueID = function() {
        // Retrieve the last assigned ID from local storage or initialize it
        let lastID = parseInt(localStorage.getItem('lastID')) || 0;
        
        // Increment the ID for the new object
        lastID++;
        
        // Store the updated ID in local storage
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

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
    const lastSaved = new Date().toLocaleTimeString();
    document.getElementById('lastSaved').textContent = lastSavedString + lastSaved;
   
}

function goToIndex() {
    window.location.href = 'index.html';
}

// Load existing notes on page load
window.onload = function() {
    //localStorage.clear();
    const notesContainer = document.getElementById('notesContainer');
    notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        console.log(note);
        let newNote = new Note(note.text, note.id);
        newNote.addToDOM(notesContainer);
    });

    
    // Periodically save notes every 2 seconds
    setInterval(saveNotes, 2000);
};
