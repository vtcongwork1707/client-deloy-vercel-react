import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AppItem from "./AppItem";
import AppForm from "./AppForm";
import axios from "axios";

function App(props) {
  const [flag, setFlag] = useState(false);
  const [listTodo, setListTodo] = useState([]);

  useEffect(() => {
    async function getData() {
      const result = await axios({
        method: "GET",
        url: `https://backend-todo-node-mongodb.herokuapp.com/api/todo`,
      });
      setListTodo(result.data.data);
    }
    getData();
  }, []);

  const handleSendDataBackEnd = async (dataUp) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `https://backend-todo-node-mongodb.herokuapp.com/api/todo`,
        data: dataUp,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setListTodo([data.data, ...listTodo]);
      setFlag(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          {!flag && (
            <Button
              variant="success"
              className="d-block"
              onClick={() => {
                setFlag(true);
              }}
            >
              Add
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col
          className="d-flex justify-content-around"
          style={{ flexFlow: "wrap" }}
        >
          {listTodo.map((item, index) => (
            <AppItem key={`item.title_${index}`} item={item} />
          ))}
        </Col>
        {flag && (
          <Col className="md-3">
            <AppForm
              sendData={(data) => handleSendDataBackEnd(data)}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default App;
