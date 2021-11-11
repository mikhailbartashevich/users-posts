import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import { Post as PostType } from '../api/post/DTO';
import { CommentsList } from './components/CommentsList';

export type Msg =
  | { type: 'tag_clicked'; tag: string }
  | { type: 'user_name_clicked'; userId: string };

type Props = {
  post: PostType;
  onMsg(msg: Msg): void;
};

export const Post = ({ post, onMsg }: Props) => {
  const user = post.owner;
  const name = `${user.title} ${user.firstName} ${user.lastName}`;
  return (
    <Card sx={{ minWidth: 400 }}>
      <CardMedia
        component="img"
        height="200"
        alt={post.text}
        image={post.image}
      />
      <CardContent>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <Avatar alt={name} src={user.picture} sx={{ mr: 1 }} />
          <Button
            variant="text"
            onClick={() =>
              onMsg({ type: 'user_name_clicked', userId: user.id })
            }
          >
            {name}
          </Button>
        </Box>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <Typography variant="body2" color="text.secondary" title={post.text}>
            {post.text}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
          {post.tags.map((tag) => (
            <Box key={tag} sx={{ mr: 1 }}>
              <Chip
                label={tag}
                color="primary"
                onClick={() => onMsg({ type: 'tag_clicked', tag })}
              />
            </Box>
          ))}
        </Box>
        <Box>

          <CommentsList postId={post.id} />
        </Box>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};
