import { useState } from "react";
import calculateFargateCost from './calculate-fargate-cost';

export default function FargateCalculator() {
    const [vCPU, setVCpu] = useState('');
    const [memory, setMemory] = useState('');
    const [tasks, setTasks] = useState('');
    const [costs, setCosts] = useState(null);

    function onCalculate() {
        const result = calculateFargateCost(parseFloat(vCPU), parseFloat(memory), parseInt(tasks));
        setCosts(result);
    }

    return (
        <div>
            <label>
                vCPU
                <input
                    type='number'
                    value={vCPU}
                    onChange={e => setVCpu(e.target.value)}
                />
            </label>

            <label>
                Memory (GB)
                <input
                    type='number'
                    value={memory}
                    onChange={e => setMemory(e.target.value)}
                />
            </label>

            <label>
                Tasks
                <input
                    type='number'
                    value={tasks}
                    onChange={e => setTasks(e.target.value)}
                />
            </label>

            <button onClick={onCalculate}>Calculate</button>

            {costs && <dl>
                <dt id='monthly-cost-label'>Monthly Cost</dt>
                <dd aria-labelledby='monthly-cost-label'>${costs.monthlyCost.toFixed(2)}</dd>
            </dl>}

        </div>
    );
}