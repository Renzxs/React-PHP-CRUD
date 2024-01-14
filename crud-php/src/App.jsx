import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import NavBar from './components/NavBar.jsx';
import axios from 'axios';

function AddData() {
  const [formData, setFormData] = useState({
    id: '',
    name: ''
  });

  const [data, setData] = useState(null);

  const handleChange = (e) => {
    setFormData({
      id: crypto.randomUUID(),
      name: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost/react-api/index.php', formData)
      .then(response => {
        console.log('Data successfully send: ', response.data);

        axios.get('http://localhost/react-api/index.php')
        .then(response => {
          // Handle the response data
          setData(response.data);
        })
        .catch(error => {
          // Handle errors
          console.error('Error fetching data:', error);
        });

      })
      .catch(error => {
        console.error('Error sending data: ', error);
      });
  };

  useEffect(() => {
    axios.get('http://localhost/react-api/index.php')
        .then(response => {
          // Handle the response data
          setData(response.data);
        })
        .catch(error => {
          // Handle errors
          console.error('Error fetching data:', error);
        });
      console.log("SHEESH")
  }, [formData]);

  return (
    <> 
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Enter your name:' className='border-2 px-10 py-2 mb-4'/>
        <button type='submit' className='bg-black text-white px-6 py-2 mb-4'>Add</button>
      </form>
      <ListData data={data}/>
    </>

  );
}

function ListData({data}) {
  return (
    <div>
      {data && (
        <table>
          <tbody>
              <tr>
              <td className='border-2'>ID</td>
              <td className='border-2'>Name</td>
            </tr>
            {
              data.map((user) => {
                return (
                  <tr key={user.id}>
                    <td className='border-2'>{user.id}</td>
                    <td className='border-2'>{user.name}</td>
                  </tr>
                );
              })
            }
          </tbody>
          
        
        </table>
      )}
    </div>
  )
}


function App() {
  return (
    <>
      <AddData />
    </>
  )
}

export default App;
