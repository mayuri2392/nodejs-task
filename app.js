import express from 'express';
import axios from 'axios';
import readline from 'readline-sync';

const app = express();
const HOST = '127.0.0.1';
const PORT = 3000;


let region = readline.question("Enter region name :");

console.log("Region :" + region);

app.get('/', (req, res) => {
    res.send("Hello World");
})


app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});


const GetRegionDetails = async () => {
    try {
        var data = [];
        var total = 0;
        const resp = await axios.get('https://restcountries.com/v3.1/region/' + region);
        for (let i = 0; i < (resp.data).length; i++) {

            total += resp.data[i].population;
            data[i] = resp.data[i].population;
        }
        console.log("The total population of that region: " + total);
        const max = Math.max(...data);
        for (let j = 0; j < (resp.data).length; j++) {
            if (max == resp.data[j].population) {
                console.log("The name of the country with the highest population :" + resp.data[j].name.common);
            }
        }
    
        return resp.data;
    } catch (err) {
       
        console.error(err);
    }
};

GetRegionDetails();
