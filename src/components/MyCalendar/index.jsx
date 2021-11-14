//import Calendar from 'react-awesome-calendar';
import Calendar from './JCal';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
const MyCalendar = () => {
    const events = [{
        id: 1,
        //color: '#fd3153',
        from: '1400-09-24T18:00:00+00:00',
        to: '1400-09-25T19:00:00+00:00',
        title: 'This is an event'
    }, {
        id: 2,
        //color: '#1ccb9e',
        from: '2019-05-01T13:00:00+00:00',
        to: '2019-05-05T14:00:00+00:00',
        title: 'This is another event'
    }, {
        id: 3,
        //color: '#3694DF',
        from: '2019-05-05T13:00:00+00:00',
        to: '2019-05-05T20:00:00+00:00',
        title: 'This is also another event'
    }];

    const cacheRtl = createCache({
        key: 'muirtl',
    
        stylisPlugins: [rtlPlugin],
    
        prepend: true,
      });

    return (
        <CacheProvider value={cacheRtl}>
            <div dir="rtl">
                <Calendar
                    events={events}
                />
            </div>
        </CacheProvider>
    );
}
export default MyCalendar;