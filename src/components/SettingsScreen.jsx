import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Store, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Settings,
  LogOut,
  User,
  MapPin,
  Phone,
  Mail,
  Save
} from 'lucide-react'

const SettingsScreen = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('settings')
  const [formData, setFormData] = useState({
    storeName: user?.storeName || '',
    ownerName: user?.ownerName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    category: user?.category || '',
    description: 'Loja especializada em produtos eletrônicos de alta qualidade.',
    openingHours: '08:00 - 18:00',
    deliveryFee: '5.00',
    minOrderValue: '30.00'
  })

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Store, path: '/' },
    { id: 'products', label: 'Produtos', icon: Package, path: '/products' },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart, path: '/orders' },
    { id: 'sales', label: 'Vendas', icon: TrendingUp, path: '/sales' },
    { id: 'settings', label: 'Configurações', icon: Settings, path: '/settings' }
  ]

  const handleNavigation = (item) => {
    setActiveTab(item.id)
    navigate(item.path)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Simular salvamento
    alert('Configurações salvas com sucesso!')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-[#66CCFF] p-2 rounded-lg">
              <Store className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{user?.storeName}</h2>
              <p className="text-sm text-gray-600">{user?.category}</p>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  activeTab === item.id ? 'bg-[#66CCFF]/10 border-r-2 border-[#66CCFF] text-[#66CCFF]' : 'text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
              <p className="text-gray-600">Gerencie as informações da sua loja</p>
            </div>
            <Button onClick={handleSave} className="bg-[#66CCFF] hover:bg-[#4DB8FF] text-white">
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Store Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Store className="h-5 w-5" />
                <span>Informações da Loja</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Nome da Loja</Label>
                  <Input
                    id="store-name"
                    value={formData.storeName}
                    onChange={(e) => handleInputChange('storeName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="opening-hours">Horário de Funcionamento</Label>
                <Input
                  id="opening-hours"
                  value={formData.openingHours}
                  onChange={(e) => handleInputChange('openingHours', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Informações do Proprietário</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="owner-name">Nome Completo</Label>
                  <Input
                    id="owner-name"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Endereço</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Endereço Completo</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Delivery Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="delivery-fee">Taxa de Entrega (R$)</Label>
                  <Input
                    id="delivery-fee"
                    type="number"
                    step="0.01"
                    value={formData.deliveryFee}
                    onChange={(e) => handleInputChange('deliveryFee', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-order">Pedido Mínimo (R$)</Label>
                  <Input
                    id="min-order"
                    type="number"
                    step="0.01"
                    value={formData.minOrderValue}
                    onChange={(e) => handleInputChange('minOrderValue', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SettingsScreen

