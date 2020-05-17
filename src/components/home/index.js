import React, { useEffect, useState } from 'react';
import FeedList from 'components/feedList';

function Home(props) {
    const [liveFeed, setLiveFeed] = useState([]);

    useEffect(() => {
        fetch('http://hn.algolia.com/api/v1/search?tags=front_page')
        .then(res => res.json())
        .then(json => {
            setLiveFeed(json.hits);
        })
    }, []);

    return (
        <FeedList feed={liveFeed} />
    )
}

export default Home;
