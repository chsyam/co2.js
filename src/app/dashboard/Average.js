import { Text } from '@mantine/core';
import classes from '@/styles/StatsGroup.module.css';

import { averageIntensity } from '@tgwf/co2';
const { data } = averageIntensity;
const { NLD } = data;

export const Average = () => {
    const data = [
        {
            title: 'The average CO2 emissions of the NLD is',
            stats: NLD,
            description: 'gCO2 per kWh',
        },
    ];

    const stats = data.map((stat) => (
        <div key={stat.title} className={classes.stat}>
            <Text className={classes.title}>{stat.title}</Text>
            <Text className={classes.count}>{stat.stats.toString()}</Text>
            <Text className={classes.description}>{stat.description}</Text>
        </div>
    ));

    return <div className={classes.root}>{stats}</div>;
}

export default Average;