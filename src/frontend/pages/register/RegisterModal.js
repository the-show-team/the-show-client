import {Button, Icon, Input, Modal} from "semantic-ui-react";
import React, {useCallback, useState} from "react";
import {FormattedMessage} from "react-intl";
import GoogleLogin from 'react-google-login';
import TwitterLogin from "react-twitter-login";
import FacebookLogin from 'react-facebook-login';
import LineLogin from "./LineLoginButton";
import InstagramLogin from "react-instagram-login";
import UserAPI from "../../../reposirory/api/UserAPI";

const RegisterModal = ({...other}) => {
    const [step, setStep] = useState(1);

    const finalStep = 8;
    //TODO: setxxを行っているコールバック系は全部useCallBackで囲む
    const incrementStep = useCallback(() => setStep(step + 1), [step]);
    const decrementStep = useCallback(() => setStep(step - 1), [step]);

    // real name
    const [realName, setRealName] = useState("");
    // nick name
    const [nickNames, setNickNames] = useState([""]);
    const addNickNames = useCallback(() => setNickNames([...nickNames, ""]), [nickNames]);
    const modifyNickNames = useCallback((newNickName, index) =>
      setNickNames(nickNames.map((nickName, i) => index === i ? newNickName : nickName)), [nickNames]);
    const deleteNickName = useCallback(() => setNickNames(nickNames.filter((nickName, i) => i !== nickNames.length - 1)), [nickNames]);

    // Google
    const [gmail, setGmail] = useState("");
    const [googleId, setGoogleId] = useState(void 0);
    const responseGoogle = useCallback((response) => {
      if (response) {
        setGmail(response.profileObj.email);
        setGoogleId(response.googleId);
      }
    }, []);
    const errorGoogle = (error) => {
      console.error(error)
    };

    // Twitter
    const [twitterId, setTwitterId] = useState(void 0);
    const [twitterName, setTwitterName] = useState(void 0);
    const responseTwitter = useCallback((error, response) => {
      if (response) {
        setTwitterId(response.user_id);
        setTwitterName(response.screen_name);
      }
    }, []);

    //Facebook
    const [facebookId, setFacebookId] = useState(void 0);
    const [facebookName, setFacebookName] = useState(void 0);
    const responseFacebook = useCallback((response) => {
      if (response) {
        setFacebookId(response.id);
        setFacebookName(response.name);
      }
    }, []);

    //Line
    const [lineId, setLineId] = useState(void 0);
    const [lineName, setLineName] = useState(void 0);
    const responseLine = useCallback((response) => {
      if (response) {
        console.log(response)
        setLineId(response.userId);
        setLineName(response.displayName);
      }
    }, []);

    // Instagram
    const [instagramId, setInstagramId] = useState(void 0);
    const [instagramName, setInstagramName] = useState(void 0);
    const responseInstagram = useCallback((response) => {
    }, []);

    // mail address
    const [mailAddresses, setMailAddresses] = useState([""]);
    const addMailAddresses = useCallback(() => setMailAddresses([...mailAddresses, ""]), [mailAddresses]);
    const modifyMailAddresses = useCallback((newMailAddress, index) =>
      setMailAddresses(mailAddresses.map((mailAddress, i) => index === i ? newMailAddress : mailAddress)), [mailAddresses]);
    const deleteMailAddresses = useCallback(() =>
      setMailAddresses(mailAddresses.filter((mailAddress, i) => i !== mailAddresses.length - 1)), [mailAddresses]);

    const registerToDatabase = () => {
      const profile = {
        realName,
        nickNames,
        gmail,
        googleId,
        twitterId,
        twitterName,
        facebookId,
        facebookName,
        lineId,
        lineName,
        instagramId,
        instagramName,
        mailAddresses
      };
      UserAPI.registerUserProfile({profile}).then(other.onClose())
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
                  clientId={process.env.REACT_APP_THE_SHOW_GOOGLE_CLIENT_ID}
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
                  consumerKey={process.env.REACT_APP_THE_SHOW_TWITTER_CUSTOMER_KEY}
                  consumerSecret={process.env.REACT_APP_THE_SHOW_TWITTER_CUSTOMER_SECRET}
                  callbackUrl={`${process.env.REACT_APP_THE_SHOW_SELF_URL}/register/twitter`}
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
                  appId={process.env.REACT_APP_THE_SHOW_FACEBOOK_APP_ID}
                  fields="name,email,picture"
                  scope="public_profile, email"
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
                  <LineLogin clientID={process.env.REACT_APP_THE_SHOW_LINE_CLIENT_ID}
                             clientSecret={process.env.REACT_APP_THE_SHOW_LINE_CLIENT_SECRET}
                             state={process.env.REACT_APP_THE_SHOW_LINE_STATE} // We can make it
                             redirectURI={`${process.env.REACT_APP_THE_SHOW_SELF_URL}/register/line`}
                             scope='profile openid'
                             callback={responseLine}/>
              }
            </div>
          }
          case 7: {
            return <div>
              <Modal.Description>
                <FormattedMessage id={"register.inputInstagramAccount"}/>
              </Modal.Description>
              {
                instagramName ? `Instagram Name : ${instagramName}` :
                  <InstagramLogin
                    clientId={process.env.REACT_APP_THE_SHOW_INSTAGRAM_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={responseInstagram}
                    onFailure={responseInstagram}
                  />
              }
            </div>
          }
          case 8: {
            return <div>
              <Modal.Description>
                <FormattedMessage id={"register.inputMailAddresses"}/>
              </Modal.Description>
              {
                mailAddresses.map((mailAddress, i) => (
                  <div key={i}>
                    <Input type={"text"} size={"massive"} onChange={e => modifyMailAddresses(e.target.value, i)}
                           value={mailAddress}/>
                    {i !== 0 && i === mailAddresses.length - 1 &&
                    <Icon name="minus circle" color="red" size="huge" onClick={deleteMailAddresses}/>
                    }
                    {i === 0 &&
                    <Icon name="plus circle" color="green" size="huge" onClick={addMailAddresses}/>
                    }
                  </div>
                ))
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
        {step !== finalStep && <Button primary size={"massive"} onClick={incrementStep}>
          Next
        </Button>}
        {step === finalStep && <Button primary size={"massive"} onClick={registerToDatabase}>
          Complete
        </Button>}
      </Modal.Actions>
    </Modal>
  }
;

export default RegisterModal;
