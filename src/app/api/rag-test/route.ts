// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { createClient } from "@/lib/supabase/server";

// interface RequestBody {
//   text: string;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = (await request.json()) as RequestBody;
//     const supabase = await createClient();

//     const apiKey = "AIzaSyDI5X6rQy7XVfIoOcAaiSwsY1roFufu3ws";
//     if (!apiKey) {
//       throw new Error("Missing API key configuration");
//     }

//     const genAI = new GoogleGenerativeAI(apiKey);
//     const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });
//     const generativeModel = genAI.getGenerativeModel({ model: "gemini-pro" });

//     // Generate embedding for input text
//     const result = await embeddingModel.embedContent(JSON.stringify(body));
//     if (!result?.embedding?.values) {
//       throw new Error("Failed to generate embedding");
//     }

//     // Store embedding in Supabase
//     const { data: insertedData, error: insertError } = await supabase
//       .from("documents")
//       .insert({
//         content: JSON.stringify(body),
//         embedding: result.embedding.values,
//       })
//       .select();

//     if (insertError) {
//       console.error("Insert error:", insertError);
//       throw new Error(`Failed to insert document: ${insertError.message}`);
//     }

//     // Generate search query embedding
//     const searchQuery = "What is my market size?";
//     const queryEmbedding = await embeddingModel.embedContent(searchQuery);
//     if (!queryEmbedding?.embedding?.values) {
//       throw new Error("Failed to generate search query embedding");
//     }

//     // Retrieve similar content from Supabase
//     const { data: matches, error: searchError } = await supabase.rpc(
//       "match_documents",
//       {
//         query_embedding: queryEmbedding.embedding.values,
//         match_threshold: 0.7,
//         match_count: 5,
//       }
//     );
//     console.log("matches :", matches);

//     if (searchError) {
//       console.error("Search error:", searchError);
//       throw new Error(`Failed to search documents: ${searchError.message}`);
//     }

//     // Generate text using the most similar content
//     let generatedResponse = null;
//     if (matches && matches.length > 0) {
//       const mostSimilarMatch = matches[0];
//       console.log("mostSimilarMatch.content :", mostSimilarMatch.content);

//       // Generate text using the content and query
//       const prompt = `Query: ${searchQuery}\nContext: ${mostSimilarMatch.content}`;
//       const result = await generativeModel.generateContent(prompt);
//       const response = await result.response;
//       generatedResponse = response.text();
//     }

//     return NextResponse.json({
//       success: true,
//       matches: matches || [],
//       generatedResponse,
//       embeddingDimensions: result.embedding.values.length,
//     });
//   } catch (error: any) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: error.message || "An unexpected error occurred",
//       },
//       { status: error.status || 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";

interface RequestBody {
  text: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RequestBody;
    const supabase = await createClient();

    const apiKey = "AIzaSyDI5X6rQy7XVfIoOcAaiSwsY1roFufu3ws";
    if (!apiKey) {
      throw new Error("Missing API key configuration");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });
    const generativeModel = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate embedding for input text
    // const result = await embeddingModel.embedContent(body.text); // Use body.text directly
    const result = await embeddingModel.embedContent(JSON.stringify(body));
    if (!result?.embedding?.values) {
      throw new Error("Failed to generate embedding");
    }

    // Store embedding in Supabase
    const { data: insertedData, error: insertError } = await supabase
      .from("documents")
      .insert({
        content: JSON.stringify(body),
        embedding: result.embedding.values,
      })
      .select();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error(`Failed to insert document: ${insertError.message}`);
    }

    // Generate search query embedding
    const searchQuery =
      "What is the subject of the development of Learning Management System (LMS)?";
    const queryEmbedding = await embeddingModel.embedContent(searchQuery);
    if (!queryEmbedding?.embedding?.values) {
      throw new Error("Failed to generate search query embedding");
    }

    // Retrieve similar documents
    const { data: matches, error: searchError } = await supabase.rpc(
      "match_documents",
      {
        query_embedding: queryEmbedding.embedding.values,
        match_threshold: 0.7,
        match_count: 5,
      }
    );

    if (searchError) {
      console.error("Search error:", searchError);
      throw new Error(`Failed to search documents: ${searchError.message}`);
    }

    // Prepare context from multiple matches
    let context = "";
    console.log("matches :", matches);
    if (matches && matches.length > 0) {
      context = matches.map((match: any) => match.content).join("\n\n");
    }

    // Generate response using context from all relevant matches
    let generatedResponse = null;
    if (context) {
      const prompt = `
        sdO
      `;

      const result = await generativeModel.generateContent(prompt);
      const response = await result.response;
      generatedResponse = response.text();
    }

    return NextResponse.json({
      success: true,
      matches: matches || [],
      generatedResponse,
      embeddingDimensions: result.embedding.values.length,
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred",
      },
      { status: error.status || 500 }
    );
  }
}
