const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const port = process.env.PORT || 3000;

//Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars and vies location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath));
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gurpreet',
    });
});

// app.get('/about', (req, res) => {
//     res.render('about', {
//         title: 'About',
//         name: 'Gurpreet',
//     });
// });

// app.get('/help', (req, res) => {
//     res.render('help', {
//         title: 'Help',
//         message: 'This is an example message!',
//     });
// });

app.get('/weather', (req, res) => {
    // console.log(req.query)
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geoCode(req.query.address, (error, { longitude, latitude, location} = {}) => {
        if(error){
            return res.send({error});
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location, 
                address: req.query.address,
            })
        })
    })




    // console.log(req.query.address)
    // res.send({
    //     forecast: 'Partly cloudy',
    //     location: 'Montreal',
    //     address: req.query.address,
    // });
});


// app.get('/products', (req, res) => {
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide a search term', 
//         })
//     }
//     console.log(req.query.search);
//     res.send({
//         products: [],
//     })
// })


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        // errorMessage: 'Help article not found',
        // name: 'Gurpreet',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        // name: 'Gurpreet',
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}`));