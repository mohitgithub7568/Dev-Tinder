import React, { useEffect, useState } from 'react'
import UserCard from './UserCard.jsx'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice.js'
import { BASE_URL } from '../utils/constants.js'

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [age, setAge] = useState(user?.age || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || '');
    const [skills, setSkills] = useState(user?.skills ? user.skills.join(', ') : '');
    const [about, setAbout] = useState(user?.about || '');
    const [error, setError] = useState(null);
    

    const saveProfile = async () => {
      try {
        const res = await axios.patch(`${BASE_URL}/profile/edit`, {
          firstName,
          lastName,
          email,
          age,
          gender,
            photoUrl,
            skills: skills.split(',').map((skill) => skill.trim()).filter((skill) => skill),
            about
        }, { withCredentials: true });

        dispatch(addUser(res.data.data));
        alert("Profile updated successfully!");
      } catch (error) {
        setError(error.response?.data || error.message);
        console.error('Error saving profile:', error.response?.data || error.message);
      }
    };

  

    useEffect(() => {
      if (!user) return;

      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setAge(user.age || '');
      setGender(user.gender || '');
      setPhotoUrl(user.photoUrl || '');
      setSkills(user.skills ? user.skills.join(', ') : '');
      setAbout(user.about || '');
    }, [user]);

    const previewUser = {
      ...user,
      firstName,
      lastName,
      email,
      age,
      gender,
      photoUrl,
      skills: skills
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill),
      about
    };

  return (
    <div className='mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 py-6 lg:px-8 lg:py-10 xl:flex-row xl:items-start xl:justify-center xl:gap-8'>
      <div className="w-full xl:max-w-3xl">
      <div className="card bg-blue-900 w-full shadow-sm">
        <div className="card-body gap-2 sm:gap-3">
          <h2 className="card-title justify-center text-2xl">Edit Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <fieldset className="fieldset gap-0">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                name="firstName"
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
              />
            </fieldset>

            <fieldset className="fieldset gap-0">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                name="lastName"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
              />
            </fieldset>

            <fieldset className="fieldset gap-0">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                name="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </fieldset>

            <fieldset className="fieldset gap-0">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="number"
                name="age"
                className="input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
              />
            </fieldset>

            <fieldset className="fieldset gap-0">
              <legend className="fieldset-legend">Gender</legend>
              <select
                name="gender"
                className="select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </fieldset>

            <fieldset className="fieldset gap-0">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                name="photoUrl"
                className="input"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Enter photo URL"
              />
            </fieldset>
          </div>

          <fieldset className="fieldset gap-0">
            <legend className="fieldset-legend">Skills (comma separated)</legend>
            <input
              type="text"
              name="skills"
              className="input"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Node.js, MongoDB"
            />
          </fieldset>

          <fieldset className="fieldset gap-0">
            <legend className="fieldset-legend">About</legend>
            <textarea
              name="about"
              className="textarea h-24"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Write something about yourself"
            />
          </fieldset>

          // Display error message if any
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="card-actions justify-center mt-3">

            <button type="button" className="btn btn-primary" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      </div>

      <div className="w-full xl:max-w-md xl:sticky xl:top-24 xl:self-start">
        <div className="flex justify-center xl:justify-start">
          <UserCard user={previewUser} />
        </div>
      </div>
    </div>
  )
}

export default EditProfile
