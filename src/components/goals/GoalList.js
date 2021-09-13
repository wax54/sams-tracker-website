import { useSelector, shallowEqual } from "react-redux";
import GoalRow from "./GoalRow";

const GoalList = ({ timeFrame }) => {
    // const goals = useSelector(({goals}) => goals, shallowEqual);
    const goals = useSelector(({ goals }) => {
        const finalGoals = [];
        Object.keys(goals).forEach(category => 
            Object.keys(goals[category]).forEach( type =>
                finalGoals.push({category, type, seconds_per_day: goals[category][type]})
        ));
        return finalGoals;
    }, shallowEqual);

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