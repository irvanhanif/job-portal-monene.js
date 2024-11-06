import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { filterData } from "@/lib/data";
import Link from "next/link";
import { Label } from "../ui/label";

const FilterJobs = () => {
  return (
    // <div></div>
    <div>
      {filterData?.map((data) => (
        <Accordion
          key={data.filterType}
          type="single"
          collapsible
          className="w-full">
          <AccordionItem value={data.filterType}>
            <AccordionTrigger>{data.filterType}</AccordionTrigger>
            <AccordionContent>
              {data?.array?.map((item) => (
                <Link
                  href={`/findjobs?${data?.filterType}`}
                  key={item}
                  className="flex items-center my-5 cursor-pointer">
                  <Label
                    htmlFor={item}
                    className="cursor-pointer">
                    {item}
                  </Label>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default FilterJobs;
