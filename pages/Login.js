class Login{
    constructor(page){
        this.page= page
        this.loginLink = page.getByRole('link',{name:'Log in'})
        this.loginDialog = page.getByRole('dialog', { name: 'Log in' })
        this.username = this.loginDialog.locator('#loginusername')
        this.password = this.loginDialog.locator('#loginpassword')
        this.loginBtn = this.loginDialog.getByRole('button',{name:'Log in'})
        this.welcome = page.locator('#nameofuser')
        this.logoutLink = page.getByRole('link',{name:'Log out'})
    }
    async goto(){
        await this.page.goto("https://www.demoblaze.com/")
    }
    async verifyCredentials(username,password){
       await this.loginLink.click()
       await this.username.fill(username)
       await this.password.fill(password)
    }
    async loginButtonClick(){
        await this.loginBtn.click()
    } 
    async logout(){
        await this.logoutLink.click()
    } 
}
module.exports = Login