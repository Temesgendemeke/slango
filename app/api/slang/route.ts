import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "@/lib/errors";

const prisma = new PrismaClient();

export async function GET() {
  let slangs;
  try{
    slangs = await prisma.Slang.finMany();
  }catch(err){
    throw new ApiError(500, "Failed to fetch slangs")
  }
  return NextResponse.json({ slangs , message:"wew"});
}
