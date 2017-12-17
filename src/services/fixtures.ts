import {Cache, MessagePost, User} from "./models";

export default class Fixtures {
  baseUrl = 'http://localhost:4000';

  users: Map<string, User> = new Map()
    .set('homer@simpson.com', {
      firstName: 'Homer',
      lastName: 'Simpson',
      email: 'homer@simpson.com',
      password: 'secret',
      img: "http://res.cloudinary.com/ngrant/image/upload/v1506255274/LhFydmk_ueraaq.png",
      admin: false,
    })
    .set('marge@simpson.com', {
      firstName: 'Marge',
      lastName: 'Simpson',
      email: 'marge@simpson.com',
      password: 'secret',
      img: "http://res.cloudinary.com/ngrant/image/upload/v1509621811/marge_efpuft.jpg",
      admin: false,
    })
    .set('bart@simpson.com', {
      firstName: 'Bart',
      lastName: 'Simpson',
      email: 'bart@simpson.com',
      password: 'secret',
      img: "http://res.cloudinary.com/ngrant/image/upload/v1503767824/gteyxykqycd8zu2jwtiy.png",
      admin: false,
    })
    .set('admin@simpson.com', {
      firstName: 'Ned',
      lastName: 'Flanders',
      email: 'admin@simpson.com',
      password: 'secret',
      img: "https://res.cloudinary.com/ngrant/image/upload/v1509798959/ned.jpg",
      admin: true,
    });

  caches: Array<Cache> = [
    {
      name: "Skatepark Cache",
      location: "Springfield Skatepark",
      latitude: 52.2462,
      longitude: 7.1202,
      description: "under the busted half pipe",
    },
    {
      name: "A cache for moms",
      location: "Springfield jungle gym",
      latitude: 52.2462,
      longitude: 2.1202,
      description: "Under the baby's slide. Just don't keep your kid waiting at the top as you look for it",
    },
    {
      name: "The ole watering hole",
      location: "Moe's bar",
      latitude: 52.2462,
      longitude: 0.1202,
      description: "Under Barney",
    },
    {
      name: "Home run",
      location: "Baseball Stadium",
      latitude: 52.2462,
      longitude: 10.1202,
      description: "First base!",
    },
    {
      name: "Our founder",
      location: "Jebediah Springfield Statue",
      latitude: 52.2462,
      longitude: 15.1202,
      description: "Under his foot",
    },
  ];
}
