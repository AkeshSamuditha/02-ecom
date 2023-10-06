
# You can visit the deployed version in verce from [here](https://02-ecom.vercel.app/)

## Technologies Used

- [Next.js](https://nextjs.org/)
- Vanilla JavaScript
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [ImageKit.io](https://imagekit.io/) for Image hosting
- [MongoDB](https://www.mongodb.com/) as the Database
- [Prisma](https://www.prisma.io/) as the ORM

## Quickstart

1. **Download the Repo**: Clone this repository to your local machine.

2. **Set Environment Variables**: Create an `.env` file in the project root and add the following environment variables:

   - `DATABASE_URL`: Your MongoDB database URL.
   - `NEXTAUTH_SECRET`: Your NextAuth.js secret.
   - `IMAGEKIT_PUBLIC_KEY`: Your ImageKit.io public key.
   - `IMAGEKIT_PRIVATE_KEY`: Your ImageKit.io private key.
   - `IMAGEKIT_URL_ENDPOINT`: The URL endpoint for ImageKit.io.

3. **Run the Application**:
   - To start the development server, run:
     ```sh
     npm run dev
     ```
     Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

   - To make changes to the database, edit the `/prisma/seed.js` file and run:
     ```sh
     npm run devStart
     ```

Few of the componenents are still under construction
