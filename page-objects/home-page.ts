import { Page, expect, Locator } from "@playwright/test";


export default class HomePage_{
    // list elements
    readonly page:Page;
    readonly elements: Locator;


    constructor(page:Page){
        this.page = page;
        this.elements = page.getByRole('heading', {name: 'Elements'});

    }

    hehe = () => this.page.locator('aa');


    // list Elements
    async gotoElementPage(){
        await this.page.goto('https://demoqa.com/');
        await this.elements.click();
        await this.hehe.click();
        // await this.
    }


}