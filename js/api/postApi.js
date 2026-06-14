export async function fetchPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if(!response.ok) {
      throw new Error('không thể tải dữ liệu');
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return [];
  }
}