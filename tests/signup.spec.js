import {expect,test} from "@playwright/test"
import POManager from "../pages/POManager"
const testData = JSON.parse(JSON.stringify(require("../utils/TestData.json")))

test('Sign up new user',async({page})=>{
    const pomanager = new POManager(page)
    const signup = pomanager.getSignup()
    await signup.goto()
    await signup.fillUserInfo(`${testData.signupUser}${Date.now()}`,testData.signupPassword) 
    const dialogPromise = page.waitForEvent('dialog')
    await signup.signUpUser()
    const dialog = await dialogPromise
    expect(dialog.message()).toBe('Sign up successful.')
    await dialog.accept()
})

test('Close sign up form',async({page})=>{
    const pomanager = new POManager(page)
    const signup = pomanager.getSignup()
    await signup.goto()
    await signup.fillUserInfo(`${testData.signupUser}${Date.now()}`,testData.signupPassword)
    await signup.closeSignUpForm()
    await expect(page).toHaveURL("https://www.demoblaze.com/")
})