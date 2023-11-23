import React, { useState, useEffect } from 'react';
import { CalendarHeader } from '../CalendarHeader';
import { Day } from '../Day';
import { EventModal } from '../EventModal';
import { useDate } from '../hooks/useDate';

export const App = () => {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []
  );

  const eventsForDate = date => events.filter(e => e.date === date);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const { days, dateDisplay } = useDate(events, nav);

  return (
    <>
      <div id="container">
        <CalendarHeader dateDisplay={dateDisplay} onNext={() => setNav(nav + 1)} onBack={() => setNav(nav - 1)} />

        <div id="weekdays">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>

        <div id="calendar">
          {days.map((d, index) => (
            <Day
              key={index}
              day={d}
              onClick={() => {
                if (d.value !== 'padding') setClicked(d.date);
              }}
            />
          ))}
        </div>
      </div>
      {clicked && (
        <EventModal
          events={eventsForDate(clicked)}
          onClose={() => setClicked(null)}
          onSave={title => setEvents([...events, { title, date: clicked }])}
          onDelete={title => setEvents(events.filter(e => e.title !== title))}
        />
      )}
    </>
  );
};
