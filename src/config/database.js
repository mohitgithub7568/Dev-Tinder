const mongoose = require('mongoose');

const connectDb = async ()=>{
    await mongoose.connect("mongodb+srv://creature7568_db_user:ccTQOhgXlWDOgHIH@clustermohit.ie6kabi.mongodb.net/devTinder");
}

module.exports= {connectDb};
