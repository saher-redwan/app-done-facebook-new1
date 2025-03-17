import { NextResponse } from "next/server";

export async function POST(request) {
  // setTimeout(() => {
  return NextResponse.json({
    data: "data is here",
  });
  // }, 2500);
}
