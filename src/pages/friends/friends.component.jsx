import React from 'react';
import './friends.styles.scss';
import AddFriend from '../../components/add-friend/add-friend.component';
import ViewFriends from '../../components/view-friends/view-friends.component';


const friends = ({currentUser}) => (
	<div className="friends">
		<AddFriend/>
		<ViewFriends/>
	</div>
);

export default friends;
