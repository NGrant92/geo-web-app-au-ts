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
  visitors: Number,
  user: User,
  _id?: string;
}

export interface MessagePost {
  message: String,
  user: User,
  _id?: string;
}

export interface Following {
  follower: User,
  followee: User,
  _id?: string;
}
