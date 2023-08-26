const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hash } = require("bcryptjs");

async function main() {
  const password = await hash("test", 12);
  const adminPassword = await hash("admin", 12);
  // await prisma.user.deleteMany();
  // await prisma.category.deleteMany();
  await prisma.product.deleteMany();
  // const newUser = await prisma.user.createMany({
  //   data: [
  //     {
  //       name: "Alice",
  //       email: "test@test.com",
  //       password: password,
  //       cart: [{ id: "64e8d669d3a5598beb6c9469", quantity: 1 }],
  //     },
  //     {
  //       name: "admin",
  //       email: "admin@test.com",
  //       password: adminPassword,
  //       isAdmin: true,
  //       cart: [],
  //     },
  //   ],
  // });

  // await prisma.category.createMany({
  //   data: [
  //     { name: "Men", image: "categories/men.jpg" },
  //     {
  //       name: "Women",
  //       image: "categories/women.jpg",
  //     },
  //   ],
  // });

  await prisma.product.createMany({
    data: [
      {
        name: "Mens Polo",
        description: "Premium quality men's polo shirt in various colors.",
        price: 1900,
        quantity: 10,
        image: "Gents1.jpg",
        category: "Gents",
        isfeatured: true,
      },
      {
        name: "Women Polo",
        description: "Elegant women's polo shirt for a stylish look.",
        price: 1800,
        quantity: 10,
        image: "Ladies1.jpg",
        category: "Ladies",
        isfeatured: true,
      },
      {
        name: "Casual T-Shirt",
        description: "Comfortable and casual t-shirt for everyday wear.",
        price: 1200,
        quantity: 15,
        image: "Gents2.jpg",
        category: "Gents",
        isfeatured: true,
      },
      {
        name: "Classic Denim Jeans",
        description: "Timeless classic denim jeans for any occasion.",
        price: 2500,
        quantity: 8,
        image: "Gents3.jpg",
        category: "Gents",
        isfeatured: true,
      },
      {
        name: "Summer Dress",
        description: "Light and breezy summer dress for hot days.",
        price: 2200,
        quantity: 12,
        image: "Ladies2.jpg",
        category: "Ladies",
        isfeatured: true,
      },
      {
        name: "Sporty Top",
        description: "Stylish Top designed for an active lifestyle.",
        price: 1800,
        quantity: 20,
        image: "Ladies1.jpg",
        category: "Ladies",
        isfeatured: true,
      },
      {
        name: "Striped Shirt",
        description:
          "Chic striped shirt that's perfect for formal or casual wear.",
        price: 1600,
        quantity: 18,
        image: "Ladies3.jpg",
        category: "Ladies",
        isfeatured: false,
      },
      {
        name: "Cozy Hoodie",
        description: "Stay warm and cozy with this comfortable hoodie.",
        price: 2100,
        quantity: 14,
        image: "Gents1.jpg",
        category: "Ladies",
        isfeatured: false,
      },
      {
        name: "Elegant Blouse",
        description:
          "Elegant blouse that adds a touch of sophistication to any outfit.",
        price: 1900,
        quantity: 10,
        image: "Ladies1.jpg",
        category: "Ladies",
        isfeatured: false,
      },
      {
        name: "Classic Chinos",
        description: "Timeless classic chinos for a polished look.",
        price: 2300,
        quantity: 9,
        image: "Gents2.jpg",
        category: "Gents",
        isfeatured: false,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
