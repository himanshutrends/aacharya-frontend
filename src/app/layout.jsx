import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/User";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
    title: "Aacharya",
    description: "Created by the students for the students",
};
export default function RootLayout({ children, }) {
    return (<html lang="en">
      <UserProvider>
        <body className={inter.className}>
          {children}
        </body>
      </UserProvider>
    </html>);
}
