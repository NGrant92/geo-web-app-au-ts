export interface User {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  img: String,
  admin: Boolean,
  _id?: string;
}

export interface Cache {
  name: String,
  location: String,
  latitude: Number,
  longitude: Number,
  description: String,
  owner: User,
  _id?: string;
}

export interface MessagePost {
  message: String,
  owner: User,
  _id?: string;
}
