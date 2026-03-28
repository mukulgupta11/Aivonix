"use server";
import { PLAN_ENUM, PLANS } from "@/lib/constant";
import prisma from "@/lib/prisma";
import { HTTPException } from "hono/http-exception";
import { generateNoteTitleFromContent } from "@/lib/ai/titles";

/** Server action: suggest a title from note body (client may apply or edit). */
export async function suggestNoteTitleFromContent(content: string) {
  return generateNoteTitleFromContent(content);
}

export async function createDefaultSubscription(
  userId: string,
  stripeCustomerId: string
) {
  try {
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        referenceId: userId,
      },
    });
    if (existingSubscription) {
      return {
        success: true,
        subscription: existingSubscription,
      };
    }

    const subscription = await prisma.subscription.create({
      data: {
        referenceId: userId,
        plan: PLAN_ENUM.FREE,
        stripeCustomerId: stripeCustomerId,
        status: "active",
      },
    });

    return { success: true, subscription };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Failed to create subscription",
    };
  }
}

export async function checkGenerationLimit(userId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      referenceId: userId,
      status: "active",
    },
  });

  if (!subscription) {
    throw new HTTPException(404, { message: "No active subscription" });
  }

  const plan = PLANS.find((p) => p.name === subscription.plan);
  if (!plan)
    throw new HTTPException(400, {
      message: "No Subscription or invalid plan",
    });

  const periodStart = subscription.periodStart ?? new Date(0);
  const periodEnd = subscription.periodEnd ?? new Date();

  const generationCount = await prisma.message.count({
    where: {
      chat: { userId },
      role: "assistant",
      createdAt: {
        gte: periodStart,
        lte: periodEnd,
      },
    },
  });

  const isAllowed =
    plan.limits.generations === Infinity ||
    generationCount < plan.limits.generations;

  const maxLimit = Math.max(0, plan.limits.generations - generationCount);

  const hasPaidSubscription = !!subscription.stripeSubscriptionId;

  return {
    isAllowed,
    hasPaidSubscription,
    plan: subscription.plan,
    generationsUsed: generationCount,
    generationsLimit:
      plan.limits.generations === Infinity ? null : plan.limits.generations,
    remainingGenerations:
      plan.limits.generations === Infinity ? "Unlimited" : maxLimit,
  };
}
