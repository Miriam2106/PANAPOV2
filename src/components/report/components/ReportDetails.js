import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Container, ProgressBar } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { CustomLoader } from "../../../shared/components/CustomLoader"
import axios from "../../../shared/plugins/axios";

export const ReportDetails = ({
  isOpen,
  handleClose,
  data
}) => {
  const [avance, setAvance] = useState([]);
  useEffect(() => {
    getAvances()
    console.log(data)
  }, [isOpen])

  const getAvances = () => {
    axios({ url: "/reportphases/", method: "GET" })
      .then((response2) => {
        let temp = {
          cierre: "",
          inicio: "",
          requerimientos: "",
          construccion: "",
          analisis: "",
          integracion: ""
        }
        for (let m = 0; m < response2.data.length; m++) {
          if (response2.data[m].report.project.id === data) {

            if (response2.data[m].phases.id === 1) {
              temp = {
                ...temp,
                inicio: response2.data[m].porcentaje
              }
            }
            if (response2.data[m].phases.id === 2) {
              temp = {
                ...temp,
                requerimientos: response2.data[m].porcentaje
              }

            }
            if (response2.data[m].phases.id === 3) {
              temp = {
                ...temp,
                analisis: response2.data[m].porcentaje
              }

            }
            if (response2.data[m].phases.id === 4) {
              temp = {
                ...temp,
                construccion: response2.data[m].porcentaje
              }

            }
            if (response2.data[m].phases.id === 5) {
              temp = {
                ...temp,
                integracion: response2.data[m].porcentaje
              }
            }
            if (response2.data[m].phases.id === 6) {
              temp = {
                ...temp,
                cierre: response2.data[m].porcentaje
              }
            }
          }
        }
        setAvance(temp)
        console.log(temp)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCloseForm = () => {
    handleClose(false);
    setAvance([])
  };


  return (
    <>
      <Modal show={isOpen} onHide={handleCloseForm}>
        <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
          <Modal.Title>Porcentaje de avances por fases</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="font-weight-normal">Inicio</Form.Label>
              <ProgressBar now={avance.inicio} variant="success" />
              <small>{avance.inicio}% completado</small>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="font-weight-normal">Requerimientos</Form.Label>
              <ProgressBar  now={avance.requerimientos} variant="success" />
              <small>{avance.requerimientos}% completado</small>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="font-weight-normal">Análisis y diseño</Form.Label>
              <ProgressBar now={avance.analisis}  variant="success" />
              <small>{avance.analisis}% completado</small>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="font-weight-normal">Construcción</Form.Label>
              <ProgressBar now={avance.construccion} variant="success" />
              <small>{avance.construccion}% completado</small>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="font-weight-normal">Integración y pruebas</Form.Label>
              <ProgressBar now={avance.integracion} variant="success" />
              <small>{avance.integracion}% completado</small>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="font-weight-normal">Cierre</Form.Label>
              <ProgressBar now={avance.cierre} variant="success" />
              <small>{avance.cierre}% completado</small>
            </Form.Group>
            <Form.Group className="mb-4">
              <Row>
                <Col className="text-end">
                  <Button variant="secondary" type="button" onClick={handleCloseForm}>
                    Cerrar
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
