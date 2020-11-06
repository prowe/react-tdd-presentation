import calculateFargateCost from './calculate-fargate-cost';

it('should calculate hourly cost for 1 vCPU 1 GB', () => {
    const result = calculateFargateCost(1, 1, 1);
    expect(result.hourlyCost).toBeCloseTo(0.044925);
});

it('should calculate hourly cost for 2 vCPU, 1 GB', () => {
    const result = calculateFargateCost(2, 1, 1);
    expect(result.hourlyCost).toBeCloseTo(0.085405);
});

it('calculate the monthly cost for 1 vCPU 1 GB', () => {
    const result = calculateFargateCost(1, 1, 1);
    expect(result.monthlyCost).toBeCloseTo(32.346);
});

/**
 * One test at a time
 * Refactor to .each
 */