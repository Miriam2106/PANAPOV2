import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Card, Collapse } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../../shared/plugins/alert";
import axios from "../../../../shared/plugins/axios";

export const ProjectDetailsRape = ({
    isOpenDetails,
    handleClose,
    setProjects,
    name,
    status
}) => {

    const [values, setValues] = useState({ name: name, status: status });
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenClient, setIsOpenClient] = useState(false);
    const [isOpenQuote, setIsOpentQuote] = useState(false);
    const [isOpenWorkTeam, setIsOpentWorkTeam] = useState(true);
    const [isOpenAnalist, setIsOpentAnalist] = useState(true);

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
        setValues({});
    };

    useEffect(() => {
        setValues({
            name: name
        });
    }, [name]);

    return (
        <>
            <Modal show={isOpenDetails} onHide={handleCloseForm}>
                <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
                    <Modal.Title>Detalles del proyecto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* MODAL DATOS DEL PROYECTO */}
                    <Card className="mb-3" bg="white">
                        <Card.Header onClick={() => setIsOpen(!isOpen)}
                            aria-controls="example-collapse-text"
                            aria-expanded={isOpen}
                            type="button">
                            <Row>
                                <Col as="h6" className="text-bold">Datos del proyecto</Col>
                                <Col className="text-end">
                                    <Col>
                                        {isOpen ? (
                                            <FeatherIcon icon="minus"
                                                color="grey" />
                                        ) : (
                                            <FeatherIcon icon="plus"
                                                color="grey" />
                                        )}
                                    </Col>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Collapse in={isOpen}>
                            <div id="example-collapse-text">
                                <Card.Body>
                                    <Form className="row">
                                        <Form.Group className="col-md-6 mb-4" >
                                            <Form.Label>Proyecto anterior</Form.Label>
                                            <Form.Select aria-label="Default select example" readOnly>
                                                <option value="1">Nuevo</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                            <Form.Text muted>
                                                Solo selecciona uno si un proyecto requiere
                                                un nuevo ciclo del mismo
                                            </Form.Text>
                                            <small></small>
                                        </Form.Group>
                                        <Form.Group className="col-md-6 mb-4" >
                                            <Form.Label>Ciclo del proyecto</Form.Label>
                                            <Form.Control type="number" readOnly placeholder="2" />
                                            <Form.Text muted>
                                                El ciclo es calculado en base al anterior
                                                proyecto
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="col-md-6 mb-4" >
                                            <Form.Label>Nombre del proyecto</Form.Label>
                                            <Form.Control type="text" readOnly />
                                        </Form.Group>
                                        <Form.Group className="col-md-6 mb-4" >
                                            <Form.Label>Acrónimo del proyecto</Form.Label>
                                            <Form.Control type="text" value={values.name} readOnly />
                                        </Form.Group>
                                        <Form.Group className="col-md-6 mb-4" >
                                            <Form.Label>Estado</Form.Label>
                                            <Form.Control type="text" readOnly placeholder="Prospecto" />
                                        </Form.Group>
                                        <Form.Group className="col-md-6 mb-4" >
                                            <Form.Label>Prioridad</Form.Label>
                                            <Form.Control type="text" readOnly placeholder="Alta" />
                                        </Form.Group>
                                        <Form.Group className="col-md-6" >
                                            <Form.Label>Fecha de inicio</Form.Label>
                                            <Form.Control type="date" readOnly />
                                        </Form.Group>
                                        <Form.Group className="col-md-6" >
                                            <Form.Label>Fecha de fin</Form.Label>
                                            <Form.Control type="date" readOnly />
                                        </Form.Group>
                                        <Form.Group className="col-md-12 mb-4" >
                                            <Form.Label>Descripción del proyecto</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                style={{ height: '100px' }} readOnly
                                            />
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>
                    {/* MODAL DATOS DEL CLIENTE */}
                    <Card className="mb-3" bg="white">
                        <Card.Header onClick={() => setIsOpenClient(!isOpenClient)}
                            aria-controls="example-collapse-text"
                            aria-expanded={isOpenClient}
                            type="button">
                            <Row>
                                <Col as="h6" className="text-bold">Cliente</Col>
                                <Col className="text-end">
                                    <Col>
                                        {isOpenClient ? (
                                            <FeatherIcon icon="minus"
                                                color="grey" />
                                        ) : (
                                            <FeatherIcon icon="plus"
                                                color="grey" />
                                        )}
                                    </Col>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Collapse in={isOpenClient}>
                            <div id="example-collapse-text">
                                <Card.Body>
                                    <Form className="row">
                                        <Form.Group className="col-md-6 mb-4" >
                                            <Form.Control type="text" readOnly />
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>
                    {/* MODAL COTIZACIÓN DEL PROYECTO */}
                    <Card className="mb-3" bg="white">
                        <Card.Header onClick={() => setIsOpentQuote(!isOpenQuote)}
                            aria-controls="example-collapse-text"
                            aria-expanded={isOpenQuote}
                            type="button">
                            <Row>
                                <Col as="h6" className="text-bold">Cotización del proyecto</Col>
                                <Col className="text-end">
                                    <Col>
                                        {isOpenQuote ? (
                                            <FeatherIcon icon="minus"
                                                color="grey" />
                                        ) : (
                                            <FeatherIcon icon="plus"
                                                color="grey" />
                                        )}
                                    </Col>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Collapse in={isOpenQuote}>
                            <div id="example-collapse-text">
                                <Card.Body>
                                    <Form className="row">
                                        <Form.Group className="col-md-6 mb-4" >
                                            <Form.Label>Presupuesto</Form.Label>
                                            <Form.Control type="number" placeholder="$20000" readOnly />
                                        </Form.Group>
                                        <Form.Group className="col-md-6 mb-4" >
                                            <Form.Label>Precio al cliente</Form.Label>
                                            <Form.Control type="number" placeholder="$40000" readOnly />
                                        </Form.Group>
                                        <Form.Group className="col-md-6 mb-4" >
                                            <Form.Label>Tiempo estimado (meses)</Form.Label>
                                            <Form.Control type="number" placeholder="4" readOnly />
                                        </Form.Group>
                                        <Form.Group className="col-md-6 mb-4" >
                                            <Form.Label>Cantidad de becarios </Form.Label>
                                            <Form.Control type="number" placeholder="5" readOnly />
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>
                    {/* MODAL EQUIPO DE TRABAJO */}
                    <Card className="mb-3" bg="white">
                        <Card.Header onClick={() => setIsOpentWorkTeam(!isOpenWorkTeam)}
                            aria-controls="example-collapse-text"
                            aria-expanded={isOpenWorkTeam}
                            type="button">
                            <Row>
                                <Col as="h6" className="text-bold">Equipo de trabajo</Col>
                                <Col className="text-end">
                                    <Col>
                                        {isOpenWorkTeam ? (
                                            <FeatherIcon icon="minus"
                                                color="grey" />
                                        ) : (
                                            <FeatherIcon icon="plus"
                                                color="grey" />
                                        )}
                                    </Col>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Collapse in={isOpenWorkTeam}>
                            <div id="example-collapse-text">
                                <Card.Body>
                                    <Form className="row">
                                        <Form.Group className="col-md-6 mb-4" >
                                            <Form.Label>Responsable de Proyecto</Form.Label>
                                            <Form.Control type="text" placeholder="Miriam Guadalupe" readOnly />
                                        </Form.Group>
                                        <Form.Group className="col-md-6 mb-4" >
                                            <Form.Label>Responsable de Desarrollo</Form.Label>
                                            <Form.Control type="text" placeholder="Thayli Areli" readOnly />
                                        </Form.Group>
                                    </Form>
                                    {/* MODAL ANÁLISTAS PROGRAMADORES */}
                                    <Card className="mb-3" bg="white">
                                        <Card.Header onClick={() => setIsOpentAnalist(!isOpenAnalist)}
                                            aria-controls="example-collapse-text"
                                            aria-expanded={isOpenAnalist}
                                            type="button">
                                            <Row>
                                                <Col as="h6" className="text-bold">Analistas programadores</Col>
                                                <Col className="text-end">
                                                    <Col>
                                                        {isOpenAnalist ? (
                                                            <FeatherIcon icon="minus"
                                                                color="grey" />
                                                        ) : (
                                                            <FeatherIcon icon="plus"
                                                                color="grey" />
                                                        )}
                                                    </Col>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Collapse in={isOpenAnalist}>
                                            <div id="example-collapse-text">
                                                <Card.Body>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Nombre</th>
                                                                <th>Rol</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Miriam Bustamante</td>
                                                                <td>Analista programador</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Miriam Bustamante</td>
                                                                <td>Analista programador</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </Card.Body>
                                            </div>
                                        </Collapse>
                                    </Card>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>
                    <Form>
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
};