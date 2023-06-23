import { render, screen } from 'test/utilities';
import PackingList from '.';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByLabelText(/Add New Item/i);
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const button = screen.getByRole('button', { name: /Add New Item/i });
  const input = screen.getByLabelText('New Item Name');
  expect(input).toHaveValue('');
  expect(button).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const button = screen.getByRole('button', { name: /Add New Item/i });
  const input = screen.getByLabelText('New Item Name');
  expect(input).toHaveValue('');
  expect(button).toBeDisabled();
  await user.type(input, 'Socks');
  expect(input).toHaveValue('Socks');
  expect(button).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const button = screen.getByRole('button', { name: /Add New Item/i });
  const input = screen.getByLabelText('New Item Name');
  await user.type(input, 'Socks');
  await user.click(button);

  expect(screen.getByLabelText('Socks')).not.toBeChecked();
});
