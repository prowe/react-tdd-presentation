import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chance from 'chance';
import { useEffect, useRef } from 'react';
import calculateFargateCost from './calculate-fargate-cost';
import CostDisplay from './CostDisplay';
import FargateCalculator from './FargateCalculator';

jest.mock('./calculate-fargate-cost');
jest.mock('./CostDisplay');

const chance = new Chance();

beforeEach(() => {
    CostDisplay.mockImplementation((props) => {
        const ref = useRef(null);
        useEffect(() => {
            if (ref.current) {
                ref.current.props = props;
            }
        });
        return <div data-testid={CostDisplay.name} ref={ref} />;
    });
    calculateFargateCost.mockReturnValue({
        hourlyCost: chance.floating({min: .01, max: 1}),
        monthlyCost: chance.floating()
    });
});

it('should have an input for vCPU', () => {
    render(<FargateCalculator/>);
    expect(screen.getByRole('spinbutton', {name: 'vCPU'})).toBeVisible();
});

it('should have an input for Memory (GB)', () => {
    render(<FargateCalculator/>);
    expect(screen.getByRole('spinbutton', {name: 'Memory (GB)'})).toBeVisible();
});

it('should have an input for Tasks', () => {
    render(<FargateCalculator/>);
    expect(screen.getByRole('spinbutton', {name: 'Tasks'})).toBeVisible();
});

it('should have a Calculate button', () => {
    render(<FargateCalculator/>);
    expect(screen.getByRole('button', {name: 'Calculate'})).toBeVisible();
});

it('should pass values to calculate when the Calculate button is clicked', async () => {
    render(<FargateCalculator/>);
    await userEvent.type(screen.getByRole('spinbutton', {name: 'vCPU'}), '1');
    await userEvent.type(screen.getByRole('spinbutton', {name: 'Memory (GB)'}), '2');
    await userEvent.type(screen.getByRole('spinbutton', {name: 'Tasks'}), '3');
    userEvent.click(screen.getByRole('button', {name: 'Calculate'}));

    expect(calculateFargateCost).toHaveBeenCalledWith(1, 2, 3);
});

it('should display the calculated cost', async () => {
    const costs = {
        hourlyCost: chance.floating({min: .01, max: 1}),
        monthlyCost: 23.45
    };
    calculateFargateCost.mockReturnValue(costs);

    render(<FargateCalculator/>);
    await userEvent.type(screen.getByRole('spinbutton', {name: 'vCPU'}), '1');
    await userEvent.type(screen.getByRole('spinbutton', {name: 'Memory (GB)'}), '2');
    await userEvent.type(screen.getByRole('spinbutton', {name: 'Tasks'}), '3');
    userEvent.click(screen.getByRole('button', {name: 'Calculate'}));

    // await waitFor(() => expect(screen.getByLabelText('Monthly Cost')).toHaveTextContent('$23.45'));
    await waitFor(() => {
        const display = screen.getByTestId(CostDisplay.name);
        expect(display.props.costs).toEqual(costs);
    })
});

/**
 * Start with displaying an input
 * create a second test
 * iterate
 * refactor to describe blocks
 * refactor to "Private Components"
 * refactor to cost display
 */