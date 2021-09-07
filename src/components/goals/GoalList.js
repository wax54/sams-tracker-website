import GoalRow from "./GoalRow";

const GoalList = ({ goals, timeFrame }) => {
    // const goals = useSelector(({goals}) => goals, shallowEqual);
    return (
    <>
        {goals.map( goal => 
            <GoalRow key={`${goal.type}-${goal.category}`} goal={goal} timeFrame={timeFrame} />
        )}
    </>)
};
export default GoalList