export enum ClientType {
  Individual = "Individual",
  Proprietorship = "Proprietorship",
  Partnership = "Partnership Firm",
  LLP = "Limited Liability Partnership (LLP)",
  OPC = "One Person Company (OPC)",
  PvtLtd = "Private Limited Company",
  PublicLtd = "Public Limited Company",
  Trust = "Trust",
  Society = "Society"
}

export interface FormData {
  clientName: string;
  parentName: string; // Father's name (only for Individual/Proprietor)
  address: string;
  clientType: ClientType;
  workDescription: string; // Replaces "Class" / "various artistic..."
  date: string;
}
