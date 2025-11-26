import React, { useState, useEffect } from 'react';

// fetching data ke API secara asinkron
export default function Tes() {
    const [tableData, setTableData] = useState([]);
    const name = useState('');
    const username = useState('');
    const email = useState('');


    useEffect(() => {
        const fetchData = async () => {
        try {
            // melakukan fetch data dari API
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/users'
            );

            const data = await response.json(); //saat diterima, format data diubah ke json
            setTableData(data); //update state dengan data yang diterima

        } catch (error) {
            console.error('Error mendapatkan user:', error);
        }
    };
    fetchData();
    
    }, []);


    // fungsi untuk menghandle submit form
    // dengan metoded async dam memiliki parameter event
    const handleSubmit = async (event) => {
        event.preventDefault(); // mencegah perilaku default form submit

        if (name && username && email) { // pastikan semua field terisi
            // membuat objek data baru dari inputan user
            const newData = {name, username, email}; 
           
           // melakukan fetch ke API untuk mengirim data baru
            try{
                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/users',
                    {
                        method: 'POST', // dengana method POST
                        headers: { 
                            'Content-Type': 'application/json', 
                        },
                        body: JSON.stringify(newData), // body berisi data baru dalam format JSON
                    }
                );
                const data = await response.json(); // mengubah response ke format JSON

                // menambahkan data baru ke state komponen tableData
                setTableData([...tableData, data]); 
                
            } catch (error) {
                console.error('Error menambahkan user:', error);   
            }
        }
    }

    const updateSubmit = async (editingId) => {
        editingId.preventDefault();
        if (name && username && email) {
            const updatedData = {name, username, email};
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${editingId}`, 
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedData),
                    }
                );
                const data = await response.json();

                // memperbarui state tableData dengan data yang diupdate
                setTableData(tableData.map(user => user.id === 1 ? data : user));

            } catch (error) {   
                console.error('Error mengupdate user:', error);
            }
        }

    };

    const handleDelete = async (id) => {
        try{
            await fetch(
                `https://jsonplaceholder.typicode.com/users/${id}`,
                {
                    method: 'DELETE',
                }
            );

            // membuat data dari array tableData dengan user yang dihapus dihilangkan
            const deletedData = tableData.filter(user => user.id !== id);
            setTableData(deletedData);
        } catch (error) {
            console.error('Error menghapus user:', error);
        }
    }
    
    handleSubmit();
    updateSubmit();
    handleDelete();

    return (
        <div>
            <h2>Users</h2>
            {tableData.length > 0 ? (
                <ul>
                    {tableData.map(user => (
                        <li key={user.id}>{user.name} ({user.email})</li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}