import React, {useState, useEffect, useCallback} from 'react'; 
import { shallowEqual, useSelector } from 'react-redux';
// import { Chart, Pies, Transform } from 'rumble-charts';
import {useWindowDimensions} from '../helpers/hooks';
import { daysFrom, Shift, ShiftCollection } from '../models/ShiftCollection';
import GoalStats from './goals/GoalStats';
import { DOING_ANYTHING_KEY } from '../config';
import ShiftsPieChart from './shifts/ShiftsPieChart';
import { timeFrames } from '../helpers/config';

const Dashboard = () => {
    const { width, height } = useWindowDimensions();
    const [size, setSize] = useState((width > height) ? Math.floor((height / 10) * 8) : Math.floor((width / 10) * 6));
    
    //make the size almost as big as the shortest screen dimension
    useEffect(() => {
        setSize((width > height) ? 
            Math.floor((height / 10) * 8) 
            : 
            Math.floor((width / 10) * 8)
        )
    }, [ width, height]);
        
    const timeFrame = useSelector(({timeFrame}) => timeFrames[timeFrame]);

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

    const shifts = useSelector(({ shifts: storeShifts }) => {
        const shifts = {
            _allShifts: function() {
                const shifts = new ShiftCollection();
                this._categories.entries().forEach(cat => {
                    this[cat]._types.forEach( type => {
                        this[cat][type]._shifts.forEach( shift => {
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
            if(shift.stop < earliestDateInTimeFrame) continue; 

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
    }, shallowEqual);
// old way, maybe we'll bring it back
    // const allShifts = useSelector(({ shifts }) => shifts);
    // const shiftsByCategory = {};
    // const currShifts = [];
    // const totalHours = {};

    // for (let key in allShifts) {
    //     const shift = new Shift(allShifts[key]);
    //     if (!shift.stop) currShifts.push(shift);
    //     if (shiftsByCategory[shift.category]) {
    //         shiftsByCategory[shift.category].add(shift);
    //     } else {
    //         shiftsByCategory[shift.category] = new ShiftCollection(shift);
    //     }
    //     if (totalHours[shift.category]) {
    //         if (totalHours[shift.category][shift.type]) {
    //             totalHours[shift.category][shift.type] += shift.getHours();
    //         } else {
    //             totalHours[shift.category][shift.type] = shift.getHours();
    //         }
    //     } else {
    //         totalHours[shift.category] = {
    //             [shift.type]: shift.getHours()
    //         };
    //     }
    //     if (totalHours[shift.category][DOING_ANYTHING_KEY]) {
    //         totalHours[shift.category][DOING_ANYTHING_KEY] += shift.getHours();
    //     } else {
    //         totalHours[shift.category][DOING_ANYTHING_KEY] = shift.getHours();

    //     }
    // }

    console.log("SHIFTS in DASH", shifts);
    return (
        <div id="hours-spent-dashboard" className="col-12 m-3 p-4 " >
            {/* <h1 className="display-4 text-center">
            Hours Spent In Last Week
            </h1> */}
            <ShiftsPieChart shifts={shifts} size={size} />

            <GoalStats shifts={shifts} size={size}/>

            {/* <Chart width={size} height={size} series={series}>
                <Transform method={['stackNormalized']}>
                    <Pies
                        className='category-pie-chart'
                        colors='category10'
                        combined={true}
                        innerRadius='20%'
                        padAngle={0.015}
                        cornerRadius={5}
                        innerPadding={2}
                        pieAttributes={{
                            onMouseMove: (e) => e.target.style.opacity = 1,
                            onMouseLeave: (e) => e.target.style.opacity = 0.5,
                            onMouseUp: displayCategory
                        }}
                        pieStyle={{ opacity: 0.5 }}
                    />
                </Transform>
            </Chart> */}
  </div >
    )
};
export default Dashboard