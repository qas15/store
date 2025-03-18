import React, {useContext} from 'react';
import Card from "react-bootstrap/Card";
import {observer} from "mobx-react-lite";
import Row from "react-bootstrap/Row";
import {Context} from "../index";
import '../styles/BrandBar.css';


const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row className="brand-bar">
            {device.brands.map(brand =>
                <Card
                    key={brand.id}
                    className={`brand-card ${brand.id === device.selectedBrand.id ? 'selected' : ''}`}
                    onClick={() => device.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Card>
            )}
        </Row>

    );
});
export default BrandBar;