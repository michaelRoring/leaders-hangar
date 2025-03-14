"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";

export default function BusinessPlanForm() {
  const [formData, setFormData] = useState({
    ideasAndValues: "",
    problemSolutions: "",
    context: "",
    marketSize: "",
    competition: "",
    monetisationModel: "",
    manpower: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
      | string,
    selectName?: string
  ) => {
    if (typeof e === "string" && selectName) {
      setFormData((prevData) => ({
        ...prevData,
        [selectName]: e,
      }));
    } else if (typeof e === "object" && "target" in e) {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      const response = await fetch("/api/rag-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Business Plan</CardTitle>
        <CardDescription>
          Fill in the details of your business plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ideasAndValues">Ideas and Values</Label>
            <Input
              id="ideasAndValues"
              name="ideasAndValues"
              value={formData.ideasAndValues}
              onChange={handleChange}
              placeholder="Enter your business ideas and values"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="problemSolutions">
              Problem Statement(s) and Solutions
            </Label>
            <Textarea
              id="problemSolutions"
              name="problemSolutions"
              value={formData.problemSolutions}
              onChange={handleChange}
              placeholder="Describe the problems you're addressing and your solutions"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="context">
              Context of Problem-solution Combination
            </Label>
            <Textarea
              id="context"
              name="context"
              value={formData.context}
              onChange={handleChange}
              placeholder="Provide context for your problem-solution combination"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="marketSize">Market Size</Label>
            <Select
              onValueChange={(value) => handleChange(value, "marketSize")}
              value={formData.marketSize}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select estimated market size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under500k">Under 500k</SelectItem>
                <SelectItem value="500kTo1mil">500k - 1 mil</SelectItem>
                <SelectItem value="above1mil">Above 1 mil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="competition">Competition</Label>
            <Input
              id="competition"
              name="competition"
              value={formData.competition}
              onChange={handleChange}
              placeholder="Describe your competition"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monetisationModel">Monetisation Model</Label>
            <Input
              id="monetisationModel"
              name="monetisationModel"
              value={formData.monetisationModel}
              onChange={handleChange}
              placeholder="Explain your monetisation model"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="manpower">Manpower</Label>
            <Input
              id="manpower"
              name="manpower"
              value={formData.manpower}
              onChange={handleChange}
              placeholder="Describe your manpower requirements"
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Business Plan
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
