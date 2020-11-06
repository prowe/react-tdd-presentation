export default function calculateFargateCost(vCpu, memoryGb, taskCount) {
    const hourlyCpu = vCpu * 0.04048;
    const hourlyMemory = memoryGb * 0.004445;
    const hourlyCost = (hourlyCpu + hourlyMemory) * taskCount;
    return {
        hourlyCost,
        monthlyCost: hourlyCost * 24 * 30
    };
}