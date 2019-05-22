import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Children, ReactElement, cloneElement } from 'react';
import BigCalendar, { Components } from 'react-big-calendar';
import moment from 'moment';

type MyEvent = {
  kind: 'first' | 'second' | 'third';
  title: string;
  start: Date;
  end: Date;
};

export default class App extends React.Component {
  render() {
    const localizer = BigCalendar.momentLocalizer(moment);
    const events: MyEvent[] = [
      {
        kind: 'first',
        title: 'Three to four',
        start: moment().startOf('day').set({ hour: 3 }).toDate(),
        end: moment().startOf('day').set({ hour: 4 }).toDate(),
      },
      {
        kind: 'second',
        title: 'Five to six',
        start: moment().startOf('day').set({ hour: 5 }).toDate(),
        end: moment().startOf('day').set({ hour: 6 }).toDate(),
      },
      {
        kind: 'third',
        title: 'Seven to nine',
        start: moment().startOf('day').set({ hour: 7 }).toDate(),
        end: moment().startOf('day').set({ hour: 9 }).toDate(),
      },
      {
        kind: 'first',
        title: 'Ten to twelve',
        start: moment().startOf('day').set({ hour: 10 }).toDate(),
        end: moment().startOf('day').set({ hour: 12 }).toDate(),
      },
      {
        kind: 'second',
        title: 'Evening',
        start: moment().startOf('day').set({ hour: 16 }).toDate(),
        end: moment().startOf('day').set({ hour: 20 }).toDate(),
      },
      {
        kind: 'third',
        title: 'Night',
        start: moment().startOf('day').set({ hour: 20 }).toDate(),
        end: moment().endOf('day').toDate(),
      },
    ];

    const components: Components<MyEvent> = {
      eventWrapper: props => {
        const child = Children.only(props.children) as ReactElement;
        return cloneElement(child, { className: child.props.className + ' ' + props.event.kind });
      },
    };

    return (
      <BigCalendar<MyEvent>
        localizer={localizer}
        events={events}
        defaultView="week"
        components={components}
      />
    );
  }
};
