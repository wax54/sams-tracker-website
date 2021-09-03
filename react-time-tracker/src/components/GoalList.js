import { shallowEqual, useSelector } from "react-redux";
import { ShiftCollection } from "../models/ShiftCollection";
import GoalRow from "./shifts/GoalRow";

const GoalList = () => {
    //shifts looks like {1: {id, start, stop, type, category, u_id}, ...}
    const goals = useSelector(({goals}) => goals, shallowEqual);
    return (
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th></th>
                    <th>Category</th>
                    <th>Start</th>
                    <th>Time Spent</th>
                    <th>End</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {allShifts.shiftsBy(sort.START, sort.DESCENDING)
                    .map(shift => 
                        <ShiftRow shift={shift} key={shift.id} />
                )}
            </tbody>
        </table>
    )
};
export default GoalList