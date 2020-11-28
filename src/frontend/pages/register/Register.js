import React, {useState} from "react";
import {Button, Form} from 'semantic-ui-react'
import styled from "styled-components";
import {FormattedMessage} from "react-intl";
import TermModal from "./TermModal";
import RegisterModal from "./RegisterModal";
import {Link} from "react-router-dom";
import BasicLayout from "../../components/layout/BasicLayout";

const Register = () => {
  const [openTerm, setOpenTerm] = useState(false);
  const [agreeTerm, setAgreeTerm] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return <BasicLayout>
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
          trigger={<Button size="large"><FormattedMessage id="register.checkTerm"/></Button>}
        />
        <Link to="/register/step"><Button primary size="large"><FormattedMessage id="register.agreeTermAndRegister"/></Button></Link>
        <RegisterModal
          open={openRegister}
          onClose={() => setOpenRegister(false)}
          onOpen={() => setOpenRegister(true)}
        />

      </Form>
    </Term>
  </BasicLayout>
};

const Term = styled.div`
  display:flex;
  place-content: center;
  align-items: center;
  height: 80vh;
  white-space: nowrap;
`;

export default Register;
