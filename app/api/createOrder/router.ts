// import { NextResponse } from "next/server";
// import RazorPay from "razorpay";

// const razorpay = new RazorPay({
//   key_id: process.env.RAZORPAY_KEY_ID as string,
//   key_secret: process.env.RAZOR_SECRET_KEY as string,
// });

// export async function POST(req: Request) {
//   try {
//     const { amount, currency } = await req.json(); // ✅ Read both amount & currency

//     const order = await razorpay.orders.create({
//       amount: amount * 100,  // ✅ Convert to paise if needed
//       currency,              // ✅ Dynamic currency support
//       receipt: `receipt_${Date.now()}`, // Optional receipt ID
//     });

//     return NextResponse.json(order);
//   } catch (error: any) {
//     console.error("Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
