const Signup = require("./Signup")
const Login = require("./Login")
const Cart = require("./Cart")

class POManager{
    constructor(page){
    this.page = page
    this.signup = new Signup(page)
    this.login = new Login(page)
    this.cart = new Cart(page)
    }
    getSignup(){
        return this.signup
    }
    getLogin(){
        return this.login
    }  
    getCart(){
        return this.cart
    }  
}
module.exports = POManager