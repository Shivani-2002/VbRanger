//fetch information from the browser

export const userAccessToken = () => {
    //If the user logs in for the first time,,it will be undefined
    const accessToken = localStorage.getItem('accessToken') !== 'undefined' 
    ? JSON.parse(localStorage.getItem('accessToken'))
    : localStorage.clear() ;

    return accessToken;
};


export const fetchUserInfo = () => {
    //If the user logs in for the first time,,it will be undefined
    const userInfo = localStorage.getItem('user') !== 'undefined' 
    ? JSON.parse(localStorage.getItem('user'))
    : localStorage.clear() ;

    return userInfo;
};