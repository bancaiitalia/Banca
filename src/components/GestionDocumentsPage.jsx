// pages/GestioneDocumentiPage.jsx
import React from 'react';
import jsPDF from 'jspdf';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import BottomNavigation from './BottomNavigation';

// Funzione per disegnare il sigillo bancario ufficiale
const drawBankStamp = (doc, centerX, centerY) => {
  const radius = 15;
  
  doc.setDrawColor(0, 51, 153); // Blu Banca d'Italia
  doc.setLineWidth(0.8);
  doc.circle(centerX, centerY, radius);
  doc.setLineWidth(0.5);
  doc.circle(centerX, centerY, radius - 1);
  
  doc.setLineWidth(0.3);
  doc.circle(centerX, centerY, radius - 4);
  
  doc.setTextColor(0, 51, 153);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('BANCA D\'ITALIA', centerX, centerY - 8, { align: 'center' });
  
  doc.setFontSize(16);
  doc.text('€', centerX, centerY, { align: 'center' });
  
  doc.setLineWidth(0.3);
  doc.line(centerX - 10, centerY + 3, centerX + 10, centerY + 3);
  
  doc.setFontSize(6);
  doc.text('BANCA AUTORIZZATA', centerX, centerY + 8, { align: 'center' });
  
  doc.setFontSize(5.5);
  doc.setFont('helvetica', 'normal');
  doc.text('DIREZIONE ROMA', centerX, centerY + 12, { align: 'center' });
  
  doc.setTextColor(0, 0, 0);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.2);
};

const GestioneDocumentiPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isContoBloccato = user?.dateBlocage && user.dateBlocage !== "" && user.dateBlocage !== null;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <DashboardHeader />
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
          <div className="text-center py-12">
            <p className="text-gray-600">Caricamento dati...</p>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  const contoInfo = {
    titolare: `${user.firstName} ${user.lastName}`,
    numeroContocontoInfo: user.numeroCompte || 'IT60 1234 5678 9012 3456 7890 123',
    dataApertura: user.dateOuverture || '15/03/2020'
  };

  const bancaInfo = {
    nome: 'BANCA D\'ITALIA',
    filiale: 'Filiale Roma Centro',
    indirizzo: 'Via Nazionale, 91',
    citta: '00184 ROMA',
    telefono: '+39 06 47921',
    email: 'servizio.clienti@bancaditalia.it',
    direttore: 'Dott. Giuseppe Rossi',
    siret: '784 608 416 00241'
  };

  const dataAttestazione = user.dateAttestation || new Date().toLocaleDateString('it-IT');
  const dataBlocco = user.dateBlocage || new Date().toLocaleDateString('it-IT');

  const generaAttestazione = () => {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('ATTESTAZIONE DI CONTO BANCARIO', 105, 30, { align: 'center' });
      
      let y = 60;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      
      const testo = [
        `La BANCA ${bancaInfo.nome} attesta che:`,
        '',
        `Il Signor/La Signora ${contoInfo.titolare},`,
        '',
        `è titolare del conto bancario n° ${contoInfo.numeroContocontoInfo},`,
        '',
        `aperto il ${contoInfo.dataApertura} presso il nostro istituto.`,
        '',
        'Questo conto è attualmente attivo.',
        '',
        'La presente attestazione è rilasciata per ogni fine di legge.',
        '',
        '',
        `Fatto a Roma, il ${dataAttestazione}`
      ];
      
      testo.forEach(riga => {
        doc.text(riga, 20, y);
        y += 7;
      });
      
      y += 20;
      doc.setFont('helvetica', 'bold');
      doc.text('Il Direttore di Filiale', 130, y);
      doc.text(bancaInfo.direttore, 130, y + 7);
      doc.text(bancaInfo.nome, 130, y + 14);
      
      doc.save('attestazione_conto.pdf');
      console.log('✅ Attestazione generata');
    } catch (error) {
      console.error('❌ Errore attestazione:', error);
      alert('Errore durante la generazione dell\'attestazione');
    }
  };

  const generaAttoBlocco = () => {
    try {
      const doc = new jsPDF();
      
      // Intestazione bancaria
      doc.setFillColor(0, 51, 153); // Blu Banca d'Italia
      doc.rect(0, 0, 210, 25, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text(bancaInfo.nome, 105, 12, { align: 'center' });
      doc.setFontSize(10);
      doc.text(bancaInfo.filiale, 105, 19, { align: 'center' });
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('NOTIFICA DI BLOCCO CONTO', 105, 40, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Documento ufficiale', 105, 47, { align: 'center' });
      
      doc.line(20, 52, 190, 52);
      
      let y = 65;
      doc.setFontSize(11);
      
      const testo = [
        `${bancaInfo.indirizzo}`,
        `${bancaInfo.citta}`,
        `Tel: ${bancaInfo.telefono}`,
        `P.IVA: ${bancaInfo.siret}`,
        '',
        '',
        `Destinatario: ${contoInfo.titolare}`,
        `Conto n°: ${contoInfo.numeroContocontoInfo}`,
        '',
        '',
        'OGGETTO: Notifica di blocco conto bancario',
        '',
        '',
        'Gentile Cliente,',
        '',
        `Con la presente, la BANCA ${bancaInfo.nome} La informa che il Suo`,
        `conto bancario n° ${contoInfo.numeroContocontoInfo}`,
        'è oggetto di una misura di blocco in conformità alle disposizioni',
        'legali e regolamentari vigenti.',
        '',
        '',
        'MOTIVI DEL BLOCCO:',
        '',
        '• Verifica di conformità regolamentare',
        '• Documenti giustificativi mancanti o incompleti',
        '• Misura conservativa nel quadro della lotta al riciclaggio',
        '• Protezione del conto in attesa di regolarizzazione',
        '',
        '',
        `DATA DI EFFETTO: ${dataBlocco}`,
        '',
        '',
        'CONSEGUENZE DI QUESTA MISURA:',
        '',
        'Il blocco comporta la sospensione immediata delle seguenti operazioni:',
        '',
        '✗ Bonifici in uscita (nazionali e internazionali)',
        '✗ Prelievi di contante agli sportelli automatici',
        '✗ Pagamenti con carta bancaria',
        '✗ Addebiti diretti',
        '✗ Emissione di assegni',
        '',
        'Sono autorizzati solo i versamenti in entrata.',
        '',
        '',
        'PROCEDURE PER LA REGOLARIZZAZIONE:',
        '',
        'Per revocare questa misura di blocco, La invitiamo a:',
        '',
        '1. Contattare il nostro servizio clienti il prima possibile',
        '2. Fornire i documenti giustificativi richiesti',
        '3. Regolarizzare la Sua situazione amministrativa',
        '',
        '',
        'CONTATTI:',
        '',
        `Servizio Clienti: ${bancaInfo.telefono}`,
        `Email: ${bancaInfo.email}`,
        `Orari: Dal lunedì al venerdì, 9:00-18:00`,
        '',
        '',
        'Il presente documento fa fede e ha valore di atto ufficiale.',
        '',
        '',
        `Fatto a Roma, il ${dataBlocco}`,
      ];
      
      testo.forEach(riga => {
        if (riga.startsWith('OGGETTO') || riga.startsWith('MOTIVI') || 
            riga.startsWith('DATA DI EFFETTO') || riga.startsWith('CONSEGUENZE') || 
            riga.startsWith('PROCEDURE') || riga.startsWith('CONTATTI')) {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
        } else if (riga.startsWith('✗')) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
        } else {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(11);
        }
        
        doc.text(riga, 20, y);
        y += 6;
        
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });
      
      // Firma e sigillo
      y += 15;
      if (y > 250) {
        doc.addPage();
        y = 30;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Per la Direzione', 20, y);
      doc.text('Firma e sigillo ufficiale', 140, y);
      
      // Firma manoscritta simulata
      doc.setFontSize(18);
      doc.setFont('times', 'italic');
      doc.setTextColor(50, 50, 50);
      doc.text('G. Rossi', 35, y + 20);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(bancaInfo.direttore, 20, y + 28);
      doc.text('Direttore di Filiale', 20, y + 34);
      
      // Sigillo bancario
      const centerX = 170;
      const centerY = y + 20;
      drawBankStamp(doc, centerX, centerY);
      
      // Piè di pagina
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`${bancaInfo.nome} - ${bancaInfo.filiale} - P.IVA ${bancaInfo.siret}`, 105, 287, { align: 'center' });
      
      doc.save('atto_blocco_conto_bancario.pdf');
      console.log('✅ Atto di blocco generato');
    } catch (error) {
      console.error('❌ Errore documento blocco:', error);
      alert('Errore durante la generazione dell\'atto di blocco');
    }
  };

  const documenti = [
    {
      icon: '✓',
      titolo: 'Attestazione di conto',
      descrizione: `Emessa il ${dataAttestazione}`,
      badge: 'PDF',
      azione: generaAttestazione,
      badgeColor: 'bg-purple-100 text-purple-800'
    }
  ];

  if (isContoBloccato) {
    documenti.unshift({
      icon: '🏦',
      titolo: 'Atto di blocco conto',
      descrizione: `Notifica ufficiale emessa da ${bancaInfo.nome} - ${dataBlocco}`,
      badge: 'Ufficiale',
      azione: generaAttoBlocco,
      badgeColor: 'bg-red-100 text-red-800'
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader />
      
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center text-blue-900 mb-6 hover:text-blue-700 transition"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span className="font-medium">Indietro</span>
        </button>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Gestione Documenti</h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Documenti amministrativi di {contoInfo.titolare}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            {bancaInfo.nome} - {bancaInfo.filiale}
          </p>
        </div>

        {isContoBloccato ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
            <p className="text-red-800 font-semibold">⚠️ Conto bloccato</p>
            <p className="text-red-700 text-sm mt-1">
              Il tuo conto è oggetto di una misura di blocco. I documenti ufficiali sono disponibili qui sotto.
            </p>
          </div>
        ) : (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-lg">
            <p className="text-green-800 font-semibold">✅ Conto attivo</p>
            <p className="text-green-700 text-sm mt-1">
              I tuoi documenti amministrativi sono disponibili per il download.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {documenti.map((doc, index) => (
            <div key={index} className="bg-white rounded-lg shadow hover:shadow-xl transition p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <span className="text-3xl sm:text-5xl">{doc.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-base sm:text-lg text-gray-900">{doc.titolo}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">{doc.descrizione}</p>
                    <span className={`inline-block mt-2 px-2 sm:px-3 py-1 text-xs font-semibold rounded-full ${doc.badgeColor}`}>
                      {doc.badge}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={doc.azione}
                  className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  📥 Scarica
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default GestioneDocumentiPage;