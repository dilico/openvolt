import axios from 'axios';
import path from 'path';

const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const getMeterIntervalData = async ({
  meterId, startDate, endDate, granularity,
}) => {
  const end = new Date(endDate);
  end.setDate(end.getDate() + 1);
  const url = path.join(process.env.OPENVOLT_API_URL, 'interval-data');
  const resp = await axios.get(url, {
    params: {
      meter_id: meterId,
      start_date: formatDate(startDate),
      end_date: formatDate(end),
      granularity,
    },
    headers: {
      'x-api-key': process.env.OPENVOLT_API_KEY,
    },
    validateStatus: () => true,
  });
  if (resp.status !== 200) {
    throw new Error(`cannot get meter data (status: ${resp.status})`);
  }

  return resp.data;
};

export default getMeterIntervalData;
