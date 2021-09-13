
import GaugeChart from 'react-gauge-chart';

const GoalGauge = ({ goal, current, id }) => {
    const totalHours = (goal > 1) ? Math.ceil(goal) : 1;
    let percent = current / goal;
    if (percent > 1) percent = 1;
    
    return <GaugeChart
                animate={false}
                style={{
                    margin: 'auto'
                }}
                id={id}
                nrOfLevels={totalHours}
                formatTextValue={() => ''}
                marginIn={.5}
                textColor="#0000000"
                arcWidth={0.8}
                colors={['#EA4228', '#00FF00']}
                percent={percent}
                arcPadding={0.02}
            />
}

export default GoalGauge