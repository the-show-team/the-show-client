import React from "react";
import styled from "styled-components";
import {FormattedMessage} from "react-intl";
import {Icon} from "semantic-ui-react";

const Step1 = ({name, setName, nickNames, modifyNickNames, deleteNickName, addNickNames}) => {
  return <Container className="ui container">
    <Message><FormattedMessage id="register.step1.message"/></Message>
    <Form className="ui form">
      <div className="field">
        <label><FormattedMessage id="register.step1.name"/></label>
        <Input type="text" placeholder="Name" onChange={e => setName(e.target.value)} value={name}/>
      </div>
      <div className="field">
        <label><FormattedMessage id="register.step1.nickName"/></label>
        {
          nickNames.map((nickName, i) => (
            <Nowrap key={i}>
              <Input type="text" onChange={e => modifyNickNames(e.target.value, i)}
                     value={nickName} placeholder="Nick Name"/>
              {i !== 0 && i === nickNames.length - 1 &&
              <Icon name="minus circle" color="red" size="large" onClick={deleteNickName}/>
              }
              {i === 0 &&
              <Icon name="plus circle" color="green" size="large" onClick={addNickNames}/>
              }
            </Nowrap>
          ))
        }
      </div>
    </Form>
  </Container>
};

const Container = styled.div`
`;

const Message = styled.div`
  font-weight: 200;
  font-size: 0.8rem;
  text-align: center;
`;

const Form = styled.form`
  margin: 10vh 0;
`;

const Nowrap = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;
const Input = styled.input`
  width: 90% !important;
`;

export default Step1;
