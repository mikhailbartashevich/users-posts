export type User = {
  id: string;
  title: string;
  lastName: string;
  picture: string;
  firstName: string;
};

export type Location = {
  city: string;
  country: string;
  state: string;
  street: string;
  timezone: string;
};

export type UserDetails = User & {
  dateOfBirth: string;
  email: string;
  gender: string;
  location: Location;
  phone: string;
  registerDate: string;
  updatedDate: string;
};
