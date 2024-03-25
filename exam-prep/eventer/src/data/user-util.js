function getUser() {
    //returns deserialized data
    return JSON.parse(localStorage.getItem('user'));
}

// for abstract fetch requester
function setUser(data) {
    return localStorage.setItem('user', JSON.stringify(data));
}

// converts result from getUser() into boolean
function hasUser() {
    return !!getUser();
}

export {
    getUser,
    setUser,
    hasUser
}