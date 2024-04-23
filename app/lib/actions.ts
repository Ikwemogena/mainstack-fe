
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

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
        const response = await fetch(`${baseUrl}/wallet`);
        return response.json();
    } catch (error) {
        return { error };
    }
}

export async function getTransactions() {
    try {
        const response = await fetch(`${baseUrl}/transactions`);
        return response.json();
    } catch (error) {
        return { error };
    }
}