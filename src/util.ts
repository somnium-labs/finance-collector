import { Moment } from 'moment';

export function calculateBusinessDays(d1: Moment, d2: Moment) {
    const days = d2.diff(d1, 'days');
    let newDay: any = d1.toDate();
    let workingDays: number = 0;
    let sundays: number = 0;
    let saturdays: number = 0;
    for (let i = 0; i < days; i++) {
        const day = newDay.getDay();
        newDay = d1.add(1, 'days').toDate();
        const isWeekend = day % 6 === 0;
        if (!isWeekend) {
            workingDays++;
        } else {
            if (day === 6) saturdays++;
            if (day === 0) sundays++;
        }
    }

    return workingDays;
}

export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
