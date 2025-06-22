import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ChartDataLabels);

const ComparisonChart = ({ data, title }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Bar
                data={data}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: title,
                        },
                        datalabels: {
                            anchor: 'end',
                            align: 'top',
                            formatter: (value) => value.toFixed(2),
                            color: 'black',
                            font: {
                                weight: 'bold',
                            },
                        },
                    },
                    scales: {
                        x: {
                            type: 'category',
                            title: {
                                display: true,
                                text: 'Categoría'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Valor'
                            },
                            ticks: {
                                // Adjust to make the changes more representative
                                stepSize: 10,
                                callback: (value) => value.toFixed(2),
                            },
                        }
                    }
                }}
            />
        </div>
    );
};

export default ComparisonChart;
