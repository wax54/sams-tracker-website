import { ShiftCollection, Shift, daysFrom } from "../models/ShiftCollection";
export function makeColor (shift) {
    const str = shift.type + shift.category;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

export function round(num, decimals = 0) {
    if (decimals < 0) {
        decimals = decimals * -1;
        const divider = 10 ** decimals;
        num = Math.round(num / divider) * divider;
    }
    const multiplier = 10 ** decimals;
    return Math.round(num * multiplier) / multiplier;
}

// shifts 
        // {
        //     _hours: 17.3,
        //     _categories: ["school", "my well being"],
        //     _currShifts:[shift],
        //     school: { 
        //         _hours: 12, 
        //         _types:["coding"], 
        //         coding: { 
        //             _hours: 12, 
        //             _shifts: [shift, shift, shift] 
        //         }
        //     },
        //     "my well being": {
        //         _hours: 5.3,
        //         _types: ["resting", "painting"],
        //         resting: {
        //             _hours: 2.7,
        //             _shifts: [shift,  shift]
        //         },
        //         painting: {
        //             _hours: 2.6,
        //             _shifts: [shift]
        //         }
        //     },
        //  }

export function getShiftsByCategory(storeShifts, timeFrame) {
    const shifts = {
        _allShifts: function () {
            const shifts = new ShiftCollection();
            this._categories.entries().forEach(cat => {
                this[cat]._types.forEach(type => {
                    this[cat][type]._shifts.forEach(shift => {
                        shifts.add(shift);
                    });
                });
            });
            return shifts;
        },
        _currShifts: [],
        _hours: 0,
        _categories: new Set()
    };
    const earliestDateInTimeFrame = daysFrom(-timeFrame.val);

    for (let key in storeShifts) {
        const shift = new Shift(storeShifts[key]);
        //only shows shifts in timeFrame
        if (shift.stop < earliestDateInTimeFrame) continue;

        const hours = shift.getHours();
        if (!shift.stop) shifts._currShifts.push(shift);
        //if there is no entry for this category...
        if (!shifts._categories.has(shift.category)) {
            //make it
            shifts._categories.add(shift.category);
            shifts[shift.category] = { _hours: 0, _types: new Set() };
        }
        //shifts[shift.category] is garunteed at this point
        //if there is no entry for this type in the category...
        if (!shifts[shift.category]._types.has(shift.type)) {
            // make it
            shifts[shift.category]._types.add(shift.type);
            shifts[shift.category][shift.type] = { _hours: 0, _shifts: [] };
        }
        shifts[shift.category][shift.type]._shifts.push(shift);
        shifts[shift.category][shift.type]._hours += hours;
        shifts[shift.category]._hours += hours;
        shifts._hours += hours;
    }
    return shifts;
}