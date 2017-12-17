export interface Cache {
  name: String,
  location: String,
  latitude: Number,
  longitude: Number,
  description: String,
  _id?: string;
}

export interface MessagePost {
  message: String,
  _id?: string;
}

export interface User {
  firstName: String,
  lastName: String,
  dob: String,
  email: String,
  password: String,
  img: String,
  admin: Boolean,
  _id?: string;
}
