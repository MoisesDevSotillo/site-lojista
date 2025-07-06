import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Store, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Settings,
  LogOut,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react'

const ProductsScreen = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('products')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: ''
  })

  // Produtos simulados
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Smartphone Samsung Galaxy',
      category: 'Eletrônicos',
      price: 899.99,
      stock: 15,
      status: 'active',
      image: '/placeholder-product.jpg',
      description: 'Smartphone com tela de 6.1 polegadas'
    },
    {
      id: 2,
      name: 'Fone de Ouvido Bluetooth',
      category: 'Eletrônicos',
      price: 159.90,
      stock: 8,
      status: 'active',
      image: '/placeholder-product.jpg',
      description: 'Fone sem fio com cancelamento de ruído'
    },
    {
      id: 3,
      name: 'Notebook Dell Inspiron',
      category: 'Eletrônicos',
      price: 2499.99,
      stock: 3,
      status: 'active',
      image: '/placeholder-product.jpg',
      description: 'Notebook para trabalho e estudos'
    },
    {
      id: 4,
      name: 'Mouse Gamer RGB',
      category: 'Eletrônicos',
      price: 89.90,
      stock: 0,
      status: 'inactive',
      image: '/placeholder-product.jpg',
      description: 'Mouse para jogos com iluminação RGB'
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

  const toggleProductStatus = (productId) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, status: product.status === 'active' ? 'inactive' : 'active' }
        : product
    ))
  }

  const handleAddProduct = () => {
    setShowAddProductModal(true)
  }

  const handleSaveProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const product = {
      id: products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      status: 'active',
      image: '/placeholder-product.jpg',
      description: newProduct.description
    }

    setProducts([...products, product])
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: ''
    })
    setShowAddProductModal(false)
    alert('Produto adicionado com sucesso!')
  }

  const handleCancelAddProduct = () => {
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: ''
    })
    setShowAddProductModal(false)
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status, stock) => {
    if (stock === 0) {
      return <Badge variant="outline" className="text-red-600 border-red-600">Sem Estoque</Badge>
    }
    if (status === 'active') {
      return <Badge variant="outline" className="text-green-600 border-green-600">Ativo</Badge>
    }
    return <Badge variant="outline" className="text-gray-600 border-gray-600">Inativo</Badge>
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
              <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
              <p className="text-gray-600">Gerencie o catálogo da sua loja</p>
            </div>
            <Button 
              onClick={handleAddProduct}
              className="bg-[#66CCFF] hover:bg-[#4DB8FF] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Produto
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Products Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 text-[#66CCFF] mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{products.length}</p>
                <p className="text-sm text-gray-600">Total de Produtos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{products.filter(p => p.status === 'active').length}</p>
                <p className="text-sm text-gray-600">Produtos Ativos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <EyeOff className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{products.filter(p => p.status === 'inactive').length}</p>
                <p className="text-sm text-gray-600">Produtos Inativos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{products.filter(p => p.stock === 0).length}</p>
                <p className="text-sm text-gray-600">Sem Estoque</p>
              </CardContent>
            </Card>
          </div>

          {/* Products List */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary">{product.category}</Badge>
                          {getStatusBadge(product.status, product.stock)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">R$ {product.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">Estoque: {product.stock}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => toggleProductStatus(product.id)}
                          variant="outline"
                          size="sm"
                        >
                          {product.status === 'active' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Adicionar Novo Produto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Produto *
                </label>
                <Input
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="Digite o nome do produto"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria *
                </label>
                <Input
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  placeholder="Digite a categoria"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preço (R$) *
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="0,00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estoque *
                  </label>
                  <Input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
                  rows="3"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Descrição do produto (opcional)"
                />
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button 
                  onClick={handleSaveProduct}
                  className="flex-1 bg-[#66CCFF] hover:bg-[#4DB8FF] text-white"
                >
                  Salvar Produto
                </Button>
                <Button 
                  onClick={handleCancelAddProduct}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default ProductsScreen

