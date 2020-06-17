# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#  Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Outfit.destroy_all
Like.destroy_all

User.create(username: "Liz")

Outfit.create(name: "Cozy Cardigan", season: "Spring", img_url: "https://i.pinimg.com/564x/ca/92/ed/ca92ed3fb654032aed89a9c716a3ec9f.jpg", user_id: 1,like_count: 0)
Outfit.create(name: "Fall Button Up", season: "Fall", img_url:"https://i.pinimg.com/564x/33/75/ed/3375ed39af31a02583325cdc71efaad7.jpg", user_id: 1, like_count: 0)
Outfit.create(name: "Tied Up Shirt & Cheetah Print Skirt", season: "Summer", img_url:"https://i.pinimg.com/564x/41/39/f4/4139f402fb0de8d0f9abd4b1fd5d232a.jpg", user_id:1, like_count: 0)
Outfit.create(name: "Utility Vest", season: "Fall", img_url:"https://www.wmagazine.com/wp-content/uploads/2019/06/21/5d0cfbc6b491a3093a0c4bf2_Adam-Katz-Sinding-W-Magazine-Paris-Fashion-Week-Mens-Spring-Summer-2020_AKS8581.jpg?w=640px", user_id: 1, like_count: 0)
Outfit.create(name: "Grid Pants, Belt Bag", season: "Fall", img_url:"https://i.pinimg.com/564x/6a/5d/eb/6a5debb2860c070bd5a4a1ea3cde03d1.jpg", user_id: 1, like_count: 0)
Outfit.create(name: "Fall Jacket", season: "Fall", img_url:"https://i.pinimg.com/564x/43/63/42/436342d440d0d24bd397437d3bdc49bf.jpg", user_id: 1, like_count: 0)
Outfit.create(name: "Cozy Fleece Fit", season: "Winter", img_url:"https://i.pinimg.com/564x/9a/0e/39/9a0e392c12224c63b8d777189789836a.jpg", user_id: 1, like_count: 0)
Outfit.create(name: "Oversized Flannel", season: "Winter", img_url:"https://i.pinimg.com/564x/46/6d/8e/466d8ef8eee2140c4da161b7bc648d2a.jpg", user_id: 1, like_count: 0)
Outfit.create(name: "Safari on the Streets", season: "Spring", img_url:"https://i.pinimg.com/564x/46/4e/5d/464e5d25be38122d97b2a5a93aaaf2b4.jpg", user_id: 1, like_count: 0)

Like.create(user_id:1,outfit_id: 5)
Like.create(user_id:1,outfit_id: 9)
Like.create(user_id:1,outfit_id: 4)
Like.create(user_id:1,outfit_id: 6)
Like.create(user_id:1,outfit_id: 8)
Like.create(user_id:1,outfit_id: 1)

