export const getServicePricesStatus = async (): Promise<boolean> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}services/prices-status`,
    {
      headers: {
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};
