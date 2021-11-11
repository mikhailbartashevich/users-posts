import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { getCommentsByPostId } from '../../api/comment/comment';

type Props = {
  postId: string;
  withComments: boolean;
};

export const CommentsList = ({ postId, withComments }: Props) => {
  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['comments', { postId, page: 0, limit: 2 }],
    queryFn: () =>
      getCommentsByPostId('comments', { postId, page: 0, limit: 2 }),
    select: (response) => response.data,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          mt: 3,
          ml: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Comments (loading...)
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          mt: 3,
          ml: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Comments (error)
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Typography
        data-testid={`${postId}-comments`}
        variant="h6"
        color="text.secondary"
      >
        Comments ({comments?.total})
      </Typography>
      <List
        data-testid={`${postId}-list-comments`}
        sx={{ width: '100%', bgcolor: 'background.paper' }}
      >
        {withComments &&
          comments?.data &&
          comments?.data.slice(0, 2).map((comment) => {
            const user = comment.owner;
            const name = `${user?.title} ${user?.firstName} ${user?.lastName}`;
            return (
              <Box key={comment.id} sx={{ mr: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 2 }}>
                    <Avatar alt={name} src={user?.picture} />
                  </Box>
                  <Box>
                    <Typography variant="h6" component="div">
                      {name}
                    </Typography>
                    <Typography component="div" color="text.secondary">
                      {new Date(comment.publishDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <ListItemText secondary={comment.message} />
                </Box>
              </Box>
            );
          })}
      </List>
    </>
  );
};
