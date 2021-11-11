import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import TransgenderIcon from '@mui/icons-material/Transgender';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { getUserDetails } from '../api/user/user';

export type Msg = { type: 'view_posts_clicked'; userId: string };

type Props = {
  onMsg(msg: Msg): void;
};

export const UserDetails = ({ onMsg }: Props) => {
  const params = useParams();
  const userId = params.userId || '';

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userDetails', { userId }],
    queryFn: () => getUserDetails('userDetails', { userId }),
    select: (response) => response.data,
  });

  if (isLoading) {
    return (
      <Card sx={{ minWidth: 300, m: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Loading user profile...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card sx={{ minWidth: 300, m: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Loading error (most likely user doesn't exist)...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const name = `${user?.title} ${user?.firstName} ${user?.lastName}`;
  return (
    <Card sx={{ minWidth: 300, m: 2 }}>
      <CardContent>
        <Avatar alt={name} src={user?.picture} />
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </Box>
        <Button
          size="small"
          onClick={() =>
            user?.id && onMsg({ type: 'view_posts_clicked', userId: user?.id })
          }
        >
          View Posts
        </Button>
        <Box sx={{ display: 'flex' }}>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Typography gutterBottom variant="h6" component="div">
              Profile
            </Typography>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <TransgenderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Gender" secondary={user?.gender} />
            </ListItem>
            {user?.dateOfBirth && (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CalendarTodayIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Date of birth"
                  secondary={new Date(user?.dateOfBirth).toLocaleDateString()}
                />
              </ListItem>
            )}
            {user?.registerDate && (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EventAvailableIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Register date"
                  secondary={new Date(user?.registerDate).toLocaleDateString()}
                />
              </ListItem>
            )}
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AlternateEmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Email" secondary={user?.email} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ContactPhoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Phone" secondary={user?.phone} />
              </ListItem>
            </List>
          </List>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Typography gutterBottom variant="h6" component="div">
              Address
            </Typography>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AddLocationIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="State" secondary={user?.location.state} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <HomeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Street"
                secondary={user?.location.street}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocationCityIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="City" secondary={user?.location.city} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PublicIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Country"
                secondary={user?.location.country}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccessTimeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Timezone"
                secondary={user?.location.timezone}
              />
            </ListItem>
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};
