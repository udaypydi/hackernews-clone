import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid,
    Legend,
    Tooltip,
} from 'recharts';

function Timeline(props) {
    const { newsMeta, feed } = props;

    const memoizedChartData = useMemo(() => {
        const chartData = [];
        if (feed.length > 0) {
            feed.forEach(feedData => {
                const feedMeta = newsMeta[feedData.objectID];
                if (feedMeta) {
                    chartData.push({
                        name: feedData.objectID, pv: feedMeta.votes, amt: feedMeta.votes
                    })
                } else {
                    chartData.push({
                        name: feedData.objectID, pv: 0, amt: 0
                    })
                }
            });
            return chartData
        }
    }, [feed]);
  
 
    return (
        <div className="overflow-auto overflow-y-auto mt-3">
             <LineChart 
                width={1000} 
                height={400} 
                data={memoizedChartData}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            </LineChart>
        </div>
       
    )
}

Timeline.propTypes = {
    feed: PropTypes.shape([]),
    newsMeta: PropTypes.shape({}),
};

Timeline.defaultProps = {
    feed: [],
    newsMeta: {}
};

export default Timeline;
