export const getImgTagsFromString = (inputString: string) => {
    return inputString.split('\n').map((url) => `<img src=${url} />`).join('');
};