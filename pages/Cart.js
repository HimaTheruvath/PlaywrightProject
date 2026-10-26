const { expect } = require("@playwright/test")

class Cart{
    constructor(page){
        this.page = page
        this.product = page.getByRole("link",{name:'Samsung galaxy s6'})
        this.addBtn = page.getByRole("link", {name:'Add to cart'})
        this.cart = page.getByRole("link",{name:'Cart',exact:true})
        this.cartItem = page.locator('#tbodyid')
        this.phonesLink = page.getByRole("link",{name:'Phones'})
        this.phone = page.getByRole('link',{name:'Nexus 6'})
        this.placeOderBtn = page.getByRole("button",{name:'Place Order'})
        this.name = page.locator("#name")
        this.country = page.locator("#country")
        this.city = page.locator("#city")
        this.creditCard = page.locator("#card")
        this.month = page.locator("#month")
        this.year = page.locator("#year")
        this.purchaseBtn = page.getByRole("button",{name:'Purchase'})
        this.monitorsLink = page.getByRole("link", {name:'Monitors'})
        this.monitor = page.getByRole("link", {name:'Apple monitor 24'})
    }
    async addToCart(product){
        await product.click() 
        const dialogPromise = this.page.waitForEvent('dialog')
        await this.addBtn.click()
        const dialog = await dialogPromise
        expect(dialog.message()).toBe('Product added.')
        await dialog.accept()
    }
    async goToCart(){
        await this.cart.click()  
    }
    async purchasePhone(){
        await this.phonesLink.click()  
    }
    async placeOrder(){
        await this.placeOderBtn.click()
    }
    async billingInfo(name,country,city,credit,month,year){
        await this.name.fill(name)
        await this.country.fill(country)
        await this.city.fill(city)
        await this.creditCard.fill(credit)
        await this.month.fill(month)
        await this.year.fill(year)
    }
    async purchase(){
        await this.purchaseBtn.click()
    }
    async purchaseMonitor(){
        await this.monitorsLink.click()
    }
}
module.exports = Cart