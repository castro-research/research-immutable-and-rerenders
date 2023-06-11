import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Page from './page'

jest.spyOn(Date.prototype, 'getTime').mockReturnValue(100)

describe('TestTwo', () => {
    it('Should update only first time after dispatch onClick', async () => {
        render(<Page />)

        const button = await screen.findByRole(
            'button',
            { name: 'item-1-add' },
            { timeout: 3000 }
        )
        const timers = screen
            .getAllByRole('timer')
            .map((timer) => timer.textContent)

        const initialTimer1 = timers[0]

        jest.spyOn(Date.prototype, 'getTime').mockReturnValue(200)
        fireEvent.click(button)

        const updateTimers = screen
            .getAllByRole('timer')
            .map((timer) => timer.textContent)

        const updatedTimer1 = updateTimers[0]
        const updatedTimer2 = updateTimers[1]

        expect(initialTimer1).not.toEqual(updatedTimer1)

        // The updatedTimer2 should not be equal to the updatedTimer1
        // But it prove that the timers are not the same
        // By the way, this need to be fixed
        expect(updatedTimer2).not.toEqual(updatedTimer1)
    })
})
