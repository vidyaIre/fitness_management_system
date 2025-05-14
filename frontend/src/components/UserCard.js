import React from 'react';

const roleBadgeColor = {
  admin: 'danger',
  trainer: 'warning',
  user: 'success',
};

const UserCard = ({ name, image, role }) => {
  const badgeColor = roleBadgeColor[role] || 'secondary';

  return (
    <div className="card text-center">
      <div className="card-body">
        <img
          src={image || 'https://via.placeholder.com/150'}
          alt="User"
          className="rounded-circle mb-3"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
        <h4 className="card-title">{name}</h4>
        <span className={`badge bg-${badgeColor} text-capitalize`}>
          {role || 'user'}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
