import commonAPI from "./commonAPI";
import serverURL from "./ServerURL";

// admin login
export const adminLoginAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/admin/login`, reqBody, {});
};

// add event
export const addEventAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/events`, reqBody, {});
};

// get events by date
export const getEventsByDateAPI = async (date) => {
  return await commonAPI("GET", `${serverURL}/events?date=${date}`, "", {});
};

// update event
export const updateEventAPI = async (id, reqBody) => {
  return await commonAPI("PUT", `${serverURL}/events/${id}`, reqBody, {});
};

// delete event
export const deleteEventAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/events/${id}`, "", {});
};
