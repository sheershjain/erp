const bcrypt = require('bcrypt');
const {hash}= require("bcrypt");


const func = async() => {
    const val = await hash("Sheersh@123",10);
    console.log(val);
}

func();