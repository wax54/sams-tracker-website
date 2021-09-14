import { useSelector, shallowEqual } from "react-redux";
import { timeFrames } from "../../config";
import GoalRow from "./GoalRow";

const GoalList = () => {
    // const goals = useSelector(({goals}) => goals, shallowEqual);
    // make an array of goals instead
    const goals = useSelector(({ goals }) => {
        const finalGoals = [];
        Object.keys(goals).forEach(category => 
            Object.keys(goals[category]).forEach( type =>
                finalGoals.push({category, type, seconds_per_day: goals[category][type]})
        ));
        return finalGoals;
    }, shallowEqual);
    
    const timeFrame = useSelector(({ timeFrame }) => timeFrames[timeFrame]);

    return (
    <>
        {goals.map( goal => 
            <GoalRow key={`${goal.type}-${goal.category}`} 
                goal={goal} 
                timeFrame={timeFrame} />
        )}
    </>)
};
export default GoalList