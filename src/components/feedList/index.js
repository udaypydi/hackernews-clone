import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Feed from 'components/feed';
import Timeline from 'components/timeline';
import { TABLE_KEYS } from './feedList.constant';

function FeedList(props) {
    const [feed, setFeed] = useState(props.feed);
    const [newsMeta, setNewsMeta] = useState({});

    useEffect(() => {
        if (feed.length !== props.feed) {
            setFeed(props.feed);
        }
        try {
            const meta = JSON.parse(localStorage.getItem('newsMeta'));
            if (meta) {
                setNewsMeta(meta);
            }
        } catch(err) {
            console.log(err); // add sentry calls
        }
       
    }, [props.feed]);

    function handleUpvote(key) {
        const meta = { ...newsMeta };
        if (meta[key]) {
            meta[key].votes += 1;
        } else {
            meta[key] = {
                hide: false,
                votes: 1,
            };
        }
       
        setNewsMeta(meta);
        localStorage.setItem('newsMeta', JSON.stringify(meta));
    }
    
    return (
        <>
            <div>
                <div 
                    className="flex justify-evenly bg-orange-500 text-white p-2 content-center"
                >
                    {
                        TABLE_KEYS.map(data => (
                            <p className={cx(data.width)}>{data.key}</p>
                        ))
                    }
                </div>
                {
                    feed.map((data, index) => (
                        <Feed 
                            news={{ ...data, datakey: index }}
                            votes={newsMeta[data.objectID] ? newsMeta[data.objectID].votes : 0}
                            onUpvote={handleUpvote}
                        />
                    ))
                }
            </div>
            <Timeline 
                feed={[...feed]}
                newsMeta={newsMeta}
            />
        </>
    )
}

FeedList.propTypes = {
    feed: PropTypes.shape([]),
};

FeedList.defaultProps = {
    feed: [],
};

export default FeedList;
