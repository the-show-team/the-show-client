import React, {useEffect, useState} from 'react';
import axios from 'axios';
import url from 'url';
import qs from 'qs';
import querystring from 'querystring';
import './register.css'
import NewWindow from 'react-new-window'

const maxAge = 120;

export const InstagramLogin =  ({
                                  clientID,
                                  clientSecret,
                                  state,
                                  nonce,
                                  scope,
                                  callback,
                                  redirectURI
                                }) => {
  const getInstagramLoginURL = () => {
    // Build query string.
    const query = querystring.stringify({
      response_type: 'code',
      client_id: clientID,
      scope: "user_profile,user_media",
      redirect_uri: redirectURI
    });
    // Build the Instagram authorise URL.
    const InstagramAuthoriseURL =
      'https://api.instagram.com/oauth/authorize?' + query;
    // Redirect to external URL.
    // window.location.href = InstagramAuthoriseURL;
    return InstagramAuthoriseURL;
  };

  const [code, setCode] = useState(void 0)

  const getAccessToken = async (code) => {
    const reqBody = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectURI,
      client_id: clientID,
      client_secret: clientSecret
    };
    const reqConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const responseToken = await axios.post('https://api.Instagram.me/oauth2/v2.1/token', qs.stringify(reqBody), reqConfig);
    const accessToken = responseToken.data.access_token;
    const InstagramProfileResponse = await axios.get("https://api.Instagram.me/v2/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    callback && callback(InstagramProfileResponse.data)
  };

  useEffect(() => {
    const isChild = window.opener;
    if (isChild) {
      const urlParts = url.parse(window.location.href, true);
      const query = urlParts.query;
      if (query && query.code) {
        const code = query.code;
        window.opener.postMessage({type: "authorized", data: {code}}, window.origin)
      }
    }
  }, [clientID]);

  const [requested, setRequested] = useState(false);
  const [popout, setPopout] = useState(false);
  if (!requested && code) {
    getAccessToken(code).then();
    setRequested(true);
  }
  return (
    <div>
      <div className="instagram-button" onClick={() => setPopout(true)}/>
      {popout && <NewWindow
        url={getInstagramLoginURL()}
        onOpen={childWindow => {
          window.onmessage = ({data: {type, data}}) => {
            if (type === "authorized") {
              setCode(data.code);
              setPopout(false);
              window.onmessage = void 0;
            }
          };
        }}
        onUnload={() => {
          setPopout(false)
        }}/>}
    </div>
  );
};

export default InstagramLogin;
