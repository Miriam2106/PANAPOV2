import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../../shared/plugins/alert";
import axios from "../../../../shared/plugins/axios";

export const ProjectCreate = ({
    isOpenCreateReport,
    handleClose,
    setProjectsRape,
    status
}) => {

    // const [values, setValues] = useState({ description: description });

    // const handleChange = (event) =>{
    //   const { name, value } = event.target;
    //   setValues({ ...values, [name]: value});
    // }  

    // const handleSubmit = (event) =>{
    //   event.preventDefault();
    //   console.log(values);
    //   Alert.fire({
    //   title: titleConfirmacion,
    //   text: msjConfirmacion,
    //   confirmButtonText: "Aceptar",
    //   cancelButtonText: "Cancelar",
    //   showCancelButton: true,
    //   reverseButtons: true,
    //   showLoaderOnConfirm: true,
    //   icon: "warning",
    //   preConfirm: () => {
    //     return axios({
    //       url: "/category/",
    //       method: "PUT",
    //       data: JSON.stringify(values),
    //     })
    //       .then((response) => {
    //         console.log(response);
    //         if (!response.error) {
    //           setCategories((categories) => [
    //             ...categories.filter((it) => it.id !== values.id),
    //             values,
    //           ]);
    //           handleCloseForm();
    //           Alert.fire({
    //             title: titleExito,
    //             text: msjExito,
    //             icon: "success",
    //             confirmButtonText: "Aceptar",
    //           });
    //         }
    //         return response;
    //       })
    //       .catch((error) => {
    //         Alert.fire({
    //           title: titleError,
    //           confirmButtonColor: "#198754",
    //           text: msjError,
    //           icon: "error",
    //           confirmButtonText: "Aceptar",
    //         });
    //       });
    //   },
    //   backdrop: true,
    //   allowOutsideClick: !Alert.isLoading,
    //   });
    // };

    const handleCloseForm = () => {
        handleClose();
        // setValues({});
    };

    // useEffect(() => {
    //     setValues({
    //         description: description
    //     });
    // }, [description]);

    return (
        <>
            <Modal show={isOpenCreateReport} onHide={handleCloseForm} size="lg" >
                <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
                    <Modal.Title>Crear reporte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="row">
                        <Form.Group className="col-md-6" >
                            <Form.Label>Fecha de creación de reporte</Form.Label>
                            <Form.Control type="date" placeholder="Ejemplo: Díaz" />
                        </Form.Group>
                        <Form.Group className="col-md-6 mb-4" >
                            <Form.Label>Etapa planeada</Form.Label>
                            <Form.Select>
                                <option value="1">Seleccione una opción</option>
                                <option value="2">Planeación</option>
                                <option value="3">Realización</option>
                                <option value="3">Control</option>
                                <option value="3">Cierre</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="col-md-6 mb-4" >
                            <Form.Label>Etapa real</Form.Label>
                            <Form.Select>
                                <option value="1">Seleccione una opción</option>
                                <option value="2">Planeación</option>
                                <option value="3">Realización</option>
                                <option value="3">Control</option>
                                <option value="3">Cierre</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="col-md-6 mb-4" >
                            <Form.Label>Fase planeada</Form.Label>
                            <Form.Select>
                                <option value="1">Seleccione una opción</option>
                                <option value="2">Inicio</option>
                                <option value="3">Requerimientos</option>
                                <option value="3">Análisis y diseño</option>
                                <option value="3">Construcción</option>
                                <option value="3">Integración y pruebas</option>
                                <option value="3">Cierre</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="col-md-6 mb-4" >
                            <Form.Label>Fase real</Form.Label>
                            <Form.Select>
                                <option value="1">Seleccione una opción</option>
                                <option value="2">Inicio</option>
                                <option value="3">Requerimientos</option>
                                <option value="3">Análisis y diseño</option>
                                <option value="3">Construcción</option>
                                <option value="3">Integración y pruebas</option>
                                <option value="3">Cierre</option>
                            </Form.Select>
                        </Form.Group>
                        
                        <Form.Group className="col-md-6" >
                            <Form.Label>Porcentaje de avance total (%)</Form.Label>
                            <Form.Control type="number" placeholder="20" />
                        </Form.Group>
                        <Form.Group className="col-md-12" >
                            <div className="line"></div>
                        </Form.Group>
                        
                        <Form.Group className="col-md-12 topBottom2">
                            <h5>Porcentaje de avance por fase</h5>
                        </Form.Group>
                        <Form.Group className="col-md-6" >
                            <Form.Label>Inicio</Form.Label>
                            <Form.Control type="number" placeholder="20" />
                        </Form.Group>
                        <Form.Group className="col-md-6" >
                            <Form.Label>Requerimientos</Form.Label>
                            <Form.Control type="number" placeholder="20" />
                        </Form.Group>
                        <Form.Group className="col-md-6" >
                            <Form.Label>Análisis y diseño</Form.Label>
                            <Form.Control type="number" placeholder="20" />
                        </Form.Group>
                        <Form.Group className="col-md-6" >
                            <Form.Label>Construcción</Form.Label>
                            <Form.Control type="number" placeholder="20" />
                        </Form.Group>
                        <Form.Group className="col-md-6" >
                            <Form.Label>Integración y pruebas</Form.Label>
                            <Form.Control type="number" placeholder="20" />
                        </Form.Group>
                        <Form.Group className="col-md-6" >
                            <Form.Label>Cierre</Form.Label>
                            <Form.Control type="number" placeholder="20" />
                        </Form.Group>
                        <Form.Group className="col-md-12 topBottom" >
                            <div className="line"></div>
                        </Form.Group>
                        <Form.Group className="col-md-12 topBottom2">
                            <h5>Porcentaje de avance por fase</h5>
                        </Form.Group>
                        <Form.Group className="col-md-6" >
                            <Form.Label>Costo total de inversión</Form.Label>
                            <Form.Control type="number" placeholder="60000" />
                        </Form.Group>
                        <Form.Group className="col-md-6" >
                            <Form.Label>Días de desviación</Form.Label>
                            <Form.Control type="number" placeholder="10" />
                        </Form.Group>
                        <Form.Group className="mb-4 topBottom">
                            <Row>
                                <Col className="text-end">
                                    <Button variant="secondary" type="button" onClick={handleCloseForm}>
                                        Cerrar
                                    </Button>
                                    <Button
                                        style={{ background: "#042B61", borderColor: "#042B61" }}
                                        className="ms-3"
                                        type="submit"
                                        disabled={false}
                                    >
                                        Guardar
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};