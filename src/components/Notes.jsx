import React, { useEffect, useRef, createRef } from 'react';
import Note from './Note';

const Notes = ({ notes, setNotes }) => {
    const noteRefs = useRef([]);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(savedNotes);
    }, [setNotes]);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        const updatedNotes = notes.map((note) => {
            const savedNote = savedNotes.find((n) => n.id === note.id);
            if (savedNote) {
                return { ...note, position: savedNote.position };
            } else if (!note.position) {
                const position = determineNewPosition();
                return { ...note, position };
            }
            return note;
        });

        if (JSON.stringify(updatedNotes) !== JSON.stringify(notes)) {
            setNotes(updatedNotes);
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
        }
    }, [notes, setNotes]);

    const determineNewPosition = () => {
        const maxX = window.innerWidth - 250;
        const maxY = window.innerHeight - 250;

        return {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY),
        };
    };

    const handleDragStart = (note, e) => {
        const { id: noteId } = note;
        const noteRef = noteRefs.current[noteId].current;
        const rect = noteRef.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        const startPos = note.position;

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);

            const finalRect = noteRef.getBoundingClientRect();
            const newPosition = { x: finalRect.left, y: finalRect.top };

            if (checkForOverlap(noteId)) {
                noteRef.style.left = `${startPos.x}px`;
                noteRef.style.top = `${startPos.y}px`;
            } else {
                updateNotePosition(noteId, newPosition);
            }
        };

        const handleMouseMove = (e) => {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;

            noteRef.style.left = `${newX}px`;
            noteRef.style.top = `${newY}px`;
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const checkForOverlap = (id) => {
        const currentNoteRef = noteRefs.current[id].current;
        const currentRect = currentNoteRef.getBoundingClientRect();

        return notes.some((note) => {
            if (note.id === id) return false;

            const otherNoteRef = noteRefs.current[note.id].current;
            const otherRect = otherNoteRef.getBoundingClientRect();

            const overlap = !(
                currentRect.right < otherRect.left ||
                currentRect.left > otherRect.right ||
                currentRect.bottom < otherRect.top ||
                currentRect.top > otherRect.bottom
            );

            return overlap;
        });
    };

    const updateNotePosition = (id, newPosition) => {
        const updatedNotes = notes.map(
            note => note.id === id
                ? { ...note, position: newPosition }
                : note
        );
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    const removeNote = (id) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    return (
        <div>
            {notes.map((note) => (
                <Note
                    ref={
                        noteRefs.current[note.id] ||
                        (noteRefs.current[note.id] = createRef())
                    }
                    key={note.id}
                    note={note}
                    onMouseDown={(e) => handleDragStart(note, e)}
                    onRemove={removeNote}
                />
            ))}
        </div>
    );
};

export default Notes;
