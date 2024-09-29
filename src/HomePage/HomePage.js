import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';
import '../App.scss';  



const colors = [
    '#FF5733',  // Vibrant Orange
    '#33FF57',  // Bright Green
    '#3357FF',  // Bold Blue
    '#FFC300',  // Rich Yellow
    '#DAF7A6',  // Soft Green
    '#FF33FF',  // Neon Pink
    '#FF914D',  // Warm Orange
    '#33FFF5',  // Aqua Blue
    '#FF5733',  // Coral Red
    '#C70039',  // Deep Red
    '#900C3F',  // Dark Purple
    '#581845',  // Maroon Purple
    '#34A853',  // Google Green
    '#4285F4',  // Google Blue
    '#FBBC05',  // Google Yellow
    '#EA4335',  // Google Red
];

function BarChart() {
    const svgRef = useRef();

    useEffect(() => {
        axios.get('http://localhost:3500/budget')
            .then(response => {
                const data = response.data.myBudget;
                const svg = d3.select(svgRef.current);
                const width = 500;
                const height = 300;
                const margin = { top: 20, right: 30, bottom: 30, left: 40 };
                const innerWidth = width - margin.left - margin.right;
                const innerHeight = height - margin.top - margin.bottom;

                const x = d3.scaleBand()
                    .domain(data.map(d => d.title))
                    .range([0, innerWidth])
                    .padding(0.1);


                const y = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.budget)])
                    .nice()
                    .range([innerHeight, 0]);

                const g = svg.append('g')
                    .attr('transform', `translate(${margin.left},${margin.top})`);

                g.selectAll('.bar')
                    .data(data)
                    .enter()
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('x', d => x(d.title))
                    .attr('y', d => y(d.budget))
                    .attr('width', x.bandwidth())
                    .attr('height', d => innerHeight - y(d.budget))
                    .attr('fill', (d, i) => colors[i % colors.length]);

                g.append('g')
                    .attr('class', 'x-axis')
                    .attr('transform', `translate(0,${innerHeight})`)
                    .call(d3.axisBottom(x));

                g.append('g')
                    .attr('class', 'y-axis')
                    .call(d3.axisLeft(y).ticks(null, 's'))
                    .append('text')
                    .attr('x', 2)
                    .attr('y', y(y.ticks().pop()) + 0.5)
                    .attr('dy', '0.32em')
                    .attr('fill', '#000')
                    .attr('font-weight', 'bold')
                    .attr('text-anchor', 'start')
                    .text('Budget');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <svg ref={svgRef} width={480} height={310}></svg>
    );
}

function HomePage() {
    const [myBudget, setBudgetData] = useState([]);
    const d3Container = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:3500/budget')
            .then(response => {
                const data = response.data.myBudget;
                console.log('Data:', data);
                setBudgetData(data);

                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                const ctx = document.getElementById('Chart').getContext('2d');
                chartRef.current = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: data.map(item => item.title),
                        datasets: [{
                            data: data.map(item => item.budget),
                            backgroundColor: [
                                '#FF5733',  // Vibrant Orange
                                '#33FF57',  // Bright Green
                                '#3357FF',  // Bold Blue
                                '#FFC300',  // Rich Yellow
                                '#DAF7A6',  // Soft Green
                                '#FF33FF',  // Neon Pink
                                '#FF914D',  // Warm Orange
                                '#33FFF5',  // Aqua Blue
                                '#FF5733',  // Coral Red
                                '#C70039',  // Deep Red
                                '#900C3F',  // Dark Purple
                                '#581845',  // Maroon Purple
                                '#34A853',  // Google Green
                                '#4285F4',  // Google Blue
                                '#FBBC05',  // Google Yellow
                                '#EA4335',  // Google Red
                            ]   
                        }]
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); 

    return (
        <div className="container center">

        <div className="page-area">

            <div className="text-box">
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
                
            </div>
    
            <div className="text-box">
                <h1>Alerts</h1>
                <p>
                What  if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </div>
    
            <div className="text-box">
                <h1>Results</h1>
                <p>
                People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </div>
    
            <div className="text-box">
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </div>


            <article className="All">
            <div className="text">
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </div>
     
    
            <div className="text">
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </div>
    
            <div className="text">
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </div>
    
            <div className="text">
                <h1>Chartjs pie chart to observe Trends </h1>
                <p>
                    <canvas id="Chart" width="50" height="50"></canvas>
                </p>
            </div>
            <div ref={d3Container} className="text">
                <h1>D3js Chart to analyze the trends </h1>
                <BarChart />
            </div>
        </article>
        </div>

    </div>
    );
}

export default HomePage;