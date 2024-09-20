
import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Bar } from 'react-chartjs-2';

import "chart.js/auto";
import NavBar from './NavBar';
 
const Chart = () => {

    const [products, setProducts] = useState([]);

    const [chartData, setChartData] = useState({});
 
    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await axios.get('http://localhost:5000/api/submitbid');

                setProducts(response.data);

            } catch (err) {

                console.error(err);

            }

        };

        fetchProducts();

    }, []);
 
    const handleData = () => {

        const groupByEmail = {};
 
        products.forEach((product) => {

            const email = product.email;

            if (!groupByEmail[email]) {

                groupByEmail[email] = [];

            }

            groupByEmail[email].push({ productName: product.productName, bidamount: product.bidamount });

        });
 
        const emails = Object.keys(groupByEmail);

        const allProductNames = Array.from(new Set(products.map(product => product.productName)));
 
        const datasets = allProductNames.map(productName => {

            const data = emails.map(email => {

                const bid = groupByEmail[email].find(bid => bid.productName === productName);

                return bid ? bid.bidamount : 0;

            });
 
            return {

                label: `Product: ${productName}`,

                data: data,

                backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,

                borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,

                borderWidth: 1,

            };

        });
 
        const data = {

            labels: emails,

            datasets: datasets

        };
 
        setChartData(data);

    };
 
    return (

        <div>
            <NavBar/>

            <h2 className='mt-3 ml-9'>Bid Amounts by Email</h2>

            <button className='mt-1 ml-9' onClick={handleData}>Generate Chart</button>

            <div className=' container 'style={{ width: '600px', height: '400px' }}>

                {chartData.labels && <Bar data={chartData} options={{

                    plugins: {

                        tooltip: {

                            callbacks: {

                                title: (context) => {

                                    const email = context[0].label;

                                    return `Email: ${email}`;

                                },

                                label: (context) => {

                                    const productName = context.dataset.label;

                                    const bidAmount = context.raw;

                                    return `${productName}, Bid Amount: ${bidAmount}`;

                                }

                            }

                        }

                    },

                    scales: {

                        x: {

                            title: {

                                display: true,

                                text: 'Email'

                            }

                        },

                        y: {

                            title: {

                                display: true,

                                text: 'Bid Amount'

                            }

                        }

                    }

                }} />}

            </div>

        </div>

    );

};
 
export default Chart;
