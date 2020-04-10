const calculatePeriod = (data) => {
  if (data.periodType === 'weeks') {
    return 2 ** Math.trunc((data.timeToElapse * 7) / 3);
  }
  if (data.periodType === 'months') {
    return 2 ** Math.trunc((data.timeToElapse * 30) / 3);
  }

  return 2 ** Math.trunc(data.timeToElapse / 3);
};
const getDays = (data) => {
  if (data.periodType === 'weeks') {
    return 7 * data.timeToElapse;
  }
  if (data.periodType === 'months') {
    return 30 * data.timeToElapse;
  }

  return data.timeToElapse;
};

// function to estimate the number of currently Infected people
const impact = (data) => {
  //calculating the number of infected people
  const currentlyInfected = data.reportedCases * 10;

  const infectionsByRequestedTime = currentlyInfected * calculatePeriod(data);
  const severeCasesByRequestedTime = (15 / 100) * infectionsByRequestedTime;
  const compute = (35 / 100) * data.totalHospitalBeds;
  const hospitalBedsByRequestedTime = Math.ceil(
    compute - severeCasesByRequestedTime
  );
  //severe cases that require ICU
  const casesForICUByRequestedTime = (5 / 100) * infectionsByRequestedTime;
  //severe cases that will require ventilators
  const casesForVentilatorsByRequestedTime =
    (2 / 100) * infectionsByRequestedTime;

  const result =
    data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation;
  const dollarsInFlight = (infectionsByRequestedTime * result) / getDays(data);

  const casesForICUByRequestedTime = Math.trunc(casesForICUByRequestedTimeR);
  const casesForVentilatorsByRequestedTime = Math.trunc(
    casesForVentilatorsByRequestedTimeR
  );
  const dollarsInFlight = Math.trunc(dollarsInFlightR);

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};
// function for severe cases
const severeImpact = (data) => {
  //calculating currently infected for severe impact
  const currentlyInfected = data.reportedCases * 50;
  const infectionsByRequestedTime = currentlyInfected * calculatePeriod(data);
  //caculating the estimated number of severe postive cases
  const severeCasesByRequestedTime = (15 / 100) * infectionsByRequestedTime;
  //calculating total available beds
  const bedAvaliable = (35 / 100) * data.totalHospitalBeds;
  //estimate the number of available hostipal beds for servere cases
  const hospitalBedsByRequestedTime = Math.ceil(
    bedAvaliable - severeCasesByRequestedTime
  );
  //estimated number of severe cases requiring ICU care
  const casesForICUByRequestedTime = (5 / 100) * infectionsByRequestedTime;
  const casesForVentilatorsByRequestedTime =
    (2 / 100) * infectionsByRequestedTime;
  const result =
    data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation;
  const dollarsInFlight = (infectionsByRequestedTime * result) / getDays(data);

  const casesForICUByRequestedTime = Math.trunc(casesForICUByRequestedTime);
  const casesForVentilatorsByRequestedTime = Math.trunc(
    casesForVentilatorsByRequestedTime
  );
  const dollarsInFlight = Math.trunc(dollarsInFlight);

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const covid19ImpactEstimator = (data) => ({
  data: {},
  impact: impact(data),
  severeImpact: severeImpact(data)
});

export default covid19ImpactEstimator;
