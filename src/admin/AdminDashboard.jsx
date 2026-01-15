import { useState, useEffect } from "react";
import { Container, Card, Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EventCard from "../common/EventCard";
import { addEventAPI, getEventsByDateAPI, updateEventAPI, deleteEventAPI } from "../services/AllAPI";

const AdminDashboard = () => {

  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [events, setEvents] = useState([]);
  const emptyEvent = {
    title: "",
    description: "",
    startHour: "",
    startMinute: "00",
    startPeriod: "AM",
    endHour: "",
    endMinute: "00",
    endPeriod: "AM",
  };
  const [event, setEvent] = useState(emptyEvent);
  const [editId, setEditId] = useState(null);

  const hours = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const minutes = ["00", "15", "30", "45"];
  const periods = ["AM", "PM"];

  const to24Hour = (hour, minute, period) => {
    if (!hour || !minute || !period) return null;
    let h = Number(hour);
    if (Number.isNaN(h)) return null;
    h = h % 12;
    if (period === "PM") h += 12;
    return `${h.toString().padStart(2, "0")}:${minute}`;
  };

  const from24To12 = (time) => {
    if (!time) return { hour: "", minute: "00", period: "AM" };
    const [hStr, mStr] = time.split(":");
    const h = Number(hStr);
    const m = Number(mStr);
    if (Number.isNaN(h) || Number.isNaN(m)) return { hour: "", minute: "00", period: "AM" };
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return { hour: hour12.toString(), minute: m.toString().padStart(2, "0"), period };
  };

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
    const startTime = to24Hour(event.startHour, event.startMinute, event.startPeriod);
    const endTime = to24Hour(event.endHour, event.endMinute, event.endPeriod);

    if (!startTime || !endTime) {
      Swal.fire("Error", "Please select start and end times", "error");
      return;
    }

    const payload = { title: event.title, description: event.description, date, startTime, endTime };

    try {
      if (editId) {
        const res = await updateEventAPI(editId, payload);
        if (!res?.data?.success) {
          Swal.fire("Error", res?.data?.message || "Unable to update event", "error");
          return;
        }
        setEditId(null);
      } else {
        const res = await addEventAPI(payload);
        if (!res?.data?.success) {
          Swal.fire("Error", res?.data?.message || "Unable to add event", "error");
          return;
        }
      }
      Swal.fire("Success", editId ? "Event updated" : "Event added", "success");
      setEvent(emptyEvent);
      loadEvents();
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || "Something went wrong", "error");
    }
  };

  // edit event
  const editEvent = (ev) => {
    setEditId(ev._id);
    const startParts = from24To12(ev.startTime);
    const endParts = from24To12(ev.endTime);
    setEvent({
      title: ev.title,
      description: ev.description || "",
      startHour: startParts.hour,
      startMinute: startParts.minute,
      startPeriod: startParts.period,
      endHour: endParts.hour,
      endMinute: endParts.minute,
      endPeriod: endParts.period,
    });
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
            <input placeholder="Title" value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} className="form-control mb-2" required />

            <input placeholder="Description" value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} className="form-control mb-2" />

            <div className="mb-2">
              <small className="text-muted d-block mb-1">Start time</small>
              <div className="d-flex gap-2">
                <select value={event.startHour} onChange={(e) => setEvent({ ...event, startHour: e.target.value })} className="form-select" required>
                  <option value="">Hour</option>
                  {hours.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <select value={event.startMinute} onChange={(e) => setEvent({ ...event, startMinute: e.target.value })} className="form-select">
                  {minutes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <select value={event.startPeriod} onChange={(e) => setEvent({ ...event, startPeriod: e.target.value })} className="form-select">
                  {periods.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <small className="text-muted d-block mb-1">End time</small>
              <div className="d-flex gap-2">
                <select value={event.endHour} onChange={(e) => setEvent({ ...event, endHour: e.target.value })} className="form-select" required>
                  <option value="">Hour</option>
                  {hours.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <select value={event.endMinute} onChange={(e) => setEvent({ ...event, endMinute: e.target.value })} className="form-select">
                  {minutes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <select value={event.endPeriod} onChange={(e) => setEvent({ ...event, endPeriod: e.target.value })} className="form-select">
                  {periods.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <Button type="submit">{editId ? "Update" : "Add"}</Button>
          </form>
        </Card>

        <Card className="p-3">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control mb-3" />

          {events.length === 0
            ? <p>No events</p>
            : events.map(ev => (
              <EventCard key={ev._id} event={ev} isAdmin onEdit={editEvent} onDelete={removeEvent} />
            ))}
        </Card>
      </Container>
    </>
  );
};

export default AdminDashboard;
