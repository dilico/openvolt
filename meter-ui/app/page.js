'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Button, Card, Metric, Text, TextInput, Title, BarList, Flex, Grid, DateRangePicker } from '@tremor/react';
import getMeterConsumption from '../actions/api';

export default function HomePage() {
  const [consumption, setConsumption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [meterId, setMeterId] = useState('');
  const [message, setMessage] = useState('');

  const onDateRangeChange = (value) => {
    setStartDate(value.from);
    setEndDate(value.to);
    setConsumption(null);
  };

  const onInputChange = (value) => {
    setMeterId(value);
    setConsumption(null);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setConsumption(null);
    setMessage('');
    try {
      const consumptionData = await getMeterConsumption(meterId, startDate, endDate);
      if (consumptionData.error) {
        setMessage(consumptionData.error);
      }
      setConsumption(consumptionData.consumption);
    } catch (error) {
      setMessage('ooops... something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Title>Meter</Title>
      <Text>Get the electricity and CO2 consumption for the specified meter.</Text>
      <div className='relative mt-5 max-w-md'>
        <DateRangePicker
          disabled={isLoading}
          onValueChange={onDateRangeChange} />
        <TextInput
          placeholder='Search by meter id...'
          disabled={isLoading}
          className='mt-2'
          onValueChange={onInputChange} />
        <Button
          onClick={onSubmit}
          icon={MagnifyingGlassIcon}
          loading={isLoading}
          className='mt-2'>Search</Button>
      </div>
      {message && (
        <div className='mt-8 text-red-500 text-center'>{message}</div>
      )}

      {consumption && (
        <div>
        <Grid numItemsSm={1} numItemsLg={2} className='gap-6 mt-6'>
          <Card key='energy-consumption'>
            <Title>Energy consumed</Title>
            <Flex
              justifyContent='start'
              alignItems='baseline'
              className='space-x-2'
            >
              <Metric>{consumption.electricity}</Metric>
              <Text>{consumption.electricityUnits}</Text>
            </Flex>
          </Card>
          <Card key='co2-consumption'>
            <Title>CO2 emitted</Title>
            <Flex
              justifyContent='start'
              alignItems='baseline'
              className='space-x-2'
            >
              <Metric>{consumption.co2}</Metric>
              <Text>{consumption.co2Units}</Text>
            </Flex>
          </Card>
        </Grid>
          <Card key='mix' className='mt-6'>
            <Title>Fuel mix</Title>
            <Flex className='mt-6'>
              <Text>Fuel</Text>
              <Text className='text-right'>{`CO2 [${consumption.co2Units}]`}</Text>
            </Flex>
            <BarList
              data={consumption.co2GenerationMix}
              className='mt-2'
            />
          </Card>
        </div>
      )}
    </main>
  );
}
