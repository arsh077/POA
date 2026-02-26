import React, { useState } from 'react';
import { ClientType, FormData } from './types';
import { FormEditor } from './components/FormEditor';
import { DocumentPreview } from './components/DocumentPreview';

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    clientName: 'GANESH SAHOO',
    parentName: 'Gour Chandra Sahoo',
    address: 'S/O Gour Chandra Sahoo, Vill- Radhamohanpur, Post- Radhamohanpur, PS- Debra, Dist- Paschim Medinipur, West Bengal - 721160',
    clientType: ClientType.Individual,
    workDescription: 'various artistic, literary, musical works and/or sound recordings',
    date: new Date().toISOString().split('T')[0] // Default to today YYYY-MM-DD
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col h-screen overflow-hidden">
      {/* Header - No Print */}
      <header className="bg-slate-900 text-white p-4 shadow-md no-print z-10 shrink-0">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="text-xl font-semibold tracking-tight">Copyright Authorisation Portal</h1>
          </div>
          <div className="text-sm text-slate-400">
            Secure Legal Generator
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden bg-gray-100">
        
        {/* Left Side: Editor (Scrollable) */}
        <div className="w-full md:w-1/3 max-w-md p-4 no-print overflow-y-auto border-r border-gray-200">
          <FormEditor 
            data={formData} 
            onChange={handleChange}
            onPrint={handlePrint}
          />
        </div>

        {/* Right Side: Preview (Scrollable) */}
        <div className="flex-1 p-8 overflow-y-auto bg-gray-500/10 flex justify-center">
          <div className="w-full max-w-[210mm]">
             <DocumentPreview data={formData} />
          </div>
        </div>

      </main>
    </div>
  );
}
