import axios from "axios";

const instance = axios.create({
  baseURL: `https://api.llama.fi`,
  timeout: 5000,
});

export const defiLlamaApi = {
  getPolygonTvl: params => instance.get("/tvl/Polygon", { params }),
};
