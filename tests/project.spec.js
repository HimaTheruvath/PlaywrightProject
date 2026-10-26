const { expect, test } = require("@playwright/test")
const POManager = require("../pages/POManager")
const { customTest } = require("../utils/billing")
const testData = JSON.parse(JSON.stringify(require("../utils/TestData.json")))

test('Invalid username and valid password', async({page})=>{
const pomanager = new POManager(page)
const login = pomanager.getLogin()
await login.goto()
await login.verifyCredentials(testData.invalidUsername,testData.validPassword)
const dialogPromise = page.waitForEvent('dialog')
await login.loginButtonClick()
const dialog = await dialogPromise
expect(dialog.message()).toBe('User does not exist.')
await dialog.accept()
})

test('Valid username and invalid password', async({page})=>{
const pomanager = new POManager(page)
const login = pomanager.getLogin()
await login.goto()
await login.verifyCredentials(testData.validUsername,testData.invalidPassword)
const dialogPromise = page.waitForEvent('dialog')
await login.loginButtonClick()
const dialog = await dialogPromise
expect(dialog.message()).toBe('Wrong password.')
await dialog.accept()   
})

test('Inalid username and invalid password', async({page})=>{
const pomanager = new POManager(page)
const login = pomanager.getLogin()
await login.goto()
await login.verifyCredentials(testData.invalidUsername,testData.invalidPassword)
const dialogPromise = page.waitForEvent('dialog')
await login.loginButtonClick()
const dialog = await dialogPromise
expect(dialog.message()).toBe('User does not exist.')
await dialog.accept() 
})

test('valid username and valid password', async({page})=>{
const pomanager = new POManager(page)
const login = pomanager.getLogin()
await login.goto()
await login.verifyCredentials(testData.validUsername,testData.validPassword)
await login.loginButtonClick()
await expect(login.welcome).toContainText('Welcome')
})

test('Add to cart', async({page})=>{
const pomanager = new POManager(page)
const login = pomanager.getLogin()
const cart =pomanager.getCart() 
await login.goto()
await login.verifyCredentials(testData.validUsername,testData.validPassword)
await login.loginButtonClick()
await cart.addToCart(cart.product)
await cart.goCart()
})

customTest('Purchase a phone', async({page,billingInfo})=>{
const pomanager = new POManager(page)
const login = pomanager.getLogin()
const cart =pomanager.getCart() 
await login.goto()
await login.verifyCredentials(testData.validUsername,testData.validPassword)
await login.loginButtonClick()
await cart.purchasePhone()
await cart.addToCart(cart.phone)
await cart.goCart()
await cart.placeOrder()
await cart.billingInfo(billingInfo.name,billingInfo.country,billingInfo.city,billingInfo.credit,billingInfo.month,billingInfo.year)
await cart.purchase()
await expect(page.locator('.sweet-alert.showSweetAlert')).toContainText('Thank you for your purchase!')
})

customTest('Purchase a monitor', async({page,billingInfo})=>{
const pomanager = new POManager(page)
const login = pomanager.getLogin()
const cart =pomanager.getCart() 
await login.goto()
await login.verifyCredentials(testData.validUsername,testData.validPassword)
await login.loginButtonClick()
await cart.purchaseMonitor()
await cart.addToCart(cart.monitor)
await cart.goCart()
await cart.placeOrder()
await cart.billingInfo(billingInfo.name,billingInfo.country,billingInfo.city,billingInfo.credit,billingInfo.month,billingInfo.year)
await cart.purchase()
await expect(page.locator('.sweet-alert.showSweetAlert')).toContainText('Thank you for your purchase!')
})

test('Logout',async({page})=>{
const pomanager = new POManager(page)
const login = pomanager.getLogin()
await login.goto()
await login.verifyCredentials(testData.validUsername,testData.validPassword)
await login.loginButtonClick()
await login.logout()
await expect(page).toHaveURL("https://www.demoblaze.com/index.html")
})

