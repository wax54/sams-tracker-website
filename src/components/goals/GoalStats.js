import { useSelector } from "react-redux";
import GaugeChart from 'react-gauge-chart';
import { DOING_ANYTHING_KEY, NEW_THING_KEY } from "../../config";

//hours = {[category]: {[type]: 4.32, coding: 13.3}}
const GoalStats = ({hours={}, timeFrame = {val: 7, title:"Every Week"}}) => {

    const goals = useSelector(({ goals }) => goals);
    const goalsByCategory = {};
    for (let goal of goals){
        const category = goal.category;
        goalsByCategory[category] ?
            goalsByCategory[category].push(goal)
            :
            goalsByCategory[category] = [goal];
    }

    return (
    <div className="row border shadow rounded p-4 ">
        <h2 style={{ textAlign: "left" }}>Goals</h2>
        {Object.keys(goalsByCategory).map(category =>
            <div style={{ textAlign: "center" }} className="row justify-content-around text-dark my-2 p-2">
                <h3 style={{ textAlign: "left" }}>{category}</h3>
                { goalsByCategory[category]
                    .map(({type, category, seconds_per_day}) => {
                        const goalHours = Math.floor((seconds_per_day * timeFrame.val) / 60 / 60) || 1; // 1000seconds_per_day * timeframe.val now its seconds in timeframe / 60 secs in min / 60 mins in hour 
                        let currHours = 0;
                        if(hours[category]){
                            if(hours[category][type]){
                                currHours = Math.floor(hours[category][type] * 10) / 10;
                            }
                        } 
                        let percent = currHours/goalHours;
                        if(percent > 1) percent = 1;
                        const getGoalStatus = () => {
                            if(percent < 1)
                                return `${Math.floor((goalHours - currHours) * 100) / 100} Hours Till You Meet This Goal!`;
                            else 
                                return  `Congradulations You've Met this Goal!`
                        }
                        type = type === DOING_ANYTHING_KEY ? "Anything to do with " + category : type + ' for ' + category;
                        return <div style={{position: 'relative'}} className='col-12 col-md-6 col-lg-4 '>
                            <h4 style={{height: '3rem'}}>{type}</h4>
                            <div className={`border rounded shadow ${percent < 1 ? 'bg-warning text-light' : 'bg-success text-dark'}`} >
                                <p style={{ height: '2rem' }}>{getGoalStatus()}</p>
                                <GaugeChart 
                                    animate={false}
                                    style={{
                                        margin: 'auto'
                                    }}
                                    id={`gauge-chart-${category}-${type}`}
                                    nrOfLevels={goalHours}
                                    formatTextValue={() => ''}
                                    marginIn={.5}
                                    textColor="#0000000"
                                    arcWidth={0.8}
                                    colors={['#EA4228', '#00FF00']}
                                    percent={percent}
                                    arcPadding={0.02}
                                />
                            </div>
                        </div>
                    })
                }
            </div>
            )
        }

    </div>
    );
};

// other colors'#EA4228', '#00FF00' '#F5CD19',
export default GoalStats