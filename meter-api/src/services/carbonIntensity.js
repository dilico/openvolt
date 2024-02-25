import { getCarbonIntensityData, getGenerationMixData } from '../adapters/nationalGridAdapter.js';

const formatDate = (date) => date.toISOString().split('T')[0];

const getCarbonIntensityDataForInterval = async (startDate, endDate) => {
  const dateIntervals = [];
  for (let d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 14)) {
    const to = new Date(d);
    to.setDate(d.getDate() + 14);
    dateIntervals.push({ from: formatDate(d), to: formatDate(to) });
  }
  const data = await getCarbonIntensityData(dateIntervals);
  return data;
};

const getGenerationMixDataForInterval = async (startDate, endDate) => {
  const from = formatDate(new Date(startDate));
  const end = new Date(endDate);
  end.setDate(end.getDate() + 1);
  const to = formatDate(end);
  const data = await getGenerationMixData({ from, to });
  return data;
};

const getElectricityAtDate = (date, electricity) => electricity
  .find((e) => new Date(e.start_interval).getTime() === date.getTime());

const getCarbonIntensityAtDate = (date, carbonIntensity) => carbonIntensity
  .find((c) => new Date(c.from).getTime() === date.getTime());

const getGenerationMixAtDate = (date, generationMix) => generationMix
  .find((g) => new Date(g.from).getTime() === date.getTime());

const convertToKgs = (value) => value / 1000;

const getCO2 = async (startDate, endDate, electricity) => {
  const carbonIntensity = await getCarbonIntensityDataForInterval(startDate, endDate);
  const generationMix = await getGenerationMixDataForInterval(startDate, endDate);
  let totalCO2 = 0;
  const generationMixTotals = {};
  const end = new Date(endDate);
  end.setDate(end.getDate() + 1);
  for (let d = new Date(startDate); d < end; d.setTime(d.getTime() + 0.5 * 60 * 60 * 1000)) {
    const el = getElectricityAtDate(d, electricity);
    const ci = getCarbonIntensityAtDate(d, carbonIntensity);
    const gm = getGenerationMixAtDate(d, generationMix);
    const t = Number(el.consumption) * Number(ci.intensity.actual);
    for (let i = 0; i < gm.generationmix.length; i += 1) {
      const mix = gm.generationmix[i];
      const fuelCO2 = Object.prototype.hasOwnProperty.call(generationMixTotals, mix.fuel)
        ? generationMixTotals[mix.fuel] : 0;
      generationMixTotals[mix.fuel] = fuelCO2 + (t * (mix.perc / 100));
    }
    totalCO2 += t;
  }
  const mixes = [];
  for (let i = 0; i < Object.entries(generationMixTotals).length; i += 1) {
    const [key, value] = Object.entries(generationMixTotals)[i];
    mixes.push({ fuel: key, co2: convertToKgs(value).toFixed(2) });
  }
  return {
    total: convertToKgs(totalCO2).toFixed(2),
    generationMix: mixes,
  };
};

export default getCO2;
