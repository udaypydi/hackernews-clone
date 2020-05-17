import React, { useEffect, useState } from 'react';
import FeedList from 'components/feedList';

function Home(props) {
    const [liveFeed, setLiveFeed] = useState([]);

    useEffect(() => {
        const newsFeed = localStorage.getItem('newsFeed');
        if (newsFeed) {
            try {
                setLiveFeed(JSON.parse(newsFeed));
            } catch(err) {
                console.log(err); // call a sentry or any log rocket function
            }
        } else {
            fetch('http://hn.algolia.com/api/v1/search?query=frontend&tags=story')
            .then(res => res.json())
            .then(json => {
                setLiveFeed(json.hits);
                localStorage.setItem('newsFeed', JSON.stringify(json.hits));
            })
        }
       
    }, []);

    return (
        <FeedList feed={liveFeed} />
    )
}

export default Home;
