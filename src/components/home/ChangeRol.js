import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert from "../../shared/plugins/alert";
//iconos de fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faFile, faInfo } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faFile, faInfo);

export const ChangeRol = () => {
  let coordinador = localStorage.getItem("coordinador")
  let rd = localStorage.getItem("rd")
  let rape = localStorage.getItem("rape")
  let directivo = localStorage.getItem("directivo")
  let rolActivo = localStorage.getItem("rolActive");
  const { authContext } = useContext(AuthContext);
  const navigation = useNavigate();

  useEffect(() => {
    document.title = "PANAPO | Mis roles";
  }, []);

  const alert = () => {
    Alert.fire({
      title: "Rol cambiado exitosamente",
      confirmButtonColor: "#198754",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  }

  return (
    <div className="content-wrapper screenHeight">
      <Container fluid>
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="font-weight-bold">Mis roles</h1>
              </div>
            </div>
          </div>
        </section>
        <Row>
          {
            rd === "true" && rolActivo != "RD" ?
              <Col >
                <Card>
                  <Card.Body className='roles'>
                    <Col >
                      <h3>RD</h3>
                      <div className='mt-4 mb-4'>
                      <FontAwesomeIcon icon={faUser} size="5x"/>
                      </div>
                      <Button type="submit" style={{ background: "#042B61", borderColor: "#042B61" }}
                        onClick={() => {
                          authContext.setRoleActive("RD")
                          navigation("/", { replace: true })
                          alert()
                        }}>
                        Cambiar <FeatherIcon icon="log-out" />
                      </Button>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
              : null
          }
          {
            rape === "true" && rolActivo != "RAPE" ?
              <Col>
                <Card>
                  <Card.Body className='roles'>
                    <Col >
                      <h3>RAPE</h3>
                      <div className='mt-4 mb-4'>
                      <FontAwesomeIcon icon={faUser} size="5x"/>
                      </div>
                      <Button type="submit" style={{ background: "#042B61", borderColor: "#042B61" }}
                        onClick={() => {
                          authContext.setRoleActive("RAPE")
                          navigation("/", { replace: true })
                          alert()
                        }}>
                        Cambiar <FeatherIcon icon="log-out" />
                      </Button>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
              : null
          }
          {
            directivo === "true" && rolActivo != "DIRECTIVO" ?
              <Col>
                <Card>
                  <Card.Body className='roles'>
                    <Col >
                      <h3>Directivo</h3>
                      <div className='mt-4 mb-4'>
                      <FontAwesomeIcon icon={faUser} size="5x"/>
                      </div>
                      <Button type="submit" style={{ background: "#042B61", borderColor: "#042B61" }}
                        onClick={() => {
                          authContext.setRoleActive("DIRECTIVO")
                          navigation("/", { replace: true })
                          alert()
                        }}
                      >
                        Cambiar <FeatherIcon icon="log-out" /></Button>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
              : null
          }
          {
            coordinador === "true" && rolActivo != "COORDINADOR" ?
              <Col>
                <Card>
                  <Card.Body className='roles'>
                    <Col >
                      <h3>Coordinador</h3>
                      <div className='mt-4 mb-4'>
                      <FontAwesomeIcon icon={faUser} size="5x"/>
                      </div>
                      <Button type="submit" style={{ background: "#042B61", borderColor: "#042B61" }}
                        onClick={() => {
                          authContext.setRoleActive("COORDINADOR")
                          navigation("/", { replace: true })
                          alert()
                        }}>
                        Cambiar <FeatherIcon icon="log-out" /></Button>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
              : null
          }
        </Row>
      </Container>
    </div>
  )
}