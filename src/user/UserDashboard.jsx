import { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import EventCard from "../common/EventCard";
import { getEventsByDateAPI } from "../services/AllAPI";

const UserDashboard = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getEvents();
  }, [date]);

  const getEvents = async () => {
    const res = await getEventsByDateAPI(date);
    if (res?.data?.success) {
      setEvents(res.data.data);
    }
  };
  return (
    <Container style={{ padding: "24px 0" }}>
      <Card className="p-4">
        <h4>Event Schedule</h4>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ marginBottom: "16px", padding: "6px" }}/>
        {events.length === 0? <p>No events</p> : events.map(event => <EventCard key={event._id} event={event} />)}
      </Card>
    </Container>
  );
};

export default UserDashboard;
