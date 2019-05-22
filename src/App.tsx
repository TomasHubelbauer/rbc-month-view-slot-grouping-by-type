import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

export default class App extends React.Component {
  render() {
    const localizer = BigCalendar.momentLocalizer(moment);
    const events = [
      {
        title: 'Three to four',
        start: moment().startOf('day').set({ hour: 3 }).toDate(),
        end: moment().startOf('day').set({ hour: 4 }).toDate(),
      },
      {
        title: 'Five to six',
        start: moment().startOf('day').set({ hour: 5 }).toDate(),
        end: moment().startOf('day').set({ hour: 6 }).toDate(),
      },
      {
        title: 'Seven to nine',
        start: moment().startOf('day').set({ hour: 7 }).toDate(),
        end: moment().startOf('day').set({ hour: 9 }).toDate(),
      },
      {
        title: 'Ten to twelve',
        start: moment().startOf('day').set({ hour: 10 }).toDate(),
        end: moment().startOf('day').set({ hour: 12 }).toDate(),
      },
      {
        title: 'Evening',
        start: moment().startOf('day').set({ hour: 16 }).toDate(),
        end: moment().startOf('day').set({ hour: 20 }).toDate(),
      },
      {
        title: 'Night',
        start: moment().startOf('day').set({ hour: 20 }).toDate(),
        end: moment().endOf('day').toDate(),
      },
    ];

    return (
      <BigCalendar
        localizer={localizer}
        events={events}
        defaultView="week"
      />
    );
  }
};
