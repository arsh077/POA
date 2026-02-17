import React from 'react';
import { ClientType, FormData } from '../types';
import { Calendar, User, MapPin, Briefcase, FileText } from 'lucide-react';

interface FormEditorProps {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  onPrint: () => void;
}

export const FormEditor: React.FC<FormEditorProps> = ({ data, onChange, onPrint }) => {
  const isIndividual = data.clientType === ClientType.Individual || data.clientType === ClientType.Proprietorship;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-full overflow-y-auto no-print">
      <div className="mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Document Details
        </h2>
        <p className="text-sm text-gray-500 mt-1">Edit the client details to generate the authorisation letter.</p>
      </div>

      <div className="space-y-5">
        
        {/* Client Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Entity Type</label>
          <div className="relative">
            <select
              value={data.clientType}
              onChange={(e) => onChange('clientType', e.target.value)}
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              {Object.values(ClientType).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>
        </div>

        {/* Client Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isIndividual ? 'Client Name (Owner)' : 'Entity Name (Company/Firm)'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={data.clientName}
              onChange={(e) => onChange('clientName', e.target.value)}
              placeholder={isIndividual ? "e.g. GANESH SAHOO" : "e.g. ACME SOLUTIONS PVT LTD"}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Father's Name (Conditional) */}
        {isIndividual && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
            <input
              type="text"
              value={data.parentName}
              onChange={(e) => onChange('parentName', e.target.value)}
              placeholder="e.g. Gour Chandra Sahoo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Registered Address</label>
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-start pointer-events-none">
              <MapPin className="h-4 w-4 text-gray-400" />
            </div>
            <textarea
              value={data.address}
              onChange={(e) => onChange('address', e.target.value)}
              rows={3}
              placeholder="Full address with PIN code"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Work Description / Class */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Work Description / Category (Class)</label>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Briefcase className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={data.workDescription}
              onChange={(e) => onChange('workDescription', e.target.value)}
              placeholder="e.g. various artistic, literary, musical works..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">This defines the scope of works in paragraph 3.</p>
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="date"
              value={data.date}
              onChange={(e) => onChange('date', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t mt-4">
          <button
            onClick={onPrint}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Document
          </button>
        </div>

      </div>
    </div>
  );
};
