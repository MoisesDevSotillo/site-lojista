import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Store,
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  Settings,
  LogOut,
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [dashboardData, setDashboardData] = useState({
    todaySales: 0,
    monthSales: 0,
    totalProducts: 0,
    activeProducts: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalCustomers: 0,
    newCustomers: 0
  })
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token') // Obter o token JWT
        const response = await fetch('https://wendy-backend1.onrender.com', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        setDashboardData({
          todaySales: data.todaySales || 0,
          monthSales: data.monthSales || 0,
          totalProducts: data.totalProducts || 0,
          activeProducts: data.activeProducts || 0,
          pendingOrders: data.pendingOrders || 0,
          completedOrders: data.completedOrders || 0,
          totalCustomers: data.totalCustomers || 0,
          newCustomers: data.newCustomers || 0
        })
        setRecentOrders(data.recentOrders || [])
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error)
      }
    }

    fetchDashboardData()
  }, [])

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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Pendente</Badge>
      case 'completed':
        return <Badge variant="outline" className="text-green-600 border-green-600">Concluído</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
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
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Bem-vindo de volta, {user?.ownerName}!</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Última atualização</p>
              <p className="text-sm font-medium text-gray-800">Agora mesmo</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Vendas Hoje</p>
                    <p className="text-2xl font-bold text-gray-800">R$ {dashboardData.todaySales.toFixed(2)}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Vendas do Mês</p>
                    <p className="text-2xl font-bold text-gray-800">R$ {dashboardData.monthSales.toFixed(2)}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Produtos Ativos</p>
                    <p className="text-2xl font-bold text-gray-800">{dashboardData.activeProducts}/{dashboardData.totalProducts}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Package className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pedidos Pendentes</p>
                    <p className="text-2xl font-bold text-gray-800">{dashboardData.pendingOrders}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Pedidos Recentes</span>
                <Button
                  onClick={() => navigate('/orders')}
                  variant="outline"
                  size="sm"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Todos
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-[#66CCFF] p-2 rounded-full">
                        <ShoppingCart className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{order.id} - {order.customer}</p>
                        <p className="text-sm text-gray-600">{order.product}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">R$ {order.value.toFixed(2)}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{order.time}</span>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/products')}>
              <CardContent className="p-6 text-center">
                <Package className="h-12 w-12 text-[#66CCFF] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Gerenciar Produtos</h3>
                <p className="text-sm text-gray-600">Adicione, edite ou remova produtos da sua loja</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/orders')}>
              <CardContent className="p-6 text-center">
                <ShoppingCart className="h-12 w-12 text-[#66CCFF] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ver Pedidos</h3>
                <p className="text-sm text-gray-600">Acompanhe e gerencie todos os seus pedidos</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/sales')}>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-[#66CCFF] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Relatórios</h3>
                <p className="text-sm text-gray-600">Veja relatórios detalhados de vendas</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

