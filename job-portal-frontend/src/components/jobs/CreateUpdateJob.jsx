"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FormInput from "../FormInput";
import { inputBodyJob as inputBody } from "@/lib/data";
import { Button } from "../ui/button";
import { createUpdateJob, newJob } from "@/action/job";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AdminCompanies } from "@/action/company";
import SelectForm from "../SelectForm";

const CreateUpdateJob = ({ children, getJobs, user }) => {
  const [progressRequest, setProgressRequest] = useState("Submit");
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState();

  useEffect(() => {
    if (user?.token) getCompanies();
  }, [user?.token]);

  const createNewJob = async (event) => {
    event.preventDefault();
    setProgressRequest("loading");
    const formData = new FormData(event.target);

    try {
      const res = await createUpdateJob(formData, user?.token);

      if (res?.error) throw res?.error;
      if (res?.result) {
        toast.success(res?.message);
        setOpen(false);
        await getJobs();
      }
    } catch (error) {
      if (error) toast.error(error);
    }
    setProgressRequest("Submit");
  };

  const getCompanies = async () => {
    console.log("tes");
    const result = await AdminCompanies(user?.token);
    console.log(result);
    if (result?.result?.length) setCompanies(result?.result);
    else setCompanies(result.message);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      className="w-full p-4 my-6 rounded-lg mx-auto">
      <DialogTrigger
        asChild
        className="p-1 rounded">
        <Button
          onClick={() => setOpen(true)}
          className="bg-green-400 hover:bg-green-400">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>{children}</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="my-10 text-center">
            <h1 className="font-bold text-green-400 text-2xl">Create a Job</h1>
          </div>
          <form onSubmit={createNewJob}>
            <div className="grid grid-cols-2 gap-2">
              {inputBody.map((inp) => (
                <div
                  key={inp.label || inp.name}
                  className="flex items-center">
                  {inp.type == "select" ? (
                    <SelectForm
                      label={inp.label}
                      name={inp.name}
                      placeholder={inp.placeholder}
                      list={inp.name == "companyId" ? companies : []}
                    />
                  ) : (
                    <FormInput
                      label={inp.label}
                      type={inp.type}
                      name={inp.name}
                      placeholder={inp.placeholder}
                      onChange={inp.onChange}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mx-0 items-center">
              <Button
                type="submit"
                className="bg-green-400 hover:bg-green-400">
                {progressRequest == "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing..
                  </>
                ) : (
                  progressRequest
                )}
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateJob;
