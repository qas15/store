import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Pagination } from "react-bootstrap";
import '../styles/Pagination.css';

const Pages = observer(() => {
    const { device } = useContext(Context);
    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <Pagination className="pagination">
            {pages.map(page => (
                <Pagination.Item
                    key={page}
                    active={device.page === page}
                    onClick={() => device.setPage(page)}
                    className={`pagination-item ${device.page === page ? 'active' : ''}`}
                >
                    {page}
                </Pagination.Item>
            ))}
        </Pagination>
    );
});

export default Pages;
