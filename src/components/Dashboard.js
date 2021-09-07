import React, {useState, useEffect, useCallback} from 'react'; 
import { shallowEqual, useSelector } from 'react-redux';
// import { Chart, Pies, Transform } from 'rumble-charts';
import {useWindowDimensions} from '../helpers/hooks';
import { Shift, ShiftCollection } from '../models/ShiftCollection';
import GoalStats from './goals/GoalStats';
import { DOING_ANYTHING_KEY } from '../config';
import ShiftsPieChart from './ShiftsPieChart';

const Dashboard = () => {
    const { width, height } = useWindowDimensions();
    const [size, setSize] = useState((width > height) ? Math.floor((height / 10) * 8) : Math.floor((width / 10) * 6));
    console.log(width);
    console.log(height);

    //const [size, setSize] = useState(Math.floor((width / 10) * 6));
    console.log(size);
    useEffect(() => {
        setSize((width > height) ? 
            Math.floor((height / 10) * 8) 
            : 
            Math.floor((width / 10) * 8)
        )
    });
        

    //make the size almost as big as the shortest screen dimension
    

    const allShifts = useSelector(({ shifts }) => shifts, shallowEqual);
    const shiftsByCategory = {};
    const currShifts = [];
    const totalHours = {};

    for(let key in allShifts) {
        const shift = new Shift(allShifts[key]);
        if(!shift.stop) currShifts.push(shift);
        if(shiftsByCategory[shift.category]){
            shiftsByCategory[shift.category].add(shift);
        } else {
            shiftsByCategory[shift.category] = new ShiftCollection(shift);
        }
        if(totalHours[shift.category]) {
            if(totalHours[shift.category][shift.type]) {
                totalHours[shift.category][shift.type] += shift.getHours();
            } else {
                totalHours[shift.category][shift.type] = shift.getHours();
            }
        } else {
            totalHours[shift.category] = {
                [shift.type]: shift.getHours()
            };
        }
        if(totalHours[shift.category][DOING_ANYTHING_KEY]) {
            totalHours[shift.category][DOING_ANYTHING_KEY] += shift.getHours();
        } else {
            totalHours[shift.category][DOING_ANYTHING_KEY] = shift.getHours();

        }
    }

    const makeSeries = useCallback(() => [
        ['Task', 'Hours'], 
        ...Object.keys(shiftsByCategory).map(category => {
            return [category, Math.floor(shiftsByCategory[category].getTotalHours() * 100)/100];
    })], [allShifts]);
    

    const [series, setSeries] = useState(makeSeries());

    console.log(series);

    useEffect(()=> {
        setSeries(makeSeries());
    }, [makeSeries, setSeries]);

    // useEffect(() => {
    //     const intervalIdArray = currShifts.map(shift => {
    //         return setInterval(() => {
    //             setSeries(series => {
    //                 return series.map(data => {
    //                     if(data.name === shift.category) {
    //                         data.data[0] += 4/60/60 //4 second / 60 secs in min / 60 mins in hour
    //                         return {...data};
    //                     } else {
    //                         return data;
    //                     }
    //                 });
    //             });
    //         }, 4000);
    //     });
    //     return () => 
    //         intervalIdArray.forEach(id => clearInterval(id));
    // }, [allShifts, setSeries]);
    

    const displayCategory = (evt) => {
        const pieSlice = evt.target.parentElement.parentElement;
        console.log(pieSlice.classList);
        const i = pieSlice.classList[1].replace("category-pie-chart-series-", "");
        console.log(pieSlice.classList);

        console.log(i);
        console.log(series[+i])
    }
    return (
        <div id="hours-spent-dashboard" className="col-12 m-3 p-4 " >
            {/* <h1 className="display-4 text-center">
            Hours Spent In Last Week
            </h1> */}
            <ShiftsPieChart series={series} size={size} />

            <GoalStats hours={totalHours} size={size}/>

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