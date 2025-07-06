import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Store,
  Package,
  ShoppingCart,
  TrendingUp,
  Settings,
  LogOut,
  DollarSign,
  Calendar,
  BarChart3
} from 'lucide-react'

const SalesScreen = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('sales')
  const [salesData, setSalesData] = useState({
    today: { sales: 0, orders: 0 },
    week: { sales: 0, orders: 0 },
    month: { sales: 0, orders: 0 },
    year: { sales: 0, orders: 0 }
  })
  const [topProducts, setTopProducts] = useState([])

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('https://wendy-backend1.onrender.com', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        setSalesData({
          today: { sales: data.todaySales || 0, orders: data.todayOrders || 0 },
          week: { sales: data.weekSales || 0, orders: data.weekOrders || 0 },
          month: { sales: data.monthSales || 0, orders: data.monthOrders || 0 },
          year: { sales: data.yearSales || 0, orders: data.yearOrders || 0 }
        })
        setTopProducts(data.topProducts || [])
      } catch (error) {
        console.error('Erro ao buscar dados de vendas:', error)
      }
    }

    fetchSalesData()
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
              <h1 className="text-2xl font-bold text-gray-800">Relatórios de Vendas</h1>
              <p className="text-gray-600">Acompanhe o desempenho da sua loja</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Sales Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Vendas Hoje</p>
                    <p className="text-2xl font-bold text-gray-800">R$ {salesData.today.sales.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{salesData.today.orders} pedidos</p>
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
                    <p className="text-sm font-medium text-gray-600">Esta Semana</p>
                    <p className="text-2xl font-bold text-gray-800">R$ {salesData.week.sales.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{salesData.week.orders} pedidos</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Este Mês</p>
                    <p className="text-2xl font-bold text-gray-800">R$ {salesData.month.sales.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{salesData.month.orders} pedidos</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Este Ano</p>
                    <p className="text-2xl font-bold text-gray-800">R$ {salesData.year.sales.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{salesData.year.orders} pedidos</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Gráfico de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Gráfico de vendas será implementado aqui</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Produtos Mais Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.sales} unidades vendidas</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">R$ {product.revenue.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SalesScreen


