export function initInfiniteScroll({ container, sentinel, fetchCallback, renderCallback }) {
    let page = 1;
    let isLoading = false;
    const observerOptions = {
        root: null, 
        rootMargin: '200px', 
        threshold: 0
    };
    const observer = new IntersectionObserver(async (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoading) {
            isLoading = true;
            page++;

            try {
                const data = await fetchCallback(page);
              
                if (data && data.length > 0) {
                    renderCallback(data);
                } else {
                    observer.unobserve(sentinel);
                }
            } catch (error) {
                console.error("Lỗi khi tải thêm dữ liệu:", error);
            } finally {
                isLoading = false;
            }
        }
    }, observerOptions);

    observer.observe(sentinel);
}