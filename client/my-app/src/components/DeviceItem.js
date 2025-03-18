import React from 'react';
import {Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import star from '../assets/star.png'
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {DEVICE_ROUTE} from "../utils/consts"
import '../styles/DeviceItem.css';

const DeviceItem = ({device}) => {
    const history = useNavigate()
    return (
        <Col md={3} className="mt-3">
            <Card className="device-card" onClick={() => history(DEVICE_ROUTE + '/' + device.id)}>
                <Image height={200} width={200} src={process.env.REACT_APP_API_URL + device.img} />
                <div className="device-card-info">
                    <div className="brand-name">
                        samsung
                    </div>
                    <div className="device-rating">
                        <div className="rating-number">
                            {device.rating}
                        </div>
                        <Image src={star} className="star-icon" />
                    </div>
                    <div className="device-name">
                        {device.name}
                    </div>
                    <div className="price">
                        {device.price} ₽
                    </div>
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
