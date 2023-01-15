import React, { useContext } from 'react';

import AuthContext from '../context/auth/AuthContext';
import UserModal from './UserModal';

import Guide from './Guide';
import User from './User';

export default function Profile() {
  const { user, auth_token } = useContext(AuthContext);
  return (user && auth_token ? 
    <div>
      <UserModal name={user.name} profession={user.profession} bio={user.bio} />
      <User user={user} />
    </div>
    : <Guide />
  );
}
