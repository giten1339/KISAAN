import "./globals.css";
import { Poppins } from "next/font/google";

import Header from "@/components/Header";
import Provider from "@/components/Provider";
import Footer from "@/components/Footer";

import getSessionInfo from "@/utils/SessionInfo";
import NextProgressBar from "@/components/NextProgressBar";

import Toast from "@/components/Toast";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
   title: "Organics",
   description: "Find the best organic food in your area",
};

export default async function RootLayout({ children }) {
   const serverSession = await getSessionInfo();
   return (
      <html lang="en">
         <head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
         </head>
         <body
            className={`${poppins.className} antialiased`}
            suppressHydrationWarning={true}
         >
            <Provider session={serverSession}>
               <div className="body min-h-[100vh]">
                  <NextProgressBar />
                  <Header />
                  {children}
                  <Toast />
               </div>
               <Footer />
            </Provider>
         </body>
      </html>
   );
}
