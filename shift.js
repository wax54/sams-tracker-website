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
    constructor(start, end, type, category) {
        this.start = start;
        this.end = end;
        this.type = type;
        this.category = category;
    }

    /**
     * returns the duration in Milliseconds
     */
    duration() {
        return this.end.getTime() - this.start.getTime();
    }
    /**
     * returns the hours as a decimal that the shift took to complete
     */
    getHours() {
        return this.duration() / 3600000 //MS in an Hour
    }
}