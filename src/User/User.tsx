import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { useQuery } from 'react-query';

import { User as UserType } from '../api/user/DTO';
import { getPostsByUserId } from '../api/post/post';

export type Msg =
  | { type: 'view_posts_clicked'; userId: string }
  | { type: 'user_name_clicked'; userId: string };

type Props = {
  user: UserType;
  onMsg(msg: Msg): void;
};

export const User = ({ user, onMsg }: Props) => {
  const userId = user.id;
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['posts', { userId, page: 0, limit: 1 }],
    queryFn: () => getPostsByUserId('posts', { userId, page: 0, limit: 1 }),
    select: (response) => response.data,
  });

  const name = `${user.title} ${user.firstName} ${user.lastName}`;
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent>
        <Badge
          data-testid={`${user.id}-posts-badge`}
          color="primary"
          badgeContent={isLoading || isError ? 'loading' : posts?.total}
          title="Posts"
        >
          <Avatar alt={name} src={user.picture} />
        </Badge>
        <Box sx={{ display: 'flex' }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          data-testid={`${user.id}-profile-details`}
          size="small"
          onClick={() => onMsg({ type: 'user_name_clicked', userId: user.id })}
        >
          Profile Details
        </Button>
        <Button
          data-testid={`${user.id}-view-posts`}
          size="small"
          onClick={() => onMsg({ type: 'view_posts_clicked', userId: user.id })}
        >
          View Posts
        </Button>
      </CardActions>
    </Card>
  );
};
