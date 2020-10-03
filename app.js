const express = require('express');
const { error } = require('console');
const ParseServer = require('parse-server').ParseServer;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const api = new ParseServer({
  databaseURI:'mongodb://localhost:27017/Merchants', // Connection string for your MongoDB database
  cloud: './cloud/main.js', // Absolute path to your Cloud Code
  appId: 'myAppId',
  masterKey: 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:1000/parse' // Don't forget to change to https if needed
});

const mountPath ='/parse';

//middlware
//Routes
app.use(mountPath, api);
app.post("/company", (req, res) => {
    var Companies = Parse.Object.extend("Company");
    var Company = new Companies();
  
  Company.save({
    Company: req.body.Company,
    Address: req.body.Address,
    Email: req.body.Email,
    Contact: req.body.Contact, 
    Product:req.body.Product,
    CompanyId:req.body.CompanyId,
    cr14:req.body.cr14,
    cr2:req.body.cr2,
    cor:req.body.cor,
    coi:req.body.coi
  })
  .then((Company) => {
    // The object was saved successfully.
    res.json({success: true,...error}).status(201);
  }, (error) => {
    res.json({success: false, ...error}).status(400);
  });
  
  
  });
  app.post("/Individual", (req, res) => {
    var Individuals = Parse.Object.extend("Individual");
    var Individual = new Individuals();
    console.log(req.body);
  
  Individual.save({
    Name: req.body.Name,
    Surname: req.body.Surname,
    Email:req.body.Email,
    Contact: req.body.Contact, 
    IdNumber:req.body.IdNumber,
    Gender:req.body.Gender,
    Address:req.body.Address,
    IndividualId:req.body.IndividualId,
    por:req.body.por,
    IdPicture:req.body.IdPicture  
  })
  .then((Individual) => {
    // The object was saved successfully.
    res.json({success: true,...error}).status(201);
  }, (error) => {
    res.json({success: false, ...error}).status(400);
  });
   
  });

  app.get("/ViewCompanies",(req,res)=>{
    var Companies = Parse.Object.extend("Company");
    var query = new Parse.Query(Companies);

    query
    .find()
    .then(companies=>{
      res.json({companies: companies}).status(200);
    },error =>{
      res.json({companies:[]}).status(400);
    });
  });

  app.get("/ViewIndividuals",(req,res)=>{
    var Individuals = Parse.Object.extend("Individual");
    var query = new Parse.Query(Individuals);

    query
    .find()
    .then(individuals=>{
      res.json({individuals: individuals}).status(200);
    }, error =>{
      res.json({individuals:[]}).status(400);
    });
    });

    app.get("/GetCompaniesById/:id",(req,res)=>{
      var Companies = Parse.Object.extend('Company');
      var query = new Parse.Query(Companies)
      
     var id = req.params.id;
     query.get(id)
     .then(companies =>{
       res.json({success: true, companies: companies}).status(200);
     }, error => {
        res.json({success: false, companies: [],...error}).status(400);
     })
    })

    app.get("/GetindividualsById/:id",(req,res)=>{
      var Individuals = Parse.Object.extend('Individual');
      var query = new Parse.Query(Individuals)
      
     var id = req.params.id;
     query.get(id)
     .then(individuals =>{
       res.json({success: true, individuals: individuals}).status(200);
     }, error => {
        res.json({success: false, individuals: [],...error}).status(400);
     })
    })
    
    app.put('/UpdateCompany/:id',(req,res) =>{
      var Company =Parse.Object.extend('Company');
      var query = new Parse.Query(Company);

      var id =req.params.id;

      query
      .get(id)
      .then((company) => {
          company.save({
          Company: req.body.Company,
          Address: req.body.Address,
          Contact: req.body.Contact, 
          Product:req.body.Product,
          });
            res.json({success:true,...error}).status(200);
          })
          .catch(error => {
           console.log(error);
           res.json({success:false,...error}).status(400);
    })

    })

    app.put('/UpdateIndividual/:id',(req,res) =>{
      var Individuals =Parse.Object.extend('Individual');
      var query = new Parse.Query(Individuals);

      var id =req.params.id;

      query
      .get(id)
      .then((Individual) => {
          Individual.save({
          Name: req.body.Name,
          Address: req.body.Address,
          Contact: req.body.Contact, 
          Email:req.body.Email,
          Surname:req.body.Surname,
          por:req.body.por
          });
            res.json({success:true,...error}).status(200);
          })
          .catch(error => {
           console.log(error);
           res.json({success:false,...error}).status(400);
    })

    })

  app.delete('/DeleteCompanyById/:id',(req,res)=>{
    var Companies = Parse.Object.extend('Company');
    var query = new Parse.Query(Companies);

    var id = req.params.id;
    query
    .get(id)
    .then((company)=>
    company.destroy()
    .then(res.json({success:true,...error}).status(200))
    )
    .catch(error => {
      console.log(error);
      res.json({success:false,...error}).status(400);
    }) 
  })
  
  app.delete('/DeleteIndividualById/:id',(req,res)=>{
    var Individuals = Parse.Object.extend('Individual');
    var query = new Parse.Query(Individuals);

    var id =req.params.id;
    query
    .get(id)
    .then((individual)=>
    individual.destroy()
    .then(res.json({success:true,...error}).status(200))
    )
    .catch(error => {
      console.log(error);
      res.json({success:false,...error}).status(400);
    }) 
  })
    
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(` API Running on Port ${PORT}`)); 

