import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Store, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Settings,
  LogOut,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Phone,
  MapPin
} from 'lucide-react'

const OrdersScreen = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('orders')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Pedidos simulados
  const [orders, setOrders] = useState([
    {
      id: '#001',
      customer: 'Maria Silva',
      phone: '(48) 99999-1234',
      address: 'Rua das Flores, 123 - Centro',
      products: [
        { name: 'Smartphone Samsung Galaxy', quantity: 1, price: 899.99 }
      ],
      total: 899.99,
      status: 'pending',
      paymentMethod: 'Pix',
      orderTime: '10:30',
      deliveryType: 'wendy_shop'
    },
    {
      id: '#002',
      customer: 'João Santos',
      phone: '(48) 99999-5678',
      address: 'Av. Central, 456 - Bairro Novo',
      products: [
        { name: 'Fone de Ouvido Bluetooth', quantity: 2, price: 159.90 }
      ],
      total: 319.80,
      status: 'preparing',
      paymentMethod: 'Cartão',
      orderTime: '09:45',
      deliveryType: 'wendy_shop'
    },
    {
      id: '#003',
      customer: 'Ana Costa',
      phone: '(48) 99999-9012',
      address: 'Rua dos Pinheiros, 789 - Vila Nova',
      products: [
        { name: 'Notebook Dell Inspiron', quantity: 1, price: 2499.99 }
      ],
      total: 2499.99,
      status: 'ready',
      paymentMethod: 'Pix',
      orderTime: '09:15',
      deliveryType: 'wendy_shop'
    },
    {
      id: '#004',
      customer: 'Pedro Oliveira',
      phone: '(48) 99999-3456',
      address: 'Rua da Praia, 321 - Centro',
      products: [
        { name: 'Mouse Gamer RGB', quantity: 1, price: 89.90 }
      ],
      total: 89.90,
      status: 'delivered',
      paymentMethod: 'Dinheiro',
      orderTime: '08:30',
      deliveryType: 'wendy_shop'
    }
  ])

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

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Pendente</Badge>
      case 'preparing':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Preparando</Badge>
      case 'ready':
        return <Badge variant="outline" className="text-purple-600 border-purple-600">Pronto</Badge>
      case 'delivered':
        return <Badge variant="outline" className="text-green-600 border-green-600">Entregue</Badge>
      case 'cancelled':
        return <Badge variant="outline" className="text-red-600 border-red-600">Cancelado</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-600" />
      case 'preparing':
        return <Package className="h-4 w-4 text-blue-600" />
      case 'ready':
        return <Truck className="h-4 w-4 text-purple-600" />
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    delivered: orders.filter(o => o.status === 'delivered').length
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
              <h1 className="text-2xl font-bold text-gray-800">Pedidos</h1>
              <p className="text-gray-600">Gerencie todos os pedidos da sua loja</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <ShoppingCart className="h-8 w-8 text-[#66CCFF] mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{orderStats.total}</p>
                <p className="text-sm text-gray-600">Total</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{orderStats.pending}</p>
                <p className="text-sm text-gray-600">Pendentes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{orderStats.preparing}</p>
                <p className="text-sm text-gray-600">Preparando</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{orderStats.ready}</p>
                <p className="text-sm text-gray-600">Prontos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{orderStats.delivered}</p>
                <p className="text-sm text-gray-600">Entregues</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar pedidos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
                  <TabsList>
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="pending">Pendentes</TabsTrigger>
                    <TabsTrigger value="preparing">Preparando</TabsTrigger>
                    <TabsTrigger value="ready">Prontos</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#66CCFF]/10 p-3 rounded-lg">
                        {getStatusIcon(order.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{order.id}</h3>
                          {getStatusBadge(order.status)}
                          <span className="text-sm text-gray-500">{order.orderTime}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Cliente</p>
                            <p className="text-gray-600">{order.customer}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{order.phone}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Endereço</p>
                            <div className="flex items-start space-x-2">
                              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                              <span className="text-sm text-gray-600">{order.address}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Produtos</p>
                          {order.products.map((product, index) => (
                            <div key={index} className="flex justify-between items-center py-1">
                              <span className="text-sm text-gray-600">
                                {product.quantity}x {product.name}
                              </span>
                              <span className="text-sm font-medium text-gray-800">
                                R$ {(product.quantity * product.price).toFixed(2)}
                              </span>
                            </div>
                          ))}
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-800">Total</span>
                              <span className="text-lg font-bold text-gray-800">R$ {order.total.toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-gray-600">Pagamento: {order.paymentMethod}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      {order.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            size="sm"
                            className="bg-[#66CCFF] hover:bg-[#4DB8FF] text-white"
                          >
                            Aceitar Pedido
                          </Button>
                          <Button
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            Recusar
                          </Button>
                        </>
                      )}
                      {order.status === 'preparing' && (
                        <Button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          Marcar como Pronto
                        </Button>
                      )}
                      {order.status === 'ready' && (
                        <Button
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Marcar como Entregue
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersScreen

