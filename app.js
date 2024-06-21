 const express = require('express');
const { readFile, writeFile } = require('fs/promises');
const path = require('path');
 const PORT = process.env.PORT || 3000
 const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.use(express.json());



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));    
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));    
});

app.get('/api/notes', (req, res) => {
    readFile('./db/db.json', 'utf-8')
    .then(db => {
        res.send(db)
    })
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body
    readFile('./db/db.json', 'utf-8')
    .then(db =>{
        const parsedNote = JSON.parse (db)
        parsedNote.push(newNote)
        return writeFile('./db/db.json', JSON.stringify(parsedNote))
    })
    .then (()=>{
        res.json('Note Created')
    }) 
})



app.listen(PORT, () => {
    console.log ('App is listening')

});