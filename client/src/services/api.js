import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

// ✅ Get Current User
export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(
      `${serverUrl}/api/user/currentuser`,
      { withCredentials: true }
    );

    dispatch(setUserData(result.data));
  } catch (error) {
    console.log("GET USER ERROR:", error.response?.data || error.message);
  }
};

// ✅ Generate Notes (FIXED 🔥)
export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      `${serverUrl}/api/notes/generate-notes`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    return result.data;

  } catch (error) {
    console.log("ERROR:", error.response?.data);
    throw error;
  }
};

// ✅ Download PDF (Improved)
export const downloadPdf = async (result) => {
  try {
    const response = await axios.post(
      `${serverUrl}/api/pdf/generate-pdf`,
      { result },
      {
        responseType: "blob",
        withCredentials: true,
      }
    );

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ExamNotesAI.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log("PDF ERROR:", error.response?.data || error.message);
    throw new Error("PDF download failed");
  }
};
