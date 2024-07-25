"use client"

import Header from "@/components/landing/ui/header"
import Footer from "@/components/landing/ui/footer"

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </>
  )
}
