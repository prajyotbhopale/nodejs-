import express from 'express';
import logger from "./logger.js";
import morgan from "morgan";

const app = express()

const PORT = 3000;

app.use(express.json());
let teaData = []
let nextId = 1;

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

//add a new tea
app.post('/teas', (req,res)=>{
    const {name, price}=  req.body;
    const newTea = { id: nextId++, name , price}
    teaData.push(newTea);
    res.status(201).json(newTea);
})
//get all teas
app.get('/teas', (req,res)=>{
    res.status(200).send(teaData);
})

//get a tea by id

app.get('/teas/:id', (req,res)=>{
   const tea = teaData.find(t => t.id === parseInt(req.params.id));

   if(!tea){
    return res.status(404).json({ message: 'Tea not found'});
   }

   res.status(200).json(tea);
})

app.put('/teas/:id', (req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id));


     if(!tea){
    return res.status(404).json({ message: 'Tea not found'});
   }

   const {name, price } = req.body;
    tea.name = name,
    tea.price = price;

   res.status(200).json(tea);

})

app.delete('/teas/:id', (req,res)=>{
    const teaIndex = teaData.findIndex(t => t.id === parseInt(req.params.id));

    if(teaIndex === -1){
        return res.status(404).json({ message: 'Tea not found'});
    }

    teaData.splice(teaIndex, 1);
    res.status(204).send('deleted');
  })

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}...`)
})