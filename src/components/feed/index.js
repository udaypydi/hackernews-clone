import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './feed.scss';

function Feed(props) {
    const { news, votes, onUpvote } = props;
    return (
        <div 
            className={cx(
                "Feed",
                "flex p-2 items-center justify-left",
                {
                 "Feed-Dark": news.datakey % 2 === 0,
                 "Feed-Light": news.datakey % 2 === 1,
                } 
            )}
        >
           <p className={cx(
               "w-1/6 text-center",
               {
                "text-orange-500": news.num_comments > 100,
                "font-bold": news.num_comments > 100,
               })}
            >{news.num_comments}</p>
           <p className="w-1/6 text-center">{votes || 0}</p>
           <div className="w-1/6 items-center flex justify-center">
               <div 
                    className="Upvote"
                    onClick={() => onUpvote(news.objectID)}
               ></div>
            </div>
           <div className="w-2/5">
            <p>{news.title}.<span className="text-gray-500">{news.points} points by {news.author}</span></p>
           </div>
           
        </div>
    )
};

Feed.propTypes = {
    news: PropTypes.shape({}),
    votes: PropTypes.number,
};

Feed.defaultProps = {
    news: [],
    votes: 0,
};

export default Feed;
