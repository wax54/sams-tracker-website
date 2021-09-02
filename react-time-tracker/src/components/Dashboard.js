import React, {useState, useEffect, useRef, useCallback} from 'react'; 
import { shallowEqual, useSelector } from 'react-redux';
import { Chart, Pies, Transform } from 'rumble-charts';
import { Shift, ShiftCollection } from '../models/ShiftCollection';

const Dashboard = () => {
    const allShifts = useSelector(({ shifts }) => shifts, shallowEqual);
    const shiftsByCategory = {};
    const currShifts = [];
    for(let key in allShifts) {
        const shift = new Shift(allShifts[key]);
        if(!shift.stop) currShifts.push(shift);
        if(shiftsByCategory[shift.category]){
            shiftsByCategory[shift.category].add(shift);
        } else {
            shiftsByCategory[shift.category] = new ShiftCollection(shift);
        }
    }

    const makeSeries = useCallback(() => Object.keys(shiftsByCategory).map(category => {
        return {
            data: [shiftsByCategory[category].getTotalHours()],
            name: category
        }
    }))
    const [series, setSeries] = useState(makeSeries());

    console.log(series);
    useEffect(()=> {
        setSeries(makeSeries());
    }, [allShifts, setSeries]);
    useEffect(() => {
        const intervalIdArray = currShifts.map(shift => {
            return setInterval(() => {
                setSeries(series => {
                    return series.map(data => {
                        if(data.name === shift.category) {
                            data.data[0] += 4/60/60 //4 second / 60 secs in min / 60 mins in hour
                            return {...data};
                        } else {
                            return data;
                        }
                    });
                });
            }, 4000);
        });
        return () => 
            intervalIdArray.forEach(id => clearInterval(id));
    }, [allShifts, setSeries]);
    

    const displayCategory = (evt) => {
        const pieSlice = evt.target.parentElement.parentElement;
        console.log(pieSlice.classList);
        const i = pieSlice.classList[1].replace("category-pie-chart-series-", "");
        console.log(pieSlice.classList);

        console.log(i);
        console.log(series[+i])
    }
    return (
    <div id="hours-spent-dashboard" className="jumbotron bg-light border m-3 p-4 rounded shadow  d-none d-md-block" >
        <h1 className="display-4 text-center col-12 col-md-3 col-xl-12">
            Hours Spent In Last Week
        </h1>
            <Chart width={600} height={250} series={series}>
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
            </Chart>
  </div >
    )
};
export default Dashboard