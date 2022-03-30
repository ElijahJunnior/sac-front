

export function CapitalizeFirstLetter(text: string, type: "first-word" | "all-line" = "first-word") {
    
    if (!text) { return ""; }
    
    if (text.length === 1) { return text.toUpperCase(); }

    text = text.toLowerCase();

    if (type === "first-word") {

        return text.charAt(0).toUpperCase() + text.slice(1);

    } else { 

        const arr = text.split(" ");

        for (var i = 0; i < arr.length; i++) {
            
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

        }
        
        return arr.join(" ");

    }    

}
