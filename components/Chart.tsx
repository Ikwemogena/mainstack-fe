import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

const RevenueChart = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['january', 'february', 'march', 'april', 'may', 'june', 'july'],
                datasets: [{
                    label: 'My First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 10],
                    tension: 0.4,
                    borderColor: '#FF5403',
                    pointRadius: 0,
                    // pointHoverRadius: 0, 
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