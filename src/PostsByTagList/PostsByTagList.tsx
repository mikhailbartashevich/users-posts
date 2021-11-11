import { useState } from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { notReachable } from '../utils/utils';
import { getPostsByTag } from '../api/post/post';
import { Post as PostType } from '../api/post/DTO';
import { Post, Msg as PostMsg } from '../Post/Post';

const LIMIT_PER_PAGE = 10;

export type Msg = PostMsg;

type Props = {
  onMsg(msg: Msg): void;
};

export const PostsByTagList = ({ onMsg }: Props) => {
  const [page, setPage] = useState(0);

  const params = useParams();
  const tagId = params.tagId || '';

  const onPaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value - 1);
  };

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['postsByTag', { tagId, page, limit: LIMIT_PER_PAGE }],
    queryFn: () =>
      getPostsByTag('postsByTag', { tagId, page, limit: LIMIT_PER_PAGE }),
    select: (response) => response.data,
    keepPreviousData: true,
  });

  const onPostMsg = (msg: PostMsg) => {
    switch (msg.type) {
      case 'tag_clicked':
        onMsg(msg);
        break;
      case 'user_name_clicked':
        onMsg(msg);
        break;
      default:
        notReachable(msg);
        break;
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Posts by tag {tagId}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            mt: 3,
            ml: 2,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            Loading posts...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Posts by tag {tagId}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            mt: 3,
            ml: 2,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            Error while loading posts...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Posts by tag {tagId}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{ width: '100%', mt: 3, ml: 2, display: 'flex', flexWrap: 'wrap' }}
      >
        {posts?.data?.length ? (
          posts?.data.map((post: PostType) => (
            <Box key={post.id} sx={{ m: 1 }}>
              <Post post={post} onMsg={onPostMsg} />
            </Box>
          ))
        ) : (
          <Typography
            variant="h6"
            component="div"
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            No more posts left
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          width: '100%',
          mt: 3,
          mb: 3,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {posts?.total && (
          <Pagination
            count={Math.ceil(posts?.total / LIMIT_PER_PAGE)}
            page={page + 1}
            onChange={onPaginationChange}
            showFirstButton
            showLastButton
            variant="outlined"
            shape="rounded"
          />
        )}
      </Box>
    </Box>
  );
};
