

/**
 * A shift class, representing time spent at a certain date on a thing for a reason
 * 
 */
class Shift {
    /**
     * 
     * @param { Date } start 
     * @param { Date } end 
     * @param { string } type 
     * @param { string } category 
     */
    constructor(start, type, category, end) {
        if (start instanceof Date) this.start = start;
        else this.start = new Date(start);

        this.type = type;
        this.category = category;
        if (end) {
            if (end instanceof Date) this.end = end;
            else this.end = new Date(end);
        }
    }

    /**
     * returns the duration in Milliseconds
     */
    duration() {
        if (this.end) return this.end.getTime() - this.start.getTime();
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

/**
 * sets the end of the shift
 *
 * @param { Date } end the end Date/Time that this shift should end, if none
 *          specified it defaults to now.
 */
    clockOut(end = new Date()) {
        this.end = end;
    }

}


class ShiftCollection{
    constructor(...newShifs){
        this.shifts = [];
        for(shift of newShifs){
            this.add(shift);
        }
    }

    add(shift) {
        if (!(shift instanceof Shift)) {
            shift = new Shift(shift.start, shift.type, shift.category, shift.end);
        }
        type = shift.type;
        category = shift.category;
    
    
        this.shifts.push(shift);

        //shift doesn't have a clock out, add to current shifts
        if (!shift.end) {
            currShifts.push(shift)
            addCurrShift(shift);
        }
    }

    remove(removedShift){
        const shiftIndex = this.shifts.findIndex((shift)=>{
            if(shift.category === removedShift.category)
                if(shift.type === removedShift.type)
                    if(shift.start === removedShift.start) return true;
            return false;
        });
        
        if(shiftIndex !== -1){
            this.shifts.splice(shiftIndex,1);
            return true;   
        }
        else return false;
    }
    
    getCategories() {
        const categories = new Set();
        for (let shift of this.shifts) {
            categories.add(shift.category);
        }
        return [...categories];
    }

    getCurrShifts(){
        return new ShiftCollection(...(this.shifts.filter((shift)=> !shift.end)));
    }

    category(queryString){
        return this.filter('category',queryString);
    }
    type(queryString){
        return this.filter('type',queryString);
    }
    filter(field, query){
        const matched = this.shifts.filter((shift) => shift[field] == query);
        return new ShiftCollection(...matched);
    }
    length() { return this.shifts.length };
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
        if (i == specificity) {
            return result;
        }
    }


    const mth = Math.floor(ms / MSINMONTH);
    if (mth) {
        i++;
        ms = ms - (mth * MSINMONTH);
        result += mth + ' Months ';
        if (i == specificity) {
            return result;
        }
    }

    const d = Math.floor(ms / MSINDAY);
    if (d) {
        i++;
        ms = ms - (d * MSINDAY);
        result += d + ' Days ';
        if (i == specificity) {
            return result;
        }
    }

    const h = Math.floor(ms / MSINHOUR);
    if (h) {
        i++;
        ms = ms - (h * MSINHOUR);
        result += h + ' Hours ';
        if (i == specificity) {
            return result;
        }
    }

    const min = Math.floor(ms / MSINMINUTE);
    if (min) {
        i++;
        ms = ms - (min * MSINMINUTE);
        result += min + ' mins ';
        if (i == specificity) {
            return result;
        }
    }
    const s = Math.floor(ms / MSINSEC);
    if (s) {
        i++;
        ms = ms - (s * MSINSEC);
        result += s + ' seconds ';
        if (i == specificity) {
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
const deli = new ShiftCollection(...JSON.parse(localStorage.records));
