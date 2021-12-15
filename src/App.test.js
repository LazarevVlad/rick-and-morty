import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

const characterResponse = rest.get('https://rickandmortyapi.com/api/character/1', (req, res, ctx) => {
  return res(ctx.json([{
    id: 1,
    image: '',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
  }]))
})

const errorResponse = rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
  return res(ctx.status(400));
})

const handlers = [characterResponse];

const server = new setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  it('render App components', () => {
    render(<App />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/species/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeEmptyDOMElement();
    expect(screen.getByLabelText(/species/i)).toBeEmptyDOMElement();
    expect(screen.getByLabelText(/type/i)).toBeEmptyDOMElement();
  })

  it('fetch data', async () => {
    render(<App />)
    expect(await screen.findByText('Rick Sanchez')).toBeVisible();
  })

  it('fetch error', async () => {
    server.use(errorResponse)
    render(<App />)
    expect(await screen.findByText('Nothing found')).toBeVisible();
  })
})

describe('input text', () => {
  it('input first filter', () => {
    render(<App />);
    userEvent.type(screen.getByPlaceholderText(/name/i), 'rick')
    expect(screen.queryByText(/rick/i)).toBeInTheDocument();
  })
})