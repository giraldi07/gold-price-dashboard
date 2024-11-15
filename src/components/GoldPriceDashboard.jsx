import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoldPriceDashboard = () => {
    const [goldData, setGoldData] = useState(null);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // Mendapatkan data harga emas dari API
        axios.get('https://scrap-gold.vercel.app/api/gold_prices')
            .then(response => {
                setGoldData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));

        // Menambahkan logic untuk menampilkan tanggal dan waktu saat ini
        const date = new Date();
        const formattedDate = date.toLocaleString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric' 
        });
        setCurrentDate(formattedDate);
    }, []);

    if (!goldData) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    const { harga, waktu, table2_data, table3_data } = goldData;

    return (
        <div className="container" style={{ paddingTop: '20px' }}>
            {/* Table 1 */}
            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                    <h2 className="text-center">Harga Emas Hari Ini</h2>
                    <p className="text-center">Tanggal dan Waktu: {currentDate}</p>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th colSpan="2" className="text-center">USD (Spot Dunia)</th>
                                    <th colSpan="3" className="text-center">IDR (Kurs Tengah BI)</th>
                                    <th colSpan="3" className="text-center">IDR (Spot Dunia)</th>
                                    <th colSpan="2" className="text-center">Logam Mulia (Antam) - 1 gr</th>
                                </tr>
                                <tr>
                                    <th>/oz</th>
                                    <th>/gr</th>
                                    <th>IDR/USD</th>
                                    <th>/oz</th>
                                    <th>/gr</th>
                                    <th>IDR/USD</th>
                                    <th>/oz</th>
                                    <th>/gr</th>
                                    <th>Jual</th>
                                    <th>Buy Back</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {Array.isArray(harga) && harga.map((price, index) => (
                                        <td key={index}>{price}</td>
                                    ))}
                                </tr>
                                <tr>
                                    {Array.isArray(waktu) && waktu.map((time, index) => (
                                        <th key={index} colSpan="2" className="bg-success text-white">
                                            {time}
                                        </th>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Table 2 */}
            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                    <strong>Spot Harga Emas Hari Ini (Market Open)</strong> | <strong>Konversi Satuan</strong>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th colSpan="4" className="text-center">Spot Harga Emas Hari Ini (Market Open)</th>
                                    <th colSpan="3" className="text-center">Konversi Satuan</th>
                                </tr>
                                <tr>
                                    <th>Satuan</th>
                                    <th>USD</th>
                                    <th>Kurs Dollar</th>
                                    <th>IDR</th>
                                    <th>Ounce (oz)</th>
                                    <th>Gram (gr)</th>
                                    <th>Kilogram (kg)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(table2_data) && table2_data.map((row, index) => (
                                    <tr key={index} className="text-right">
                                        {Array.isArray(row) && row.map((cell, idx) => (
                                            <td key={idx}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Table 3 */}
            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                    <strong>Harga Emas (Gram dan Batangan)</strong>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th colSpan="5" className="text-center">
                                        <a href="https://harga-emas.org/logam-mulia/" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-primary">
                                            Harga Emas Hari Ini
                                        </a>
                                    </th>
                                </tr>
                                <tr>
                                    <th rowSpan="2" className="text-center">Gram</th>
                                    <th colSpan="2" className="text-center">Gedung Antam Jakarta</th>
                                    <th colSpan="2" className="text-center">Pegadaian</th>
                                </tr>
                                <tr>
                                    <th>per Gram (Rp)</th>
                                    <th>per Batangan (Rp)</th>
                                    <th>per Gram (Rp)</th>
                                    <th>per Batangan (Rp)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(table3_data) && table3_data.map((row, index) => (
                                    <tr key={index}>
                                        {Array.isArray(row) && row.map((cell, idx) => (
                                            <td key={idx}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="footer mt-5 text-center">
                <footer>
                    <p>Data Realtime BY BLOSSOMBIZ</p>
                </footer>
            </div>
        </div>
    );
};

export default GoldPriceDashboard;
