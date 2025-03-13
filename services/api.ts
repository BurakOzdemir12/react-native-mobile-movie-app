export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    }
}

export const fetchMovies = async ({query}: { query: string }) => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });
    if (!response.ok) {
        // @ts-ignore
        throw new Error('Something went wrong', response.statusText);
    }
    const data = await response.json();

    return data.results;
}
// /discover/movie

// export const fetchMovies = async ({ query }: { query: string }) => {
//     const endpoint = query
//         ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
//         : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
//
//     console.log("🔍 API Request URL:", endpoint); // API'ye giden URL'yi yazdır
//     console.log("🔑 API Key:", TMDB_CONFIG.API_KEY); // API Anahtarının doğru gelip gelmediğini kontrol et
//
//     try {
//         const response = await fetch(endpoint, {
//             method: 'GET',
//             headers: TMDB_CONFIG.headers,
//         });
//
//         console.log("🔄 Response Status:", response.status); // HTTP Yanıt Kodunu Yazdır
//
//         if (!response.ok) {
//             throw new Error(`❌ API Error: ${response.status} - ${response.statusText}`);
//         }
//
//         const data = await response.json();
//         console.log("✅ API Response:", JSON.stringify(data, null, 2)); // API'den gelen veriyi ekrana yazdır
//
//         return data.results;
//     } catch (error) {
//         console.error("⚠️ Fetch Movies Error:", error);
//         return [];
//     }
// };

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
    {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    }); //&language=tr-TR
        if (!response.ok) throw new Error("failed to fetch movie details");

        const data = await response.json();
        return data;
    }catch (err){
        console.log(err);
        throw err;
    }
}