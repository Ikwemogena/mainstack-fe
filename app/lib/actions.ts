
const baseUrl = process.env.BASE_URL;
export async function getUser() {
    try {
        const response = await fetch(`${baseUrl}/user`);
        return response.json();

    } catch (error) {
        return { error };
    }
}


export async function getWallet() {
    try {
        const response = await fetch(`https://fe-task-api.mainstack.io/wallet`);
        return response.json();
    } catch (error) {
        return { error };
    }
}

export async function getTransactions() {
    try {
        const response = await fetch(`https://fe-task-api.mainstack.io/transactions`);
        return response.json();
    } catch (error) {
        return { error };
    }
}