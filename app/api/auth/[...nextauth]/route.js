import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/utils/database";
import User from "@/models/User";
import Cart from "@/models/Cart";
import Wishlist from "@/models/Wishlist";
// Define authentication options

const authOptions = {
      // Specify the providers for NextAuth
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_SECRET,

         authorization: {
            params: {
               prompt: "consent",
               access_type: "offline",
               response_type: "code",
            },
         },
      }),
   ],
  
   callbacks: {
      async signIn({ profile }) {
         const { email, name, picture: image } = profile;
         try {
            connectDB();
            const existingUser = await User.find({ email });
            if (existingUser.length == 0) {
               await User.create({
                  email,
                  name,
                  image,
               });
            }

            return true;
         } catch (error) {
            console.log(error);
            return false;
         }
      },
      
      async session({ session }) {
         connectDB();
         const {
            user: { email },
         } = session;
         const res = await User.findOne({ email });
         const cart = await Cart.findOne({ user: res.id });
         const wishlist = await Wishlist.findOne({ user: res.id });
         session.user.userType = res.userType;
         session.user.id = res.id;
         session.user.cart =
            cart?.id || (await Cart.create({ user: res.id })).id;
         session.user.wishlist =
            wishlist?.id || (await Wishlist.create({ user: res.id })).id;
         return session;
      },
   },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
