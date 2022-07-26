import { render, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import SelectForm from '../SelectForm'

test('should render SelectForm component', () => {
  render(<SelectForm />)
  const selectFormElement = screen.getByTestId("selectForm-1");
  expect(selectFormElement).toBeInTheDocument();
})