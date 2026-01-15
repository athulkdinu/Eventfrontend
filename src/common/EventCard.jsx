import { Card, Button } from "react-bootstrap";

const EventCard = ({ event, isAdmin, onEdit, onDelete }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {event.startTime} - {event.endTime}
        </Card.Subtitle>

        {event.description && (
          <Card.Text>{event.description}</Card.Text>
        )}

        {isAdmin && onEdit && onDelete && (
          <div className="d-flex gap-2">
            <Button size="sm" onClick={() => onEdit(event)}>Edit</Button>
            <Button size="sm" variant="danger" onClick={() => onDelete(event._id)}>Delete</Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default EventCard;
