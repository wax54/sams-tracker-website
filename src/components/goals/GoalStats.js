import { useSelector } from "react-redux";
import { DOING_ANYTHING_KEY, timeFrames } from "../../config";
import { round } from "../../helpers/tools";
import GoalGauge from "./GoalGauge";
import GoalRow from "./GoalRow";

const GoalStats = ({ shifts = {
    _currShifts: [],
    _hours: 0,
    _categories: new Set()
}}) => {
    
    const goals = useSelector(({ goals }) => goals);
    const timeFrame = useSelector(({timeFrame}) => timeFrames[timeFrame]);

    return (
    <div className="row border shadow rounded p-4 ">
        <h2 style={{ textAlign: "left" }}>Goals</h2>
        {Object.keys(goals).map(category =>
            <div key={category} style={{ textAlign: "center" }} className="row justify-content-around text-dark my-2 p-2">
                <h3 style={{ textAlign: "left" }}>{category}</h3>
                { Object.keys(goals[category])
                    .map( type => {
                        const seconds_per_day = goals[category][type];
                        const goalHours = round((seconds_per_day * timeFrame.val) / 60 / 60, timeFrame.roundPlaces);
                            // 1000seconds_per_day * timeframe.val now its seconds in timeframe / 60 secs in min / 60 mins in hour 
                        
                        let currHours = 0;
                        if(type === DOING_ANYTHING_KEY) {
                            if (shifts[category]) {
                                currHours = round(shifts[category]._hours, timeFrame.roundPlaces );
                            }
                        } else if(shifts[category] && shifts[category][type]) {
                            currHours = round(shifts[category][type]._hours, timeFrame.roundPlaces);
                        }

                        const getGoalStatus = () => {
                            if (goalHours > currHours)
                                return `${round((goalHours - currHours), timeFrame.roundPlaces)} Hours Till You Meet This Goal!`;
                            else
                                return `Congradulations You've Met this Goal!`
                        }

                        return (
                            <div
                                key={`${type}-${category}`} 
                                style={{ position: 'relative' }} className='col-12 col-md-6 col-lg-4 '
                                >
                                <div >
                                    <GoalRow 
                                        goal={{type, category, seconds_per_day}} 
                                        timeFrame={timeFrame} 
                                        />
                                    <p>{getGoalStatus()}</p>
                                </div>
                                <GoalGauge 
                                    id={`gauge-chart-${category}-${type}`}
                                    goal={goalHours}
                                    current={currHours}
                                    /> 
                            </div>
                        )
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