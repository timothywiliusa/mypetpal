import React from 'react';
import './friends.styles.scss';
import AddFriend from '../../components/add-friend/add-friend.component';


const friends = ({currentUser}) => (
	<div className="friends">
		<AddFriend currentUser={currentUser}/>
	</div>
);

export default friends;
