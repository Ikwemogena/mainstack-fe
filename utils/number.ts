export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'code' }).format(amount);
}