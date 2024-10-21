"use client";
import { co2 } from "@tgwf/co2";
import { useEffect, useState } from "react";
import { Text } from '@mantine/core';
import classes from '@/styles/StatsGroup.module.css';
import axios from 'axios';

export const PerVisit = () => {
    {
        const [stateFileSize, setStateFileSize] = useState(0);

        useEffect(() => {
            const fetchState = async () => {
                try {
                    const response = await axios.get('/api/state');
                    setStateFileSize(response.data);
                } catch (error) {
                    console.error('Failed to fetch state:', error);
                }
            };
            fetchState();
        }, [])

        const swd = new co2({ model: "swd" })
        const emissions = swd.perVisit(stateFileSize, true)

        const data = [
            {
                title: 'Total produced is ' + stateFileSize + ' bytes',
                stats: emissions,
                description: 'gCO2 per kWh (swd model)',
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
}

export default PerVisit;