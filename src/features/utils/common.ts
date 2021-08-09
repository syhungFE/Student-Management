export const capitalFirstLetter = (str: string) => {
    if(!str) return '';

    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export const getMarkColor = (mark: number) => {
    if(mark >= 8 ) return 'green';

    if(mark >= 5) return 'goldenrod';

    return 'red';
}