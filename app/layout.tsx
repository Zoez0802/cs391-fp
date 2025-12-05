import "./globals.css";
import Link from "next/link";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";//i used google font for styling
import Header from "../components/Header";
import Nav from "@/components/Nav"

const eduFont = Edu_VIC_WA_NT_Beginner({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={eduFont.className}>
        <Header />
        {children}
        </body>
        </html>
    );
}
