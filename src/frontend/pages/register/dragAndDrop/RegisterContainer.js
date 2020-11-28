import React, {useCallback, useState} from "react";
import styled from "styled-components";
import {FormattedMessage} from "react-intl";
import BasicLayout from "../../../components/layout/BasicLayout";
import Step1 from "./Step1";
import Step2 from "./Step2";

const RegisterContainer = () => {
  const MAX_STEP = 3;
  const [step, setStep] = useState(1);
  const incrementStep = useCallback(() => setStep(step + 1), [step]);
  const decrementStep = useCallback(() => setStep(step - 1), [step]);

  // real name
  const [name, setName] = useState("");
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
  const errorGoogle = useCallback((error) => {
    console.error(error)
  }, []);
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

  const oauthServices = [
    {name: "Google", id: googleId, gmail, setGoogleId, setGmail, responseGoogle, errorGoogle, icon: "/images/icon/gmail.png"},
    {name: "Twitter", id: twitterId, twitterName, setTwitterName, setTwitterId, responseTwitter, icon: "/images/icon/twitter.png"},
    {name: "Facebook", id: facebookId, facebookName, setFacebookId, setFacebookName, responseFacebook, icon: "/images/icon/facebook.png"}
  ];

  return <BasicLayout>
    <ResisterHeader><FormattedMessage id="register.title"/>{`(${step}/${MAX_STEP})`}</ResisterHeader>
    {step === 1 && <Step1 name={name} setName={setName} nickNames={nickNames} addNickNames={addNickNames}
                          deleteNickName={deleteNickName} modifyNickNames={modifyNickNames}/>}
    {step === 2 && <Step2 oauthServices={oauthServices}/>}
    <ButtonsContainer>
      {step !== 1 &&
      <PrevButton className="ui button" onClick={decrementStep}><FormattedMessage id="register.prev"/></PrevButton>}
      {step !== MAX_STEP &&
      <NextButton className="ui button" onClick={incrementStep}><FormattedMessage id="register.next"/></NextButton>}
    </ButtonsContainer>
  </BasicLayout>
};

const ResisterHeader = styled.h1`
  text-align: center;
`;
const PrevButton = styled.button`
  background: #EB932C !important;
  border-radius: 15px !important;
  color: white !important;
  white-space: nowrap;
`;
const NextButton = styled.button`
  background: #EB932C !important;
  border-radius: 15px !important;
  color: white !important;
  white-space: nowrap;
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5vh;
`;

export default RegisterContainer;
