import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    await prisma.todo.deleteMany();

    const user = await prisma.user.create({
      data: {
        email: "user@example.com",
        name: "Example User",
      }
    });


    await prisma.todo.createMany({
      data: [
        { title: "Learn Next.js", completed: false, userId: user.id },
        { title: "Build a Todo App", completed: false, userId: user.id },
        { title: "Deploy to Vercel", completed: false, userId: user.id },
        { title: "Explore Prisma", completed: false, userId: user.id },
        { title: "Write Tests", completed: false, userId: user.id },
        { title: "Optimize Performance", completed: false, userId: user.id },
        { title: "Add Authentication", completed: false, userId: user.id },
        { title: "Create API Endpoints", completed: false, userId: user.id },
        { title: "Implement UI Components", completed: false, userId: user.id },
        { title: "Document the Project", completed: false, userId: user.id },
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