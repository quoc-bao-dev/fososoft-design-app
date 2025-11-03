function truncateText(text:string, maxLength:number):string {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

function capitalizeFirstLetter(text: string){
    return text.replace(/^./, (char) => char.toUpperCase());
}

export  {
    truncateText,
    capitalizeFirstLetter
}