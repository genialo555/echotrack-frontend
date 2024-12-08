import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { 
  Bell, ChevronDown, Settings, LogOut, Navigation, Leaf, 
  Target, TrendingDown, Award, AlertCircle, Users, Key, Database, Shield, HelpCircle, 
  BarChart2, Activity, Search, Filter, Download, PlusCircle,X,
  Trash2, Edit, RefreshCw, MapPin, Mail
} from 'lucide-react';
import DemoVehicleLocation from '../components/Section/VehicleLocationmap';

// ---- Données d'exemple ----
const emissionsData = [
  { month: 'Jan', emissions: 120, objectif: 130, reduction: 15 },
  { month: 'Fév', emissions: 98, objectif: 125, reduction: 18 },
  { month: 'Mar', emissions: 86, objectif: 120, reduction: 22 },
  { month: 'Avr', emissions: 99, objectif: 115, reduction: 19 },
  { month: 'Mai', emissions: 85, objectif: 110, reduction: 25 },
  { month: 'Jun', emissions: 65, objectif: 105, reduction: 30 }
];

const usersData = [
  { id: 1, name: 'Marie Dupont', email: 'm.dupont@company.fr', role: 'Admin', status: 'Actif' },
  { id: 2, name: 'Thomas Martin', email: 't.martin@company.fr', role: 'Utilisateur', status: 'Actif' },
  { id: 3, name: 'Sophie Bernard', email: 's.bernard@company.fr', role: 'Manager', status: 'Inactif' }
];

const tripsData = [
  { 
    id: 1, 
    user: 'Marie Dupont',
    origin: 'Paris',
    destination: 'Lyon',
    distance: 465,
    emissions: 45.2,
    date: '2024-03-05',
    mode: 'Voiture'
  },
  { 
    id: 2, 
    user: 'Thomas Martin',
    origin: 'Lille',
    destination: 'Bruxelles',
    distance: 110,
    emissions: 12.5,
    date: '2024-03-10',
    mode: 'Train'
  }
];

const apiKeysData = [
  { id: 1, name: 'Clé #1', createdAt: '2024-01-15' },
  { id: 2, name: 'Clé #2', createdAt: '2024-02-10' }
];

const notificationsData = [
  { id: 1, title: 'Notification #1', sentAt: '2024-06-12' },
  { id: 2, title: 'Notification #2', sentAt: '2024-06-10' },
];

const alertsData = [
  { id: 1, message: 'Erreur de connexion serveur', date: '2024-07-01', severity: 'Critique' },
  { id: 2, message: 'Délai de réponse prolongé API', date: '2024-07-02', severity: 'Modérée' }
];

const configData = {
  general: { siteName: 'EchoTrack Enterprise', langue: 'Français', fuseauHoraire: 'Europe/Paris' },
  emails: { host: 'smtp.company.fr', port: 465, secure: true, user: 'no-reply@company.fr' },
  integrations: { googleAnalytics: 'UA-XXXXX-Y', sentryDsn: 'https://xxx@sentry.io/xxx' }
};

const supportData = [
  { id: 1, type: 'Ticket', subject: 'Problème de connexion', date: '2024-06-25', status: 'Ouvert' },
  { id: 2, type: 'FAQ', subject: 'Comment réinitialiser un mot de passe ?', date: '2024-06-20', status: 'Fermé' }
];

// ---- Composants UI de base ----
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-medium text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border">
        <p className="font-medium text-gray-900">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value} kg CO₂
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SearchBar = ({ placeholder, onSearch }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      placeholder={placeholder}
      className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

const ActionButton = ({ icon: Icon, label, onClick, variant = 'primary' }) => {
  const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors";
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]}`}
      onClick={onClick}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
};

// ---- Contenus des sections ----
const DashboardContent = ({ selectedPeriod, setSelectedPeriod }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Progrès Objectif</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">85%</span>
                <span className="text-sm text-green-600">+2.5%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Réduction CO₂</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">30.5%</span>
                <span className="text-sm text-blue-600">vs 2023</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Score RSE</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">A+</span>
                <span className="text-sm text-purple-600">Top 10%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Alertes</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">2</span>
                <span className="text-sm text-orange-600">À traiter</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Évolution des Émissions</CardTitle>
            <div className="flex gap-2">
              {['1m', '3m', '6m', '1y'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    selectedPeriod === period
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={emissionsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="emissions"
                  stroke="#16a34a"
                  fillOpacity={1}
                  fill="url(#colorEmissions)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="objectif"
                  stroke="#6b7280"
                  strokeDasharray="5 5"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Derniers Trajets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tripsData.map((trip, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{trip.user}</p>
                      <span className="text-sm text-gray-500">
                        • {new Date(trip.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{trip.origin} → {trip.destination}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                  {trip.emissions} kg CO₂
                </span>
              </div>
            ))}
            <button className="w-full py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors">
              Voir tous les trajets
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const UsersContent = ({ setShowUserModal, setSearchTerm }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Gestion des Utilisateurs</h2>
      <ActionButton 
        icon={PlusCircle} 
        label="Nouvel Utilisateur" 
        onClick={() => setShowUserModal(true)} 
      />
    </div>

    <div className="flex gap-4 mb-6">
      <SearchBar 
        placeholder="Rechercher un utilisateur..." 
        onSearch={setSearchTerm}
      />
      <ActionButton 
        icon={Filter} 
        label="Filtres" 
        variant="secondary"
        onClick={() => {}} 
      />
      <ActionButton 
        icon={Download} 
        label="Exporter" 
        variant="secondary"
        onClick={() => {}} 
      />
    </div>

    <Card>
      <CardContent className="p-0">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Nom</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Rôle</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Statut</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {usersData.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-green-700">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'Manager' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <RefreshCw className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  </div>
);

const ApiContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Gestion des Clés API</h2>
    <Card>
      <CardHeader>
        <CardTitle>Clés API</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {apiKeysData.map((keyData) => (
            <div className="flex items-center justify-between" key={keyData.id}>
              <div>
                <p className="font-medium">{keyData.name}</p>
                <p className="text-sm text-gray-500">Créée le {keyData.createdAt}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-100 rounded text-gray-500">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          <button className="w-full py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors">
            Ajouter une Clé API
          </button>
        </div>
      </CardContent>
    </Card>
  </div>
);

const StatisticsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Statistiques Générales</h2>
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">Émissions totales</p>
            <p className="text-2xl font-bold">520 kg CO₂</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Réductions</p>
            <p className="text-2xl font-bold">120 kg CO₂</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Trajets</p>
            <p className="text-2xl font-bold">45</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Utilisateurs</p>
            <p className="text-2xl font-bold">15</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const TripsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Gestion des Trajets</h2>
    <Card>
      <CardContent>
        <div className="space-y-4">
          {tripsData.map((trip) => (
            <div
              key={trip.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{trip.user}</p>
                <p className="text-sm text-gray-500">
                  {trip.origin} → {trip.destination}
                </p>
              </div>
              <p className="font-medium text-gray-700">{trip.emissions} kg CO₂</p>
            </div>
          ))}
        </div>
        <button className="w-full py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors">
          Voir plus de trajets
        </button>
      </CardContent>
    </Card>
  </div>
);

const NotificationsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Gestion des Notifications</h2>
    <Card>
      <CardContent>
        <div className="space-y-4">
          {notificationsData.map((notif) => (
            <div key={notif.id}>
              <p className="font-medium">{notif.title}</p>
              <p className="text-sm text-gray-500">Envoyée le {notif.sentAt}</p>
            </div>
          ))}
        </div>
        <button className="w-full py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors">
          Ajouter une Notification
        </button>
      </CardContent>
    </Card>
  </div>
);

const SecurityContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Sécurité</h2>
    <Card>
      <CardContent>
        <p className="text-gray-500">Aucune alerte de sécurité récente.</p>
      </CardContent>
    </Card>
  </div>
);

const ConfigContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Configuration</h2>
    <Card>
      <CardHeader>
        <CardTitle>Paramètres Généraux</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-medium">Nom du site : {configData.general.siteName}</p>
        <p className="font-medium">Langue : {configData.general.langue}</p>
        <p className="font-medium">Fuseau Horaire : {configData.general.fuseauHoraire}</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Emails</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-medium">Hôte SMTP : {configData.emails.host}</p>
        <p className="font-medium">Port : {configData.emails.port}</p>
        <p className="font-medium">Utilisateur : {configData.emails.user}</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Intégrations</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-medium">Google Analytics : {configData.integrations.googleAnalytics}</p>
        <p className="font-medium">Sentry DSN : {configData.integrations.sentryDsn}</p>
      </CardContent>
    </Card>
  </div>
);

const ErrorsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Erreurs</h2>
    <Card>
      <CardContent>
        <div className="space-y-4">
          {alertsData.map(alert => (
            <div key={alert.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{alert.message}</p>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                alert.severity === 'Critique' 
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>{alert.severity}</span>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors">
          Voir plus d'erreurs
        </button>
      </CardContent>
    </Card>
  </div>
);

const SupportContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Support</h2>
    <Card>
      <CardHeader>
        <CardTitle>Tickets et FAQ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {supportData.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="font-medium">{item.type} - {item.subject}</p>
                <p className="text-sm text-gray-500">Date : {item.date}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                item.status === 'Ouvert' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors">
          Ouvrir un nouveau ticket
        </button>
      </CardContent>
    </Card>
  </div>
);

// ---- Navigation ----
const navigationItems = [
  { id: 'fleet-location', label: 'Localisation', icon: MapPin },
  { id: 'dashboard', label: 'Tableau de Bord', icon: BarChart2 },
  { id: 'users', label: 'Utilisateurs', icon: Users },
  { id: 'trips', label: 'Trajets', icon: Navigation },
  { id: 'reports', label: 'Statistiques', icon: Activity },
  { id: 'api', label: 'API', icon: Key },
  { id: 'config', label: 'Configuration', icon: Database },
  { id: 'errors', label: 'Erreurs', icon: AlertCircle },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Sécurité', icon: Shield },
  { id: 'support', label: 'Support', icon: HelpCircle }
];

// Sur mobile, un clic sur une icône ouvre la modal.
// Sur desktop, un clic sur un bouton change la section.
const NavigationBar = ({ activeSection, setActiveSection, isMobile, setShowModal }) => (
  <nav className="bg-white border-b">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex items-center space-x-2 overflow-x-auto py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                if (isMobile) {
                  setShowModal(true);
                }
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeSection === item.id
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              {/* Sur desktop, on affiche le label. Sur mobile, on le masque */}
              {!isMobile && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  </nav>
);

// Header
const Header = ({ isProfileOpen, setIsProfileOpen, isMobile }) => (
  <header className="bg-white border-b sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Leaf className="w-6 h-6 text-green-600" />
          </div>
          {/* Sur mobile, on peut masquer le nom complet, ou le garder, selon préférence */}
          {!isMobile && (
            <span className="text-xl font-semibold text-gray-900">EchoTrack Enterprise</span>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">JD</span>
              </div>
              {/* Sur mobile, on peut cacher la flèche vers le bas */}
              {!isMobile && <ChevronDown className="w-4 h-4 text-gray-600" />}
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                <div className="p-4 border-b">
                  <p className="font-medium">Jean Dupont</p>
                  <p className="text-sm text-gray-500">j.dupont@company.fr</p>
                </div>
                <div className="py-1">
                  <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings className="mr-3 h-4 w-4" />
                    Paramètres
                  </button>
                  <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="mr-3 h-4 w-4" />
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </header>
);

const DashboardEntreprise = () => {
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    console.log("Dashboard Component Mounted");
    console.log("Auth State:", auth);
  }, [auth]);

  // Détecter le mobile
  const isMobile = window.innerWidth < 768; 

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);

  // Pour la modal sur mobile
  const [showModal, setShowModal] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />;
      case 'users':
        return <UsersContent setShowUserModal={setShowUserModal} setSearchTerm={setSearchTerm} />;
      case 'fleet-location':
        return <DemoVehicleLocation />;
      case 'trips':
        return <TripsContent />;
      case 'reports':
        return <StatisticsContent />;
      case 'api':
        return <ApiContent />;
      case 'notifications':
        return <NotificationsContent />;
      case 'security':
        return <SecurityContent />;
      case 'config':
        return <ConfigContent />;
      case 'errors':
        return <ErrorsContent />;
      case 'support':
        return <SupportContent />;
      default:
        return <div>Section en cours de développement...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} isMobile={isMobile} />
      <NavigationBar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        isMobile={isMobile}
        setShowModal={setShowModal}
      />

      {/* Sur desktop, on affiche le contenu dans la page */}
      {!isMobile && (
        <main className="max-w-7xl mx-auto px-6 py-8">
          {renderContent()}
        </main>
      )}

      {/* Sur mobile, on utilise une modal pour afficher le contenu au clic sur une icône */}
      {isMobile && showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-lg p-4 w-full max-w-md h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">{navigationItems.find(item => item.id === activeSection)?.label}</h4>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            {renderContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardEntreprise;
