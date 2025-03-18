import React, { useContext } from 'react';
import { Container, ListGroup } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import '../styles/TypeBar.css';

const TypeBar = observer(() => {
    const { device } = useContext(Context);

    return (
        <Container className="type-bar-container">
            <h3 className="type-bar-title">Выберите тип</h3>
            <ListGroup>
                {device.types.map(type => (
                    <ListGroup.Item
                        style={{ cursor: "pointer" }}
                        active={type.id === device.selectedType.id}
                        onClick={() => device.setSelectedType(type)}
                        key={type.id}
                    >
                        {type.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
});

export default TypeBar;

