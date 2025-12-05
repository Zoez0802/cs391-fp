import "./globals.css";
import Link from "next/link";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";//i used google font for styling

const eduFont = Edu_VIC_WA_NT_Beginner({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

/*
  NOTE:
  The "Home" link in the NavBar currently points to "/".
  PLEASE update the href in the NavBar so users nav to your page.
*/

function NavBar() {
    return (
        <nav className="flex gap-6 px-6 py-4 border-b border-slate-200 bg-white">
            <Link
                href="/"
                className="text-lg text-slate-700 hover:text-blue-600 font-semibold"
            >
                Home
            </Link>

            <Link
                href="/notes"
                className="text-lg text-slate-700 hover:text-blue-600 font-semibold"
            >
                Notes
            </Link>
        </nav>
    );
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={eduFont.className}>
        <NavBar />
        {children}
        </body>
        </html>
    );
}
