import { Transaction } from '@/app/lib/definitions';
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

const RevenueChart = ({ transactions }: { transactions: Transaction[] }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        // real data
        // const dataByMonth: Record<string, number> = {};
        // transactions.forEach(transaction => {
        //     const date = new Date(transaction.date);
        //     const year = date.getFullYear();
        //     const month = date.getMonth();

        //     const key = `${year}-${month}`;
        //     const revenue = dataByMonth[key] || 100;
        //     dataByMonth[key] = revenue + transaction.amount;
        // });

        // const labels = Object.keys(dataByMonth).map(key => {
        //     const [year, month] = key.split('-');
        //     return new Date(parseInt(year), parseInt(month), 1).toLocaleString('default', { month: 'long', year: 'numeric' });
        // });
        // const data = Object.values(dataByMonth);

        // to demonstrate curveness
        const data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000));

        const labels = Array.from({ length: 12 }, (_, i) => {
            return new Date(2022, i, 1).toLocaleString('default', { month: 'long', year: 'numeric' });
        })

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Revenue',
                    data: data,
                    tension: 0.4,
                    borderColor: '#FF5403',
                    pointRadius: 0
                }],
            },
            options: {
                scales: {

                    y: {
                        beginAtZero: true,
                        display: false,
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    },

                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            }
        });

        return () => myChart.destroy();
    }, []);

    return <canvas ref={chartRef} />;
}

export default RevenueChart;