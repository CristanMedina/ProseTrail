export const formatDate = ( dateString ) => {
    const date = new Date(dateString);
    if(isNaN(date.getTime())) {
        return "Fecha Invalida";
    }

    return date.toLocaleString(
        "es-MX", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }
    );
}