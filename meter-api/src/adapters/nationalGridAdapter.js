import axios from 'axios';
import path from 'path';

const getCarbonIntensityRequestUrls = (dateIntervals) => dateIntervals
  .map(({ from, to }) => path.join(process.env.CARBON_INTENSITY_API_URL, 'intensity/', from, to));

export const getCarbonIntensityData = async (dateIntervals) => {
  const requests = getCarbonIntensityRequestUrls(dateIntervals)
    .map((url) => axios.get(url, {
      headers: {
        Accept: 'application/json',
      },
    }));
  let data = [];
  const responses = await Promise.all(requests);
  for (let i = 0; i < responses.length; i += 1) {
    const resp = responses[i];
    if (resp.status !== 200) {
      throw new Error(`cannot get carbon intensity data (status: ${resp.status})`);
    }
    data = data.concat(resp.data.data);
  }
  return data;
};

export const getGenerationMixData = async ({ from, to }) => {
  const url = path.join(process.env.CARBON_INTENSITY_API_URL, 'generation/', from, to);
  const resp = await axios.get(url, {
    headers: {
      Accept: 'application/json',
    },
    validateStatus: () => true,
  });
  if (resp.status !== 200) {
    throw new Error(`cannot get carbon intensity data (status: ${resp.status})`);
  }
  return resp.data.data;
};
