class Signup{
    constructor(page){
        this.page = page
        this.signuplink = page.getByRole('link',{name:'Sign up'})
        this.dialog = page.getByRole('dialog', { name: 'Sign up' })
        this.username = this.dialog.getByLabel('Username:')
        this.password = this.dialog.getByLabel('Password:')
        this.signUpBtn = this.dialog.getByRole('button',{name:'Sign up'})
        this.closeBtn = this.dialog.getByLabel('Close')   
    }
    async goto(){
       await this.page.goto("https://www.demoblaze.com/")
    }
    async fillUserInfo(username,password){
        await this.signuplink.click()
        await this.dialog.waitFor({ state: 'visible' })
        await this.username.fill(username)
        await this.password.fill(password)   
    }
    async signUpUser(){
       await this.signUpBtn.click()
    }
    async closeSignUpForm(){
       await this.closeBtn.click()
    }
}
module.exports = Signup
