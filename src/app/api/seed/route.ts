import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    await prisma.todo.deleteMany();

    await prisma.todo.createMany({
      data: [
        { title: "Learn Next.js", completed: false },
        { title: "Build a Todo App", completed: false },
        { title: "Deploy to Vercel", completed: false },
        { title: "Explore Prisma", completed: false },
        { title: "Write Tests", completed: false },
        { title: "Optimize Performance", completed: false },
        { title: "Add Authentication", completed: false },
        { title: "Create API Endpoints", completed: false },
        { title: "Implement UI Components", completed: false },
        { title: "Document the Project", completed: false },
      ],
    });

    console.log("Seeding database...");

    // Return a success response
    return NextResponse.json(
      { message: "Database seeded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}