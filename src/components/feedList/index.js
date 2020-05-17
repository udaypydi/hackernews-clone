import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Feed from 'components/feed';
import { TABLE_KEYS } from './feedList.constant';

function FeedList(props) {
    const [feed, setFeed] = useState(props.feed);
    
    useEffect(() => {
        if (feed.length !== props.feed) {
            setFeed(props.feed);
        }
    }, [props.feed]);

    function handleUpvote(key) {
        const feedData = feed[key];
        const newFeed = [...feed];
        if (feedData.votes) {
            feedData.votes += 1;
        } else {
            feedData.votes = 1;
        }
        newFeed[key] = feedData;
        setFeed(newFeed);
        // replace with api call
        localStorage.setItem('newsFeed', JSON.stringify(newFeed));
    }
    
    return (
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
                        onUpvote={handleUpvote}
                    />
                ))
            }
        </div>
    )
}

FeedList.propTypes = {
    feed: PropTypes.shape([]),
};

FeedList.defaultProps = {
    feed: [],
};

export default FeedList;
