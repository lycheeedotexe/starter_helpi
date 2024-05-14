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
                <Card.Header>Job Title</Card.Header>
                <Card.Body>
                    <Card.Title>Job Description</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item key={id}>{title}</ListGroup.Item>
                        <ListGroup.Item key={id}>{description}</ListGroup.Item>
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

