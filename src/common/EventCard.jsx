import { Card, Button } from "react-bootstrap";

const formatTime = (time) => {
  if (!time || typeof time !== "string") return time;
  const [hStr, mStr] = time.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  if (Number.isNaN(h) || Number.isNaN(m)) return time;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
};

const EventCard = ({ event, isAdmin, onEdit, onDelete }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {`${formatTime(event.startTime)} - ${formatTime(event.endTime)}`}
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
