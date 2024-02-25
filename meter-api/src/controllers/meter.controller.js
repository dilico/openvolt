import getCO2 from '../services/carbonIntensity.js';
import getElectricity from '../services/electricity.js';

const getMeterConsumption = async (req, res) => {
  try {
    const meterId = req.params.id;
    const startDateParam = req.query['start-date'];
    const endDateParam = req.query['end-date'];
    if (!meterId || !startDateParam || !endDateParam) {
      res.status(400).json({ error: 'invalid request' });
      return;
    }
    const startDate = new Date(startDateParam);
    const endDate = new Date(endDateParam);
    const electricity = await getElectricity(meterId, startDate, endDate);
    const co2 = await getCO2(startDate, endDate, electricity.data);
    res.status(200).json({
      electricity: electricity.total.toFixed(2),
      electricity_units: 'kWh',
      co2: co2.total,
      co2_units: 'KgCO2',
      co2_generationmix: co2.generationMix,
    });
  } catch (error) {
    res.status(500).json({ error: 'oooops...' });
  }
};

export default getMeterConsumption;
