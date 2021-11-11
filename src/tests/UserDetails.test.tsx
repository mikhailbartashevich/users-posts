import { render, screen, fireEvent, within } from '@testing-library/react';
import { withQueryConfig } from './helpers/forTests';
import axios from 'axios';
import { UserDetails } from '../UserDetails/UserDetails';
import { USER_DETAILS_RESPONSE } from './fixtures/user-details';

jest.mock('axios');

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    userId: '60d0fe4f5311236168a109cb',
  }),
}));

const USER_ID = '60d0fe4f5311236168a109cb';

describe('UserDetails', () => {
  beforeEach(() => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    mockedAxios.get.mockImplementation((url: string) => {
      if (url === `https://dummyapi.io/data/v1/user/${USER_ID}`) {
        return Promise.resolve({ data: USER_DETAILS_RESPONSE });
      }
      return Promise.resolve();
    });
  });

  it('renders without crashing', async () => {
    const onMsgMock = jest.fn();
    const { unmount } = render(
      withQueryConfig(<UserDetails onMsg={onMsgMock} />),
    );

    expect(await screen.findByText('ms Sara Andersen')).toBeInTheDocument();

    unmount();
  });

  it('shows user details', async () => {
    const onMsgMock = jest.fn();
    const { unmount } = render(
      withQueryConfig(<UserDetails onMsg={onMsgMock} />),
    );

    expect(await screen.findByText('ms Sara Andersen')).toBeInTheDocument();

    expect(
      screen.getByText(
        new Date(USER_DETAILS_RESPONSE.dateOfBirth).toLocaleDateString(),
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(USER_DETAILS_RESPONSE.email)).toBeInTheDocument();
    expect(screen.getByText(USER_DETAILS_RESPONSE.phone)).toBeInTheDocument();
    expect(
      screen.getByText(
        new Date(USER_DETAILS_RESPONSE.registerDate).toLocaleDateString(),
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(USER_DETAILS_RESPONSE.location.city),
    ).toBeInTheDocument();
    expect(
      screen.getByText(USER_DETAILS_RESPONSE.location.state),
    ).toBeInTheDocument();
    expect(
      screen.getByText(USER_DETAILS_RESPONSE.location.street),
    ).toBeInTheDocument();
    expect(
      screen.getByText(USER_DETAILS_RESPONSE.location.country),
    ).toBeInTheDocument();

    unmount();
  });

  it('sends message to open posts', async () => {
    const onMsgMock = jest.fn();
    const { unmount } = render(
      withQueryConfig(<UserDetails onMsg={onMsgMock} />),
    );

    expect(await screen.findByText('ms Sara Andersen')).toBeInTheDocument();

    fireEvent.click(
      screen.getByTestId(`${USER_DETAILS_RESPONSE.id}-view-posts`),
    );

    expect(onMsgMock).toHaveBeenCalledWith({
      type: 'view_posts_clicked',
      userId: USER_DETAILS_RESPONSE.id,
    });

    unmount();
  });
});
