import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { searchText } = await request.json();

    // Generate embedding for search text
    const genAI = new GoogleGenerativeAI(
      "AIzaSyDI5X6rQy7XVfIoOcAaiSwsY1roFufu3ws"
    );
    const model = genAI.getGenerativeModel({ model: "embedding-001" });
    const result = await model.embedContent(searchText);
    const searchEmbedding = result.embedding.values;

    // Perform similarity search in Supabase
    const supabase = await createClient();
    const { data: documents, error } = await supabase.rpc("match_documents", {
      query_embedding: searchEmbedding,
      match_threshold: 0.7, // Adjust this threshold as needed
      match_count: 5, // Number of results to return
    });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      matches: documents,
    });
  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
