import React, {useCallback, useMemo, useState} from "react";
import UserAPI from "../../../reposirory/api/UserAPI";
import {FormattedMessage} from "react-intl";
import BasicLayout from "../../components/layout/BasicLayout";
import styled from "styled-components";
import {Modal} from "semantic-ui-react";

var QRCode = require('qrcode.react');

const User = ({match}) => {
  const userId = match.params.id;
  const [userProfile, setUserProfile] = useState(void 0);
  const [isQROpen, setIsQROpen] = useState(false);
  const displayNickName = useMemo(() => userProfile?.nickNames.join(","), [userProfile?.nickNames]);
  const displayName = useMemo(() => userProfile?.realName && userProfile?.nickNames.length > 0 ?
    `${userProfile.realName} (${displayNickName}) ` : userProfile?.realName || displayNickName, [userProfile?.realName, userProfile?.nickNames]);
  const qrURL = useMemo(() => `${process.env.REACT_APP_THE_SHOW_SELF_URL}/user/${userId}`, [])
  const handleOpenQR = useCallback(() => {
    setIsQROpen(true);
  }, []);
  const handleCloseQR = useCallback(() => {
    setIsQROpen(false);
  }, []);

  if (!userProfile) {
    UserAPI.getUserProfile(userId).then(data => setUserProfile(data.user));
    return <div/>
  }
  return <BasicLayout>
    <Centered>
      <ContainerHeader className="ui header">{displayName}<FormattedMessage id="profile.sContacts"/></ContainerHeader>
      {/*TODO: Follow and Send*/}
      <div className="ui container">
        {
          userProfile.gmail &&
          <Row>
            <SnsIcon src="/images/icon/gmail.png"/>
            <a href={`mailto:${userProfile.gmail}`}>{userProfile.gmail}</a>
          </Row>
        }
        {
          userProfile.twitterName &&
          <Row>
            <SnsIcon src="/images/icon/twitter.png"/>
            <a href={`https://twitter.com/${userProfile.twitterName}`}>@{userProfile.twitterName}</a>
          </Row>
        }
        {
          userProfile.facebookId &&
          <Row>
            <SnsIcon src="/images/icon/facebook.png"/>
            <a href={`https://facebook.com/${userProfile.facebookId}`}>{userProfile.facebookName}</a>
          </Row>
        }
        {
          userProfile.instagramName &&
          <Row>
            <SnsIcon src="/images/icon/instagram.png"/>
            <a href={`https://instagram.com/${userProfile.instagramName}`}>@{userProfile.instagramName}</a>
          </Row>
        }
        {
          userProfile.mailAddresses?.length > 0 &&
          <Row>
            <SnsIcon src="/images/icon/mail.png"/>
            <div>{userProfile.mailAddresses.map((mailAddress, i) => <div key={i}>
              <a href={`mailto:${mailAddress}`}>{mailAddress}</a>
            </div>)}
            </div>
          </Row>
        }
        {
          userProfile.lineName &&
          <Row>
            <SnsIcon src="/images/icon/line.png"/>
            {userProfile.lineName}
          </Row>
        }
        <Modal
          onClose={handleCloseQR}
          onOpen={handleOpenQR}
          open={isQROpen}
          trigger={<ButtonContainer className="ui container"><ShowQRButton className="ui rounded massive button">
            <FormattedMessage id="profile.showQR"/>
          </ShowQRButton></ButtonContainer>}>
          <Modal.Content image>
            <QRContainer>
              <QRCode value={qrURL}/>
            </QRContainer>
          </Modal.Content>
        </Modal>
      </div>
    </Centered>
  </BasicLayout>
};

const ContainerHeader = styled.h1`
  margin: 5vh 0 !important;
  font-size: 1.2rem !important;
  text-align: center;
`;

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5vh;
`;

const Row = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 3vh;
`;

const SnsIcon = styled.img`
  width: 50px;
  margin-right: 5vw;
`;

const ShowQRButton = styled.button`
  background: #EB932C !important;
  border-radius: 15px !important;
  color: white !important;
  white-space: nowrap;
`;

const ButtonContainer = styled.div`
  display: flex !important;
  justify-content: center;
`;

const QRContainer = styled.div`
  display:flex;
  justify-content: center;
  width: 100%;
`;

export default User;
