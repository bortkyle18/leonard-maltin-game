const User = require("../models/User")
const connection = require("../config/connection")

// Seed Public User
const seedUsers = [
  { username: "Public", fname: "Public Categories", email: "bortkyle18@gmail.com", password: "admin2022" }
]


// Run Seed files
const seed = async () => {
  const queryFirst = await User.find({})
  if( queryFirst && queryFirst.length === 0 ){
    console.log("seeding users...")

    const seed = await Promise.all(seedUsers.map( async (user) => await User.create(user) ) )

    console.log("seeding done")
    process.exit()
  } else {
    console.log("no seeding needed")
    process.exit()
  }
}


seed();