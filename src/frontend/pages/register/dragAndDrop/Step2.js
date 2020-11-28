import React, {useCallback} from "react";
import styled from "styled-components";
import {FormattedMessage} from "react-intl";
import {Icon} from "semantic-ui-react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const Step2 = ({oauthServices}) => {
  const registeredServices = oauthServices.filter(service => service.id);
  const unregisteredServices = oauthServices.filter(service => !service.id);
  const onDragEnd = useCallback((result) => {
    console.log(result)
  }, [oauthServices]);
  return <Container className="ui container">
    <Message><FormattedMessage id="register.step2.message"/></Message>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="registered">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {registeredServices.map(service => (
              <ImageIcon src={service.icon} key={service.name}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="drop-here">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <DropHere>Drop here</DropHere>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="unregistered">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {unregisteredServices.map((service, index) => (
              <Draggable draggableId={service.name} index={index} key={service.name}>
                {provided => (
                  <ImageIcon src={service.icon}
                             ref={provided.innerRef}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}/>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  </Container>
};

const Container = styled.div`
`;

const Message = styled.div`
  font-weight: 200;
  font-size: 0.8rem;
  text-align: center;
`;

const DropHere = styled.div`
  width: 60vw;
  height: 20vh;
  display: grid;
  place-content: center;
  border: 2.2px dashed #000000;
`;

const ImageIcon = styled.img`
  width: 50px;
`;


export default Step2;
