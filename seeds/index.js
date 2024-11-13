const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const dbUrl = process.env.DB_URL;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log('Connection Successful');
}

const sample = array => array[Math.ceil(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++){
        const random1000 = Math.ceil(Math.random() * 1000);
        const price = Math.floor(Math.random() * 1500) + 10;
        const camp = new Campground({
          author: '65c30f9888d7c123ed4fca66',
          location: `${cities[random1000].city}, ${cities[random1000].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
          // image: `https://source.unsplash.com/collection/483251`,
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quae corrupti deserunt minus harum expedita facere molestias fuga, quibusdam aperiam officiis quo a voluptate. Facilis laborum corrupti quos et nisi?',
          price,
          geometry: {
            type: 'Point',
            coordinates: [
              cities[random1000].longitude,
              cities[random1000].latitude,
            ],
          },
          images: [
            {
              url: 'https://res.cloudinary.com/dis45imhu/image/upload/v1707282968/YelpCamp/mike-erskine-S_VbdMTsdiA-unsplash_jfbys4.jpg',
              filename: 'YelpCamp/mike-erskine-S_VbdMTsdiA-unsplash_jfbys4.jpg',
            },
            {
              url: 'https://res.cloudinary.com/dis45imhu/image/upload/v1707282965/YelpCamp/tim-gouw-MApjpqu9V7E-unsplash_rfdyxb.jpg',
              filename: 'YelpCamp/tim-gouw-MApjpqu9V7E-unsplash_rfdyxb.jpg',
            },
            {
              url: 'https://res.cloudinary.com/dis45imhu/image/upload/v1707282964/YelpCamp/michael-niessl-x_gyAYzyeQA-unsplash_nej5qc.jpg',
              filename:
                'YelpCamp/michael-niessl-x_gyAYzyeQA-unsplash_nej5qc.jpg',
            },
            {
              url: 'https://res.cloudinary.com/dis45imhu/image/upload/v1707282981/YelpCamp/lionello-delpiccolo-5xPnw59QFLQ-unsplash_bmbldq.jpg',
              filename:
                'YelpCamp/lionello-delpiccolo-5xPnw59QFLQ-unsplash_bmbldq.jpg',
            },
          ],
        });
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});
