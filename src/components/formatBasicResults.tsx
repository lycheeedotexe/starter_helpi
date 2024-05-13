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
                <Card.Header>Your Career Field</Card.Header>
                <Card.Body>
                    <Card.Title>Description of your career field</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item key={id}>{title}</ListGroup.Item>
                        <ListGroup.Item key={id}>{description}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            <Card className="text-center mt-3">
                <Card.Header>Potential Jobs</Card.Header>
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

