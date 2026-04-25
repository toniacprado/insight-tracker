import { NextResponse } from "next/server";

import { getCurrentSession } from "@/lib/server/auth";
import { processPendingCaptures } from "@/lib/server/store";

export async function POST(): Promise<Response> {
  const session = await getCurrentSession();

  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const processed = await processPendingCaptures(Date.now(), session.email);

  return NextResponse.json({ processed });
}
