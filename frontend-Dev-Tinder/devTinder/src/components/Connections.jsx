import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants.js'
import { setConnections } from '../utils/connectionSlice.js'
import { useSelector } from 'react-redux'

const Connections = () => {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections.connections);

    const fetchConnections = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
            dispatch(setConnections(response.data.data));
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);


    if(!connections || connections.length === 0){
        return (
            <div className='p-10 flex items-center justify-center'>
                <p className='text-gray-500 text-lg'>No connections yet. Start swiping to find your match!</p>
            </div>
        )
    }

  return (
        <div className='mx-auto w-full max-w-6xl px-4 py-6 lg:px-8 lg:py-10'>
            <h1 className='mb-6 text-2xl font-bold text-slate-100'>Your Connections</h1>

            <div className='flex flex-col gap-5'>
                {connections.map((connection) => {
                    const {
                        _id,
                        firstName,
                        lastName,
                        age,
                        gender,
                        about,
                        photoUrl,
                        skills
                    } = connection;

                    return (
                        <div
                            key={_id}
                            className='flex min-h-[200px] w-full flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 text-slate-100 shadow-xl sm:flex-row sm:items-center sm:gap-5 sm:p-5'
                        >
                            <div className='flex w-full shrink-0 items-center justify-center sm:w-44'>
                                <img
                                    src={photoUrl || 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png'}
                                    alt={`${firstName || 'User'} profile`}
                                    className='h-24 w-24 rounded-full border-4 border-emerald-400/40 object-cover shadow-lg shadow-emerald-400/20 sm:h-28 sm:w-28'
                                />
                            </div>

                            <div className='flex h-full w-full flex-col justify-between overflow-hidden'>
                                <div>
                                    <h2 className='text-2xl font-semibold tracking-tight text-white'>
                                        {firstName || 'User'} {lastName || ''}
                                    </h2>

                                    {(age || gender) && (
                                        <div className='mt-2 flex flex-wrap gap-2'>
                                            {age && <span className='rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200'>Age: {age}</span>}
                                            {gender && <span className='rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold capitalize text-sky-200'>{gender}</span>}
                                        </div>
                                    )}

                                    <p className='mt-3 line-clamp-3 text-sm leading-relaxed text-slate-300'>
                                        {about || 'Connected recently. Start a conversation and build your network.'}
                                    </p>
                                </div>

                                {Array.isArray(skills) && skills.length > 0 && (
                                    <div className='mt-4 flex flex-wrap gap-2'>
                                        {skills.slice(0, 5).map((skill) => (
                                            <span
                                                key={`${_id}-${skill}`}
                                                className='rounded-md border border-violet-300/30 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-100'
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
  )
}

export default Connections
