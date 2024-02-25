'use server';

import path from 'path';

const formatDate = (date) => date.toISOString().split('T')[0];

const parseConsumptionData = (data) => {
  const co2GenerationMix = [];
  for (let i = 0; i < data.co2_generationmix.length; i += 1) {
    co2GenerationMix.push({
      name: data.co2_generationmix[i].fuel,
      value: Number(data.co2_generationmix[i].co2),
    });
  }
  co2GenerationMix.sort((a, b) => b.value - a.value);
  return {
    electricity: data.electricity,
    electricityUnits: data.electricity_units,
    co2: data.co2,
    co2Units: data.co2_units,
    co2GenerationMix,
  }
}

const getMeterConsumption = async (meterId, startDate, endDate) => {
  try {
    if (!meterId) {
      return {error: 'missing meter id'};
    }
    if (!startDate) {
      return {error: 'missing start date'};
    }
    if (!endDate) {
      return {error: 'missing end date'};
    }
    const url = new URL(path.join(process.env.METER_API_URL, '/api/meters/', meterId));
    url.searchParams.set('start-date', formatDate(startDate));
    url.searchParams.set('end-date', formatDate(endDate)); 
    url.searchParams.set('api-key', process.env.METER_API_KEY);
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      const consumption = parseConsumptionData(data);
      return { consumption };
    }
  } catch (error) {
    return { error: 'ooops... something went wrong' };
  }
};

export default getMeterConsumption;
