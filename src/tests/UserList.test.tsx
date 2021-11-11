import { render, screen, fireEvent, within } from '@testing-library/react';
import { UserList } from '../UserList/UserList';
import { withQueryConfig } from './helpers/forTests';
import axios from 'axios';
import { USERS_RESPONSE } from './fixtures/users';
import { POSTS_RESPONSE } from './fixtures/posts';

jest.mock('axios');

const USER_ID = '60d0fe4f5311236168a109cb';

describe('UserList', () => {
  beforeEach(() => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    mockedAxios.get.mockImplementation((url: string) => {
      if (url === 'https://dummyapi.io/data/v1/user') {
        return Promise.resolve({ data: USERS_RESPONSE });
      }
      if (url === `https://dummyapi.io/data/v1/user/${USER_ID}/post`) {
        return Promise.resolve({ data: POSTS_RESPONSE });
      }
      return Promise.resolve();
    });
  });

  it('renders without crashing', async () => {
    const onMsgMock = jest.fn();
    const { unmount } = render(withQueryConfig(<UserList onMsg={onMsgMock} />));

    expect(await screen.findByText('miss Edita Vestering')).toBeInTheDocument();

    unmount();
  });

  it('shows users with posts badge', async () => {
    const onMsgMock = jest.fn();
    const { unmount } = render(withQueryConfig(<UserList onMsg={onMsgMock} />));

    expect(await screen.findByText('miss Edita Vestering')).toBeInTheDocument();

    const badge = screen.getByTestId(`${USER_ID}-posts-badge`);
    expect(badge).toBeInTheDocument();
    expect(within(badge).getByText('99+')).toBeDefined(); // 873 posts

    unmount();
  });

  it('sends message to open posts and user details', async () => {
    const onMsgMock = jest.fn();
    const { unmount } = render(withQueryConfig(<UserList onMsg={onMsgMock} />));

    expect(await screen.findByText('miss Edita Vestering')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId(`${USER_ID}-view-posts`));

    expect(onMsgMock).toHaveBeenCalledWith({
      type: 'view_posts_clicked',
      userId: USER_ID,
    });

    fireEvent.click(screen.getByTestId(`${USER_ID}-profile-details`));

    expect(onMsgMock).toHaveBeenCalledWith({
      type: 'user_name_clicked',
      userId: USER_ID,
    });

    unmount();
  });
});
