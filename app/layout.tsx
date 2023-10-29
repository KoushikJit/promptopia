import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/global.css";
import { VT323, Space_Mono } from "next/font/google";

export const metadata = {
  title: "Promptopia",
  description: "Discover and Share Prompts",
};

const vt323 = VT323({ weight: "400", subsets: ["vietnamese"] });
const spM = Space_Mono({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={spM.className} lang="en">
      <body>
        <Provider>
          <Nav />
          <div className="head"></div>
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
