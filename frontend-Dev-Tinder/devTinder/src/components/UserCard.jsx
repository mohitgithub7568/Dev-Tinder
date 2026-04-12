import React from 'react'

const UserCard = ({user}) => {
    console.log("User in UserCard:", user);
    const {firstName, lastName, photoUrl,age ,gender,about} = user || {};
    
    if (!user) return <div>No user data</div>;
    
  return (

    <div className='px-4 py-8 flex items-center justify-center'>
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
                <p className="line-clamp-3 min-h-[60px] text-sm leading-relaxed text-slate-300">{user.about || 'No description available'}</p>
                <div className="card-actions mt-auto justify-center gap-3 pt-3 pb-1">

                    <button className="btn rounded-full border-0 bg-emerald-500 px-6 text-white shadow-lg shadow-emerald-500/30 transition-transform duration-200 hover:scale-105 hover:bg-emerald-400">intrested</button>
                    <button className="btn rounded-full border border-white/20 bg-white/5 px-6 text-slate-200 transition-transform duration-200 hover:scale-105 hover:bg-white/10">ignore</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard
