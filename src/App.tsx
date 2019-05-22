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
  private static readonly localizer = BigCalendar.momentLocalizer(moment);

  private static readonly events: MyEvent[] = [
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

  private static readonly components: Components<MyEvent> = {
    eventWrapper: props => {
      const child = Children.only(props.children) as ReactElement;
      return cloneElement(child, { className: child.props.className + ' ' + props.event.kind });
    },
    month: {
      // Compute representative events
      dateCellWrapper: (props: any) => {
        const child = Children.only(props.children) as ReactElement;
        const events = App.events.filter(e => {
          const dayStart = moment(props.value).startOf('day');
          const dayEnd = moment(props.value).endOf('day');
          return moment(e.start).isBetween(dayStart, dayEnd) || moment(e.end).isBetween(dayStart, dayEnd);
        });

        const firsts = events.filter(e => e.kind === 'first');
        const seconds = events.filter(e => e.kind === 'second');
        const thirds = events.filter(e => e.kind === 'third');
        const children = (
          <>
            {firsts.length > 0 && <div className="firsts">First kind: {firsts.length}</div>}
            {seconds.length > 0 && <div className="seconds">Second kind: {seconds.length}</div>}
            {thirds.length > 0 && <div className="thirds">Third kind: {thirds.length}</div>}
          </>
        );

        return cloneElement(child, { children });
      },
      // Hide the actual events
      eventWrapper: () => null,
    } as any, // TODO: PR
  };

  render() {
    return (
      <BigCalendar<MyEvent>
        localizer={App.localizer}
        events={App.events}
        components={App.components}
      />
    );
  }
};
