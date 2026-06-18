export async function fetchPosts(page = 1, limit = 10) {
  try {
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Không thể tải dữ liệu');
    }
    
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return [];
  }
}