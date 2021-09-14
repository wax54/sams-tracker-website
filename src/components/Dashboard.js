import React, {useState, useEffect, useCallback} from 'react'; 
import { shallowEqual, useSelector } from 'react-redux';
// import { Chart, Pies, Transform } from 'rumble-charts';
import {useWindowDimensions} from '../helpers/hooks';
import { daysFrom, Shift, ShiftCollection } from '../models/ShiftCollection';
import GoalStats from './goals/GoalStats';
import { DOING_ANYTHING_KEY, timeFrames} from '../config';
import ShiftsPieChart from './shifts/ShiftsPieChart';
import { getShiftsByCategory } from '../helpers/tools';

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

    const shifts =  useSelector(({shifts}) => shifts, shallowEqual);
    
    const [shiftsByCategory, setShiftsByCategory] = useState(getShiftsByCategory(shifts, timeFrame));

    useEffect(() => {
        const shiftsByCategory = getShiftsByCategory(shifts, timeFrame);
        setShiftsByCategory(shiftsByCategory);

        if (shiftsByCategory._currShifts.length) {
            const INTERVAL_STEP = 10000;
            //updates = {school:{coding:1, 'messing around': 2}, 'my well being': {'hanging with zoe': 1}}
            const updates = shiftsByCategory._currShifts.reduce((updates, shift) => {
                if(!updates[shift.category]) updates[shift.category] = {};
                updates[shift.category][shift.type] ? updates[shift.category][shift.type]++ : updates[shift.category][shift.type] = 1;
                return updates;
            }, {});
            const intervalID = setInterval(() => {
                setShiftsByCategory(shiftsByCategory => {
                    shiftsByCategory = {...shiftsByCategory};
                    for (let category in updates) {
                        for(let type in updates[category]) {
                            const timeElapsed = updates[category][type] * (INTERVAL_STEP / 1000 / 60 / 60);  // increment by amount of curr shifts in category type times INTERVAL_STEP(in ms) 1000 ms/s 60 s/m 60 m/hr
                            shiftsByCategory._hours += timeElapsed;
                            if(!shiftsByCategory[category]) shiftsByCategory[category] = {_types:new Set(), _hours: 0}
                            if(!shiftsByCategory[category][type]) {
                                shiftsByCategory[category]._types.add(type);
                                shiftsByCategory[category][type] = {_shifts:[], _hours: 0};
                            }
                            shiftsByCategory[category]._hours += timeElapsed;
                            shiftsByCategory[category][type]._hours += timeElapsed;
                        }
                    }
                    return shiftsByCategory;
                });
            }, INTERVAL_STEP);

            return () => clearInterval(intervalID);
        } else {
            //if no current shifts, then just set shiftsby category to the new shifts
            setShiftsByCategory(shiftsByCategory);
        }
    }, [getShiftsByCategory, setShiftsByCategory, shifts, timeFrame]);

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

    return (
        <div id="hours-spent-dashboard" className="col-12 m-3 p-4 " >
            {/* <h1 className="display-4 text-center">
            Hours Spent In Last Week
            </h1> */}
            <ShiftsPieChart shifts={shiftsByCategory} size={size} />

            <GoalStats shifts={shiftsByCategory} size={size}/>

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