import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { CgMathPlus } from "react-icons/cg";
import axios from "axios";

function AppForm(props) {
    const refImage = useRef(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [flagClickImage, setFlagClickImage] = useState(false);
    const [image, setImage] = useState({
        img: "",
        id: "",
    });

    const handleSubmitImage = async (file) => {
        const data = new FormData();
        data.append("image", file);
        try {
            const result = await axios({
                method: "POST",
                url: `https://backend-todo-node-mongodb.herokuapp.com/upload`,
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setImage({
                id: result.data.id,
                img: result.data.img,
            });
            setFlagClickImage(true);
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleSubmitDataBackend = () => {
        props.sendData({
            title,
            image: image.id,
            description,
        });
    };

    return (
        <>
            <Form.Group>
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control
                    type="text"
                    id="title"
                    placeholder="Enter you title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-5" style={{ height: "7rem" }}>
                <Form.File
                    id="image"
                    label="Image:"
                    ref={refImage}
                    hidden
                    onChange={(e) => handleSubmitImage(e.target.files[0])}
                // multiple="multiple"
                />
                {flagClickImage ? (
                    <>
                        <img
                            src={image.img}
                            alt={image.id}
                            style={{
                                width: "20%",
                                overflow: "hidden",
                                display: "block",
                                borderRadius: "50%",
                                height: "100%",
                            }}
                        />
                    </>
                ) : (
                    <CgMathPlus
                        style={{
                            cursor: "pointer",
                            fontSize: "3rem",
                            border: "1px dotted black",
                            borderRadius: "5px",
                        }}
                        onClick={() => {
                            refImage.current.click();
                        }}
                    />
                )}
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="description">Description:</Form.Label>
                <Form.Control
                    as="textarea"
                    id="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="d-flex">
                <Button
                    variant="success"
                    className="d-block mr-1"
                    disabled={!title || !image.id || !description}
                    onClick={() => handleSubmitDataBackend()}
                >
                    Submit
                </Button>
                <Button variant="primary" className="d-block ml-1">
                    Cancel
                </Button>
            </Form.Group>
        </>
    );
}

export default AppForm;
