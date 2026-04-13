import React from 'react'
import { removeRequests, setRequests } from '../utils/requestSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';
import { useEffect } from 'react';
const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests.requests);

    const reviewRequest = (status,_id) => {
        try{
            axios.post(`${BASE_URL}/request/review/${status}/${_id}`,{}, { withCredentials: true });
            dispatch(removeRequests(_id));
        }
        catch(err){
            console.log(err);
        }

    }
    
    const fetchRequests = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
            dispatch(setRequests(response.data.data));
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])

  if(!requests || requests.length === 0){
        return (
            <div className='p-10 flex items-center justify-center'>
                <p className='text-gray-500 text-lg'>No requests yet. Start finding your match!</p>
            </div>
        )
    }

  return (
        <div className='mx-auto w-full max-w-5xl px-4 py-6 lg:px-8 lg:py-10'>
            <h1 className='mb-5 text-2xl font-bold tracking-tight text-slate-100'>Your Requests</h1>

            <div className='flex flex-col gap-4'>
                {requests.map((request) => {
                    const {
                        _id,
                        firstName,
                        lastName,
                        age,
                        gender,
                        about,
                        photoUrl,
                        skills
                    } = request.fromUserId;

                    return (
                        <div
                            key={_id}
                            className='mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 text-slate-100 shadow-xl shadow-black/20 backdrop-blur-sm sm:grid sm:grid-cols-[88px_1fr_88px] sm:items-center sm:gap-4 sm:p-4'
                        >
                            <div className='flex shrink-0 items-center justify-center'>
                                <img
                                    src={photoUrl || 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png'}
                                    alt={`${firstName || 'User'} profile`}
                                    className='h-20 w-20 rounded-full border-4 border-emerald-400/40 object-cover shadow-lg shadow-emerald-400/20'
                                />
                            </div>

                            <div className='flex h-full w-full flex-col justify-center overflow-hidden sm:pr-2'>
                                <div>
                                    <h2 className='text-xl font-semibold tracking-tight text-white sm:text-[1.35rem]'>
                                        {firstName || 'User'} {lastName || ''}
                                    </h2>

                                    {(age || gender) && (
                                        <div className='mt-2 flex flex-wrap gap-2'>
                                            {age && <span className='rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200'>Age: {age}</span>}
                                            {gender && <span className='rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold capitalize text-sky-200'>{gender}</span>}
                                        </div>
                                    )}

                                    <p className='mt-2 line-clamp-2 text-sm leading-relaxed text-slate-300'>
                                        {about || 'Connected recently. Start a conversation and build your network.'}
                                    </p>
                                </div>

                                {Array.isArray(skills) && skills.length > 0 && (
                                    <div className='mt-3 flex flex-wrap gap-2'>
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

                            <div className='flex items-center justify-center sm:justify-end'>
                                <div className='flex flex-row gap-3 sm:flex-col sm:gap-2'>
                                    <button
                                        type='button'
                                        className='flex h-11 w-16 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/15 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200 shadow-lg shadow-emerald-500/10 transition-transform duration-200 hover:scale-105 hover:bg-emerald-400/20 sm:w-11 sm:rounded-full'
                                        onClick={() => reviewRequest("accepted", request._id)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        type='button'
                                        className='flex h-11 w-16 items-center justify-center rounded-2xl border border-rose-400/30 bg-rose-500/15 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-200 shadow-lg shadow-rose-500/10 transition-transform duration-200 hover:scale-105 hover:bg-rose-400/20 sm:w-11 sm:rounded-full'
                                        onClick={() => reviewRequest("rejected", request._id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
  )
}

export default Requests
