import React from 'react'
import { Card, Button } from 'react-bootstrap';

function AppItem(props) {
    const { item } = props;
    return (
        <Card className="mt-2 mb-1" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.image.img} />
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                    {item.description}
                </Card.Text>
                <Button variant="primary" className="mr-2">Edit</Button>
                <Button variant="danger" className="ml-2" >Delete</Button>
            </Card.Body>
        </Card>
    )
}



export default AppItem

