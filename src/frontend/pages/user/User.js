import React, {useState} from "react";
import UserAPI from "../../../reposirory/api/UserAPI";
import {FormattedMessage} from "react-intl";

const User = ({match}) => {
  const userId = match.params.id;
  const [userProfile, setUserProfile] = useState(void 0);
  if (!userProfile) {
    UserAPI.getUserProfile(userId).then(data => setUserProfile(data.user));
    return <div/>
  }
  return <div className="ui container">
    <div className="ui grid">
      <div className="ui row">
        <div className="ui eight wide column">
          <FormattedMessage id="profile.realName"/>
        </div>
        <div className="ui eight wide column">
          {userProfile.realName}
        </div>
      </div>
      <div className="ui row">
        <div className="ui eight wide column">
          <FormattedMessage id="profile.nickNames"/>
        </div>
        <div className="ui eight wide column">
          {userProfile.nickNames.join(",")}
        </div>
      </div>
      <div className="ui row">
        <div className="ui eight wide column">
          <FormattedMessage id="profile.gmailAddress"/>
        </div>
        <div className="ui eight wide column">
          <a href={`mailto:${userProfile.gmail}`}>{userProfile.gmail}</a>
        </div>
      </div>
      <div className="ui row">
        <div className="ui eight wide column">
          <FormattedMessage id="profile.twitterName"/>
        </div>
        <div className="ui eight wide column">
          <a href={`https://twitter.com/${userProfile.twitterName}`}>{userProfile.twitterName}</a>
        </div>
      </div>
      <div className="ui row">
        <div className="ui eight wide column">
          <FormattedMessage id="profile.facebookName"/>
        </div>
        <div className="ui eight wide column">
          <a href={`https://facebook.com/${userProfile.facebookId}`}>{userProfile.facebookName}</a>
        </div>
      </div>
      <div className="ui row">
        <div className="ui eight wide column">
          <FormattedMessage id="profile.lineName"/>
        </div>
        <div className="ui eight wide column">
          {userProfile.lineName}<br/>
          {userProfile.lineId}
        </div>
      </div>
      <div className="ui row">
        <div className="ui eight wide column">
          <FormattedMessage id="profile.instagramName"/>
        </div>
        <div className="ui eight wide column">
          {userProfile.instagramName}
        </div>
      </div>
      <div className="ui row">
        <div className="ui eight wide column">
          <FormattedMessage id="profile.mailAddresses"/>
        </div>
        <div className="ui eight wide column">
          {userProfile.mailAddresses.map((mailAddress, i) => <div key={i}>
            <a href={`mailto:${mailAddress}`}>{mailAddress}</a>
          </div>)}
        </div>
      </div>
    </div>
    <img
      className="ui image"
      src={`https://api.qrserver.com/v1/create-qr-code/?data=${process.env.REACT_APP_THE_SHOW_SELF_URL}/${userId}`}
      alt="QRコード"/>
  </div>
};


export default User;
