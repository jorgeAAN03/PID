'use client';

import { useState, useRef } from 'react';

export default function AddPosition() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [denomination, setDenomination] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({
    denomination: '',
    startDate: '',
    endDate: ''
  });

  const parseDateString = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  const validateDate = (dateStr: string) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/;
    return dateRegex.test(dateStr);
  };

  const validateForm = () => {
    const newErrors = {
      denomination: '',
      startDate: '',
      endDate: ''
    };

    if (!denomination.trim()) {
      newErrors.denomination = 'La denominación es requerida';
    } else if (denomination.trim().length < 5) {
      newErrors.denomination = 'La denominación debe tener al menos 5 caracteres';
    }

    if (!validateDate(startDate)) {
      newErrors.startDate = 'Formato de fecha inválido (DD/MM/YYYY)';
    }

    if (endDate) {
      if (!validateDate(endDate)) {
        newErrors.endDate = 'Formato de fecha inválido (DD/MM/YYYY)';
      } else {
        const start = parseDateString(startDate);
        const end = parseDateString(endDate);
        if (end <= start) {
          newErrors.endDate = 'La fecha de fin debe ser posterior a la fecha de inicio';
        }
      }
    }

    setErrors(newErrors);
    return !newErrors.denomination && !newErrors.startDate && !newErrors.endDate;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Formulario válido');
    }
  };

  const applyBasicFormat = (format: string) => {
    const textarea = document.getElementById('description') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = description.substring(start, end);
    let formattedText = '';

    switch(format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `_${selectedText}_`;
        break;
      case 'superscript':
        formattedText = `^${selectedText}^`;
        break;
      case 'subscript':
        formattedText = `~${selectedText}~`;
        break;
      case 'strikethrough':
        formattedText = `~~${selectedText}~~`;
        break;
    }

    const newText = description.substring(0, start) + formattedText + description.substring(end);
    setDescription(newText);

  
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + formattedText.length);
    }, 0);
  };

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const colorPickerRef = useRef(null);

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#808080',
    '#800000', '#008000', '#000080', '#808000',
    '#800080', '#008080', '#C0C0C0', '#FFFFFF'
  ];

  const applyTextFormat = (format: string, color?: string) => {
    const textarea = document.getElementById('description') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = description.substring(start, end);
    let formattedText = '';

    switch(format) {
      case 'color':
        formattedText = `<bg color="${color}">${selectedText}</bg>`;
        break;
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `_${selectedText}_`;
        break;
      case 'superscript':
        formattedText = `^${selectedText}^`;
        break;
      case 'subscript':
        formattedText = `~${selectedText}~`;
        break;
      case 'strikethrough':
        formattedText = `~~${selectedText}~~`;
        break;
    }

    const newText = description.substring(0, start) + formattedText + description.substring(end);
    setDescription(newText);

  
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + formattedText.length);
    }, 0);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    applyTextFormat('color', color);
    setShowColorPicker(false);
  };

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
            className={`w-full px-2 py-1 border rounded text-black ${errors.denomination ? 'border-red-500' : 'border-gray-300'}`}
            value={denomination}
            onChange={(e) => {
              setDenomination(e.target.value);
              if (errors.denomination) {
                setErrors(prev => ({ ...prev, denomination: '' }));
              }
            }}
          />
          {errors.denomination && <p className="text-red-500 text-sm mt-1">{errors.denomination}</p>}
        </div>

        <div className="flex gap-5 mb-4">
          <div className="flex-1">
            <label className="block mb-1 text-black">Fecha inicio *</label>
            <div className="flex">
              <input 
                type="text"
                className={`flex-1 px-2 py-1 border rounded-l text-black ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (errors.startDate) {
                    setErrors(prev => ({ ...prev, startDate: '' }));
                  }
                }}
                placeholder="DD/MM/YYYY"
              />
              <button className="px-2 py-1 border border-l-0 border-gray-300 rounded-r hover:bg-gray-50">📅</button>
            </div>
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
          </div>

          <div className="flex-1">
            <label className="block mb-1 text-black">Fecha fin:</label>
            <div className="flex">
              <input 
                type="text"
                className={`flex-1 px-2 py-1 border rounded-l text-black ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  if (errors.endDate) {
                    setErrors(prev => ({ ...prev, endDate: '' }));
                  }
                }}
                placeholder="DD/MM/YYYY"
              />
              <button className="px-2 py-1 border border-l-0 border-gray-300 rounded-r hover:bg-gray-50">📅</button>
            </div>
            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-black">Descripción:</label>
          <div className="flex gap-1 p-1 bg-gray-50 mb-1 border border-gray-300 rounded">
            <select className="px-2 py-1 border border-gray-300 rounded mr-2 text-black">
              <option>Helvetica</option>
            </select>
            <button 
              className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black"
              onClick={() => applyTextFormat('bold')}
            >B</button>
            <button 
              className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black"
              onClick={() => applyTextFormat('italic')}
            >I</button>
            <button 
              className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black"
              onClick={() => applyTextFormat('underline')}
            >U</button>
            <button 
              className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black"
              onClick={() => applyTextFormat('superscript')}
            >T↑</button>
            <button 
              className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black"
              onClick={() => applyTextFormat('subscript')}
            >T↓</button>
            <button 
              className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black"
              onClick={() => applyTextFormat('strikethrough')}
            >_</button>
            <div className="relative">
              <button 
                className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black"
                onClick={() => setShowColorPicker(!showColorPicker)}
                ref={colorPickerRef}
              >T</button>
              {showColorPicker && (
                <div className="absolute top-full left-0 mt-1 p-4 bg-white border border-gray-300 rounded shadow-lg grid grid-cols-4 gap-3 z-10 w-[200px]">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className="w-10 h-10 rounded border border-gray-300 hover:opacity-80 transition-opacity hover:scale-110"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                      title={color}
                    />
                  ))}
                </div>
              )}
            </div>
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black">≡</button>
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-white text-black">≣</button>
          </div>
          <textarea 
            id="description"
            className="w-full h-[200px] px-3 py-2 border border-gray-300 rounded text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 bg-gray-50 flex justify-end gap-2 rounded-b-lg">
        <button className="px-4 py-1 border border-gray-300 rounded bg-[#9b7ba8] hover:opacity-90">Cancelar</button>
        <button 
          className="px-4 py-1 border border-gray-300 rounded bg-[#9b7ba8] hover:opacity-90"
          onClick={handleSubmit}
        >Aplicar</button>
        <button 
          className="px-4 py-1 bg-[#9b7ba8] text-white rounded hover:opacity-90"
          onClick={handleSubmit}
        >Aceptar</button>
      </div>
    </div>
  );
}