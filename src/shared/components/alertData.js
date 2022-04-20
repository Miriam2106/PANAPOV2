import React, { useState } from 'react'
import { Alert, Button } from "react-bootstrap";

export const AlertData = ({ title }) => {

    return (
        <>
            <Alert variant="danger" style={{ width: "42rem" }} className="text-center">
            
            {title}
            </Alert>
        </>
    );
}