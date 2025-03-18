import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { deleteDevice } from "../../http/deviceAPI";

const DeleteDevice = ({ show, onHide }) => {
    const [deviceId, setDeviceId] = useState("");

    const handleDelete = async () => {
        try {
            await deleteDevice(deviceId);
            alert("Устройство успешно удалено!");
            setDeviceId("");
            onHide();
        } catch (error) {
            alert("Ошибка при удалении устройства: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Удалить устройство</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Введите ID устройства, которое хотите удалить:</p>
                <Form.Control
                    type="text"
                    placeholder="Введите ID устройства"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Отмена</Button>
                <Button variant="danger" onClick={handleDelete}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteDevice;
