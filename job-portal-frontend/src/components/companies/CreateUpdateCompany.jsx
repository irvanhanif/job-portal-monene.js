"use client";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FormInput from "../FormInput";
import { inputBodyCompany as inputBody } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import uploadFile from "@/lib/uploadFile";
import { newCompany } from "@/action/company";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CreateUpdateCompany = ({ children, getCompanies, company, user }) => {
  const [progressRequest, setProgressRequest] = useState("Submit");
  const [open, setOpen] = useState(false);
  const [logo, setLogo] = useState({
    logoUrl: company?.logo || "",
    logoFile: "",
  });

  const createNewCompany = async (event) => {
    event.preventDefault();
    setProgressRequest("loading");
    const formData = new FormData(event.target);

    try {
      if (logo.logoFile) {
        let uploadLogo = await uploadFile(logo.logoFile);
        logo.logoUrl = uploadLogo?.url;
      }

      const res = await newCompany(
        formData,
        logo?.logoUrl,
        user?.token,
        company?.id
      );

      if (res?.error) throw res?.error;
      if (res?.result) {
        toast.success(res?.message);
        setOpen(false);
        await getCompanies();
      }
    } catch (error) {
      if (error) toast.error(error);
    }
    setProgressRequest("Submit");
    setLogo({ logoUrl: logo?.logoUrl, logoFile: null });
  };

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    const fileUrl = URL.createObjectURL(file);

    setLogo({
      logoUrl: fileUrl,
      logoFile: file,
    });
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
            <h1 className="font-bold text-green-400 text-2xl">
              Your Company Name
            </h1>
          </div>
          <form onSubmit={createNewCompany}>
            {inputBody.map((inp) => (
              <div key={inp.label}>
                {inp.label == "Upload Logo" && logo?.logoUrl && (
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={logo.logoUrl} />
                    <AvatarFallback>{company?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <FormInput
                  label={inp.label}
                  type={inp.type}
                  name={inp.name}
                  placeholder={inp.placeholder}
                  onChange={
                    inp.label == "Upload Logo" ? (e) => handleFile(e) : null
                  }
                  defaultValue={company?.[inp.name]}
                />
              </div>
            ))}
            <div className="flex justify-end mt-2">
              <Button type="submit">
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

export default CreateUpdateCompany;
