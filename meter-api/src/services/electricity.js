import getMeterIntervalData from '../adapters/openvoltAdapter.js';

const getTotalElectricity = (consumptionData) => consumptionData
  .reduce((sum, num) => sum + Number(num.consumption), 0);

const getElectricity = async (meterId, startDate, endDate) => {
  const granularity = 'hh';
  const intervalData = await getMeterIntervalData({
    meterId, startDate, endDate, granularity,
  });
  return {
    total: getTotalElectricity(intervalData.data),
    data: intervalData.data,
  };
};

export default getElectricity;
