import React from 'react'
import { User } from '../../modal/User'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'

interface UserTitleCardProps {
    user: User
}

const UserTitleCard: React.FC<UserTitleCardProps> = ({user}) => {
  const { following, followUser } = useUserContext(); // Use followUser

    // Check if user is currently followed
    const isFollowing = following.some((u) => u.id === user.id);
  return (
    <div>
      <div className="card mb-3">
        <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text"><b>Email:</b> {user.email}</p>
            <div className='row'>
              <div className='col-8'>
                <Link to={`/crud/${user.id}`}>
                    <button className="btn btn-primary">View Details</button>
                </Link>
              </div>
              <div className='col-4'>
                <button className= {isFollowing ? 'btn btn-outline-danger' : 'btn btn-outline-success'} onClick={() => followUser(user)}>
                {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default UserTitleCard
