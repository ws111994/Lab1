const promptString = 'Enter your note here...';
const lastSavedString = 'Last saved: ';
function addNote() {
    const notesContainer = document.getElementById('notesContainer');
    const textarea = document.createElement('textarea');
    textarea.placeholder = promptString;
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';
    
    removeButton.addEventListener('click', function() {
        notesContainer.removeChild(textarea);
        notesContainer.removeChild(removeButton);
        saveNotes();
    });
    
    notesContainer.appendChild(textarea);
    notesContainer.appendChild(removeButton);
    saveNotes();
}

function saveNotes() {
    const notes = [];
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        notes.push(textarea.value);
    });
    
    localStorage.setItem('notes', JSON.stringify(notes));
    const lastSaved = new Date().toLocaleTimeString();
    document.getElementById('lastSaved').textContent = lastSavedString + lastSaved;
}

function goToIndex() {
    window.location.href = 'index.html';
}

// Load existing notes on page load
window.onload = function() {
    const notesContainer = document.getElementById('notesContainer');
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    
    savedNotes.forEach(note => {
        const textarea = document.createElement('textarea');
        textarea.value = note;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';
        
        removeButton.addEventListener('click', function() {
            notesContainer.removeChild(textarea);
            notesContainer.removeChild(removeButton);
            saveNotes();
        });
        
        notesContainer.appendChild(textarea);
        notesContainer.appendChild(removeButton);
    });
    
    saveNotes();
    
    // Periodically save notes every 2 seconds
    setInterval(saveNotes, 2000);
};
