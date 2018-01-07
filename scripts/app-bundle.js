var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "./services/messages", "./services/geo-service"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, messages_1, geo_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let App = class App {
        constructor(au, ea, gs) {
            this.au = au;
            this.gs = gs;
            ea.subscribe(messages_1.LoginStatus, msg => {
                this.router.navigate('/', { replace: true, trigger: false });
                this.router.reset();
                if (msg.status === true) {
                    au.setRoot('home');
                }
                else {
                    au.setRoot('app');
                }
            });
        }
        configureRouter(config, router) {
            config.map([
                {
                    route: ['', 'login'],
                    name: 'login',
                    moduleId: 'components/login',
                    nav: true,
                    title: 'Login',
                },
                {
                    route: 'signup',
                    name: 'signup',
                    moduleId: 'components/signup',
                    nav: true,
                    title: 'Signup',
                },
            ]);
            this.router = router;
        }
        attached() {
            if (this.gs.isAuthenticated()) {
                this.au.setRoot('home').then(() => {
                    this.router.navigateToRoute('dashboard');
                });
            }
        }
    };
    App = __decorate([
        aurelia_framework_1.inject(aurelia_framework_1.Aurelia, aurelia_event_aggregator_1.EventAggregator, geo_service_1.GeoService),
        __metadata("design:paramtypes", [aurelia_framework_1.Aurelia, aurelia_event_aggregator_1.EventAggregator, geo_service_1.GeoService])
    ], App);
    exports.App = App;
});



define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});



define('home',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Home {
        configureRouter(config, router) {
            config.map([
                {
                    route: ['', 'home'],
                    name: 'dashboard',
                    moduleId: 'components/dashboard',
                    nav: true,
                    title: 'Home',
                },
                {
                    route: 'logout',
                    name: 'logout',
                    moduleId: 'components/logout',
                    nav: true,
                    title: 'Logout',
                },
                {
                    route: 'viewuser/:userid',
                    name: 'viewuser',
                    moduleId: 'components/dashboard-view-user',
                    nav: false,
                    title: 'View User',
                },
            ]);
            this.router = router;
        }
    }
    exports.Home = Home;
});



define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(() => aurelia.setRoot());
    }
    exports.configure = configure;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/add-cache',["require", "exports", "aurelia-framework", "../services/geo-service"], function (require, exports, aurelia_framework_1, geo_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let AddCache = class AddCache {
        constructor(gs) {
            this.name = 'Under the Tree';
            this.location = 'At Spar';
            this.latitude = '11';
            this.longitude = '22';
            this.description = 'Just like the jingle';
            this.geoService = gs;
        }
        addCache() {
            this.geoService.addCache(this.name, this.location, parseInt(this.latitude), parseInt(this.longitude), this.description);
        }
    };
    AddCache = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService),
        __metadata("design:paramtypes", [geo_service_1.GeoService])
    ], AddCache);
    exports.AddCache = AddCache;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/add-message',["require", "exports", "aurelia-framework", "../services/geo-service"], function (require, exports, aurelia_framework_1, geo_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let AddMessage = class AddMessage {
        constructor(gs) {
            this.message = '';
            this.image = [];
            this.geoService = gs;
        }
        addMessagePost() {
            const reader = new window.FileReader();
            reader.onload = () => {
                let file = reader.result;
                this.geoService.addMessagePost(this.message, file);
            };
            if (this.image[0]) {
                reader.readAsDataURL(this.image[0]);
            }
            else {
                this.geoService.addMessagePost(this.message, null);
            }
        }
    };
    AddMessage = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService),
        __metadata("design:paramtypes", [geo_service_1.GeoService])
    ], AddMessage);
    exports.AddMessage = AddMessage;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/dashboard-view-user',["require", "exports", "jquery", "aurelia-framework", "../services/geo-service"], function (require, exports, $, aurelia_framework_1, geo_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let DashboardViewUser = class DashboardViewUser {
        constructor(gs) {
            this.geoService = gs;
            this.geoService.getMessagePosts();
            this.geoService.getCaches();
            this.geoService.getUsers();
        }
        attached() {
            $(document).ready(function () {
                $('.menu .item').tab({ history: false });
            });
        }
        activate(params) {
            this.geoService.getUser(params.userid);
        }
    };
    DashboardViewUser = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService),
        __metadata("design:paramtypes", [geo_service_1.GeoService])
    ], DashboardViewUser);
    exports.DashboardViewUser = DashboardViewUser;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/dashboard',["require", "exports", "jquery", "aurelia-framework", "../services/geo-service"], function (require, exports, $, aurelia_framework_1, geo_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Dashboard = class Dashboard {
        constructor(gs) {
            this.geoService = gs;
            this.geoService.getLoggedUser();
            this.geoService.getMessagePosts();
            this.geoService.getCaches();
            this.geoService.getFolloweeCaches();
            this.geoService.getFolloweeMessages();
            this.geoService.getUsers();
        }
        attached() {
            $(document).ready(function () {
                $('.menu .item').tab({ history: false });
            });
        }
    };
    Dashboard = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService),
        __metadata("design:paramtypes", [geo_service_1.GeoService])
    ], Dashboard);
    exports.Dashboard = Dashboard;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/list-all-caches',["require", "exports", "aurelia-framework", "../services/geo-service", "aurelia-event-aggregator", "../services/messages"], function (require, exports, aurelia_framework_1, geo_service_1, aurelia_event_aggregator_1, messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ListAllCaches = class ListAllCaches {
        constructor(gs, ea) {
            this.geoService = gs;
            ea.subscribe(messages_1.Caches, msg => {
                this.allCaches = msg.cacheList;
            });
        }
    };
    ListAllCaches = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator),
        __metadata("design:paramtypes", [geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator])
    ], ListAllCaches);
    exports.ListAllCaches = ListAllCaches;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/list-all-messages',["require", "exports", "aurelia-framework", "../services/geo-service", "aurelia-event-aggregator", "../services/messages"], function (require, exports, aurelia_framework_1, geo_service_1, aurelia_event_aggregator_1, messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ListAllMessages = class ListAllMessages {
        constructor(gs, ea) {
            this.geoService = gs;
            ea.subscribe(messages_1.MessagePosts, msg => {
                this.allMessagePosts = msg.messageList;
            });
        }
    };
    ListAllMessages = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator),
        __metadata("design:paramtypes", [geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator])
    ], ListAllMessages);
    exports.ListAllMessages = ListAllMessages;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/list-followee-caches',["require", "exports", "aurelia-framework", "../services/geo-service", "aurelia-event-aggregator", "../services/messages"], function (require, exports, aurelia_framework_1, geo_service_1, aurelia_event_aggregator_1, messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ListUserCaches = class ListUserCaches {
        constructor(gs, ea) {
            this.geoService = gs;
            ea.subscribe(messages_1.FolloweeCaches, msg => {
                this.followeeCaches = msg.followeeCaches;
            });
        }
    };
    ListUserCaches = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator),
        __metadata("design:paramtypes", [geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator])
    ], ListUserCaches);
    exports.ListUserCaches = ListUserCaches;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/list-followee-messages',["require", "exports", "aurelia-framework", "../services/geo-service", "aurelia-event-aggregator", "../services/messages"], function (require, exports, aurelia_framework_1, geo_service_1, aurelia_event_aggregator_1, messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ListUserCaches = class ListUserCaches {
        constructor(gs, ea) {
            this.geoService = gs;
            ea.subscribe(messages_1.FolloweeMessages, msg => {
                this.followeeMessages = msg.followeeMessages;
            });
        }
    };
    ListUserCaches = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator),
        __metadata("design:paramtypes", [geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator])
    ], ListUserCaches);
    exports.ListUserCaches = ListUserCaches;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/list-user-caches',["require", "exports", "aurelia-framework", "../services/geo-service", "aurelia-event-aggregator", "../services/messages"], function (require, exports, aurelia_framework_1, geo_service_1, aurelia_event_aggregator_1, messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ListUserCaches = class ListUserCaches {
        constructor(gs, ea) {
            this.userCaches = [];
            this.geoService = gs;
            ea.subscribe(messages_1.Caches, msg => {
                this.userCaches = [];
                msg.cacheList.forEach(cache => {
                    if (cache.user._id === this.geoService.foundUser._id) {
                        this.userCaches.push(cache);
                    }
                });
            });
            ea.subscribe(messages_1.GetUser, msg => {
                this.userCaches = [];
                this.geoService.caches.forEach(post => {
                    if (post.user._id === this.geoService.foundUser._id) {
                        this.userCaches.push(post);
                    }
                });
            });
        }
    };
    ListUserCaches = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator),
        __metadata("design:paramtypes", [geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator])
    ], ListUserCaches);
    exports.ListUserCaches = ListUserCaches;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/list-user-followers',["require", "exports", "aurelia-framework", "../services/geo-service", "aurelia-event-aggregator", "../services/messages"], function (require, exports, aurelia_framework_1, geo_service_1, aurelia_event_aggregator_1, messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ProfileCard = class ProfileCard {
        constructor(gs, ea) {
            this.geoService = gs;
            ea.subscribe(messages_1.CurrUserFollowers, msg => {
                this.followerList = msg.followerList;
            });
        }
    };
    ProfileCard = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator),
        __metadata("design:paramtypes", [geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator])
    ], ProfileCard);
    exports.ProfileCard = ProfileCard;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/list-user-messages',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../services/geo-service", "../services/messages"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, geo_service_1, messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ListUserMessages = class ListUserMessages {
        constructor(gs, ea) {
            this.userMessagePosts = [];
            this.geoService = gs;
            ea.subscribe(messages_1.MessagePosts, msg => {
                this.userMessagePosts = [];
                msg.messageList.forEach(post => {
                    if (post.user._id === this.geoService.foundUser._id) {
                        this.userMessagePosts.push(post);
                    }
                });
            });
            ea.subscribe(messages_1.GetUser, msg => {
                this.userMessagePosts = [];
                this.geoService.messagePosts.forEach(post => {
                    if (post.user._id === this.geoService.foundUser._id) {
                        this.userMessagePosts.push(post);
                    }
                });
            });
        }
    };
    ListUserMessages = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator),
        __metadata("design:paramtypes", [geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator])
    ], ListUserMessages);
    exports.ListUserMessages = ListUserMessages;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/list-users',["require", "exports", "aurelia-framework", "../services/geo-service", "aurelia-event-aggregator", "../services/messages"], function (require, exports, aurelia_framework_1, geo_service_1, aurelia_event_aggregator_1, messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ListUserMessages = class ListUserMessages {
        constructor(gs, ea) {
            this.userList = new Map();
            this.geoService = gs;
            ea.subscribe(messages_1.Users, msg => {
                const users = msg.userMap;
                users.forEach(user => {
                    if (!user.admin) {
                        this.userList.set(user.email.toString(), user);
                    }
                });
            });
        }
    };
    ListUserMessages = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator),
        __metadata("design:paramtypes", [geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator])
    ], ListUserMessages);
    exports.ListUserMessages = ListUserMessages;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/login',["require", "exports", "aurelia-framework", "../services/geo-service"], function (require, exports, aurelia_framework_1, geo_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Login = class Login {
        constructor(gs) {
            this.email = 'homer@simpson.com';
            this.password = 'secret';
            this.geoService = gs;
        }
        login(e) {
            console.log(`Trying to log in ${this.email}`);
            this.geoService.login(this.email, this.password);
        }
    };
    Login = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService),
        __metadata("design:paramtypes", [geo_service_1.GeoService])
    ], Login);
    exports.Login = Login;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/logout',["require", "exports", "../services/geo-service", "aurelia-framework"], function (require, exports, geo_service_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Logout = class Logout {
        constructor(geoService) {
            this.geoService = geoService;
        }
        logout() {
            console.log('logging out');
            this.geoService.logout();
        }
    };
    Logout = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService),
        __metadata("design:paramtypes", [geo_service_1.GeoService])
    ], Logout);
    exports.Logout = Logout;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/profile-card',["require", "exports", "aurelia-framework", "../services/geo-service", "aurelia-event-aggregator", "../services/messages"], function (require, exports, aurelia_framework_1, geo_service_1, aurelia_event_aggregator_1, messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ProfileCard = class ProfileCard {
        constructor(gs, ea) {
            this.user = null;
            this.isLoggedUser = false;
            this.isUserFollowing = false;
            this.geoService = gs;
            ea.subscribe(messages_1.GetUser, msg => {
                this.user = msg.foundUser;
                this.isLoggedUser = this.user._id === this.geoService.currUser._id;
                this.isUserFollowing = false;
                for (let followee of this.geoService.currUserFollowees) {
                    if (followee._id === this.user._id) {
                        return this.isUserFollowing = true;
                    }
                }
            });
            ea.subscribe(messages_1.CurrUserFollowers, msg => {
                this.followerList = msg.followerList;
            });
            ea.subscribe(messages_1.FoundUserFollowees, msg => {
                this.followeeList = msg.followeeList;
            });
        }
        addFollowing() {
            this.geoService.addFollower(this.user._id);
            this.isUserFollowing = true;
        }
        removeFollowing() {
            this.geoService.removeFollower(this.user._id);
            this.isUserFollowing = false;
        }
    };
    ProfileCard = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator),
        __metadata("design:paramtypes", [geo_service_1.GeoService, aurelia_event_aggregator_1.EventAggregator])
    ], ProfileCard);
    exports.ProfileCard = ProfileCard;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/signup',["require", "exports", "aurelia-framework", "../services/geo-service"], function (require, exports, aurelia_framework_1, geo_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Signup = class Signup {
        constructor(gs) {
            this.firstName = 'Lisa';
            this.lastName = 'Simpson';
            this.email = 'lisa@simpson.com';
            this.password = 'secret';
            this.geoService = gs;
        }
        register(e) {
            this.geoService.addUser(this.firstName, this.lastName, this.email, this.password);
            this.geoService.login(this.email, this.password);
        }
    };
    Signup = __decorate([
        aurelia_framework_1.inject(geo_service_1.GeoService),
        __metadata("design:paramtypes", [geo_service_1.GeoService])
    ], Signup);
    exports.Signup = Signup;
});



define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('services/async-http-client',["require", "exports", "aurelia-framework", "aurelia-http-client", "aurelia-event-aggregator", "./messages", "./fixtures"], function (require, exports, aurelia_framework_1, aurelia_http_client_1, aurelia_event_aggregator_1, messages_1, fixtures_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let AsyncHttpClient = class AsyncHttpClient {
        constructor(httpClient, fixtures, ea) {
            this.http = httpClient;
            this.http.configure(http => {
                http.withBaseUrl(fixtures.baseUrl);
            });
            this.ea = ea;
        }
        get(url) {
            return this.http.get(url);
        }
        post(url, obj) {
            return this.http.post(url, obj);
        }
        delete(url) {
            return this.http.delete(url);
        }
        authenticate(url, credentials) {
            this.http
                .post(url, credentials)
                .then(response => {
                const status = response.content;
                if (status.success) {
                    localStorage.geo = JSON.stringify(response.content);
                    this.http.configure(configuration => {
                        configuration.withHeader('Authorization', 'bearer ' + response.content.token);
                    });
                }
                this.ea.publish(new messages_1.LoginStatus(true));
            })
                .catch(error => {
                this.ea.publish(new messages_1.LoginStatus(false, 'service not available'));
            });
        }
        isAuthenticated() {
            let authenticated = false;
            if ("geo" in localStorage && localStorage.geo !== 'null') {
                authenticated = true;
                this.http.configure(http => {
                    const auth = JSON.parse(localStorage.geo);
                    http.withHeader('Authorization', 'bearer ' + auth.token);
                });
            }
            return authenticated;
        }
        clearAuthentication() {
            localStorage.geo = null;
            this.http.configure(configuration => {
                configuration.withHeader('Authorization', '');
            });
        }
    };
    AsyncHttpClient = __decorate([
        aurelia_framework_1.inject(aurelia_http_client_1.HttpClient, fixtures_1.default, aurelia_event_aggregator_1.EventAggregator),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], AsyncHttpClient);
    exports.default = AsyncHttpClient;
});



define('services/fixtures',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Fixtures {
        constructor() {
            this.baseUrl = 'https://afternoon-peak-51691.herokuapp.com';
        }
    }
    exports.default = Fixtures;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('services/geo-service',["require", "exports", "aurelia-framework", "./fixtures", "./async-http-client", "aurelia-event-aggregator", "./messages", "./messages"], function (require, exports, aurelia_framework_1, fixtures_1, async_http_client_1, aurelia_event_aggregator_1, messages_1, messages_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let GeoService = class GeoService {
        constructor(data, ea, ac) {
            this.users = new Map();
            this.caches = [];
            this.messagePosts = [];
            this.ea = ea;
            this.ac = ac;
        }
        getLoggedUser() {
            this.ac.get("/api/users/current").then(res => {
                const content = res.content;
                this.currUser = content;
                this.foundUser = content;
                this.getFollowers(content._id);
                this.getFollowees(content._id);
                this.getCurrUserFollowees();
                console.log("got logged uer: " + this.currUser.firstName);
                this.ea.publish(new messages_1.GetUser(this.currUser));
            });
        }
        getUser(id) {
            this.ac.get("/api/users/" + id).then(res => {
                this.foundUser = res.content;
                this.getFollowers(id);
                this.getFollowees(id);
                console.log("User found: " + this.foundUser.firstName);
                this.ea.publish(new messages_1.GetUser(this.foundUser));
            });
        }
        getFollowers(id) {
            this.ac.get("/api/following/followers/" + id).then(res => {
                this.userFollowers = res.content;
                console.log("got user followers");
                this.ea.publish(new messages_2.CurrUserFollowers(this.userFollowers));
            });
        }
        getFollowees(id) {
            this.ac.get("/api/following/followees/" + id).then(res => {
                this.foundUserFollowees = res.content;
                console.log("got user followers");
                this.ea.publish(new messages_2.FoundUserFollowees(this.foundUserFollowees));
            });
        }
        getCurrUserFollowees() {
            this.ac.get("/api/following/followees/" + this.currUser._id).then(res => {
                this.currUserFollowees = res.content;
                console.log("got user followers");
                this.ea.publish(new messages_1.CurrUserFollowees(this.currUserFollowees));
            });
        }
        getUsers() {
            this.ac.get("/api/users").then(res => {
                const users = res.content;
                users.forEach(user => {
                    this.users.set(user.email.toString(), user);
                });
                this.ea.publish(new messages_1.Users(this.users));
            });
        }
        getCaches() {
            this.ac.get("/api/caches").then(res => {
                this.caches = res.content;
                console.log("caches retrieved");
                this.ea.publish(new messages_2.Caches(this.caches));
            });
        }
        getFolloweeCaches() {
            this.ac.get("/api/caches/following").then(res => {
                console.log("followee caches retrieved");
                this.ea.publish(new messages_1.FolloweeCaches(res.content));
            });
        }
        getFolloweeMessages() {
            this.ac.get("/api/messages/following").then(res => {
                console.log("followee messages retrieved");
                this.ea.publish(new messages_1.FolloweeMessages(res.content));
            });
        }
        getMessagePosts() {
            this.ac.get("/api/messages").then(res => {
                this.messagePosts = res.content;
                console.log("messages retrieved");
                this.ea.publish(new messages_2.MessagePosts(this.messagePosts));
            });
        }
        addFollower(followeeId) {
            const following = {
                follower: this.currUser._id,
                followee: followeeId
            };
            this.ac
                .post("/api/following", following)
                .then(res => {
                this.userFollowers.push(res.content.follower);
                console.log("follower added");
                this.ea.publish(new messages_2.CurrUserFollowers(this.userFollowers));
                this.currUserFollowees.push(res.content.followee);
                this.ea.publish(new messages_1.CurrUserFollowees(this.currUserFollowees));
            })
                .catch(err => {
                console.log(err);
            });
            this.getFolloweeCaches();
        }
        removeFollower(followeeId) {
            this.ac
                .delete("/api/following/" + followeeId)
                .then(res => {
                this.getCurrUserFollowees();
                this.getFollowers(followeeId);
                console.log("Unfollowed person");
            })
                .catch(err => {
                console.log(err);
            });
            this.getFolloweeCaches();
        }
        addMessagePost(newMessage, newImage) {
            const newMessagePost = {
                message: newMessage,
                img: newImage
            };
            this.ac
                .post("/api/messages", newMessagePost)
                .then(res => {
                this.messagePosts.unshift(res.content);
                console.log("Message successfully posted");
                this.ea.publish(new messages_2.MessagePosts(this.messagePosts));
            })
                .catch(err => {
                console.log(err);
            });
        }
        addCache(newName, newLocation, newLat, newLong, newDesc) {
            const newCache = {
                name: newName,
                location: newLocation,
                latitude: newLat,
                longitude: newLong,
                description: newDesc
            };
            this.ac
                .post("/api/caches", newCache)
                .then(res => {
                this.caches.unshift(res.content);
                console.log(`${newName} added successfully`);
                this.ea.publish(new messages_2.Caches(this.caches));
            })
                .catch(err => {
                console.log(err);
            });
        }
        addUser(newFirstName, newLastName, newEmail, newPassword) {
            const newUser = {
                firstName: newFirstName,
                lastName: newLastName,
                email: newEmail,
                password: newPassword,
                img: "http://res.cloudinary.com/ngrant/image/upload/v1513088924/white-pin-green-back_iy4fax.png",
                admin: false
            };
            this.ac
                .post("/api/users", newUser)
                .then(res => {
                this.users.set(res.content.email.toString(), res.content);
                this.ea.publish(new messages_1.Users(this.users));
                console.log(`${newFirstName} ${newLastName} added successfully`);
            })
                .catch(err => {
                console.log(err);
            });
        }
        login(email, password) {
            const user = {
                email: email,
                password: password
            };
            this.ac.authenticate("/api/users/authenticate", user);
            this.getLoggedUser();
            console.log(`User logged in`);
        }
        isAuthenticated() {
            return this.ac.isAuthenticated();
        }
        logout() {
            this.ac.clearAuthentication();
            this.ea.publish(new messages_1.LoginStatus(false));
            console.log(`User logged out`);
        }
    };
    GeoService = __decorate([
        aurelia_framework_1.inject(fixtures_1.default, aurelia_event_aggregator_1.EventAggregator, async_http_client_1.default),
        __metadata("design:paramtypes", [fixtures_1.default, aurelia_event_aggregator_1.EventAggregator, async_http_client_1.default])
    ], GeoService);
    exports.GeoService = GeoService;
});



define('services/messages',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoginStatus {
        constructor(status, loginMessage = '') {
            this.status = status;
            this.loginMessage = loginMessage;
        }
    }
    exports.LoginStatus = LoginStatus;
    class MessagePosts {
        constructor(messageList) {
            this.messageList = messageList;
            console.log("EA MessageList published");
        }
    }
    exports.MessagePosts = MessagePosts;
    class CurrUserFollowers {
        constructor(followerList) {
            this.followerList = followerList;
            console.log("EA followerList published");
        }
    }
    exports.CurrUserFollowers = CurrUserFollowers;
    class CurrUserFollowees {
        constructor(followeeList) {
            this.followeeList = followeeList;
            console.log("EA current user followeeList published");
        }
    }
    exports.CurrUserFollowees = CurrUserFollowees;
    class FoundUserFollowees {
        constructor(followeeList) {
            this.followeeList = followeeList;
            console.log("EA found user followeeList published");
        }
    }
    exports.FoundUserFollowees = FoundUserFollowees;
    class CurrentUser {
        constructor(currUser) {
            this.currUser = currUser;
            console.log("EA CurrUser published");
        }
    }
    exports.CurrentUser = CurrentUser;
    class GetUser {
        constructor(foundUser) {
            this.foundUser = foundUser;
            console.log("EA viewUser published");
        }
    }
    exports.GetUser = GetUser;
    class Caches {
        constructor(cacheList) {
            this.cacheList = cacheList;
            console.log("EA CacheList published");
        }
    }
    exports.Caches = Caches;
    class FolloweeCaches {
        constructor(followeeCaches) {
            this.followeeCaches = followeeCaches;
            console.log("EA followeeCaches published");
        }
    }
    exports.FolloweeCaches = FolloweeCaches;
    class FolloweeMessages {
        constructor(followeeMessages) {
            this.followeeMessages = followeeMessages;
            console.log("EA followeeMessages published");
        }
    }
    exports.FolloweeMessages = FolloweeMessages;
    class Users {
        constructor(userMap) {
            this.userMap = new Map();
            const users = userMap;
            users.forEach(user => {
                if (!user.admin) {
                    this.userMap.set(user.email.toString(), user);
                }
            });
            console.log("EA Userlist published");
        }
    }
    exports.Users = Users;
});



define('services/models',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});



define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"components/nav-bar.html\"></require><div class=\"ui container page-host\"><nav-bar router.bind=\"router\"></nav-bar><router-view></router-view></div></template>"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template><require from=\"components/nav-bar.html\"></require><div class=\"ui container page-host\"><nav-bar router.bind=\"router\"></nav-bar><router-view></router-view></div></template>"; });
define('text!components/add-cache.html', ['module'], function(module) { module.exports = "<template><form submit.trigger=\"addCache()\" class=\"ui form\"><div class=\"two fields\"><div class=\"field\"><label>Name</label><input type=\"text\" value.bind=\"name\" required></div><div class=\"field\"><label>Location</label><input type=\"text\" value.bind=\"location\" required></div></div><div class=\"two fields\"><div class=\"field\"><label>Latitude</label><input type=\"number\" value.bind=\"latitude\" required></div><div class=\"field\"><label>Longitude</label><input type=\"number\" value.bind=\"longitude\" required></div></div><div class=\"field\"><label>Description</label><textarea value.bind=\"description\" rows=\"2\" maxlength=\"140\" placeholder=\"Description here...\" required>Test Description</textarea></div><button class=\"ui blue submit button\" style=\"background-color:#16551c\"><i class=\"edit icon\"></i>Add Cache</button></form></template>"; });
define('text!components/add-message.html', ['module'], function(module) { module.exports = "<template><form submit.trigger=\"addMessagePost()\" class=\"ui form\"><div class=\"field\"><label>Description</label><textarea value.bind=\"message\" rows=\"4\" maxlength=\"140\" placeholder=\"Description here...\" required>Test Description</textarea></div><div class=\"field\"><label>Image</label><input type=\"file\" accept=\"image/*\" files.bind=\"image\"></div><button class=\"ui blue submit button\" style=\"background-color:#16551c\"><i class=\"edit icon\"></i>Post</button></form></template>"; });
define('text!components/dashboard-view-user.html', ['module'], function(module) { module.exports = "<template><div class=\"ui equal width padded grid\"><div class=\"four wide column\"><compose view-model=\"./profile-card\"></compose></div><div class=\"eight wide align right column\"><section class=\"ui segment\" id=\"timelineTabs\" style=\"overflow:auto;max-height:1200px;min-height:200px\"><h3 class=\"ui dividing header\">Activity</h3><div class=\"ui pointing secondary demo menu\"><a class=\"active item\" data-tab=\"timelinefirst\"><i class=\"users icon\"></i>Messages</a> <a class=\"item\" data-tab=\"timelinesecond\"><i class=\"marker icon\"></i>Caches</a></div><div class=\"ui active tab\" data-tab=\"timelinefirst\" style=\"padding:10px\"><compose view-model=\"./list-user-messages\"></compose></div><div class=\"ui tab\" data-tab=\"timelinesecond\" style=\"padding:10px\"><compose view-model=\"./list-user-caches\"></compose></div></section></div><div class=\"four wide align right column padded\"><section class=\"ui raised segment\" id=\"userlistTabs\"><div class=\"ui pointing secondary demo menu\"><a class=\"active item\" data-tab=\"userfirst\"><i class=\"users icon\"></i>Followers</a> <a class=\"item\" data-tab=\"usersecond\"><i class=\"world icon\"></i>All Users</a></div><div class=\"ui active tab\" data-tab=\"userfirst\" style=\"padding:10px\"><compose view-model=\"./list-user-followers\"></compose></div><div class=\"ui tab\" data-tab=\"usersecond\" style=\"padding:10px\"><compose view-model=\"./list-users\"></compose></div></section></div></div></template>"; });
define('text!components/dashboard.html', ['module'], function(module) { module.exports = "<template><div class=\"ui equal width padded grid\"><div class=\"four wide column\"><compose view-model=\"./profile-card\"></compose></div><div class=\"eight wide align right column\"><section class=\"ui segment\" id=\"postTabs\" style=\"overflow:auto;max-height:1200px;min-height:200px\"><h3 class=\"ui dividing header\">Post New Stuff!</h3><div class=\"ui pointing secondary demo menu\"><a class=\"active item\" data-tab=\"postfirst\"><i class=\"plus icon\"></i>Cache</a> <a class=\"item\" data-tab=\"postsecond\"><i class=\"plus icon\"></i>Message Post</a></div><div class=\"ui active tab\" data-tab=\"postfirst\" style=\"padding:10px\"><compose view-model=\"./add-cache\"></compose></div><div class=\"ui tab\" data-tab=\"postsecond\" style=\"padding:10px\"><compose view-model=\"./add-message\"></compose></div></section><section class=\"ui segment\" id=\"timelineParentTabs\" style=\"overflow:auto;max-height:1200px;min-height:200px\"><h3 class=\"ui dividing header\">Timeline</h3><div class=\"ui pointing secondary demo menu\"><a class=\"fluid active item\" data-tab=\"timelineparentfirst\"><i class=\"comments icon\"></i>Messages</a> <a class=\"fluid wide item\" data-tab=\"timelineparentsecond\"><i class=\"marker icon\"></i>Caches</a></div><div class=\"ui active tab\" data-tab=\"timelineparentfirst\" style=\"padding:10px\"><div class=\"ui pointing secondary demo menu\"><a class=\"active item\" data-tab=\"messagesfirst\"><i class=\"world icon\"></i>All Messages</a> <a class=\"item\" data-tab=\"messagessecond\"><i class=\"users icon\"></i>Following Messages</a> <a class=\"item\" data-tab=\"messagesthird\"><i class=\"user icon\"></i>My Messages</a></div><div class=\"ui active tab\" data-tab=\"messagesfirst\" style=\"padding:10px\"><compose view-model=\"./list-all-messages\"></compose></div><div class=\"ui tab\" data-tab=\"messagessecond\" style=\"padding:10px\"><compose view-model=\"./list-followee-messages\"></compose></div><div class=\"ui tab\" data-tab=\"messagesthird\" style=\"padding:10px\"><compose view-model=\"./list-user-messages\"></compose></div></div><div class=\"ui tab\" data-tab=\"timelineparentsecond\" style=\"padding:10px\"><div class=\"ui pointing secondary demo menu\"><a class=\"item\" data-tab=\"cachesfirst\"><i class=\"world icon\"></i>All Caches</a> <a class=\"item\" data-tab=\"cachessecond\"><i class=\"users icon\"></i>Following Caches</a> <a class=\"item\" data-tab=\"cachesthird\"><i class=\"user icon\"></i>My Caches</a></div><div class=\"ui active tab\" data-tab=\"cachesfirst\" style=\"padding:10px\"><compose view-model=\"./list-all-caches\"></compose></div><div class=\"ui tab\" data-tab=\"cachessecond\" style=\"padding:10px\"><compose view-model=\"./list-followee-caches\"></compose></div><div class=\"ui tab\" data-tab=\"cachesthird\" style=\"padding:10px\"><compose view-model=\"./list-user-caches\"></compose></div></div></section></div><div class=\"four wide align right column padded\"><section class=\"ui raised segment\" id=\"userlistTabs\"><div class=\"ui pointing secondary demo menu\"><a class=\"active item\" data-tab=\"userfirst\"><i class=\"users icon\"></i>Followers</a> <a class=\"item\" data-tab=\"usersecond\"><i class=\"world icon\"></i>All Users</a></div><div class=\"ui active tab\" data-tab=\"userfirst\" style=\"padding:10px\"><compose view-model=\"./list-user-followers\"></compose></div><div class=\"ui tab\" data-tab=\"usersecond\" style=\"padding:10px\"><compose view-model=\"./list-users\"></compose></div></section></div></div></template>"; });
define('text!components/list-all-caches.html', ['module'], function(module) { module.exports = "<template><div class=\"ui segment\" repeat.for=\"cache of allCaches\"><div class=\"ui items\"><div class=\"ui item\"><div class=\"content\"><div class=\"header\">${cache.name}</div><div class=\"description\"><p style=\"word-break:break-all;white-space:normal\">${cache.description}</p></div><div class=\"meta\"><span class=\"coords\">${cache.latitude}, ${cache.longitude}</span><span class=\"location\"><i class=\"grey marker icon\"></i>${cache.location}</span><span class=\"owner\"><i class=\"grey user icon\"></i>${cache.user.firstName} ${cache.user.lastName}</span></div></div></div></div></div></template>"; });
define('text!components/list-all-messages.html', ['module'], function(module) { module.exports = "<template><div class=\"ui segment\" repeat.for=\"post of allMessagePosts\"><div class=\"five wide item\"><img class=\"ui two wide avatar image\" src=\"${post.user.img}\"> <a class=\"Header\"> ${post.user.firstName} ${post.user.lastName}</a><p style=\"word-break:break-all;white-space:normal\">${post.message}</p><img class=\"ui ${post.img ? 'fluid' : 'hidden'} image\" src=\"${post.img}\"></div></div></template>"; });
define('text!components/list-followee-caches.html', ['module'], function(module) { module.exports = "<template><div class=\"ui segment\" repeat.for=\"cache of followeeCaches\"><div class=\"ui items\"><div class=\"ui item\"><div class=\"content\"><div class=\"header\">${cache.name}</div><div class=\"description\"><p style=\"word-break:break-all;white-space:normal\">${cache.description}</p></div><div class=\"meta\"><span class=\"coords\">${cache.latitude}, ${cache.longitude}</span><span class=\"location\"><i class=\"grey marker icon\"></i>${cache.location}</span><span class=\"owner\"><i class=\"grey user icon\"></i>${cache.user.firstName} ${cache.user.lastName}</span></div></div></div></div></div></template>"; });
define('text!components/list-followee-messages.html', ['module'], function(module) { module.exports = "<template><div class=\"ui segment\" repeat.for=\"post of followeeMessages\"><div class=\"five wide item\"><img class=\"ui two wide avatar image\" src=\"${post.user.img}\"> <a class=\"Header\"> ${post.user.firstName} ${post.user.lastName}</a><p style=\"word-break:break-all;white-space:normal\">${post.message}</p><img class=\"ui ${post.img ? 'fluid' : 'hidden'} image\" src=\"${post.img}\"></div></div></template>"; });
define('text!components/list-user-caches.html', ['module'], function(module) { module.exports = "<template><div class=\"ui segment\" repeat.for=\"cache of userCaches\"><div class=\"ui items\"><div class=\"ui item\"><div class=\"content\"><div class=\"header\">${cache.name}</div><div class=\"description\"><p style=\"word-break:break-all;white-space:normal\">${cache.description}</p></div><div class=\"meta\"><span class=\"coords\">${cache.latitude}, ${cache.longitude}</span><span class=\"location\"><i class=\"grey marker icon\"></i>${cache.location}</span><span class=\"owner\"><i class=\"grey user icon\"></i>${cache.user.firstName} ${cache.user.lastName}</span></div></div></div></div></div></template>"; });
define('text!components/list-user-followers.html', ['module'], function(module) { module.exports = "<template><div class=\"ui list\"><div id=\"list\" class=\"item\" repeat.for=\"follower of followerList\"><img class=\"ui avatar image\" src=\"${follower.img}\"><div class=\"content\"><a class=\"Header\" route-href=\"route: viewuser; params.bind: { userid:follower._id }\"> ${follower.firstName} ${follower.lastName}</a><a class=\"description\">${follower.email}</a></div></div></div></template>"; });
define('text!components/list-user-messages.html', ['module'], function(module) { module.exports = "<template><div class=\"ui segment\" repeat.for=\"post of userMessagePosts\"><div class=\"five wide item\"><img class=\"ui two wide avatar image\" src=\"${post.user.img}\"> <a class=\"Header\"> ${post.user.firstName} ${post.user.lastName}</a><p style=\"word-break:break-all;white-space:normal\">${post.message}</p><img class=\"ui ${post.img ? 'fluid' : 'hidden'} image\" src=\"${post.img}\"></div></div></template>"; });
define('text!components/list-users.html', ['module'], function(module) { module.exports = "<template><div class=\"ui list\"><div id=\"list\" class=\"item\" repeat.for=\"[id, user] of userList\"><img class=\"ui avatar image\" src=\"${user.img}\"><div class=\"content\"><a class=\"Header\" route-href=\"route: viewuser; params.bind: { userid:user._id }\"> ${user.firstName} ${user.lastName}</a><a class=\"description\">${user.email}</a></div></div></div></template>"; });
define('text!components/login.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"login($event)\" class=\"ui segment form\"><h3 class=\"ui header\">Login</h3><div class=\"field\"><label>Email</label><input placeholder=\"Email\" value.bind=\"email\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password\"></div><button class=\"ui blue submit button\" style=\"background-color:#16551c\">Login</button><h3>${prompt}</h3></form></template>"; });
define('text!components/logout.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"logout($event)\" class=\"ui segment form\"><h3 class=\"ui header\">Are you sure you want to log out?</h3><button class=\"ui blue submit button\" style=\"background-color:#16551c\">Logout</button></form></template>"; });
define('text!components/nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\"><nav class=\"ui inverted menu\" style=\"background-color:#16551c\"><header class=\"header item\"><a href=\"/\">Geo <i class=\"marker icon\"></i></a></header><div class=\"right menu\"><div repeat.for=\"row of router.navigation\"><a class=\"${row.isActive ? 'active' : ''} item\" href.bind=\"row.href\">${row.title}</a></div></div></nav></template>"; });
define('text!components/profile-card.html', ['module'], function(module) { module.exports = "<template><div class=\"ui card\"><div class=\"image\"><img src=\"${user.img}\"></div><div class=\"content\"><a class=\"header\">${user.firstName} ${user.lastName}</a><a class=\"header\"></a><div class=\"meta\"><span class=\"date\">Joined in 2017</span></div><table class=\"ui celled striped table\"><thead><tr><th colspan=\"2\">Details</th></tr></thead><tbody><tr><td class=\"collapsing\"><i class=\"at icon\"></i></td><td>${user.email}</td></tr><tr><td class=\"collapsing\"><i class=\"users icon\"></i></td><td>Followers: ${followerList.length} <br>Following: ${followeeList.length} </td></tr></tbody></table></div></div><div if.bind=\"!isLoggedUser\"><button if.bind=\"!isUserFollowing\" click.delegate=\"addFollowing()\" class=\"ui fluid blue submit button\" style=\"background-color:#16551c\"><i class=\"user icon\"></i>Follow</button> <button if.bind=\"isUserFollowing\" click.delegate=\"removeFollowing()\" class=\"ui fluid submit button\"><i class=\"user icon\"></i>Unfollow</button></div></template>"; });
define('text!components/signup.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"register($event)\" class=\"ui segment form\"><h3 class=\"ui header\">Register</h3><div class=\"two fields\"><div class=\"field\"><label>First Name</label><input placeholder=\"First Name\" type=\"text\" value.bind=\"firstName\"></div><div class=\"field\"><label>Last Name</label><input placeholder=\"Last Name\" type=\"text\" value.bind=\"lastName\"></div></div><div class=\"field\"><label>Email</label><input placeholder=\"Email\" type=\"text\" value.bind=\"email\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password\"></div><button class=\"ui blue submit button\" style=\"background-color:#16551c\">Submit</button></form></template>"; });
//# sourceMappingURL=app-bundle.js.map