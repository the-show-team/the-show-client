import React, {useState} from "react";
import {Button, Form} from 'semantic-ui-react'
import styled from "styled-components";
import {FormattedMessage} from "react-intl";
import TermModal from "./TermModal";
import RegisterModal from "./RegisterModal";

const Register = () => {
  const [openTerm, setOpenTerm] = useState(false);
  const [agreeTerm, setAgreeTerm] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  return <div>
    <Term>
      <Form>
        <TermModal
          open={openTerm}
          onClose={() => setOpenTerm(false)}
          onOpen={() => setOpenTerm(true)}
          onAgree={() => {
            setOpenTerm(false);
            setAgreeTerm(true);
          }}
          onDisAgree={() => setOpenTerm(false)}
          trigger={<Button size="massive"><FormattedMessage id="register.checkTerm"/></Button>}
        />
        <Button primary size="massive" onClick={() => agreeTerm && setOpenRegister(true)}><FormattedMessage id="register.agreeTermAndRegister"/></Button>
        <RegisterModal
          open={openRegister}
          onClose={() => setOpenRegister(false)}
          onOpen={() => setOpenRegister(true)}
        />

      </Form>
    </Term>
  </div>
};

const Term = styled.div`
  display:flex;
  place-content: center;
  align-items: center;
  height: 100vh;
`;

export default Register;
