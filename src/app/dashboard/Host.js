"use client";

import { hosting } from "@tgwf/co2";
import { useMemo, useState } from "react";
import { Text } from '@mantine/core';
import classes from '@/styles/StatsGroup.module.css';

export const Host = () => {
    const [co2, setCo2] = useState('')
    useMemo(async () => setCo2(
        await myAsynFunction('localhost')), [co2]);

    const data = [
        {
            title: 'Is our host green?',
            stats: co2,
            description: '',
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

const myAsynFunction = async (domain) => {
    return hosting.check(domain);
}

export default Host;