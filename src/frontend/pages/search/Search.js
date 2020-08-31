import React, {useState} from "react";
import UserAPI from "../../../reposirory/api/UserAPI";
import {FormattedMessage} from "react-intl";
import {Redirect} from "react-router-dom";

const Search = () => {
  const [users, setUsers] = useState(void 0);
  const [detailId, setDetailId] = useState(void 0);
  if (!users) {
    UserAPI.getUserProfileList().then(response => {
      setUsers(response.users)
    });
    return <FormattedMessage id="search.loading"/>
  }
  if (detailId) {
    return <Redirect to={`/user/${detailId}`}/>
  }
  return <div>
    <div class="ui search">
      <div class="ui icon input">
        <input class="prompt" type="text" placeholder="Search"/>
        <i class="search icon"/>
      </div>
    </div>
    <div className="ui grid">
      <div className="ui row">
        <div className="ui two wide column">
          <FormattedMessage id="search.realName"/>
        </div>
        <div className="ui two wide column">
          <FormattedMessage id="search.nickNames"/>
        </div>
        <div className="ui two wide column">
          <FormattedMessage id="search.gmailAddress"/>
        </div>
        <div className="ui two wide column">
          <FormattedMessage id="search.twitterName"/>
        </div>
        <div className="ui two wide column">
          <FormattedMessage id="search.facebookName"/>
        </div>
        <div className="ui two wide column">
          <FormattedMessage id="search.lineName"/>
        </div>
        <div className="ui two wide column">
          <FormattedMessage id="search.instagramName"/>
        </div>
        <div className="ui two wide column">
          <FormattedMessage id="search.mailAddresses"/>
        </div>
      </div>
      {users.map((user, i) => (
        <div className="div ui row" key={i} onClick={() => setDetailId(user.id)}>
          <div className="ui two wide column">
            {user.realName}
          </div>
          <div className="ui two wide column">
            {user.nickNames.join(",")}
          </div>
          <div className="ui two wide column">
            {user.gmail}
          </div>
          <div className="ui two wide column">
            {user.twitterName}
          </div>
          <div className="ui two wide column">
            {user.facebookName}
          </div>
          <div className="ui two wide column">
            {user.lineName}
          </div>
          <div className="ui two wide column">
            {user.instagramName}
          </div>
          <div className="ui two wide column">
            {user.mailAddresses.join(",")}
          </div>
        </div>))}
    </div>
  </div>
};

export default Search;
