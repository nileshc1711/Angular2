System.register(['angular2/platform/browser', 'angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1;
    var Article, ArtileComponent, RedditApp;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ///Data-Objects -start
            Article = (function () {
                function Article(title, link, votes) {
                    this.votes = votes || 0;
                    this.title = title;
                    this.link = link;
                }
                Article.prototype.voteUp = function () {
                    this.votes += 1;
                };
                Article.prototype.voteDown = function () {
                    this.votes -= 1;
                };
                Article.prototype.domain = function () {
                    try {
                        var link = this.link.split('//')[1];
                        return link.split('/')[0];
                    }
                    catch (error) {
                        return null;
                    }
                };
                return Article;
            })();
            ///Data-Objects -end
            ///Articles Component - start
            ArtileComponent = (function () {
                function ArtileComponent() {
                    // this.article = new Article('Angular 2','http://angular.io',10); // NO Longer needed as the Initailiazation is done 
                    // in Parent COmponent
                }
                ArtileComponent.prototype.voteUp = function () {
                    this.article.voteUp();
                    return false;
                };
                ArtileComponent.prototype.voteDown = function () {
                    this.article.voteDown();
                    return false;
                };
                ArtileComponent = __decorate([
                    core_1.Component({
                        selector: 'reddit-article',
                        inputs: ['article'],
                        host: {
                            class: 'row'
                        },
                        template: "\n    <div class=\"four wide column center aligned votes\">\n    <div class=\"ui statistic\">\n    <div class=\"value\">{{article.votes}}</div>\n    <div class=\"label\"> Points</div>\n    </div>\n    </div>\n    <div class=\"twelve wide column\">\n    <a class=\"ui large header\" href=\"{{article.link}}\">{{article.title}}</a>\n    <div class=\"meta\">({{ article.domain() }})</div>\n    <ul class=\"ui big horizontal list voters\">\n    <li class=\"item\">\n    <a href (click)=\"voteUp()\">\n    <i class=\"arrow up icon\"></i>\n    upvote\n    </a>\n    </li>\n    <li class=\"item\">\n    <a href (click)=\"voteDown()\">\n    <i class=\"arrow down icon\"></i>\n    downvote\n    </a>\n    </li>\n    </ul>\n    </div>\n\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ArtileComponent);
                return ArtileComponent;
            })();
            ///Articles Component - end
            ///Main App Component - start
            RedditApp = (function () {
                function RedditApp() {
                    this.articles = [
                        new Article('Angular 2', 'http://angular.io', 6),
                        new Article('Fullstack', 'http://fullstack.io', 2),
                        new Article('Angular Homepage', 'http://angular.io', 5)
                    ];
                }
                RedditApp.prototype.addArticle = function (title, link) {
                    console.log("Adding article title: " + title.value + "  and link : " + link.value);
                    if (title.value)
                        this.articles.push(new Article(title.value, link.value, 0));
                    title.value = '';
                    link.value = '';
                };
                RedditApp.prototype.sortedArticles = function () {
                    return this.articles.sort(function (a, b) { return b.votes - a.votes; });
                };
                RedditApp = __decorate([
                    core_1.Component({
                        selector: 'reddit-app',
                        directives: [ArtileComponent],
                        template: "<form class=\"ui large form segment\">\n <h3 class=\"ui header\">Add a Link</h3>\n\n <div class=\"field\">\n <label for=\"title\">Title:</label>\n <input name=\"title\" #newtitle> <!--The #newtitle syntax is used to bind input elements to the value variables-->\n </div>\n <div class=\"field\">\n <label for=\"link\">Link:</label>\n <input name=\"link\" #newlink> <!--The #newlink syntax is used to bind input elements to the value variables-->\n </div>\n <button (click)=\"addArticle(newtitle,newlink)\" class=\"ui positive right floated button\" >\n Submit Link\n </button>\n </form>\n<div class=\"ui grid posts\">\n<reddit-article\n*ngFor=\"#article of sortedArticles()\" [article]=\"article\">\n\n</reddit-article>\n</div>\n\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], RedditApp);
                return RedditApp;
            })();
            ///Main App Component - end
            browser_1.bootstrap(RedditApp);
        }
    }
});
//bootstrap(ArtileComponent); 
//# sourceMappingURL=RedditApp.js.map