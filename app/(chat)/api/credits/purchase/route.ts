import { auth } from "@/app/(auth)/auth";
import { updateUserCredits } from "@/lib/db/queries";
import { processPayment } from "@/lib/payments";
import { creditPackages } from "@/lib/constants";
import { NextResponse } from "next/server";

// POST /api/credits/purchase - Purchase credits
export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { packageId } = await request.json();

    // Find the package
    const selectedPackage = creditPackages.find((pkg) => pkg.id === packageId);

    if (!selectedPackage) {
      return NextResponse.json(
        { error: "Invalid package selected" },
        { status: 400 }
      );
    }

    // Process payment using our payments library
    const paymentSuccessful = await processPayment(
      session.user.id,
      selectedPackage.price * 100 // Convert to cents for payment processor
    );

    if (!paymentSuccessful) {
      return NextResponse.json(
        { error: "Payment processing failed" },
        { status: 400 }
      );
    }

    // Update user credits in database
    const creditsUpdated = await updateUserCredits(
      session.user.id,
      selectedPackage.credits
    );

    if (!creditsUpdated) {
      return NextResponse.json(
        { error: "Failed to update credits" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully purchased ${selectedPackage.credits} credits`,
      package: selectedPackage,
    });
  } catch (error) {
    console.error("Error processing credit purchase:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your purchase" },
      { status: 500 }
    );
  }
}
