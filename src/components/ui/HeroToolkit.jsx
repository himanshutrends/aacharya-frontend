import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CarouselDemo from "./Carosel";
import { useRouter } from 'next/navigation';

export default function HeroSectionWithEmailInput() {
  const [params, setParams] = useState({ search: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setParams({ [e.target.name]: e.target.value });
  }

  const handleSerch = () => {
    if (params.search) {
      // parse space to %20
      const search = params.search.replace(/ /g, "%20")
      router.push(`/home?search=${search}`);
    }
  }
  return (<div className="bg-white h-screen w-full">

    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our beta version. <a href="/auth/login" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Sign In<span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Adaptive eLearning Platform</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">Ask anything to video and AI Powered dashboard for real-time tracking, notes, activities, and analysis.</p>
          <div className="m-5 lg:mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
            <div className="w-full max-w-lg  lg:w-auto">
              <Label className="sr-only">Search</Label>
              <Input placeholder="Search" type="text" name="search" value={params.search} onChange={handleChange} className="w-full bg-white" />
            </div>
            <Button className="w-min" onClick={handleSerch}>Search</Button>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="/auth/signup" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started | SignUp</a>
            <a href="/auth/login" className="text-sm font-semibold leading-6 text-gray-900">Login<span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  </div>);
}
