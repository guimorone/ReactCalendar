import React from 'react';

export const Day = ({ day, onClick }) => {
  const countEvents = day.events?.length || 0;
  const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
  return (
    <div onClick={onClick} className={className}>
      {day.value === 'padding' ? '' : day.value}

      {day.events &&
        day.events.map((event, index) => {
          if (countEvents >= 3 && index >= 3) return null;

          return (
            <div className="event" key={`day-event-${index}`}>
              {event.title}
            </div>
          );
        })}
    </div>
  );
};
