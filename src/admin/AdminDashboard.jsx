import { useState, useEffect } from "react"; import { Container, Card, Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; import EventCard from "../common/EventCard";
import { addEventAPI, getEventsByDateAPI, updateEventAPI, deleteEventAPI } from "../services/AllAPI";

const AdminDashboard = () => {

  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({ title: "", description: "", startTime: "", endTime: "" });
  const [editId, setEditId] = useState(null);

  // load events when date changes
  useEffect(() => { loadEvents(); }, [date]);

  const loadEvents = async () => {
    try {
      const res = await getEventsByDateAPI(date);
      if (res?.data?.success) setEvents(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // add or update event
  const submitEvent = async (e) => {
    e.preventDefault();
    const payload = { ...event, date };

    try {
      if (editId) {
        await updateEventAPI(editId, payload);
        setEditId(null);
      } else {
        await addEventAPI(payload);
      }
      setEvent({ title: "", description: "", startTime: "", endTime: "" });
      loadEvents();
    } catch (err) {
      console.log(err);
    }
  };

  // edit event
  const editEvent = (ev) => {
    setEditId(ev._id);
    setEvent({ title: ev.title, description: ev.description || "", startTime: ev.startTime, endTime: ev.endTime });
  };

  // delete event
  const removeEvent = async (id) => {
    try {
      await deleteEventAPI(id);
      loadEvents();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="px-3">
        <Navbar.Brand>Admin Dashboard</Navbar.Brand>
        <Button size="sm" onClick={() => { localStorage.removeItem("role"); navigate("/login"); }}>
          Logout
        </Button>
      </Navbar>

      <Container className="mt-4">

        <Card className="p-3 mb-4">
          <h5>{editId ? "Edit Event" : "Add Event"}</h5>

          <form onSubmit={submitEvent}>
            <input placeholder="Title" value={event.title}onChange={(e) => setEvent({ ...event, title: e.target.value })}className="form-control mb-2" required />

            <input placeholder="Description" value={event.description}onChange={(e) => setEvent({ ...event, description: e.target.value })}className="form-control mb-2" />

            <input type="time" value={event.startTime} onChange={(e) => setEvent({ ...event, startTime: e.target.value })}className="form-control mb-2" required />

            <input type="time" value={event.endTime}onChange={(e) => setEvent({ ...event, endTime: e.target.value })}className="form-control mb-3" required />
            <Button type="submit">{editId ? "Update" : "Add"}</Button>
          </form>
        </Card>

        <Card className="p-3">
          <input type="date" value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-control mb-3" />

          {events.length === 0
            ? <p>No events</p>
            : events.map(ev =>
              <EventCard key={ev._id} event={ev} isAdmin onEdit={editEvent} onDelete={removeEvent} />
            )}
        </Card>
      </Container>
    </>
  );
};

export default AdminDashboard;
