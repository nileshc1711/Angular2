/// <reference path="node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from 'angular2/platform/browser'; // relative import for resolving modules 
import { Component } from 'angular2/core'; // relative import for resolving modules

///Data-Objects -start
class Article {
    votes: number;
    title: string;
    link: string;
    constructor(title: string, link: string, votes?: number) {
        this.votes = votes || 0;
        this.title = title;
        this.link = link;

    }

    voteUp(): void {
        this.votes += 1;
    }


    voteDown(): void {
        this.votes -= 1;
    }

    domain(): string {
        try {
            const link: string = this.link.split('//')[1];
            return link.split('/')[0];
        } catch (error) {
            return null;
        }

    }

}


///Data-Objects -end


///Articles Component - start
@Component({
    selector: 'reddit-article',
    inputs: ['article'],
    host: {
        class: 'row'
    },
    template: `
    <div class="four wide column center aligned votes">
    <div class="ui statistic">
    <div class="value">{{article.votes}}</div>
    <div class="label"> Points</div>
    </div>
    </div>
    <div class="twelve wide column">
    <a class="ui large header" href="{{article.link}}">{{article.title}}</a>
    <div class="meta">({{ article.domain() }})</div>
    <ul class="ui big horizontal list voters">
    <li class="item">
    <a href (click)="voteUp()">
    <i class="arrow up icon"></i>
    upvote
    </a>
    </li>
    <li class="item">
    <a href (click)="voteDown()">
    <i class="arrow down icon"></i>
    downvote
    </a>
    </li>
    </ul>
    </div>

    `

})

class ArtileComponent {
    article: Article
    constructor() {
        // this.article = new Article('Angular 2','http://angular.io',10); // NO Longer needed as the Initailiazation is done 
        // in Parent COmponent

    }
    voteUp(): boolean {
        this.article.voteUp();
        return false;
    }
    voteDown(): boolean {
        this.article.voteDown();
        return false;
    }
}

///Articles Component - end




///Main App Component - start
@Component({
    selector: 'reddit-app',
    directives: [ArtileComponent],
    template: `<form class="ui large form segment">
 <h3 class="ui header">Add a Link</h3>

 <div class="field">
 <label for="title">Title:</label>
 <input name="title" #newtitle> <!--The #newtitle syntax is used to bind input elements to the value variables-->
 </div>
 <div class="field">
 <label for="link">Link:</label>
 <input name="link" #newlink> <!--The #newlink syntax is used to bind input elements to the value variables-->
 </div>
 <button (click)="addArticle(newtitle,newlink)" class="ui positive right floated button" >
 Submit Link
 </button>
 </form>
<div class="ui grid posts">
<reddit-article
*ngFor="#article of sortedArticles()" [article]="article">

</reddit-article>
</div>

    `
})

/**
 * RedditApp
 */
class RedditApp {

    articles: Article[];
    constructor() {
        this.articles = [
            new Article('Angular 2', 'http://angular.io', 6),
            new Article('Fullstack', 'http://fullstack.io', 2),
            new Article('Angular Homepage', 'http://angular.io', 5)
        ];

    }
    addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
        console.log(`Adding article title: ${title.value}  and link : ${link.value}`);
        if (title.value)
            this.articles.push(new Article(title.value, link.value, 0));
        title.value = '';
        link.value = '';
    }
    sortedArticles(): Article[] {
        return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
    }

}

///Main App Component - end
bootstrap(RedditApp);
//bootstrap(ArtileComponent);