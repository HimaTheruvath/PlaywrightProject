const base = require("@playwright/test")
exports.customTest =base.test.extend({
billingInfo:{ 
 name :"Hima Thomas",
 country : "Canada",
 city : "Toronto",
 credit : "98765",
 month : "October",
 year : "2016"
}
})