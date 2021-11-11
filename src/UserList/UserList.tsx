import { useState } from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { useQuery } from 'react-query';

import { User as UserType } from '../api/user/DTO';
import { getUsers } from '../api/user/user';
import { User, Msg as UserMsg } from '../User/User';
import { notReachable } from '../utils/utils';

// TODO: wrap content inside the page layout with header

export type Msg = UserMsg;

const LIMIT_PER_PAGE = 10;

type Props = {
  onMsg(msg: Msg): void;
};

export const UserList = ({ onMsg }: Props) => {
  const [page, setPage] = useState(0);

  const {
    data: users,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['users', { page, limit: LIMIT_PER_PAGE }],
    queryFn: () => getUsers('users', { page, limit: LIMIT_PER_PAGE }),
    select: (response) => response.data,
    keepPreviousData: true,
  });

  const onPaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value - 1);
  };

  const onUserMsg = (msg: UserMsg) => {
    switch (msg.type) {
      case 'view_posts_clicked':
        onMsg(msg);
        break;
      case 'user_name_clicked':
        onMsg(msg);
        break;
      default:
        notReachable(msg);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Users
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
            Loading...
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
              Users
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
            Error loading users
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
            Users
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{ width: '100%', mt: 3, ml: 2, display: 'flex', flexWrap: 'wrap' }}
      >
        {users?.data.length ? (
          users?.data.map((user: UserType) => (
            <Box key={user.id} sx={{ m: 1 }}>
              <User user={user} onMsg={onUserMsg} />
            </Box>
          ))
        ) : (
          <Typography
            variant="h6"
            component="div"
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            No more users to display
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
        {users?.total && (
          <Pagination
            count={Math.ceil(users?.total / LIMIT_PER_PAGE)}
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
