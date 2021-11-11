import { render, screen, fireEvent, within } from '@testing-library/react';
import { withQueryConfig } from './helpers/forTests';
import axios from 'axios';
import { POSTS_RESPONSE } from './fixtures/posts';
import { PostsByTagList } from '../PostsByTagList/PostsByTagList';
import { COMMENTS_RESPONSE } from './fixtures/comments';

jest.mock('axios');

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    tagId: 'dog',
  }),
}));

const TAG = 'dog';
const POST_ID = '60d21b4667d0d8992e610c85';

describe('PostsByTagList', () => {
  beforeEach(() => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    mockedAxios.get.mockImplementation((url: string) => {
      if (url === `https://dummyapi.io/data/v1/tag/${TAG}/post`) {
        return Promise.resolve({ data: POSTS_RESPONSE });
      }
      if (url === `https://dummyapi.io/data/v1/post/${POST_ID}/comment`) {
        return Promise.resolve({ data: COMMENTS_RESPONSE });
      }
      return Promise.resolve();
    });
  });

  it('renders without crashing', async () => {
    const onMsgMock = jest.fn();
    const { unmount } = render(
      withQueryConfig(<PostsByTagList onMsg={onMsgMock} />),
    );

    expect(
      await screen.findByText('adult Labrador retriever'),
    ).toBeInTheDocument();

    unmount();
  });

  it('shows the number of comments', async () => {
    const onMsgMock = jest.fn();
    const { unmount } = render(
      withQueryConfig(<PostsByTagList onMsg={onMsgMock} />),
    );

    expect(
      await screen.findByText('adult Labrador retriever'),
    ).toBeInTheDocument();

    const comments = screen.getByTestId(`${POST_ID}-comments`);
    expect(within(comments).getByText('Comments (2)')).toBeInTheDocument();

    unmount();
  });

  it('sends message to open posts by tag', async () => {
    const onMsgMock = jest.fn();
    const { unmount } = render(
      withQueryConfig(<PostsByTagList onMsg={onMsgMock} />),
    );

    expect(
      await screen.findByText('adult Labrador retriever'),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId(`${POST_ID}-${TAG}-tag`));

    expect(onMsgMock).toHaveBeenCalledWith({
      type: 'tag_clicked',
      tag: TAG,
    });

    unmount();
  });

  it('sends message to open user profile', async () => {
    const onMsgMock = jest.fn();
    const { unmount } = render(
      withQueryConfig(<PostsByTagList onMsg={onMsgMock} />),
    );

    expect(
      await screen.findByText('adult Labrador retriever'),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId(`${POST_ID}-user-name`));

    expect(onMsgMock).toHaveBeenCalledWith({
      type: 'user_name_clicked',
      userId: '60d0fe4f5311236168a109ca',
    });

    unmount();
  });
});
