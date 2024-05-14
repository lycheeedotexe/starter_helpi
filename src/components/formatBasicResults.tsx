import { Card, ListGroup } from "react-bootstrap";

interface FormatBasicResultsProps {
    id: number;
    title: string;
    description: string;
    jobs: string;
}

export function FormatBasicResults({ id, title, description, jobs }: FormatBasicResultsProps): JSX.Element {
    return (
        <div className="results-container">
            <Card className="text-center">
                <Card.Header style={{ fontWeight: 'bold', color: '#597cf0', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>Your Career Field</Card.Header>
                <Card.Body>
                    <Card.Title style={{ fontWeight: 'bold', color: '#597cf0', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>Description of your career field</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item key={id} style={{ fontWeight: 'bold', color: '#f71460', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>{title}</ListGroup.Item>
                        <ListGroup.Item key={id}>{description}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            <Card className="text-center mt-3">
                <Card.Header style={{ fontWeight: 'bold', color: '#597cf0', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>Potential Jobs</Card.Header>
                <Card.Body>
                    <Card.Title>Jobs within the field</Card.Title>
                    <Card.Text>
                        <br></br>
                    </Card.Text>
                </Card.Body>
            </Card>

            {}

            <br></br>
        </div>
    );
}

