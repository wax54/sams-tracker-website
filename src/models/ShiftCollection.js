/**
 * A shift class, representing time spent at a certain date on a thing for a reason
 * 
 */
class Shift {
    /**
     * 
     * @param { Date } start 
     * @param { string } type 
     * @param { string } category  
     * @param { Date } stop
     * @param { Number } id
     * @param { Number } u_id
     */
    constructor({ start, type, category, stop, id, u_id }) {
        this.id = id;
        this.u_id = u_id;
        if (start instanceof Date) this.start = start;
        else this.start = new Date(start);

        this.type = type;
        this.category = category;
        if (stop) {
            if (stop instanceof Date) this.stop = stop;
            else this.stop = new Date(stop);
        }
    }

    /**
     * returns the duration in Milliseconds
     */
    duration() {
        if (this.stop) return this.stop.getTime() - this.start.getTime();
        else return new Date().getTime() - this.start.getTime();
    }

    /**
    * returns the hours as a decimal that the shift took to complete
    */
    getHours() {
        return this.duration() / 3600000 //MS in an Hour
    }

    getFormattedDuration(specificity = 2) {
        const duration = this.duration();
        const durationFormatted = timeFormat(duration, specificity);
        return durationFormatted;
    }

    equals(test, strict=true) {
        if(typeof test !== 'object') return false;
        else if (this.id && test.id && strict) {
            if(this.id === test.id) return true;
            else return false; 
        } else {
            if (this.category === test.category) {
                if (this.type === test.type) {
                    if (this.start.getTime() === test.start.getTime()) return true;
                    if (!strict) return true;
                }
            }
            return false;
        }
    }

    /**
     * sets the stop of the shift
     *
     * @param { Date } stop the stop Date/Time that this shift should stop, if none
     *          specified it defaults to now.
     */
    clockOut(stop = new Date()) {
        this.stop = stop;
    }

    /**
     * stops the currents shift at splitDateTime and starts a new shift 
     *      at the same moment of the specified type and category
     * 
     * @param { Date } splitDateTime the time to clock out the original shift
     * @param { String } type the type that the newshift should take on 
     * @param { String } category the category the newshift take on, the same category if none specified
     * @returns { Shift } returns the newly created shift 
     */
    splitShift(splitDateTime, type, category = this.category) {
        const newShift = new Shift({start: splitDateTime, type, category, stop: this.stop})
        this.clockOut(splitDateTime);
        return newShift;
    }

}


class ShiftCollection {
    static SORT_PARAMS = {
        START: "start",
        STOP: "stop",
        CATEGORY: "category",
        TYPE: "type",
        ID: "id",
        UID: "u_id",
        ASCENDING: "ascending",
        DESCENDING: "descending"
    };

    constructor(...newShifts) {
        this.shifts = [];
        this.add(...newShifts);
    }

    shiftsBy(sortParam = ShiftCollection.SORT_PARAMS.START, direction = ShiftCollection.SORT_PARAMS.DESCENDING) {
        const shifts = [...this.shifts];
        if(direction === ShiftCollection.SORT_PARAMS.ASCENDING)
            return shifts.sort((shift1, shift2) => {
                if(sortParam === ShiftCollection.SORT_PARAMS.STOP){
                    let stop1 = shift1.stop || new Date();
                    let stop2 = shift2.stop || new Date();
                    return stop1 > stop2 ? 1 : -1;
                }

                return shift1[sortParam] > shift2[sortParam] ? 1 : -1;
            });
        else {
            return shifts.sort((shift1, shift2) => {
                if (sortParam === ShiftCollection.SORT_PARAMS.STOP) {
                    let stop1 = shift1.stop || new Date();
                    let stop2 = shift2.stop || new Date();
                    return stop2 > stop1 ? 1 : -1;
                }
                return shift2[sortParam] > shift1[sortParam] ? 1 : -1;
            });
        }
    }

    toString() {
        return 'A ShiftCollection of length ' + this.length() + ' ' + this.shifts;
    }
    //future add with shifts being an object of objects of arrays
    // tempState = { ...state };
    // category = action.payload.category;
    // type = action.payload.type;
    // if(tempState[category]) {
    //     if (tempState[category][type]) {
    //         let temp = tempState[category][type];
    //         tempState[category][type] = [...temp, action.payload];
    //     } else {
    //         tempState[category][type] = [action.payload];
    //     }
    // } else {
    // tempState[category] = { [type]: [action.payload] };
    add(...newShifts) {
        for (let shift of newShifts) {
            if (!(shift instanceof Shift)) {
                shift = new Shift(shift);
            }
            this.shifts.push(shift);
        }
    }
    getTotalHours() {
        return this.shifts.reduce((totalHours, shift) => {
            return totalHours + shift.getHours();
        }, 0);
    }

    remove(removedShift) {
        const shiftIndex = this.shifts.findIndex((shift) => {
            if (shift.category === removedShift.category)
                if (shift.type === removedShift.type)
                    if (shift.start === removedShift.start) return true;
            return false;
        });

        if (shiftIndex !== -1) {
            this.shifts.splice(shiftIndex, 1);
            return true;
        }
        else return false;
    }

    contains(someShift, strict = false) {
        if (this.find(someShift, strict)) return true;
        return false;
    }
    /**
     * 
     * @param {string} initialCategory the initial category name to select the shifts
     * @param {string} newCategory the name all shifts selected should be changed to
     * @returns {boolean} true on success, false if no shifts of category initialCategory are found
     */
    changeCategory(initialCategory, newCategory) {
        const shifts = this.category(initialCategory).shifts; //shift collection is returned, get the array out of it

        if (shifts.length) {
            shifts.forEach(shift => { shift.category = newCategory });
            return true;
        }
        return false;
    }

    changeType(initialtype, newType) {
        const shifts = this.type(initialtype).shifts; //shift collection is returned, get the array out of it
        //if it's not empty
        if (shifts.length) {
            shifts.forEach(shift => { shift.type = newType });
            return true;
        }
        //emtpy, ogType doesn't exist
        return false;
    }

    find(someShift, strict = false) {
        for (let shift of this.shifts) {
            if(shift.equals(someShift, strict)) return shift;
        }
        return false;
    }

    getCategories() {
        const categories = new Set();
        for (let shift of this.shifts) {
            categories.add(shift.category);
        }
        return [...categories];
    }

    getTypes() {
        const types = new Set();
        for (let shift of this.shifts) {
            types.add(shift.type);
        }
        return [...types];
    }

    getShiftsAfter(dateTime) {
        return new ShiftCollection(...this.shifts
            .filter(({ start }) => dateTime.getTime() < start.getTime()));
    }
    getShiftsBefore(dateTime) {
        return new ShiftCollection(...this.shifts
            .filter(({ start }) => dateTime.getTime() < start.getTime()));
    }

    getCurrShifts() {
        return new ShiftCollection(...(this.shifts.filter((shift) => !shift.stop)));
    }

    category(queryString) {
        return this.filter('category', queryString);
    }

    type(queryString) {
        return this.filter('type', queryString);
    }

    filter(field, query) {
        const matched = this.shifts.filter(shift => shift[field] === query);
        return new ShiftCollection(...matched);
    }

    length() { return this.shifts.length };
}

/**
 * returns a date representing x days away from dateTime 
 * 
 * @param {number} days the number of days from dateTime you want
 * @param {Date} dateTime the dateTime you want to have a reference from(defaults to now)
 * @returns {Date} a new Date that is x hours from dateTime
 */
function daysFrom(days, dateTime = new Date()) {
    return new Date(dateTime.getTime() + (1000 * 60 * 60 * 24 * days)); //1000ms * 60s * 60m * 24hrs * X days
}

/**
 * returns a day representing x hours away from dateTime 
 * 
 * @param {number} hours the number of hours from dateTime you want
 * @param {Date} dateTime the dateTime you want to have a reference from(defaults to now)
 * @returns {Date} a new Date that is x hours from dateTime
 */
function hoursFrom(hours, dateTime = new Date()) {
    return new Date(dateTime.getTime() + (1000 * 60 * 60 * hours)); //1000ms * 60s * 60m * X hours
}

/**
 * returns a day representing x mins away from dateTime 
 * 
 * @param {number} mins the number of mins from dateTime you want
 * @param {Date} dateTime the dateTime you want to have a reference from(defaults to now)
 * @returns {Date} the Date that is x mins from dateTime
 */
function minsFrom(mins, dateTime = new Date()) {
    return new Date(dateTime.getTime() + (1000 * 60 * mins)); //1000ms * 60s * X mins
}

/**
 *
 * @param { number } ms A duration represented in Milliseconds negative values are returned as positive durations
 * @param { number } specificity How many scales of time you would like returned the biggest is always returned
 *
 */
function timeFormat(ms, specificity) {

    const MSINSEC = 1000;
    const MSINMINUTE = 60000;
    const MSINHOUR = 3600000;
    const MSINDAY = 86400000;
    const MSINMONTH = 2628000000;
    const MSINYEAR = MSINMONTH * 12;



    let result = '';
    let i = 0;
    if (ms < 0) {
        result += '- ';
        ms = ms * -1;
    }

    const y = Math.floor(ms / MSINYEAR);
    if (y) {
        i++;
        ms = ms - (y * MSINYEAR);
        result += y + ' years ';
        if (i === specificity) {
            return result;
        }
    }


    const mth = Math.floor(ms / MSINMONTH);
    if (mth) {
        i++;
        ms = ms - (mth * MSINMONTH);
        result += mth + ' Months ';
        if (i === specificity) {
            return result;
        }
    }

    const d = Math.floor(ms / MSINDAY);
    if (d) {
        i++;
        ms = ms - (d * MSINDAY);
        result += d + ' Days ';
        if (i === specificity) {
            return result;
        }
    }

    const h = Math.floor(ms / MSINHOUR);
    if (h) {
        i++;
        ms = ms - (h * MSINHOUR);
        result += h + ' Hours ';
        if (i === specificity) {
            return result;
        }
    }

    const min = Math.floor(ms / MSINMINUTE);
    if (min) {
        i++;
        ms = ms - (min * MSINMINUTE);
        result += min + ' mins ';
        if (i === specificity) {
            return result;
        }
    }
    const s = Math.floor(ms / MSINSEC);
    if (s) {
        i++;
        ms = ms - (s * MSINSEC);
        result += s + ' seconds ';
        if (i === specificity) {
            return result;
        }
    }
    /*
    if (ms) {
        i++;
        result += ms + ' ms ';
        if (i == specificity) {
            return result;
        }
    }
    */
    return result;

}
function timeFormatFromHours(hrs, specificity) {
    const ms = hrs * 3600000;
    return timeFormat(ms, specificity);
}

//testing purposes #cleanUp
// const deli = new ShiftCollection(...JSON.parse(localStorage.records));

export { ShiftCollection, Shift, minsFrom, hoursFrom, daysFrom, timeFormatFromHours }