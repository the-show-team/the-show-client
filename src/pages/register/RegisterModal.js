import {Button, Icon, Image, Input, Modal} from "semantic-ui-react";
import React, {useState} from "react";
import {FormattedMessage} from "react-intl";
import GoogleLogin from 'react-google-login';
import TwitterLogin from "react-twitter-login";
import {useLocation} from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';
import LineLogin from "./LineLoginButton";

const RegisterModal = ({...other}) => {
    const path = useLocation().pathname;
    const [step, setStep] = useState(path.toString().endsWith("twitter") ? 4 : 1);
    const incrementStep = () => setStep(step + 1);
    const decrementStep = () => setStep(step - 1);

    // real name
    const [realName, setRealName] = useState("");

    // nick name
    const [nickNames, setNickNames] = useState([""]);
    const addNickNames = () => setNickNames([...nickNames, ""]);
    const modifyNickNames = (newNickName, index) => setNickNames(nickNames.map((nickName, i) => index === i ? newNickName : nickName));
    const deleteNickName = () => setNickNames(nickNames.filter((nickName, i) => i !== nickNames.length - 1));

    // Google
    const [gmail, setGmail] = useState("");
    const [googleId, setGoogleId] = useState(void 0);
    const responseGoogle = (response) => {
      if (response) {
        setGmail(response.profileObj.email);
        setGoogleId(response.googleId);
      }
    };
    const errorGoogle = (error) => {
      console.error(error)
    };

    // Twitter
    const [twitterId, setTwitterId] = useState(void 0);
    const [twitterName, setTwitterName] = useState(void 0);
    const responseTwitter = (error, response) => {
      if (response) {
        setTwitterId(response.user_id);
        setTwitterName(response.screen_name);
      }
    };

    //Facebook
    const [facebookId, setFacebookId] = useState(void 0);
    const [facebookName, setFacebookName] = useState(void 0);
    const responseFacebook = (response) => {
      if (response) {
        setFacebookId(response.id);
        setFacebookName(response.name);
      }
    };

    //Line
    const [lineId, setLineId] = useState(void 0);
    const [lineName, setLineName] = useState(void 0);
    const responseLine = (response) => {
      if (response) {
        setLineId(response.userId);
        setLineName(response.displayName);
      }
    };


    const switchRenderByStep = step => {
        switch (step) {
          case 1: {
            return <div>
              <Modal.Description>
                <FormattedMessage id={"register.inputRealName"}/>
              </Modal.Description>
              <Input type={"text"} size={"massive"} onChange={e => setRealName(e.target.value)} value={realName}/>
            </div>
          }
          case 2: {
            return <div>
              <Modal.Description>
                <FormattedMessage id={"register.inputNickName"}/>
              </Modal.Description>
              {
                nickNames.map((nickName, i) => (
                  <div key={i}>
                    <Input type={"text"} size={"massive"} onChange={e => modifyNickNames(e.target.value, i)}
                           value={nickName}/>
                    {i !== 0 && i === nickNames.length - 1 &&
                    <Icon name="minus circle" color="red" size="huge" onClick={deleteNickName}/>
                    }
                    {i === 0 &&
                    <Icon name="plus circle" color="green" size="huge" onClick={addNickNames}/>
                    }
                  </div>
                ))
              }
            </div>
          }
          case 3: {
            return <div>
              <Modal.Description>
                <FormattedMessage id={"register.inputGoogleAccount"}/>
              </Modal.Description>
              {gmail ? `Gmail Address : ${gmail}` :
                <GoogleLogin
                  clientId="982685712967-20u6oadrhmvd52ala8ate9322o5me7n7.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={errorGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              }
            </div>
          }
          case 4: {
            return <div>
              <Modal.Description>
                <FormattedMessage id={"register.inputTwitterAccount"}/>
              </Modal.Description>
              {twitterName ? `Twitter Name : ${twitterName}` :
                <TwitterLogin
                  authCallback={responseTwitter}
                  consumerKey={"6DCoOIk69QJtvI3vUe8nUPCaQ"}
                  consumerSecret={"1n2dE9NoI6Qsa2ns8yCbaltlMUgvg69lzYJMB718M00kjTuqPj"}
                  callbackUrl={"http://localhost:3000/register/twitter"}
                />
              }
            </div>
          }
          case 5: {
            return <div>
              <Modal.Description>
                <FormattedMessage id={"register.inputFacebookAccount"}/>
              </Modal.Description>
              {facebookName ? `Facebook Name : ${facebookName}` :
                <FacebookLogin
                  appId="300757644320774"
                  fields="name,email,picture"
                  callback={responseFacebook}
                />
              }
            </div>
          }
          case 6: {
            return <div>
              <Modal.Description>
                <FormattedMessage id={"register.inputLineAccount"}/>
              </Modal.Description>
              {
                lineName ? `Line Name : ${lineName}` :
                  <LineLogin clientID='1654714820'
                          clientSecret='7269e58c01d5251d14cc9f0fe50710f3'
                          state='XAg2r5HT' // We can make it
                          redirectURI='http://localhost:3000/register/line'
                          scope='profile'
                          callback={responseLine}/>
              }
            </div>
          }
          default:
            return <div/>
        }
      }
    ;
    return <Modal {...other}>
      <Modal.Header>Register</Modal.Header>
      <Modal.Content>
        {switchRenderByStep(step)}
      </Modal.Content>
      <Modal.Actions>
        {step !== 1 && <Button basic size={"massive"} onClick={decrementStep}>
          Previous
        </Button>}
        <Button primary size={"massive"} onClick={incrementStep}>
          Next
        </Button>
      </Modal.Actions>
    </Modal>
  }
;

export default RegisterModal;
