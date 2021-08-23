import React, {useState, useEffect, useRef} from 'react'; 
import { useSelector } from 'react-redux';
import { Chart, Pies, Transform } from 'rumble-charts';
import { ShiftCollection } from './ShiftCollection';

const Dashboard = () => {
    const allShifts = useSelector(({ shifts }) => {
        return new ShiftCollection(...shifts);
    });

    const categories = allShifts.getCategories();

    const [series, setSeries] = useState(categories.map(category => {
        return {
            data: [allShifts.category(category).getTotalHours()],
            name: category,
        }
    }));

    const [currShifts, setCurrShifts] = useState(allShifts.getCurrShifts().shifts);

    
    useEffect(() => {
        const intervalIdArray = currShifts.map(shift => {
            return setInterval(() => {
                setSeries(series => {
                    return series.map(data => {
                        if(data.name === shift.category) {
                            data.data[0] += 4/60/60 //1 second / 60 secs in min / 60 mins in hour
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
    }, [currShifts, setSeries]);
    
    const newCurrShifts = allShifts.getCurrShifts().shifts;
    const shiftsUpToDate = newCurrShifts.every((shift, idx) => {
        return shift.equals(currShifts[idx]);
    });
    console.log(shiftsUpToDate);
    if (!shiftsUpToDate) {
        console.log("curr", currShifts, 'new', newCurrShifts);
        setCurrShifts(newCurrShifts);
        return;
    }
    console.log(series);
    return (
    <div id="hours-spent-dashboard" className="jumbotron bg-light border m-3 p-4 rounded shadow  d-none d-md-block" >
        <h1 className="display-4 text-center col-12 col-md-3 col-xl-12">
            Hours Spent In Last Week
        </h1>
            <Chart width={600} height={250} series={series}>
                <Transform method={['stackNormalized']}>
                    <Pies
                        colors='category10'
                        combined={true}
                        innerRadius='10%'
                        padAngle={0.025}
                        cornerRadius={5}
                        innerPadding={2}
                        pieAttributes={{
                            onMouseMove: (e) => e.target.style.opacity = 1,
                            onMouseLeave: (e) => e.target.style.opacity = 0.5
                        }}
                        pieStyle={{ opacity: 0.5 }}
                    />
                </Transform>
            </Chart>
  </div >
    )
};
export default Dashboard