export const removeComment = async (url) => {
    const response = await fetch(url, {
        method: 'post',
    });
    await response.json();
}
