import React, {useEffect, useState} from 'react';
import axios from 'axios';
import url from 'url';
import qs from 'qs';
import querystring from 'querystring';
import jwt from 'jsonwebtoken';
import './register.css'
import NewWindow from 'react-new-window'

const maxAge = 120;

export const LineLogin =  ({
                                  clientID,
                                  clientSecret,
                                  state,
                                  nonce,
                                  scope,
                                  callback,
                                  redirectURI
                                }) => {
  const getLineLoginURL = () => {
    // Build query string.
    const query = querystring.stringify({
      response_type: 'code',
      client_id: clientID,
      state: state,
      scope: scope,
      nonce: nonce,
      prompt: 'consent',
      max_age: maxAge,
      bot_prompt: 'normal',
      redirect_uri: redirectURI
    });
    // Build the Line authorise URL.
    const lineAuthoriseURL =
      'https://access.line.me/oauth2/v2.1/authorize?' + query;
    // Redirect to external URL.
    // window.location.href = lineAuthoriseURL;
    return lineAuthoriseURL;
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

    const responseToken = await axios.post('https://api.line.me/oauth2/v2.1/token', qs.stringify(reqBody), reqConfig);
    const accessToken = responseToken.data.access_token;
    const lineProfileResponse = await axios.get("https://api.line.me/v2/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    callback && callback(lineProfileResponse.data)
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
      <div className="line-button" onClick={() => setPopout(true)}/>
      {popout && <NewWindow
        url={getLineLoginURL()}
        onOpen={childWindow => {
          window.onmessage = ({data: {type, data}}) => {
            if (type === "authorized") {
              setCode(data.code);
              setPopout(false);
              window.onmessage = void 0;
            }
          }
        }}
        onUnload={() => {
          setPopout(false)
        }}/>}
    </div>
  );
};

export default LineLogin;
