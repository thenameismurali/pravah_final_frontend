import { useEffect, useState } from "react";
import api from "../api/api";

const emptyForm = {
  title: "",
  date: "",
  venue: "",
  description: "",
  location: "",
  chatId: "",
};

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const fetchEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/events/${editingId}`, form);
    } else {
      await api.post("/events", form);
    }

    setForm(emptyForm);
    setEditingId(null);
    fetchEvents();
  };

  const handleEdit = (event) => {
    setForm(event);
    setEditingId(event._id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/events/${id}`);
    fetchEvents();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Event Management</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >
          <h2 className="text-lg font-semibold">
            {editingId ? "Edit Event" : "Create Event"}
          </h2>

          {["title", "venue", "location", "chatId"].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.toUpperCase()}
              className="w-full border p-2 rounded"
              required
            />
          ))}

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />

          <button className="bg-green-700 text-white px-4 py-2 rounded">
            {editingId ? "Update Event" : "Create Event"}
          </button>
        </form>

        {/* TABLE */}
        <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4">All Events</h2>

          <table className="w-full border">
            <thead className="bg-green-100">
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Venue</th>
                <th>ChatId</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e._id} className="border-t text-center">
                  <td>{e.title}</td>
                  <td>{e.date}</td>
                  <td>{e.venue}</td>
                  <td>{e.chatId}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleEdit(e)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(e._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
