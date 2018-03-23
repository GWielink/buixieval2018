import React from 'react';

import Menu from '../../components/Menu';

const data = [{
    date: 'All Week',
    title: 'BUIXIEVAL!',
    info: 'This year Buixieval will be a battle of Pink vs. Blue! Backers from both colors will challenge eachother during borrels and during the day by copmleting several challenges. Points can be earned in many ways and in the end the winning team can expect eternal glory! The entire week will be livestreamed and plenty of free food and drinks can be expected! Be there or be square!',
},{
    date: 'Monday',
    title: 'Decoration Borrel',
    info: 'Under the leadership of their respective teamcaptains both teams will attempt to make the Franckenroom as pretty as possible by decorating it in their team colors. The Buixieval board will provide a budget for both teams. The team providing the most awsome decoration will earn points towards the allround Buixieval competition!',
}, {
    date: 'Wednesday',
    title: 'Pink vs. Blue',
    info: 'The teams will challenge eachother by showing of their general knowledge about everything pink and blue and displaying their karaoke skills. Points can and will be earned towards the final competition!'
}, {
    date: 'Friday',
    title: 'Final',
    info: 'To conclude an awsome week we will have on last awsome borrel! Their will be plenty of food and drinks and the winning team will be awarded with their prize!',
}];

const Calendar = () => {
    return (
        <div>
            <Menu />
            {data.map(item => <CalendarItem item={item} />)}
        </div>
    )
}

const CalendarItem = ({ item: { title, info, date }}) => (
    <div className="calendar-item">
        <h1>{date}: {title}</h1>
        {info}
    </div>
)

export default Calendar;