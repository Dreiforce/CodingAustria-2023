import React from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { LinksCollection, UserStateCollection } from '../api/links';

export const AdminView = () => {
  const isLoading = useSubscribe('links');
  const userStates = useFind(() => UserStateCollection.find());


  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Admin View</h2>
      est
      <ul>{userStates.map(
        userState => <li key={userState._id}>
          <a href={'/u/' + userState.teamName} target="_blank">{userState.teamName}</a>
          <div>
            {/* {JSON.stringify(userState)} */}
            {
              Object.keys(userState).filter(key => key.startsWith("state")).map(key => <div>{key}: {userState[key]}</div>)

            }
          </div>
        </li>
      )}</ul>
    </div>
  );
};
