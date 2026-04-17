import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants.js'
import { removeUserFromFeed } from '../utils/feedSlice.js'

const UserCard = ({user}) => {
    const {_id,firstName, lastName, photoUrl,age ,gender,about, skills} = user || {};
    const visibleSkills = Array.isArray(skills) ? skills.filter(Boolean).slice(0, 4) : [];
    
    if (!user) return <div>No user data</div>;

    const dispatch = useDispatch();

    const handleSendRequest = async(status,user_id) => {
        try{
            await axios.post(`${BASE_URL}/request/send/${status}/${user_id}`, {}, { withCredentials: true });
            //no alert or state update needed as the user will be removed from feed on next fetch
            dispatch(removeUserFromFeed(user_id));
        }
        catch(err){
            console.log(err);
        }
    }
    
  return (

    <div className='p-2 sm:p-3 flex items-center justify-center'>
        <div className="card h-[650px] w-[360px] overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-slate-800 via-slate-900 to-black text-slate-100 shadow-2xl backdrop-blur">
            <figure className="group relative h-[360px] w-full overflow-hidden">
                <img
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    src={user.photoUrl || 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png'}
                    alt="user photo" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-white/20" />
                <div className="pointer-events-none absolute -bottom-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-2xl" />
            </figure>
            <div className="card-body flex h-[290px] flex-col gap-2 p-6">
                <h2 className="card-title text-2xl font-bold tracking-tight text-white">{user.firstName || 'User'} {user.lastName || ''}</h2>
                {(age || gender) && (
                    <div className="flex flex-wrap items-center gap-2">
                        {age && (
                            <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-200">
                                Age: {age}
                            </span>
                        )}
                        {gender && (
                            <span className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold capitalize tracking-wide text-sky-200">
                                {gender}
                            </span>
                        )}
                    </div>
                )}
                <p className="line-clamp-2 min-h-[46px] text-sm leading-relaxed text-slate-300">{user.about || 'No description available'}</p>

                {visibleSkills.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-2">
                        {visibleSkills.map((skill) => (
                            <span key={skill} className="rounded-md border border-violet-300/30 bg-violet-400/10 px-2.5 py-1 text-xs font-medium text-violet-100">
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                <div className="card-actions mt-2 justify-center gap-3 pt-1 pb-1">

                    <button className="btn rounded-full border-0 bg-emerald-500 px-6 text-white shadow-lg shadow-emerald-500/30 transition-transform duration-200 hover:scale-105 hover:bg-emerald-400"
                     onClick={() => handleSendRequest("interested", _id)}
                     >interested</button>

                    <button className="btn rounded-full border border-white/20 bg-white/5 px-6 text-slate-200 transition-transform duration-200 hover:scale-105 hover:bg-white/10"
                    onClick={() => handleSendRequest("ignored", _id)}
                    >ignore</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard
