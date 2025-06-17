'use client';

import { useState } from 'react';

export default function AddPosition() {
  const [startDate, setStartDate] = useState('01/10/2024');
  const [endDate, setEndDate] = useState('');
  const [denomination, setDenomination] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="w-[600px] bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="bg-[#9b7ba8] text-black px-4 py-2 flex justify-between items-center rounded-t-lg">
        <h2 className="text-base m-0">Adicionar cargo</h2>
        <div className="flex gap-2">
          <button className="text-xl hover:opacity-80">−</button>
          <button className="text-xl hover:opacity-80">×</button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <label className="block mb-1 text-black">Denominación *</label>
          <input 
            type="text"
            className="w-full px-2 py-1 border border-gray-300 rounded text-black"
            value={denomination}
            onChange={(e) => setDenomination(e.target.value)}
          />
        </div>

        <div className="flex gap-5 mb-4">
          <div className="flex-1">
            <label className="block mb-1 text-black ">Fecha inicio *</label>
            <div className="flex">
              <input 
                type="text"
                className="flex-1 px-2 py-1 border border-gray-300 rounded-l text-black"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <button className="px-2 py-1 border border-l-0 border-gray-300 rounded-r hover:bg-gray-50">📅</button>
            </div>
          </div>

          <div className="flex-1">
            <label className="block mb-1 text-black">Fecha fin:</label>
            <div className="flex">
              <input 
                type="text"
                className="flex-1 px-2 py-1 border border-gray-300 rounded-l text-black"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <button className="px-2 py-1 border border-l-0 border-gray-300 rounded-r hover:bg-gray-50">📅</button>
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-black">Descripción:</label>
          <div className="flex gap-1 p-1 bg-gray-50 mb-1 border border-gray-300 rounded">
            <select className="px-2 py-1 border border-gray-300 rounded mr-2 text-black">
              <option>Helvetica</option>
            </select>
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black">B</button>
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black">I</button>
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black">U</button>
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black">T↑</button>
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black">T↓</button>
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black">_</button>
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black">T</button>
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black">≡</button>
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black">≣</button>
          </div>
          <textarea 
            className="w-full h-[200px] px-3 py-2 border border-gray-300 rounded text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 bg-gray-50 flex justify-end gap-2 rounded-b-lg">
        <button className="px-4 py-1 border border-gray-300 rounded bg-[#9b7ba8] hover:opacity-90">Cancelar</button>
        <button className="px-4 py-1 border border-gray-300 rounded bg-[#9b7ba8] hover:opacity-90">Aplicar</button>
        <button className="px-4 py-1 bg-[#9b7ba8] text-white rounded hover:opacity-90">Aceptar ▼</button>
      </div>
    </div>
  );
}