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

  return (<>
    {/* Hero */}
    <div className="container py-22 lg:py-20">
      {/* Grid */}
      <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
        <div className="lg:col-span-3">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Aacharya 
          </h1>
          <p className="mt-3 text-xl text-muted-foreground">
            Introducing a new way of learning.
          </p>
          <div className="mt-5 lg:mt-8 flex flex-col sm:items-center gap-2 sm:flex-row sm:gap-3">
            <div className="w-full max-w-lg lg:w-auto">
              <Label className="sr-only">Search</Label>
              <Input placeholder="Search" type="text" name="search" value={params.search} onChange={handleChange} className="w-full" />
            </div>
            <Button className="w-min" onClick={handleSerch}>Search</Button>
          </div>
          {/* Brands */}
          
          {/* End Brands */}
        </div>
        {/* End Col */}
        <div className="lg:col-span-4 mt-10 lg:mt-0">
          <CarouselDemo />
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
    {/* End Hero */}
  </>);
}
