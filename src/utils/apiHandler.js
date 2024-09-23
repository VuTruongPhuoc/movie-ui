export const getHeaderConfig = (contentType) => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)}`,
            'Content-Type': 'application/json',
        },
    };
};
