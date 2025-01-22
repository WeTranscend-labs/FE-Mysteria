import { ReactNode } from "react";

export interface ChestType {
  id: string;
  name: string;
  type: "Bronze" | "Silver" | "Gold" | "Legend";
  description: string;
  image: string;
  keyPrice: number;
  color: string;
  glowColor: string;
  dropRates: {
    common: number;
    rare: number;
    superRare: number;
  };
  icon: ReactNode;
}

export interface KeyPackage {
  id: string;
  name: string;
  amount: number;
  price: number;
  discount: number;
  type: ChestType["type"];
  image: string;
}
