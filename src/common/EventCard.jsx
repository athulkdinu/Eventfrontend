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
    <Card className="mb-3 border-0 shadow-sm bg-light">
      <Card.Body className="d-flex flex-column gap-2 p-3">
        <Card.Title className="mb-1">{event.title}</Card.Title>

        <Card.Text className="mb-1">
          <span className="fw-semibold">Event Title: </span>
          {event.title}
        </Card.Text>

        <Card.Text className="mb-1 text-muted">
          <span className="fw-semibold text-body">Time: </span>
          {`${formatTime(event.startTime)} – ${formatTime(event.endTime)}`}
        </Card.Text>

        {event.description && (
          <Card.Text className="mb-1">
            <span className="fw-semibold">Description: </span>
            {event.description}
          </Card.Text>
        )}

        {isAdmin && onEdit && onDelete && (
          <div className="d-flex justify-content-end gap-2 mt-auto pt-2">
            <Button size="sm" onClick={() => onEdit(event)}>Edit</Button>
            <Button size="sm" variant="danger" onClick={() => onDelete(event._id)}>Delete</Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default EventCard;
