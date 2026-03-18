// services/UserService.js - BANCA D'ITALIA - AVEC SYSTÈME DE VERSION
// ⚡ Changez DATA_VERSION chaque fois que vous modifiez getDefaultUsers()

const DEV_MODE = true;
const STORAGE_KEY = 'banca_users_data';
const DATA_VERSION = 8;

class UserService {
  constructor() {
    if (DEV_MODE) console.log('🔧 UserService initialisé - Version', DATA_VERSION);
    this.loadFromStorage();
    this.managers = [
      'Marco Rossi',
      'Giulia Bianchi', 
      'Luca Ferrari',
      'Francesca Romano',
      'Alessandro Conti',
      'Valentina Ricci',
      'Stefano Marino',
      'Chiara Greco'
    ];
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedVersion = localStorage.getItem(STORAGE_KEY + '_version');
      if (stored && storedVersion === String(DATA_VERSION)) {
        this.users = JSON.parse(stored);
        if (DEV_MODE) console.log('📦 Caricato da localStorage:', this.users.length, 'utenti');
      } else {
        if (storedVersion && storedVersion !== String(DATA_VERSION)) {
          if (DEV_MODE) console.log('🔄 Nuova versione rilevata (' + storedVersion + ' → ' + DATA_VERSION + '), reinizializzazione...');
        } else {
          if (DEV_MODE) console.log('🆕 Prima inizializzazione');
        }
        this.users = this.getDefaultUsers();
        this.saveToStorage();
      }
    } catch (error) {
      if (DEV_MODE) console.error('❌ Errore caricamento:', error);
      this.users = this.getDefaultUsers();
      this.saveToStorage();
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users));
      localStorage.setItem(STORAGE_KEY + '_version', String(DATA_VERSION));
      if (DEV_MODE) console.log('💾 Salvato (versione ' + DATA_VERSION + ')');
    } catch (error) {
      if (DEV_MODE) console.error('❌ Errore salvataggio:', error);
    }
  }

  resetToDefault() {
    if (DEV_MODE) console.log('🔄 Reinizializzazione manuale dei dati');
    this.users = this.getDefaultUsers();
    this.saveToStorage();
  }

  getDefaultUsers() {
    return [
      { 
        id: 1, 
        username: '12345678901', 
        password: '123456', 
        name: 'Mario Rossi',
        nom: 'Mario Rossi',
        firstName: 'Mario',
        lastName: 'Rossi',
        email: 'mario.rossi@example.it',
        phone: '+39 333 123 4567',
        accountNumber: 'IT60X0542811101000000123456',
        numeroCompte: 'IT60 X054 2811 1010 0000 0123 456',
        clientNumber: '001234567',
        country: 'Italia',
        city: 'Roma',
        location: 'Roma, Italia',
        manager: 'Marco Rossi',
        balance: 45000.00,
        dateOuverture: '15/03/2020',
        dateAttestation: new Date().toLocaleDateString('fr-FR'),
        isBlocked: true,
        dateBlocage: "12/09/2003",
        unlockFee: 5000.34,
        blockReason: null,
        iban: 'IT60 X054 2811 1010 0000 0123 456',
        ibanObj: {
          iban: 'IT60 X054 2811 1010 0000 0123 456',
          bankCode: 'X0542811',
          branchCode: '10100',
          accountNumber: '000000123456',
          checkDigits: '60'
        },
        cards: [
          {
            id: 1,
            type: 'CartaSì',
            cardNumber: '5412 7534 8901 2345',
            maskedNumber: '5412 **** **** 2345',
            cvv: '123',
            expiryDate: '12/27',
            status: 'active',
            dailyWithdrawalLimit: 500,
            weeklyPaymentLimit: 3000,
            internationalPaymentEnabled: true,
            issueDate: '12/2022',
            cardHolder: 'MARIO ROSSI'
          }
        ],
        accounts: [
          { id: 1, type: 'LIQUIDITÀ', number: 'N°*******3456', balance: 45000.00, currency: '€', icon: 'wallet' },
          { id: 2, type: 'ASSICURAZIONE', number: 'N°*******7891', balance: 2700.00, currency: '€', icon: 'shield' },
          { id: 3, type: 'ECONOMIA', number: 'N°*******5432', balance: 15000.00, currency: '€', icon: 'trending-up' },
          { id: 4, type: 'RISPARMIO', number: 'N°*******9876', balance: 2100.00, currency: '€', icon: 'piggybank' }
        ],
        transactions: [
          { 
            id: 1, type: 'Ricezione', date: '2025-01-15T10:30:00', heure: '10:30',
            reference: 'IT28ABC513', destinataire: 'Giovanni Verdi',
            numeroDestinataire: 'IT28 X054 2811 1010 0000 0000 513',
            amount: 2500.00, montant: 2500.00, frais: 0, devise: '€',
            statut: 'Completata', accountType: 'LIQUIDITÀ', isCredit: true 
          },
          { 
            id: 2, type: 'Invio', date: '2025-01-18T14:15:00', heure: '14:15',
            reference: 'CONAD ROMA', destinataire: 'CONAD Supermercato',
            numeroDestinataire: '', amount: 67.50, montant: 67.50, frais: 1.50,
            devise: '€', statut: 'Completata', accountType: 'LIQUIDITÀ', isCredit: false 
          },
          { 
            id: 3, type: 'Invio', date: '2025-01-20T09:45:00', heure: '09:45',
            reference: 'IT76DEF657', destinataire: 'Laura Bianchi',
            numeroDestinataire: 'IT76 X054 2811 1010 0000 0000 657',
            amount: 800.00, montant: 800.00, frais: 4.00, devise: '€',
            statut: 'Completata', accountType: 'LIQUIDITÀ', isCredit: false 
          }
        ],
        expenses: {
          month: 'Gennaio 2025',
          categories: [
            { name: 'Casa', value: 40, color: '#3B82F6' },
            { name: 'Alimentari', value: 30, color: '#10B981' },
            { name: 'Trasporti', value: 15, color: '#F97316' },
            { name: 'Tempo libero', value: 10, color: '#6366F1' },
            { name: 'Altri', value: 5, color: '#D1D5DB' }
          ]
        },
        chequier: 3,
        virementRapide: 5,
        virementProgramme: 2
      },

      { 
        id: 2, 
        username: '07014860451', 
        password: '260823', 
        name: 'Martinet Boudy',
        nom: 'Boudy',
        firstName: 'Martinet',
        lastName: 'Boudy',
        email: 'martinet.boudy@gmail.com',
        phone: '+39 333 123 4567',
        accountNumber: 'IT60X0542811101000000123456',
        numeroCompte: 'IT60 X054 2811 1010 0000 0123 456',
        clientNumber: '001234567',
        country: 'Italia',
        city: 'Roma',
        location: 'Roma, Italia',
        manager: 'Marco Rossi',
        balance: 750000.00,
        dateOuverture: '15/03/2018',
        dateAttestation: new Date().toLocaleDateString('fr-FR'),
        isBlocked: false,
        dateBlocage: null,
        unlockFee: 30500.34, // ✅ Somme de déblocage pour cet utilisateur
        blockReason: null,
        iban: 'IT60 X054 2811 1010 0000 0123 456',
        ibanObj: {
          iban: 'IT60 X054 2811 1010 0000 0123 456',
          bankCode: 'X0542811',
          branchCode: '10100',
          accountNumber: '000000123456',
          checkDigits: '60'
        },
        cards: [
          {
            id: 1,
            type: 'CartaSì',
            cardNumber: '5412 7534 8901 2345',
            maskedNumber: '5412 **** **** 2345',
            cvv: '123',
            expiryDate: '12/27',
            status: 'active',
            dailyWithdrawalLimit: 500,
            weeklyPaymentLimit: 3000,
            internationalPaymentEnabled: true,
            issueDate: '12/2022',
            cardHolder: 'MARTINET BOUDY'
          }
        ],
        accounts: [
          { id: 1, type: 'LIQUIDITÀ', number: 'N°*******3456', balance: 750000.00, currency: '€', icon: 'wallet' },
          { id: 2, type: 'ASSICURAZIONE', number: 'N°*******7891', balance: 2700.00, currency: '€', icon: 'shield' },
          { id: 3, type: 'ECONOMIA', number: 'N°*******5432', balance: 15000.00, currency: '€', icon: 'trending-up' },
          { id: 4, type: 'RISPARMIO', number: 'N°*******9876', balance: 2100.00, currency: '€', icon: 'piggybank' }
        ],
        transactions: [
          { 
            id: 1, type: 'Ricezione', date: '2019-01-15T10:30:00', heure: '10:30',
            reference: 'IT28ABC513', destinataire: 'Giovanni Verdi',
            numeroDestinataire: 'IT28 X054 2811 1010 0000 0000 513',
            amount: 2500.00, montant: 2500.00, frais: 0, devise: '€',
            statut: 'Completata', accountType: 'LIQUIDITÀ', isCredit: true 
          },
          { 
            id: 2, type: 'Invio', date: '2019-01-18T14:15:00', heure: '14:15',
            reference: 'CONAD ROMA', destinataire: 'CONAD Supermercato',
            numeroDestinataire: '', amount: 67.50, montant: 67.50, frais: 1.50,
            devise: '€', statut: 'Completata', accountType: 'LIQUIDITÀ', isCredit: false 
          },
          { 
            id: 3, type: 'Invio', date: '2020-01-20T09:45:00', heure: '09:45',
            reference: 'IT76DEF657', destinataire: 'Laura Bianchi',
            numeroDestinataire: 'IT76 X054 2811 1010 0000 0000 657',
            amount: 800.00, montant: 800.00, frais: 4.00, devise: '€',
            statut: 'Completata', accountType: 'LIQUIDITÀ', isCredit: false 
          }
        ],
        expenses: {
          month: 'Gennaio 2020',
          categories: [
            { name: 'Casa', value: 40, color: '#3B82F6' },
            { name: 'Alimentari', value: 30, color: '#10B981' },
            { name: 'Trasporti', value: 15, color: '#F97316' },
            { name: 'Tempo libero', value: 10, color: '#6366F1' },
            { name: 'Altri', value: 5, color: '#D1D5DB' }
          ]
        },
        chequier: 3,
        virementRapide: 5,
        virementProgramme: 2
      }
    ];
  }

  // ==================== BLOQUER / DÉBLOQUER ====================

  async blockAccount(userId, blockReason = 'Verifica di sicurezza automatica') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
          const dateBlocage = new Date().toLocaleDateString('fr-FR');
          this.users[userIndex].isBlocked = true;
          this.users[userIndex].dateBlocage = dateBlocage;
          this.users[userIndex].blockReason = blockReason;
          // ✅ unlockFee NON modifié — on garde la valeur définie par utilisateur

          this.saveToStorage();

          const { password, ...userWithoutPassword } = this.users[userIndex];
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          window.dispatchEvent(new CustomEvent('userUpdated'));

          if (DEV_MODE) console.log('🔒 Compte bloqué:', dateBlocage, '| unlockFee:', this.users[userIndex].unlockFee);
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Utente non trovato'));
        }
      }, 500);
    });
  }

  async unlockAccount(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
          this.users[userIndex].isBlocked = false;
          this.users[userIndex].dateBlocage = null;
          this.users[userIndex].unlockFee = 0;
          this.users[userIndex].blockReason = null;
          this.saveToStorage();
          const { password, ...userWithoutPassword } = this.users[userIndex];
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Utente non trovato'));
        }
      }, 1000);
    });
  }

  // ==================== TRANSACTIONS ====================

  async getUserTransactions(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (DEV_MODE) console.log('📋 getUserTransactions:', userId);
        const user = this.users.find(u => u.id === userId);
        if (!user) { reject(new Error('Utente non trovato')); return; }
        const transactions = (user.transactions || []).map(t => ({
          ...t,
          id: t.id || Date.now() + Math.random(),
          type: t.type || 'Altro',
          date: t.date || new Date().toISOString(),
          heure: t.heure || new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
          reference: t.reference || `REF${Date.now()}`,
          destinataire: t.destinataire || 'Sconosciuto',
          numeroDestinataire: t.numeroDestinataire || t.iban || '',
          montant: t.montant || t.amount || 0,
          frais: t.frais || 0,
          devise: t.devise || '€',
          statut: t.statut || 'Completata',
          accountType: t.accountType || 'LIQUIDITÀ'
        }));
        if (DEV_MODE) console.log('✅ Trovate', transactions.length, 'transazioni');
        resolve(transactions);
      }, 300);
    });
  }

  async getTransactionStats(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (DEV_MODE) console.log('📊 getTransactionStats:', userId);
        const user = this.users.find(u => u.id === userId);
        if (!user) { reject(new Error('Utente non trovato')); return; }
        const transactions = user.transactions || [];
        const reussies = transactions.filter(t => t.statut === 'Completata').length;
        const echouees = transactions.filter(t => t.statut === 'Fallita').length;
        const stats = { reussies, echouees };
        if (DEV_MODE) console.log('✅ Statistiche:', stats);
        resolve(stats);
      }, 200);
    });
  }

  async searchTransactions(userId, searchTerm) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (DEV_MODE) console.log('🔍 searchTransactions:', userId, searchTerm);
        const user = this.users.find(u => u.id === userId);
        if (!user) { reject(new Error('Utente non trovato')); return; }
        const transactions = user.transactions || [];
        const term = searchTerm.toLowerCase();
        const results = transactions.filter(t =>
          (t.destinataire && t.destinataire.toLowerCase().includes(term)) ||
          (t.reference && t.reference.toLowerCase().includes(term)) ||
          (t.type && t.type.toLowerCase().includes(term)) ||
          (t.numeroDestinataire && t.numeroDestinataire.toLowerCase().includes(term))
        ).map(t => ({
          ...t,
          id: t.id || Date.now() + Math.random(),
          type: t.type || 'Altro',
          date: t.date || new Date().toISOString(),
          heure: t.heure || new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
          reference: t.reference || `REF${Date.now()}`,
          destinataire: t.destinataire || 'Sconosciuto',
          numeroDestinataire: t.numeroDestinataire || t.iban || '',
          montant: t.montant || t.amount || 0,
          frais: t.frais || 0,
          devise: t.devise || '€',
          statut: t.statut || 'Completata',
          accountType: t.accountType || 'LIQUIDITÀ'
        }));
        if (DEV_MODE) console.log('✅ Trovati', results.length, 'risultati per:', searchTerm);
        resolve(results);
      }, 400);
    });
  }

  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      const user = JSON.parse(userStr);
      if (DEV_MODE) console.log('👤 getCurrentUser:', user.name);
      return user;
    } catch (error) {
      if (DEV_MODE) console.error('❌ Errore getCurrentUser:', error);
      return null;
    }
  }

  // ==================== AUTRES MÉTHODES ====================

  async createTransfer(userId, transferData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (DEV_MODE) console.log('💸 Bonifico:', userId, transferData);
        const user = this.users.find(u => u.id === userId);
        if (!user) { reject(new Error('Utente non trovato')); return; }
        if (user.balance < transferData.amount) { reject(new Error('Saldo insufficiente')); return; }

        user.balance -= transferData.amount;
        const accountType = transferData.accountType || 'LIQUIDITÀ';
        const account = user.accounts.find(acc => acc.type === accountType);
        if (account) account.balance -= transferData.amount;

        const now = new Date();
        const newTransaction = {
          id: Date.now(),
          type: 'Invio',
          date: now.toISOString(),
          heure: now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
          reference: `TRF${Date.now().toString().slice(-8)}`,
          destinataire: transferData.beneficiary || transferData.beneficiario || 'Beneficiario',
          numeroDestinataire: transferData.iban,
          amount: transferData.amount,
          montant: transferData.amount,
          frais: transferData.amount * 0.005,
          devise: '€',
          statut: 'Completata',
          bic: transferData.bic || '',
          email: transferData.email || '',
          motif: transferData.reference || transferData.causale || 'Bonifico',
          accountType: accountType,
          isCredit: false
        };

        user.transactions.unshift(newTransaction);
        this.saveToStorage();
        localStorage.setItem('user', JSON.stringify(user));
        window.dispatchEvent(new CustomEvent('userUpdated'));

        if (DEV_MODE) console.log('✅ Nuovo saldo:', user.balance);
        resolve({
          success: true,
          newBalance: user.balance,
          transaction: newTransaction,
          ...newTransaction
        });
      }, 1000);
    });
  }

  async authenticate(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!username || !password) { reject(new Error('Identificativo e password richiesti')); return; }
        if (!/^\d{11}$/.test(username)) { reject(new Error("L'identificativo deve contenere 11 cifre")); return; }
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
          const { password, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Identificativo o password non corretti'));
        }
      }, 1000);
    });
  }

  async getUserById(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (DEV_MODE) console.log('🔍 getUserById:', userId);
        const user = this.users.find(u => u.id === userId);
        if (user) {
          const { password, ...userWithoutPassword } = user;
          if (DEV_MODE) console.log('✅ Utente trovato:', userWithoutPassword.name, 'Saldo:', userWithoutPassword.balance);
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Utente non trovato'));
        }
      }, 100);
    });
  }

  async getUserCards(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (user) resolve(user.cards || []);
        else reject(new Error('Utente non trovato'));
      }, 500);
    });
  }

  async toggleCardStatus(userId, cardId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (!user) { reject(new Error('Utente non trovato')); return; }
        const card = user.cards.find(c => c.id === cardId);
        if (!card) { reject(new Error('Carta non trovata')); return; }
        card.status = card.status === 'active' ? 'blocked' : 'active';
        this.saveToStorage();
        resolve(card);
      }, 1000);
    });
  }

  async updateCardLimits(userId, cardId, limits) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (!user) { reject(new Error('Utente non trovato')); return; }
        const card = user.cards.find(c => c.id === cardId);
        if (!card) { reject(new Error('Carta non trovata')); return; }
        if (limits.dailyWithdrawalLimit !== undefined) card.dailyWithdrawalLimit = limits.dailyWithdrawalLimit;
        if (limits.weeklyPaymentLimit !== undefined) card.weeklyPaymentLimit = limits.weeklyPaymentLimit;
        this.saveToStorage();
        resolve(card);
      }, 500);
    });
  }

  async toggleInternationalPayment(userId, cardId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (!user) { reject(new Error('Utente non trovato')); return; }
        const card = user.cards.find(c => c.id === cardId);
        if (!card) { reject(new Error('Carta non trovata')); return; }
        card.internationalPaymentEnabled = !card.internationalPaymentEnabled;
        this.saveToStorage();
        resolve(card);
      }, 500);
    });
  }

  async orderNewCard(userId, cardType = 'CartaSì') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (!user) { reject(new Error('Utente non trovato')); return; }
        const newCardId = user.cards.length + 1;
        const cardNumber = `5412 ${String(userId).padStart(4, '0')} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')} ${String(1234 + userId + newCardId).padStart(4, '0')}`;
        const newCard = {
          id: newCardId,
          type: cardType,
          cardNumber,
          maskedNumber: `5412 **** **** ${cardNumber.slice(-4)}`,
          cvv: Math.floor(100 + Math.random() * 900).toString(),
          expiryDate: '12/29',
          status: 'active',
          dailyWithdrawalLimit: 500,
          weeklyPaymentLimit: 3000,
          internationalPaymentEnabled: false,
          issueDate: new Date().toLocaleDateString('it-IT', { month: '2-digit', year: 'numeric' }),
          cardHolder: user.name.toUpperCase()
        };
        user.cards.push(newCard);
        this.saveToStorage();
        resolve(newCard);
      }, 2000);
    });
  }

  async updateUser(userId, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
          this.users[userIndex] = { ...this.users[userIndex], ...updates };
          this.saveToStorage();
          const { password, ...userWithoutPassword } = this.users[userIndex];
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Utente non trovato'));
        }
      }, 500);
    });
  }

  async changePassword(userId, oldPassword, newPassword) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (!user) { reject(new Error('Utente non trovato')); return; }
        if (user.password !== oldPassword) { reject(new Error('Vecchia password non corretta')); return; }
        if (!/^\d+$/.test(newPassword) || newPassword.length < 6) {
          reject(new Error('La password deve contenere almeno 6 cifre'));
          return;
        }
        user.password = newPassword;
        this.saveToStorage();
        resolve({ success: true, message: 'Password modificata con successo' });
      }, 500);
    });
  }

  async createUser(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!/^\d{11}$/.test(userData.username)) {
          reject(new Error("L'identificativo deve contenere 11 cifre"));
          return;
        }
        if (!/^\d+$/.test(userData.password) || userData.password.length < 6) {
          reject(new Error('La password deve contenere almeno 6 cifre'));
          return;
        }
        const existingUser = this.users.find(u => u.username === userData.username || u.email === userData.email);
        if (existingUser) {
          reject(new Error('Questo identificativo o email esiste già'));
          return;
        }
        const newUserId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
        const nameParts = userData.name.split(' ');
        const firstName = nameParts[0] || userData.name;
        const lastName = nameParts.slice(1).join(' ') || '';

        const newUser = {
          id: newUserId,
          username: userData.username,
          password: userData.password,
          name: userData.name,
          nom: userData.name,
          firstName,
          lastName,
          email: userData.email,
          phone: userData.phone || '',
          country: userData.country || '',
          city: userData.city || '',
          location: `${userData.city || ''}, ${userData.country || ''}`,
          accountNumber: `IT${Math.floor(Math.random() * 90) + 10}X0542811101${String(newUserId).padStart(12, '0')}`,
          numeroCompte: `IT${Math.floor(Math.random() * 90) + 10} X054 2811 1010 ${String(newUserId).padStart(12, '0')}`,
          clientNumber: String(newUserId).padStart(9, '0'),
          manager: this.managers[Math.floor(Math.random() * this.managers.length)],
          balance: 0,
          dateOuverture: new Date().toLocaleDateString('fr-FR'),
          dateAttestation: new Date().toLocaleDateString('fr-FR'),
          isBlocked: false,
          dateBlocage: null,
          unlockFee: 0,
          blockReason: null,
          iban: `IT${Math.floor(Math.random() * 90) + 10} X054 2811 1010 ${String(Math.floor(Math.random() * 1000000000000)).padStart(12, '0')}`,
          ibanObj: {
            iban: `IT${Math.floor(Math.random() * 90) + 10} X054 2811 1010 ${String(Math.floor(Math.random() * 1000000000000)).padStart(12, '0')}`,
            bankCode: 'X0542811',
            branchCode: '10100',
            accountNumber: String(Math.floor(Math.random() * 1000000000000)).padStart(12, '0'),
            checkDigits: String(Math.floor(Math.random() * 90) + 10)
          },
          cards: [{
            id: 1,
            type: 'CartaSì',
            cardNumber: `5412 ${String(newUserId).padStart(4, '0')} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')} 2345`,
            maskedNumber: '5412 **** **** 2345',
            cvv: Math.floor(100 + Math.random() * 900).toString(),
            expiryDate: '12/29',
            status: 'active',
            dailyWithdrawalLimit: 0,
            weeklyPaymentLimit: 0,
            internationalPaymentEnabled: false,
            issueDate: new Date().toLocaleDateString('it-IT', { month: '2-digit', year: 'numeric' }),
            cardHolder: userData.name.toUpperCase()
          }],
          accounts: [
            { id: 1, type: 'LIQUIDITÀ', number: `N°*******${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`, balance: 0, currency: '€', icon: 'wallet' },
            { id: 2, type: 'ASSICURAZIONE', number: `N°*******${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`, balance: 0, currency: '€', icon: 'shield' },
            { id: 3, type: 'ECONOMIA', number: `N°*******${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`, balance: 0, currency: '€', icon: 'trending-up' },
            { id: 4, type: 'RISPARMIO', number: `N°*******${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`, balance: 0, currency: '€', icon: 'piggybank' }
          ],
          transactions: [],
          expenses: { month: 'Gennaio 2025', categories: [] },
          chequier: 0,
          virementRapide: 0,
          virementProgramme: 0
        };
        this.users.push(newUser);
        this.saveToStorage();
        const { password, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword);
      }, 1000);
    });
  }
}

export default new UserService();