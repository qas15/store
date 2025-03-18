import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import "../styles/Admin.css";
import DeleteDevice from "../components/modals/DeleteDevice";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [deleteDeviceVisible, setDeleteDeviceVisible] = useState(false);

    return (
        <Container className="admin-container">
            <Button className="admin-button" onClick={() => setTypeVisible(true)}>
                Добавить тип
            </Button>
            <Button className="admin-button" onClick={() => setBrandVisible(true)}>
                Добавить бренд
            </Button>
            <Button className="admin-button" onClick={() => setDeviceVisible(true)}>
                Добавить устройство
            </Button>
            <Button className="admin-button delete-btn" onClick={() => setDeleteDeviceVisible(true)}>
                Удалить устройство
            </Button>
            <DeleteDevice show={deleteDeviceVisible} onHide={() => setDeleteDeviceVisible(false)} />
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} className="admin-modal"/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} className="admin-modal"/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} className="admin-modal"/>
        </Container>
    );
};

export default Admin;
