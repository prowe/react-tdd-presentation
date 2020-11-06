
export default function CostDisplay({costs}) {
    if (!costs) {
        return null;
    }

    return (
        <dl>
            <dt id='monthly-cost-label'>Monthly Cost</dt>
            <dd aria-labelledby='monthly-cost-label'>${costs.monthlyCost.toFixed(2)}</dd>
        </dl>
    )
}