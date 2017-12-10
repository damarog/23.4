import React, { PropTypes } from 'react';
import Note from './Note';

const Notes = ({ notes }) => {
  return (<ul className="notes">{notes.map((note) =>
    <Note
      id={note.id}
      key={note.id}
      editing={note.editing}>
      <Edit
        editing={note.editing}
        value={note.task}
        onValueClick={() => onValueClick(note.id)}
        onEdit={() => onEdit(note.id)}
        onDelete={() => onDelete(note.id)}
      />
    </Note>
  )}</ul>);
};

Notes.propTypes = {
  notes: PropTypes.array
};

export default Notes;