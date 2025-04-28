export const sendDatatoGas = async <T extends Record<string, unknown>>(data: T) => {
    try {
        const response = await fetch("api/gas", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });

        if(!response.ok) {
            throw new Error("Failed to send data");
        }
        return response.json();
    }
    catch(error) {
        console.log("sendDatatoGasにてエラーが発生しました。", error);
    }

}