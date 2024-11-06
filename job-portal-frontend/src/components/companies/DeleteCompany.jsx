import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { deleteCompany } from "@/action/company";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const DeleteCompany = ({ children, id, getCompanies }) => {
  const [progressRequest, setProgressRequest] = useState("Submit");

  const companyDelete = async (event) => {
    event.preventDefault();
    setProgressRequest("loading");
    const result = await deleteCompany(id);
    if (result?.success) {
      toast.success(result?.message);
      getCompanies();
    } else {
      toast.error(result?.error);
    }
    setProgressRequest("Submit");
  };

  return (
    <Dialog className="w-full p-4 my-6 rounded-lg mx-auto">
      <DialogTrigger asChild>
        <Button className="bg-red-500 text-white">{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete this company</DialogTitle>
          <DialogDescription></DialogDescription>
          <form onSubmit={companyDelete}>
            <p>Do you want to delete this company?</p>
            <div className="flex justify-end mt-2">
              <Button
                type="submit"
                className="bg-red-500">
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

export default DeleteCompany;
