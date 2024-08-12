// src/components/UserList.js
import React from 'react';


const UserList = ({ users, selectedUser, onSelectUser, searchTerm, onSearch ,onLogout,}) => (
  <div className="user-list" >
    <h3>Users</h3>
    <input
      type="text"
      placeholder="Search users..."
      value={searchTerm}
      onChange={onSearch}
    />
    <ul>
      {users.map((user) => (
        <li key={user} onClick={() => onSelectUser(user)} className={selectedUser === user ? 'active-user' : ''} >
          {user}
        </li>
      ))}
    </ul>
    <button className="logOut" onClick={onLogout}>
   <svg style={{marginRight:"10px"}} fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="#8E90A5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>Logout</button>
  </div>
);

export default UserList;
