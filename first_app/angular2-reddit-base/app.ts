/// <reference path="node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from 'angular2/platform/browser'; // relative import for resolving modules 
import { Component } from 'angular2/core'; // relative import for resolving modules

//Notice that we have used backTicks to have multiline string statements in template
@Component ({
    selector: 'hello-world',
    template: `<div>                     
    Welcome {{name}} to Angular 2 world 
    </div>`
    
})

/**
 * HelloWorld
 */
class HelloWorld {
    name : string
    constructor() {
        this.name = 'Nimay'
    }
}

bootstrap(HelloWorld);