const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

// const methodOverride = require('method-override')

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  // i dont think these are necessary...
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 400; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      title: `${sample(descriptors)} ${sample(places)}`,
      author: "6462e134e120f019cc399f9c",
      images: [
        {
          url: "https://res.cloudinary.com/djnynex4a/image/upload/v1685062143/YelpCamp/frjs8uvlzm71bcdzswhx.jpg",
          filename: "YelpCamp/frjs8uvlzm71bcdzswhx",
        },
        {
          url: "https://res.cloudinary.com/djnynex4a/image/upload/v1685062144/YelpCamp/opzrswy1uosha7f8eunr.jpg",
          filename: "YelpCamp/opzrswy1uosha7f8eunr",
        },
        {
          url: "https://res.cloudinary.com/djnynex4a/image/upload/v1685062145/YelpCamp/yonez383qvro3yhhss54.jpg",
          filename: "YelpCamp/yonez383qvro3yhhss54",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price: price,
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
