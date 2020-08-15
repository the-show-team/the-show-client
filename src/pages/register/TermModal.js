import {Button, Image, Modal} from "semantic-ui-react";
import React from "react";

const TermModal = ({onAgree, onDisAgree, ...other}) =>{
  return <Modal {...other}>
    <Modal.Header>Profile Picture</Modal.Header>
    <Modal.Content image scrolling>
      <Modal.Description>
        <p>
          This is an example of expanded content that will cause the modal's
          dimmer to scroll.
        </p>

        <Image
          src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
          style={{marginBottom: 10}}
        />
        <Image
          src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
          style={{marginBottom: 10}}
        />
        <Image
          src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
          style={{marginBottom: 10}}
        />
        <Image
          src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
          style={{marginBottom: 10}}
        />
        <Image
          src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
          style={{marginBottom: 10}}
        />
        <Image
          src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
          style={{marginBottom: 10}}
        />
        <Image
          src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
          style={{marginBottom: 10}}
        />
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button negative onClick={onDisAgree}>
        Disagree
      </Button>
      <Button positive onClick={onAgree}>
        Agree
      </Button>
    </Modal.Actions>
  </Modal>
};

export default TermModal;
