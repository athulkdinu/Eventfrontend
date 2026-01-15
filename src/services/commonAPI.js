import axios from "axios";

const commonAPI = async (method, url, body, headers = {}) => {
  try {
    return await axios({ method, url, data: body, headers });
  } catch (err) {
    return err.response;
  }
};

export default commonAPI;
