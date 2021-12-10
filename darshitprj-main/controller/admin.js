const express = require('express');
const formidable = require("formidable");
const adminRouter = express.Router();
const fs = require('fs');
const Product = require("../models/product");
 
adminRouter.get("/addproduct", (req, res) => {
    res.render("admin/add_product");
})

adminRouter.post("/addproduct", (req, res) => {
 
    let form = new formidable.IncomingForm();
     
    console.log("Fsdsdfa fried");
    form.parse(req, function (err, fields, files) {
        var oldpath = files.photo.filepath;
        var newpath = 'C:/Users/acer/Downloads/darshitprj-main/public/uploads/' + files.photo.originalFilename;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          console.log("File Uploaded and moved");
          res.end();
        });
        let product = new Product({
            title:fields.title,
            description:fields.descreption,
            image:files.photo.originalFilename,
            price:fields.price

        })

        product.save((err,product)=>{
            if(err){
                console.log(err);
                return res.status(400).json({error:"something went wrong"})
            }else{
                 console.log("Product saved");
            }
        })
     
    });
})

adminRouter.get("/product", async(req, res) => {

    try {
        let result = await product.find();

        let finalResult = [];
        let chunksize = 4;
        for (var i = 0; i <= result.length; i = i + chunksize) {
            finalResult.push(result.slice(i, i + chunksize));

        }

        res.render("admin/product", { finalResult });
    } catch (error) {
        res.send(error);
    }

    // Product.find({}, function(err,products){
    //     res.render('admin/product',{
    //         productsList: products
    //     })
    // })
})

 
module.exports = adminRouter;