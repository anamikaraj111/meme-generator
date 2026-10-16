
 export const getAllMemes = async (signal) => {
     const response = await fetch('https://api.imgflip.com/get_memes', { signal });
     if (!response.ok) {
         throw new Error(`Could not load memes (HTTP ${response.status}).`);
     }

     const result = await response.json();
     if (!result.success || !Array.isArray(result.data?.memes)) {
         throw new Error('The meme service returned an invalid response.');
     }

     return result.data.memes;
 };

    