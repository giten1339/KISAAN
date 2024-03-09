export async function addVerificationDetails(blockNumber, userId) {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/verification`,
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ user: userId, blockNumber }),
      }
   );
   return res;
}
