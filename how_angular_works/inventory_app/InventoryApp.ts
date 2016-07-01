import { Component, EventEmitter } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
/**
 * Product
 * The public keyword here says that there is a public variable on instances of this class
 */
class Product {
    constructor(public sku: string, public name: string, public imageUrl: string, public department: string[], public price: number) {

    }
}

///Product-Row Component-start
@Component({
    selector:'product-row',
    inputs:['product'],
    host:{
        'class':'item'
    },
    //directives:[ProductImage, ProductDepartment, PriceDisplay]
    template:`
    <product-image  [product]="product" ></product-image>
    <div class="content">
    <div class="header">{{ product.name }} </div>
    <div class="meta">
    <div class="product-sku">SKU # {{product.sku}} </div>
    </div>
    <div class=description>
    <product-department [product]="product" ></product-department>
    </div>
    </div>
    <price-display [price]="product.price"></price-display>
    `

})

class ProductRow {
    product: Product
}

///Product-Row Component-end


///ProductsList Component-start
/**
 * @ProductsList: A component for rendering all ProductRows and
 * storing the currently selected Product
 */
@Component({
    selector: 'product-list',
    directives: [ProductRow],
    inputs: ['productList'],
    outputs: ['onProductSelected'],
    template: `
    <div class="ui-items">
    <product-row   *ngFor="#myProduct of productList " [product]="myProduct"
    (click)="clicked(myProduct)" [class.selected]=isSelected(myProduct)>
    </product-row>
    </div>
    `
})
/**
 * ProductsList
 */
class ProductsList {
    productList: Product[];
    onProductSelected: EventEmitter<Product>;
    currentProduct: Product;
    constructor() {
        this.onProductSelected = new EventEmitter();
    }
    clicked(product: Product): void {
        this.currentProduct = product;
        this.onProductSelected.emit(product);
    }

    isSelected(product: Product): boolean {
        if (!product || !this.currentProduct)
            return false;

        return product.sku === this.currentProduct.sku;
    }
}

///ProductsList Component-end


///Top-Level Inventory-App Component
@Component({
    selector: 'inventory-app',
    directives: [ProductsList],
    template: `
    <div class="inventory-app">
    <product-list 
     [productList]="products" (onProductSelected)="ProductWasSelected($event)" >
    </product-list>
        <h1>{{ product.name }}</h1>
        <span> {{ product.sku }} </span>
    </div>
    `

})

class InventoryApp {
    products: Product[]
    constructor() {
        this.products = [
            new Product('NICEHAT', 'A Nice Black Hat',
                '/resources/images/products/black-hat.jpg',
                ['Men', 'Accessories', 'Hats'],
                29.99),
            new Product(
                'MYSHOES', 'Black Running Shoes',
                '/resources/images/products/black-shoes.jpg',
                ['Men', 'Shoes', 'Running Shoes'],
                109.99),
            new Product(
                'NEATOJACKET', 'Blue Jacket',
                '/resources/images/products/blue-jacket.jpg',
                ['Women', 'Apparel', 'Jackets & Vests'],
                238.99),
        ]
    }

    onProductWasSelected(product: Product): void {
        console.log('Product clicked ' + product);
    }

}


bootstrap(InventoryApp);