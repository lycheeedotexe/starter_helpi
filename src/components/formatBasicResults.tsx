import { Card, ListGroup } from "react-bootstrap";

interface FormatBasicResultsProps {
    id: number;
    title: string;
    description: string;
}

export function FormatBasicResults({ id, title, description }: FormatBasicResultsProps): JSX.Element {
    return (
        <div className="results-container">
            <Card className="text-center">
                <Card.Header style={{ fontWeight: 'bold', color: '#597cf0', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>Job Title</Card.Header>
                <Card.Body>
                    <Card.Title style={{ fontWeight: 'bold', color: '#597cf0', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>Job Description</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item key={id} style={{ fontWeight: 'bold', color: '#f71460', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>{title}</ListGroup.Item>
                        <ListGroup.Item key={id}  style={{  color: '#08c97f', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>{description}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            {/* <Card className="text-center mt-3">
                <Card.Header>Potential Jobs</Card.Header>
                <Card.Body>
                    <Card.Title>Jobs within the field</Card.Title>
                    <Card.Text>
                        <br></br>
                    </Card.Text>
                </Card.Body>
            </Card> */}

            {}

            <br></br>
        </div>
    );
}

