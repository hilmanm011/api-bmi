const express = require("express");

const app = express();

const port = process.env.PORT || 3001;

// app.use(express.urlencoded())
app.use(express.json())

let familys = [
    {
        nama: 'Muhamad',
        tinggi: 1.66,
        berat: 55,
    },
    {
        nama: 'Hilman',
        tinggi: 1.65,
        berat: 45,
    }
]

function countBmi(berat, tinggi) {
    let result = 0
    result += berat / (tinggi ** 2)

    return result.toFixed(1)
}

function category(input) {
    if (input < 18.5) {
        return 'Under Weight'
    } else if (input >=18.5 && input <= 24.9) {
        return 'Normal Weight'
    } else if (input >= 25 && input <= 29.9) {
        return 'Over Weight'
    } else{
        return 'Obesity'
    }

}

app.get('/', (req, res) => {
    res.json(familys)
})

app.post('/bmi', (req, res) => {
    let newFamily = req.body
    let bmi = countBmi(newFamily.berat, newFamily.tinggi)
    let cat = category(bmi)

    familys.push(res.json({
        nama: newFamily.nama,
        tinggi: newFamily.tinggi,
        berat: newFamily.berat,
        bmi: bmi,
        category: cat
    }))
    
})

app.listen(port, () => {
    
    console.log(`Example app listening at http://localhost:${port}`);
})