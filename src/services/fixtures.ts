import {Cache, MessagePost, User} from "./models";

export default class Fixtures {
  baseUrl = 'http://localhost:4000';

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
