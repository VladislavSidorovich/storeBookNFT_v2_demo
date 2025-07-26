import axios from "axios";

export const fetchIPFSData = async (URL: string) => {
  try {
    const response = await axios.get(URL);
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching IPFS:", error);
    throw error;
  }
};
