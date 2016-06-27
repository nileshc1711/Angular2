/// <reference path="node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from 'angular2/platform/browser'; // relative import for resolving modules 
import { Component } from 'angular2/core'; // relative import for resolving modules

@Component({
    selector: 'reddit-app',
    template: `<form class="ui large form segment">
 <h3 class="ui header">Add a Link</h3>

 <div class="field">
 <label for="title">Title:</label>
 <input name="title">
 </div>
 <div class="field">
 <label for="link">Link:</label>
 <input name="link">
 </div>
 </form>
    `
})

/**
 * RedditApp
 */
class RedditApp {
    constructor() {
        
    }
}
bootstrap(RedditApp);