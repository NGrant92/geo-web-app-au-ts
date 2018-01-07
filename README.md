# Geo Web Aurelia Client
## Assignment #2 for Web Development

#### Author Details:

**Name:** Niall Grant ([github.com/NGrant92](https://github.com/NGrant92))

**Github repo:** https://github.com/NGrant92/geo-web-app-au-ts


#### Description:

Geocaching is a form of Orienteering or 'treasure hunting' that is run and 
maintained by the players themselves. The players can put a "cache" wherever 
they think is appropriate and set a location to it online, others can go visit 
it and usually leave notes for the next visitors.

#### Aurelia Client

The [Aurelia](http://aurelia.io/) framework was used to create this asynchronus 
web client and was written in [TypeScript](https://www.typescriptlang.org/). It 
connects to the [Geo Web App API](https://github.com/NGrant92/geo-web-app) to 
perform CRUD on the Mongo Database stored on mlab.

Features:

    * Login/Signup:
        * A user can login/signup through the API
        * Passwords are encrypted for security purposes
    
    * Post Message:
        * A user can post a message that is viewable to all
        * Message Post can contain images

    * Add Caches:
        * A user can post a cache that is viewable to all
        * Caches store GPS information
    
    * Followers:
        * A user can follow/unfollow another user
        * User has a timeline of Messages Posts and Caches that shows posts/caches from people they're following
    
    *JWT:
        * JSON Web Tokens are required by most of the API functions
        * Encrypted Cookies that store User ID and Email
        * Protects against certain security threats such as Meet in the Middle attacks


#### Preloaded Accounts:

##### Members:

    Email: homer@simpson.com
    Password: secret

    Email: marge@simpson.com
    Password: secret

    Email: bart@simpson.com
    Password: secret


#### Software Used:

- [Aurelia](http://aurelia.io/)
- [JWT](https://jwt.io/)
- [Webstorm](https://www.jetbrains.com/webstorm/)
- [BCrypt](https://www.npmjs.com/package/bcrypt)
- [Cloudinary](https://cloudinary.com/)
- [MLab](https://mlab.com/)
- [Semantic UI](https://semantic-ui.com/)
