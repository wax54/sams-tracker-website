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

    clockOut(end = new Date()) {
        this.end = end;
    }

    /**
     * returns the hours as a decimal that the shift took to complete
     */
    getHours() {
        return this.duration() / 3600000 //MS in an Hour
    }
}