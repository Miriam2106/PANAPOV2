import React, { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import {
    Button,
    Card,
    Col,
    Collapse,
    Container,
    Form,
    Row
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FilterComponent } from "../../../shared/components/FilterComponent";
import { CustomLoader } from "../../../shared/components/CustomLoader";
import { UserEdit } from "./UserEdit";
import { UserDetails } from "./UserDetails";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";
import * as yup from "yup";
import axios from "../../../shared/plugins/axios";
import { useFormik } from "formik";
import "../../../assets/css/main.css";
import { AlertData } from "../../../shared/components/alertData"
//iconos de fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faFile, faInfo, faPlay } from '@fortawesome/free-solid-svg-icons'



export const UserList = () => {
    const [filterText, setFilterText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [users, setUsers] = useState([]);
    const [person1, setPerson1] = useState([]);
    const [rol, setRol] = useState([]);
    const [values, setValues] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [isOpenDetails, setIsOpenDetails] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        document.title = "PANAPO | Gestión de usuarios";
        getUser();
        getPerson();
        getRol();
    }, []);

    const getPerson = () => {
        axios({ url: "/person/", method: "GET" })
            .then((response) => {
                console.log(response);
                setPerson1(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getRol = () => {
        axios({ url: "/rol/", method: "GET" })
            .then((response) => {
                console.log(response);
                let data = response.data;
                let rolesTemp = data.filter(item => item.description !== "Directivo")
                setRol(rolesTemp);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getUser = () => {
        axios({ url: "/user/", method: "GET" })
            .then((response) => {
                let data = response.data;
                let directivesTemp = data.filter(item => item.person.profession.description !== "Directivo")
                setUsers(directivesTemp);
                console.log(directivesTemp)
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //VIDEO
    const handleEmail = (event) => {
        const getEmailId = event.target.value;
        console.log(getEmailId);
    }

    const columns = [
        {
            name: <h6 >#</h6>,
            cell: (row, index) => <div><h6>{index + 1}</h6></div>,
            width: "4%"
        },
        {
            name: <h6 className="text-center">Nombre del Usuario</h6>,
            cell: (row) => <div className="txt4">{row.person.name + " "}</div>,
        },
        {
            name: (
                <div>
                    <h6>Detalles</h6>
                </div>
            ),
            cell: (row) => (
                <div>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={() => {
                            setValues(row);
                            setIsOpenDetails(true);
                        }}
                    >
                        <FontAwesomeIcon className="btnS" icon={faInfo} size="lg"/>
                    </Button>
                </div>
            ),
        },
        {
            name: (
                <div>
                    <h6>Modificar</h6>
                </div>
            ),
            cell: (row) => (
                <div>
                    <Button
                        variant="warning"
                        size="md"
                        onClick={() => {
                            setValues(row);
                            setIsOpenUpdate(true);
                        }}
                    >
                        <FontAwesomeIcon  icon={faEdit} size="lg" />
                    </Button>
                </div>
            ),
        },
        {
            name: <div><h6>Desactivar</h6></div>,
            cell: (row) => <div>
                {row.status.description === "Activo" ? (
                    <Button variant="danger" size="md"
                        onClick={() => statusChange(row)}>
                        <FeatherIcon icon="slash" />
                    </Button>
                ) : (
                    <Button variant="success" size="md"
                        onClick={() => statusChange(row)}>
                        <FeatherIcon icon="check-circle" />
                    </Button>
                )}
            </div>

        }
    ];

    const statusChange = (users) => {
        Alert.fire({
            title: titleConfirmacion,
            text: msjConfirmacion,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#198754",
            cancelButtonColor: "#dc3545",
            showCancelButton: true,
            reverseButtons: true,
            showLoaderOnConfirm: true,
            icon: "warning",
            backdrop: true,
            allowOutsideClick: !Alert.isLoading,
            preConfirm: () => {
                let personalUpdate = {};
                if (users.status.description === 'Activo') {
                    personalUpdate = {
                        ...users,
                        status: { id: 2 }
                    };
                } else {
                    personalUpdate = {
                        ...users,
                        status: { id: 1 }
                    };
                }
                return axios({
                    url: "/user/",
                    method: 'PUT',
                    data: JSON.stringify(personalUpdate)
                })
                    .then((response => {
                        if (!response.error) {
                            getUser();
                            Alert.fire({
                                title: titleExito,
                                text: msjExito,
                                icon: "success",
                                confirmButtonText: "Aceptar",
                                confirmButtonColor: "#198754",
                            });
                        } else {
                            Alert.fire({
                                title: titleError,
                                text: msjError,
                                icon: "error",
                                confirmButtonText: "Aceptar",
                                confirmButtonColor: "#198754",
                            });
                        }
                        return response;
                    }))
                    .catch((error) => {
                        console.log(error);
                    })
            }
        });
    }

    const paginationOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
    };

    const searchComponent = React.useMemo(() => {
        const search = () => {
            if (filterText) {
                setFilterText("");
            }
        };
        return (
            <FilterComponent
                filterText={filterText}
                onFilter={(e) => setFilterText(e.target.value)}
                onSearch={search}
            />
        );
    }, [filterText]);

    const formik = useFormik({
        initialValues: {
            email: "",
            authorities: "",
        },
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .required("Campo obligatorio"),
            authorities: yup
                .string()
                .required("Campo obligatorio"),

        }),
        onSubmit: (values) => {
            const person2 = {
                password: values.email,
                // person: {
                //     name: values.name,
                //     surname: values.surname,
                //     secondSurname: values.secondSurname,
                //     email: values.email,
                //     profession: values.profession,
                //     status: {
                //         id: 1,
                //         description: "Activo"
                //     }
                // },
                authorities: values.authorities,
                status: {
                    id: 1,
                    description: "Activo"
                }

            };
            console.log(person2)
            Alert.fire({
                title: titleConfirmacion,
                text: msjConfirmacion,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#198754",
                cancelButtonColor: "#dc3545",
                showCancelButton: true,
                reverseButtons: true,
                showLoaderOnConfirm: true,
                icon: "warning",
                preConfirm: () => {
                    return axios({ url: "/user/", method: "POST", data: JSON.stringify(person2) })
                        .then((response) => {
                            console.log(response)
                            if (!response.error) {
                                getUser();
                                Alert.fire({
                                    title: titleExito,
                                    text: msjExito,
                                    confirmButtonColor: "#198754",
                                    icon: "success",
                                    confirmButtonText: "Aceptar",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        handleCloseForm();
                                    }
                                });
                            }
                            return response;
                        }).catch((error) => {
                            console.log(error)
                            Alert.fire({
                                title: titleError,
                                text: msjError,
                                cancelButtonColor: "#198754",
                                icon: "error",
                                confirmButtonText: "Aceptar"
                            });
                        });
                },
                backdrop: true,
                allowOutsideClick: !Alert.isLoading
            });
        },
    });

    const handleCloseForm = () => {
        formik.resetForm();
        setIsOpen(false);
    };

    return (
        <div className="content-wrapper screenHeight">
            <Container fluid>
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="font-weight-bold">Gestión de usuarios</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <Row>
                    <Col>
                        <Card className="mb-0">
                            <Card.Header
                                onClick={() => setIsOpen(!isOpen)}
                                aria-controls="example-collapse-text"
                                aria-expanded={isOpen}
                                className="backgroundHeadCard"
                                type="button"
                            >
                                <Row>
                                    <Col as="h6">Registrar Usuario</Col>
                                    <Col className="text-end">
                                        <Col>
                                            {isOpen ? (
                                                <FeatherIcon icon="minus" />
                                            ) : (
                                                <FeatherIcon icon="plus" />
                                            )}
                                        </Col>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isOpen}>
                                <Container fluid>
                                    <Card.Body>
                                        <div id="example-collapse-text">
                                            <Form className="row" onSubmit={formik.handleSubmit}>
                                                <Form.Group className="col-md-6 mb-4" >
                                                    <Form.Label className="font-weight-normal">Rol<span className="text-danger">*</span></Form.Label>
                                                    <Form.Select onChange={formik.handleChange} name="authorities" value={formik.values.authorities}>
                                                        <option value="">Seleccione una opción</option>
                                                        {
                                                            rol.map((rols) => (
                                                                <option key={rols.id} value={rols.id} >{rols.description}</option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                    {formik.errors.authorities ? (
                                                        <span className="text-danger">{formik.errors.authorities}</span>
                                                    ) : null}
                                                </Form.Group>
                                                <Form.Group className="col-md-6 mb-4" >
                                                    <Form.Label className="font-weight-normal">Correo<span className="text-danger">*</span></Form.Label>
                                                    
                                                    <Form.Select name="email" value={formik.values.email} onChange={formik.handleChange}>
                                                        <option>Seleccione una opción</option>
                                                        {
                                                            person1.map((personemail) => (
                                                                <option key={personemail.id} value={personemail.id} >{personemail.email}</option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                    {formik.errors.email ? (
                                                        <span className="text-danger">{formik.errors.email}</span>
                                                    ) : null}
                                                </Form.Group>
                                                <br />
                                                <div className="d-grid gap-2">
                                                    <Button type="submit" style={{ background: "#042B61", borderColor: "#042B61", }}
                                                        disabled={!(formik.isValid && formik.dirty)}>
                                                        Registrar
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>

                                    </Card.Body>
                                </Container>

                            </Collapse>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Card>
                            <Card.Header className="backgroundHeadCard">
                                <Row>
                                    <Col as="h6">Usuarios Registrados</Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <DataTable
                                    columns={columns}
                                    data={users}
                                    noDataComponent={<AlertData title={"No hay registros"} />}
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    progressPending={isLoading}
                                    progressComponent={<CustomLoader />}
                                    subHeader
                                    subHeaderComponent={searchComponent}
                                />
                                <UserEdit
                                    isOpenUpdate={isOpenUpdate}
                                    handleClose={() => setIsOpenUpdate(false)}
                                    setUsers={setUsers}
                                    {...values}
                                />
                                <UserDetails
                                    isOpenDetails={isOpenDetails}
                                    handleClose={() => setIsOpenDetails(false)}
                                    setUsers={setUsers}
                                    {...values}
                                />

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
