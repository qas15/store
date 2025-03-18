import "../styles/DevicePage.css";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/star.png";
import {useNavigate, useParams} from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useBasket } from '../context/BasketContext'

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] });
    const { id } = useParams();
    const [showImageModal, setShowImageModal] = useState(false);
    const [newRating, setNewRating] = useState(0);
    const { addToBasket } = useBasket();
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetchOneDevice(id)
            .then((data) => {
                if (!data || Object.keys(data).length === 0) {
                    navigate("/", { replace: true });
                    return;
                }
                setDevice(data);
                setNewRating(parseFloat(data.rating) || 0);
            })
            .catch((error) => {
                console.error("Ошибка загрузки устройства:", error);
                navigate("/", { replace: true });
            });
    }, [id, navigate]);

    const handleRating = async (rating) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("User not logged in");
                return;
            }

            const decodedToken = jwt_decode(token);
            const userId = decodedToken.id;

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/rate`, {
                userId: userId,
                deviceId: id,
                newRating: parseFloat(rating),
            });

            setDevice((prevState) => ({
                ...prevState,
                rating: parseFloat(response.data.newRating) || 0,
            }));

            setNewRating(rating);
        } catch (error) {
            console.error("Error updating rating:", error);
        }
    };

    const rating = device.rating !== undefined && device.rating !== null ? device.rating : 0;
    const handleAddToBasket = () => {
        addToBasket(device);

        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1000);
    };

    return (
        <Container className="device-page-container mt-3">
            <Row>
                <Col md={4}>
                    <Image
                        className="device-image"
                        width={300}
                        height={300}
                        src={process.env.REACT_APP_API_URL + device.img}
                        alt={device.name}
                        onClick={() => setShowImageModal(true)}
                    />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2 className="device-title">{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                        >
                            <div className="device-rating">
                                {rating !== 0 ? rating.toFixed(1) : "Нет рейтинга"}
                                <img src={bigStar} alt="star" width={25} />
                            </div>
                        </div>
                        <div className="rating-buttons">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Button
                                    key={star}
                                    variant={star <= newRating ? "warning" : "outline-warning"}
                                    onClick={() => handleRating(star)}
                                >
                                    {star}
                                </Button>
                            ))}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className="device-price-card d-flex flex-column align-items-center justify-content-around">
                        <h3>От: {device.price} руб.</h3>
                        <div className="device-page-container">
                            <Button variant={"outline-dark"} onClick={handleAddToBasket}>
                                Добавить в корзину
                            </Button>

                            {showAlert && (
                                <div className="alert" style={alertStyles}>
                                    Товар добавлен в корзину!
                                </div>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>

            {showImageModal && (
                <div className="image-modal" onClick={() => setShowImageModal(false)}>
                    <div className="modal-content">
                        <Image
                            src={process.env.REACT_APP_API_URL + device.img}
                            alt={device.name}
                            className="modal-image"
                        />
                    </div>
                </div>
            )}
        </Container>
    );
};
const alertStyles = {
    position: "fixed",
    top: "10px",
    right: "10px",
    backgroundColor: "green",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    zIndex: 1000,
    fontSize: "16px",
};

export default DevicePage;
















