import axios from "axios";

const BASE_URL = "http://localhost:8080/api/events";

// Full event data is now protected — withCredentials sends the login cookie
// so the backend's authMiddleware.authUser can verify the session.
export const getEventData = async () => {
  try {
    const response = await axios.get(BASE_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log("Error fetching event data:", error);
    return [];
  }
};

export const getStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/stats`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log("Error fetching event stats:", error);
    return { total: 0, Minor: 0, Moderate: 0, Severe: 0 };
  }
};

// Public, unauthenticated endpoint — returns only { latitude, longitude, severity }
// per event, no exact depthCm/x/y/z. Backend route: GET /api/events/public
export const getPublicEventData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/public`);
    return response.data;
  } catch (error) {
    console.log("Error fetching public event data:", error);
    return [];
  }
};

// Marks a pothole as resolved — protected, requires a valid official session.
export const resolveEvent = async (id) => {
  const response = await axios.patch(`${BASE_URL}/${id}/resolve`, {}, { withCredentials: true });
  return response.data;
};

// Public, unauthenticated — total detected vs total resolved, no severity breakdown.
export const getPublicSummary = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/public/summary`);
    return response.data;
  } catch (error) {
    console.log("Error fetching public summary:", error);
    return { totalDetected: 0, totalResolved: 0 };
  }
};

// Protected — events resolved BY the currently logged-in official, for their Profile page.
export const getResolvedLog = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/resolved-log`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log("Error fetching resolved log:", error);
    return [];
  }
};