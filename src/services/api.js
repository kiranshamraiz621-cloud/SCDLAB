import axios from 'axios';
const NASA=import.meta.env.VITE_NASA_API_KEY||'DEMO_KEY';
export const api=axios.create({baseURL:import.meta.env.VITE_API_URL||'/api'});
export async function getApod(){const {data}=await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA}`);return data}
export async function searchNasaImages(q='galaxy'){const {data}=await axios.get(`https://images-api.nasa.gov/search?q=${encodeURIComponent(q)}&media_type=image`);return data.collection.items.slice(0,24)}
export async function getSpaceNews(){const {data}=await axios.get('https://api.spaceflightnewsapi.net/v4/articles/?limit=12');return data.results}
