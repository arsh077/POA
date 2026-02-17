import React from 'react';
import { ClientType, FormData } from '../types';

interface DocumentPreviewProps {
  data: FormData;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ data }) => {
  const isIndividual = data.clientType === ClientType.Individual || data.clientType === ClientType.Proprietorship;

  // Format date nicely (e.g., 17th February 2026)
  const formatDate = (dateString: string) => {
    if (!dateString) return "__________________";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Suffix logic (st, nd, rd, th)
    const suffix = (day: number) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    };

    return <span className="font-bold">{day}<sup>{suffix(day)}</sup> {month} {year}</span>;
  };

  const getPreamble = () => {
    if (isIndividual) {
      return (
        <div className="mb-6 text-justify leading-relaxed">
          I, <span className="font-bold uppercase">{data.clientName || "[CLIENT NAME]"}</span> son/daughter of {data.parentName || "[FATHER'S NAME]"}, having address:<br />
          {data.address || "[FULL ADDRESS HERE]"}
        </div>
      );
    } else {
      return (
        <div className="mb-6 text-justify leading-relaxed">
          We, <span className="font-bold uppercase">{data.clientName || "[ENTITY NAME]"}</span>, a {data.clientType}, having our registered office/address at:<br />
          {data.address || "[FULL ADDRESS HERE]"}
        </div>
      );
    }
  };

  const getSignatoryLabel = () => {
    switch (data.clientType) {
      case ClientType.Proprietorship:
        return "Proprietor / Authorised Signatory";
      case ClientType.Individual:
        return "Owner / Applicant";
      case ClientType.LLP:
        return "Designated Partner / Authorised Signatory";
      case ClientType.Partnership:
        return "Partner / Authorised Signatory";
      case ClientType.OPC:
      case ClientType.PvtLtd:
      case ClientType.PublicLtd:
        return "Director / Authorised Signatory";
      case ClientType.Trust:
        return "Trustee / Authorised Signatory";
      case ClientType.Society:
        return "Secretary / President / Authorised Signatory";
      default:
        return "Authorised Signatory";
    }
  };

  return (
    <div className="print-container bg-white shadow-2xl mx-auto p-12 text-black legal-font text-[11pt] leading-normal max-w-[210mm] min-h-[297mm]">
      
      {/* Page 1 */}
      <div>
        <h1 className="text-center font-bold text-[14pt] uppercase tracking-wide mb-10 mt-4">
          Authorisation in the matter of the Copyright Act, 1957
        </h1>

        {getPreamble()}

        <div className="mb-6 text-justify leading-relaxed">
          do hereby authorise <span className="font-bold">FARHEEN MUSHIR</span>, Advocate,<br />
          Building 36E, Aga Mehdi Street, Park Street, Kolkata - 700016, West Bengal, INDIA
        </div>

        <div className="mb-6 text-justify leading-relaxed">
          to act as my/our authorised agent/attorney in respect of securing registration from the
          Government of India, for the term provided under the Copyright Act, 1957, in respect
          of {data.workDescription || "various artistic, literary, musical works and/or sound recordings"}, and to attend all
          proceedings which come under the Copyright Act, 1957.
        </div>

        <div className="mb-6 text-justify leading-relaxed">
          The said agent is authorised in respect of all Copyright Applications, and in all matters and proceedings before the Registrar of Copyrights, or the Government of India, in
          connection with the said application or incidental thereto, including but not limited to:
        </div>

        <ul className="list-disc pl-8 mb-6 space-y-2 text-justify">
          <li>Filing of any document and payment of any fees;</li>
          <li>Filing any request for amendment of the application or any other document;</li>
          <li>Prosecution of the application including filing responses to examination reports;</li>
          <li>Attending discussions, interviews and official hearings;</li>
          <li>Amendments, payment of fees, registration of assignment, mortgage, licence, merger or creation of any interest/transfer of rights;</li>
          <li>Applying for recordal of change of address of service, name and/or address;</li>
          <li>Doing all things as may be necessary or expedient, including appointment of any substitute or substitutes.</li>
        </ul>

        <div className="mb-6 text-justify leading-relaxed">
          All communications, notices and requisitions pertaining to this application may be
          sent to the following address:<br />
          <span className="font-bold">Building 36E, Aga Mehdi Street, Park Street, Kolkata - 700016, INDIA</span><br />
          unless otherwise specified.
        </div>

        <div className="mb-6 text-justify leading-relaxed">
          I/We hereby confirm and ratify any previous actions of the person authorised hereinabove
          in relation to this application and any matters and proceedings in connection therewith.
        </div>

        <div className="mb-8 text-justify leading-relaxed">
          I/We hereby revoke all previous authorisations, if any, in respect of India made in connection with this application or any matter or proceedings connected therewith.
        </div>

        <div className="mb-12">
          Dated this {formatDate(data.date)}.
        </div>

        <div className="mt-16">
          <div className="font-bold uppercase text-[12pt] mb-2">{data.clientName || "GANESH SAHOO"}</div>
          <div className="text-[11pt] border-t border-black w-64 pt-2">
            ({getSignatoryLabel()})<br />
            Signature
          </div>
        </div>
      </div>
      
      {/* Page Break for Print */}
      <div className="page-break"></div>

      {/* Page 2 / Footer Note */}
      <div className="mt-12 pt-12 text-center text-[10pt] italic text-gray-700">
        <p className="mt-[60vh]">(To be executed on ₹100 Non-Judicial Stamp Paper of West Bengal and duly notarised if required by the Copyright Office)</p>
        <p className="mt-4">2</p>
      </div>

    </div>
  );
};