import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants.js'
import { setFeed } from '../utils/feedSlice.js'
import UserCard from './UserCard.jsx'
const Feed = () => {

    const feed = useSelector((store) => store.feed.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {

        if (feed.length > 0) return; // If feed is already fetched, do not fetch again

        try {
            const response = await axios.get(`${BASE_URL}/user/feed`, { withCredentials: true });
            dispatch(setFeed(response.data.data || []));
            console.log("Feed data:", response.data.data || []);
        }
        catch (error) {
            console.error("Error fetching feed:", error);
        }
    }
    useEffect(() => {
        getFeed();
    }, [])

    return (feed && feed.length > 0 &&  (
        <div className='p-10 flex items-center justify-center'>
            <UserCard user={feed[0]} />
        </div>
    ) )
}

export default Feed;
