const BASE_URL = 'http://localhost:8000';

const getUser = async (userId) => {
    try {
        const response = await fetch(
            `${BASE_URL}/user?id=${userId}`,{
            method: 'GET'
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Failed to fetch user from database. \n', err);
    }
}

export {getUser};