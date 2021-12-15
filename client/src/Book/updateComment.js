export const updateComment = async (url, body) => {
    const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    await response.json();
}
