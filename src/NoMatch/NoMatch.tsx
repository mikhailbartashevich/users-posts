import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const NoMatch = () => (
  <Card sx={{ minWidth: 300, m: 2 }}>
    <CardContent>
      <Typography variant="h5" component="div">
        No such page...
      </Typography>
    </CardContent>
  </Card>
);
