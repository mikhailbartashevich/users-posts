import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { notReachable } from './utils/utils';
import { UserList, Msg as UserListMsg } from './UserList/UserList';
import { PostsList, Msg as PostsListMsg } from './PostsList/PostsList';
import { UserDetails, Msg as UserDetailsMsg } from './UserDetails/UserDetails';
import { NoMatch } from './NoMatch/NoMatch';
import { PostsByTagList } from './PostsByTagList/PostsByTagList';

import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});

export const App = () => {
  const navigate = useNavigate();

  const onUserListMsg = (msg: UserListMsg) => {
    switch (msg.type) {
      case 'view_posts_clicked':
        navigate(`/user/${msg.userId}/posts`);
        break;
      case 'user_name_clicked':
        navigate(`/user/${msg.userId}`);
        break;
      default:
        notReachable(msg);
        break;
    }
  };

  const onPostsListMsg = (msg: PostsListMsg) => {
    switch (msg.type) {
      case 'tag_clicked':
        navigate(`/tag/${msg.tag}/posts`);
        break;
      case 'user_name_clicked':
        navigate(`/user/${msg.userId}`);
        break;
      default:
        notReachable(msg);
        break;
    }
  };

  const onUserDetailsMsg = (msg: UserDetailsMsg) => {
    switch (msg.type) {
      case 'view_posts_clicked':
        navigate(`/user/${msg.userId}/posts`);
        break;
      default:
        notReachable(msg.type);
        break;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<UserList onMsg={onUserListMsg} />} />
        <Route
          path="/user/:userId/posts"
          element={<PostsList onMsg={onPostsListMsg} />}
        />
        <Route
          path="/user/:userId"
          element={<UserDetails onMsg={onUserDetailsMsg} />}
        />
        <Route
          path="/tag/:tagId/posts"
          element={<PostsByTagList onMsg={onPostsListMsg} />}
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </QueryClientProvider>
  );
};
