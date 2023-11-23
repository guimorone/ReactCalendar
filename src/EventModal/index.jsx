import React, { useState } from 'react';

export const EventModal = ({ events, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(false);

  return (
    <>
      <div className="modal">
        <h2>Events</h2>
        {events && (
          <div className="eventsContainer">
            {events?.map((event, index) => (
              <div className="eventText" key={`event-modal-${index}`}>
                {event.title}
                <button onClick={() => onDelete(event.title)} className="deleteButton">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          className={error ? 'error' : ''}
          value={title}
          onChange={e => setTitle(e.target.value)}
          id="eventTitleInput"
          placeholder="Event Title"
        />
        <button
          onClick={() => {
            if (title) {
              setError(false);
              onSave(title);
              setTitle('');
            } else setError(true);
          }}
          id="saveButton"
        >
          Save
        </button>

        <button onClick={onClose} id="cancelButton">
          Close
        </button>
      </div>
      <div id="modalBackDrop" />
    </>
  );
};
