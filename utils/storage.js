export const setLocalStorage = ({ name, value }) => {
    localStorage.setItem(name, JSON.stringify(value));
}
export const getLocalStorage = (name) => {
    try {
        return JSON.parse(localStorage.getItem(name));
    } catch (error) {
        return null;
    }
}
export const removeLocalStorage = (name) => {
    localStorage.removeItem(name);
}
