export async function fetchPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Không thể tải dữ liệu bài viết');
    
    const posts = await response.json();
    // Vì API trả về 100 bài, chúng ta lấy tạm 10-20 bài cho dễ nhìn nhé
    return posts.slice(0, 15); 
  } catch (error) {
    console.error('Lỗi khi fetch API:', error);
    return [];
  }
}